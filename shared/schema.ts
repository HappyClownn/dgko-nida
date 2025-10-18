import { z } from "zod";

// Question schema - her soru birden fazla zoom level içerir
// Seviye 4 = En yakın çekim (en anlaşılmaz) = EN FAZLA PUAN
// Seviye 1 = En uzak çekim (en anlaşılır) = EN AZ PUAN
export const questionSchema = z.object({
  id: z.string(),
  imageUrl: z.string(), // Ana fotoğraf (referans için)
  correctAnswer: z.string(),
  options: z.array(z.string()),
  zoomLevels: z.array(z.object({
    level: z.number(), // 4 = en yakın/anlaşılmaz (max puan), 1 = en uzak/anlaşılır (min puan)
    imageUrl: z.string(), // Bu seviye için yüklenmiş fotoğraf
    points: z.number(), // Bu seviyede kazanılacak puan
  })),
});

export type Question = z.infer<typeof questionSchema>;

// Player schema
export const playerSchema = z.object({
  id: z.string(),
  name: z.string(),
  score: z.number().default(0),
  currentAnswer: z.string().optional(),
  answeredAtZoom: z.number().optional(), // Hangi zoom seviyesinde cevap verdi
});

export type Player = z.infer<typeof playerSchema>;

// Game state
export const gameStateSchema = z.enum([
  "lobby",        // Oyun başlamadan önce bekleme
  "question",     // Soru gösteriliyor
  "answering",    // Oyuncular cevaplıyor
  "results",      // Tur sonuçları gösteriliyor
  "finished",     // Oyun bitti
]);

export type GameState = z.infer<typeof gameStateSchema>;

// Game schema
export const gameSchema = z.object({
  code: z.string(),
  hostId: z.string().optional(),
  players: z.array(playerSchema),
  questions: z.array(questionSchema),
  currentQuestionIndex: z.number().default(0),
  currentZoomLevel: z.number().default(4), // 4'ten başla (en yakın = en zor)
  state: gameStateSchema,
  roundStartTime: z.number().optional(),
});

export type Game = z.infer<typeof gameSchema>;

// WebSocket mesaj tipleri
export const wsMessageSchema = z.discriminatedUnion("type", [
  // Oyuncu -> Server
  z.object({
    type: z.literal("join_game"),
    playerName: z.string(),
    gameCode: z.string(),
  }),
  z.object({
    type: z.literal("submit_answer"),
    playerId: z.string(),
    answer: z.string(),
    gameCode: z.string(),
  }),
  
  // Host -> Server
  z.object({
    type: z.literal("create_game"),
    questions: z.array(questionSchema),
  }),
  z.object({
    type: z.literal("start_game"),
    gameCode: z.string(),
  }),
  z.object({
    type: z.literal("next_round"),
    gameCode: z.string(),
  }),
  z.object({
    type: z.literal("decrease_zoom"),
    gameCode: z.string(),
  }),
  
  // Server -> Client
  z.object({
    type: z.literal("game_created"),
    gameCode: z.string(),
    hostId: z.string(),
  }),
  z.object({
    type: z.literal("player_joined"),
    player: playerSchema,
    players: z.array(playerSchema),
  }),
  z.object({
    type: z.literal("game_started"),
    question: questionSchema,
    currentZoomLevel: z.number(),
  }),
  z.object({
    type: z.literal("zoom_decreased"),
    currentZoomLevel: z.number(),
  }),
  z.object({
    type: z.literal("answer_submitted"),
    playerId: z.string(),
    answeredCount: z.number(),
    totalPlayers: z.number(),
  }),
  z.object({
    type: z.literal("round_results"),
    correctAnswer: z.string(),
    players: z.array(playerSchema),
    roundNumber: z.number(),
  }),
  z.object({
    type: z.literal("game_finished"),
    finalScores: z.array(playerSchema),
  }),
  z.object({
    type: z.literal("error"),
    message: z.string(),
  }),
]);

export type WSMessage = z.infer<typeof wsMessageSchema>;

// Insert schemas
export const insertGameSchema = gameSchema.omit({ currentQuestionIndex: true, currentZoomLevel: true, state: true });
export type InsertGame = z.infer<typeof insertGameSchema>;

export const insertPlayerSchema = playerSchema.omit({ score: true });
export type InsertPlayer = z.infer<typeof insertPlayerSchema>;
