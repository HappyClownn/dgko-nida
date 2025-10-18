import type { Express } from "express";
import { createServer, type Server } from "http";
import { WebSocketServer, WebSocket } from "ws";
import { storage } from "./storage";
import { type WSMessage, type Player, type Game, questionSchema } from "@shared/schema";
import { randomUUID } from "crypto";

// WebSocket client type with custom properties
interface GameWebSocket extends WebSocket {
  playerId?: string;
  gameCode?: string;
  isHost?: boolean;
}

export async function registerRoutes(app: Express): Promise<Server> {
  const httpServer = createServer(app);
  
  // WebSocket server on /ws path
  const wss = new WebSocketServer({ server: httpServer, path: '/ws' });
  
  // Track connections by game code
  const gameConnections = new Map<string, Set<GameWebSocket>>();
  
  // Broadcast to all clients in a game
  function broadcastToGame(gameCode: string, message: WSMessage) {
    const connections = gameConnections.get(gameCode);
    if (!connections) return;
    
    const messageStr = JSON.stringify(message);
    connections.forEach((client) => {
      if (client.readyState === WebSocket.OPEN) {
        client.send(messageStr);
      }
    });
  }
  
  // Send to specific client
  function sendToClient(ws: GameWebSocket, message: WSMessage) {
    if (ws.readyState === WebSocket.OPEN) {
      ws.send(JSON.stringify(message));
    }
  }
  
  wss.on('connection', (ws: GameWebSocket) => {
    console.log('New WebSocket connection');
    
    ws.on('message', async (data: Buffer) => {
      try {
        const message = JSON.parse(data.toString()) as WSMessage;
        
        switch (message.type) {
          case 'create_game': {
            const hostId = randomUUID();
            const game = await storage.createGame({
              code: '',
              hostId,
              players: [],
              questions: message.questions,
            });
            
            ws.isHost = true;
            ws.gameCode = game.code;
            
            // Add to game connections
            if (!gameConnections.has(game.code)) {
              gameConnections.set(game.code, new Set());
            }
            gameConnections.get(game.code)!.add(ws);
            
            sendToClient(ws, {
              type: 'game_created',
              gameCode: game.code,
              hostId,
            });
            break;
          }
          
          case 'join_game': {
            const game = await storage.getGame(message.gameCode);
            if (!game) {
              sendToClient(ws, {
                type: 'error',
                message: 'Oyun bulunamadı',
              });
              break;
            }
            
            if (game.state !== 'lobby') {
              sendToClient(ws, {
                type: 'error',
                message: 'Oyun zaten başlamış',
              });
              break;
            }
            
            const playerId = randomUUID();
            const player = await storage.addPlayerToGame(message.gameCode, {
              id: playerId,
              name: message.playerName,
            });
            
            if (!player) {
              sendToClient(ws, {
                type: 'error',
                message: 'Oyuna katılınamadı',
              });
              break;
            }
            
            ws.playerId = playerId;
            ws.gameCode = message.gameCode;
            
            // Add to game connections
            if (!gameConnections.has(message.gameCode)) {
              gameConnections.set(message.gameCode, new Set());
            }
            gameConnections.get(message.gameCode)!.add(ws);
            
            const updatedGame = await storage.getGame(message.gameCode);
            if (updatedGame) {
              broadcastToGame(message.gameCode, {
                type: 'player_joined',
                player,
                players: updatedGame.players,
              });
            }
            break;
          }
          
          case 'start_game': {
            const game = await storage.getGame(message.gameCode);
            if (!game) {
              sendToClient(ws, { type: 'error', message: 'Oyun bulunamadı' });
              break;
            }
            
            await storage.updateGame(message.gameCode, {
              state: 'question',
              currentQuestionIndex: 0,
              currentZoomLevel: 4,
              roundStartTime: Date.now(),
            });
            
            const currentQuestion = game.questions[0];
            if (currentQuestion) {
              broadcastToGame(message.gameCode, {
                type: 'game_started',
                question: currentQuestion,
                currentZoomLevel: 4,
              });
            }
            break;
          }
          
          case 'decrease_zoom': {
            const game = await storage.getGame(message.gameCode);
            if (!game) break;
            
            const newZoomLevel = Math.max(1, game.currentZoomLevel - 1);
            await storage.updateGame(message.gameCode, {
              currentZoomLevel: newZoomLevel,
            });
            
            broadcastToGame(message.gameCode, {
              type: 'zoom_decreased',
              currentZoomLevel: newZoomLevel,
            });
            break;
          }
          
          case 'submit_answer': {
            const game = await storage.getGame(message.gameCode);
            if (!game) break;
            
            // Update player with answer and zoom level
            await storage.updatePlayer(message.gameCode, message.playerId, {
              currentAnswer: message.answer,
              answeredAtZoom: game.currentZoomLevel,
            });
            
            const updatedGame = await storage.getGame(message.gameCode);
            if (!updatedGame) break;
            
            const answeredCount = updatedGame.players.filter(p => p.currentAnswer).length;
            
            broadcastToGame(message.gameCode, {
              type: 'answer_submitted',
              playerId: message.playerId,
              answeredCount,
              totalPlayers: updatedGame.players.length,
            });
            
            // Check if all players answered
            if (answeredCount === updatedGame.players.length) {
              await processRoundResults(message.gameCode);
            }
            break;
          }
          
          case 'next_round': {
            const game = await storage.getGame(message.gameCode);
            if (!game) break;
            
            const nextIndex = game.currentQuestionIndex + 1;
            
            if (nextIndex >= game.questions.length) {
              // Game finished
              await storage.updateGame(message.gameCode, {
                state: 'finished',
              });
              
              const finalGame = await storage.getGame(message.gameCode);
              if (finalGame) {
                const sortedPlayers = [...finalGame.players].sort((a, b) => b.score - a.score);
                broadcastToGame(message.gameCode, {
                  type: 'game_finished',
                  finalScores: sortedPlayers,
                });
              }
            } else {
              // Next round
              // Reset player answers
              for (const player of game.players) {
                await storage.updatePlayer(message.gameCode, player.id, {
                  currentAnswer: undefined,
                  answeredAtZoom: undefined,
                });
              }
              
              await storage.updateGame(message.gameCode, {
                state: 'question',
                currentQuestionIndex: nextIndex,
                currentZoomLevel: 4,
                roundStartTime: Date.now(),
              });
              
              const currentQuestion = game.questions[nextIndex];
              if (currentQuestion) {
                broadcastToGame(message.gameCode, {
                  type: 'game_started',
                  question: currentQuestion,
                  currentZoomLevel: 4,
                });
              }
            }
            break;
          }
        }
      } catch (error) {
        console.error('WebSocket error:', error);
        sendToClient(ws, {
          type: 'error',
          message: 'Bir hata oluştu',
        });
      }
    });
    
    ws.on('close', () => {
      console.log('WebSocket connection closed');
      if (ws.gameCode) {
        const connections = gameConnections.get(ws.gameCode);
        if (connections) {
          connections.delete(ws);
          if (connections.size === 0) {
            gameConnections.delete(ws.gameCode);
          }
        }
      }
    });
  });
  
  // Helper function to process round results
  async function processRoundResults(gameCode: string) {
    const game = await storage.getGame(gameCode);
    if (!game) return;
    
    const currentQuestion = game.questions[game.currentQuestionIndex];
    if (!currentQuestion) return;
    
    // Calculate scores
    for (const player of game.players) {
      if (player.currentAnswer === currentQuestion.correctAnswer && player.answeredAtZoom) {
        const zoomLevelData = currentQuestion.zoomLevels.find(z => z.level === player.answeredAtZoom);
        if (zoomLevelData) {
          await storage.updatePlayer(gameCode, player.id, {
            score: player.score + zoomLevelData.points,
          });
        }
      }
    }
    
    await storage.updateGame(gameCode, {
      state: 'results',
    });
    
    const updatedGame = await storage.getGame(gameCode);
    if (updatedGame) {
      const sortedPlayers = [...updatedGame.players].sort((a, b) => b.score - a.score);
      broadcastToGame(gameCode, {
        type: 'round_results',
        correctAnswer: currentQuestion.correctAnswer,
        players: sortedPlayers,
        roundNumber: game.currentQuestionIndex + 1,
      });
    }
  }

  return httpServer;
}
