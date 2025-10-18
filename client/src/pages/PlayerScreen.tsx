import { useState } from "react";
import { motion } from "framer-motion";
import AnswerGrid from "@/components/AnswerGrid";
import { Badge } from "@/components/ui/badge";
import { Zap, Check, X } from "lucide-react";

//todo: remove mock functionality - Replace with real WebSocket data
const MOCK_PLAYER_DATA = {
  playerName: "Ahmet Yılmaz",
  currentZoomLevel: 2,
  maxZoomLevel: 5,
  points: [1000, 750, 500, 250, 100],
  answers: [
    { id: "1", text: "Eiffel Kulesi", letter: "A" as const },
    { id: "2", text: "Kız Kulesi", letter: "B" as const },
    { id: "3", text: "Big Ben", letter: "C" as const },
    { id: "4", text: "Galata Kulesi", letter: "D" as const },
  ],
  gameState: "answering" as "waiting" | "answering" | "answered" | "results-correct" | "results-wrong",
  score: 2750,
};

export default function PlayerScreen() {
  const [selectedAnswer, setSelectedAnswer] = useState<string>();
  const [gameState, setGameState] = useState(MOCK_PLAYER_DATA.gameState);

  const handleSelectAnswer = (answerId: string) => {
    setSelectedAnswer(answerId);
    setGameState("answered");
    console.log("Answer selected:", answerId);
  };

  const getZoomLevelColor = (level: number) => {
    if (level === 1) return "bg-zoom-max";
    if (level <= 2) return "bg-zoom-mid";
    return "bg-zoom-min";
  };

  const currentPoints = MOCK_PLAYER_DATA.points[MOCK_PLAYER_DATA.currentZoomLevel - 1] || 0;

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/20 via-background to-game-celebration/20 flex flex-col">
      {/* Header */}
      <div className="p-4 bg-card border-b-2 border-card-border">
        <div className="flex items-center justify-between max-w-2xl mx-auto">
          <div className="flex items-center gap-2">
            <Zap className="w-6 h-6 text-primary" />
            <span className="font-display font-bold text-lg">{MOCK_PLAYER_DATA.playerName}</span>
          </div>
          <Badge className="bg-primary text-primary-foreground px-4 py-2 font-display">
            {MOCK_PLAYER_DATA.score} Puan
          </Badge>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex items-center justify-center p-6">
        <div className="w-full max-w-2xl space-y-8">
          {gameState === "answering" && (
            <>
              {/* Zoom Level Info */}
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center space-y-4"
              >
                <Badge
                  className={`${getZoomLevelColor(
                    MOCK_PLAYER_DATA.currentZoomLevel
                  )} text-white text-2xl px-8 py-4 font-display`}
                >
                  Seviye {MOCK_PLAYER_DATA.currentZoomLevel}/{MOCK_PLAYER_DATA.maxZoomLevel}
                </Badge>
                <p className="text-3xl font-display">
                  Bu seviyede{" "}
                  <span className="text-primary font-bold">{currentPoints} puan</span> kazanabilirsin!
                </p>
                <p className="text-muted-foreground">
                  Cevabını seç veya daha net görmek için bekle
                </p>
              </motion.div>

              {/* Answer Grid */}
              <AnswerGrid
                answers={MOCK_PLAYER_DATA.answers}
                selectedAnswer={selectedAnswer}
                onSelectAnswer={handleSelectAnswer}
                variant="player"
              />
            </>
          )}

          {gameState === "answered" && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center space-y-6"
            >
              <div className="inline-flex w-24 h-24 bg-primary rounded-full items-center justify-center">
                <Check className="w-12 h-12 text-primary-foreground" />
              </div>
              <div className="space-y-2">
                <h2 className="text-4xl font-display font-bold">Cevabın Alındı!</h2>
                <p className="text-xl text-muted-foreground">
                  Diğer oyuncular cevaplıyor...
                </p>
              </div>
              <div className="flex items-center justify-center gap-2">
                <motion.div
                  animate={{ opacity: [0.3, 1, 0.3] }}
                  transition={{ duration: 1.5, repeat: Infinity, delay: 0 }}
                  className="w-3 h-3 bg-primary rounded-full"
                />
                <motion.div
                  animate={{ opacity: [0.3, 1, 0.3] }}
                  transition={{ duration: 1.5, repeat: Infinity, delay: 0.2 }}
                  className="w-3 h-3 bg-primary rounded-full"
                />
                <motion.div
                  animate={{ opacity: [0.3, 1, 0.3] }}
                  transition={{ duration: 1.5, repeat: Infinity, delay: 0.4 }}
                  className="w-3 h-3 bg-primary rounded-full"
                />
              </div>
            </motion.div>
          )}

          {gameState === "results-correct" && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center space-y-6"
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", delay: 0.2 }}
                className="inline-flex w-32 h-32 bg-game-correct rounded-full items-center justify-center"
              >
                <Check className="w-16 h-16 text-white" />
              </motion.div>
              <div className="space-y-2">
                <h2 className="text-5xl font-display font-bold text-game-correct">Doğru!</h2>
                <p className="text-3xl font-display">+{currentPoints} Puan</p>
              </div>
            </motion.div>
          )}

          {gameState === "results-wrong" && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center space-y-6"
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", delay: 0.2 }}
                className="inline-flex w-32 h-32 bg-game-incorrect rounded-full items-center justify-center"
              >
                <X className="w-16 h-16 text-white" />
              </motion.div>
              <div className="space-y-2">
                <h2 className="text-5xl font-display font-bold text-game-incorrect">
                  Yanlış
                </h2>
                <p className="text-xl text-muted-foreground">Doğru cevap: Galata Kulesi</p>
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
}
