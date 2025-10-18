import { type Game, type Player, type InsertGame, type InsertPlayer } from "@shared/schema";
import { randomUUID } from "crypto";

export interface IStorage {
  // Game operations
  createGame(game: InsertGame): Promise<Game>;
  getGame(code: string): Promise<Game | undefined>;
  updateGame(code: string, game: Partial<Game>): Promise<Game | undefined>;
  deleteGame(code: string): Promise<void>;
  
  // Player operations
  addPlayerToGame(gameCode: string, player: InsertPlayer): Promise<Player | undefined>;
  updatePlayer(gameCode: string, playerId: string, updates: Partial<Player>): Promise<Player | undefined>;
}

export class MemStorage implements IStorage {
  private games: Map<string, Game>;

  constructor() {
    this.games = new Map();
  }

  async createGame(insertGame: InsertGame): Promise<Game> {
    const code = this.generateGameCode();
    const game: Game = {
      ...insertGame,
      code,
      currentQuestionIndex: 0,
      currentZoomLevel: 4,
      state: "lobby",
    };
    this.games.set(code, game);
    return game;
  }

  async getGame(code: string): Promise<Game | undefined> {
    return this.games.get(code);
  }

  async updateGame(code: string, updates: Partial<Game>): Promise<Game | undefined> {
    const game = this.games.get(code);
    if (!game) return undefined;
    
    const updatedGame = { ...game, ...updates };
    this.games.set(code, updatedGame);
    return updatedGame;
  }

  async deleteGame(code: string): Promise<void> {
    this.games.delete(code);
  }

  async addPlayerToGame(gameCode: string, insertPlayer: InsertPlayer): Promise<Player | undefined> {
    const game = this.games.get(gameCode);
    if (!game) return undefined;

    const player: Player = {
      ...insertPlayer,
      score: 0,
    };

    game.players.push(player);
    this.games.set(gameCode, game);
    return player;
  }

  async updatePlayer(gameCode: string, playerId: string, updates: Partial<Player>): Promise<Player | undefined> {
    const game = this.games.get(gameCode);
    if (!game) return undefined;

    const playerIndex = game.players.findIndex(p => p.id === playerId);
    if (playerIndex === -1) return undefined;

    game.players[playerIndex] = { ...game.players[playerIndex], ...updates };
    this.games.set(gameCode, game);
    return game.players[playerIndex];
  }

  private generateGameCode(): string {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let code = '';
    for (let i = 0; i < 6; i++) {
      code += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    
    // Ensure uniqueness
    if (this.games.has(code)) {
      return this.generateGameCode();
    }
    
    return code;
  }
}

export const storage = new MemStorage();
