import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Leaderboard from "./Leaderboard";
import { Trophy, ChevronRight } from "lucide-react";
import { useEffect, useState } from "react";

interface PlayerResult {
  id: string;
  name: string;
  score: number;
  rank: number;
  wasCorrect: boolean;
  pointsEarned: number;
}

interface ResultsScreenProps {
  players: PlayerResult[];
  correctAnswer: string;
  roundNumber: number;
  isGameOver?: boolean;
  onNextRound?: () => void;
}

export default function ResultsScreen({
  players,
  correctAnswer,
  roundNumber,
  isGameOver = false,
  onNextRound,
}: ResultsScreenProps) {
  const [showConfetti, setShowConfetti] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setShowConfetti(false), 3000);
    return () => clearTimeout(timer);
  }, []);

  const confettiColors = [
    "bg-primary",
    "bg-game-celebration",
    "bg-game-timer",
    "bg-game-correct",
    "bg-chart-4",
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-game-correct/20 via-background to-primary/20 p-6 relative overflow-hidden">
      {/* Confetti Animation */}
      {showConfetti &&
        Array.from({ length: 50 }).map((_, i) => (
          <motion.div
            key={i}
            className={`absolute w-3 h-3 ${confettiColors[i % confettiColors.length]} rounded-sm`}
            initial={{
              top: -20,
              left: `${Math.random() * 100}%`,
              rotate: 0,
              opacity: 1,
            }}
            animate={{
              top: "100vh",
              rotate: 360,
              opacity: 0,
            }}
            transition={{
              duration: 2 + Math.random() * 2,
              delay: Math.random() * 0.5,
              ease: "easeOut",
            }}
          />
        ))}

      <div className="max-w-6xl mx-auto space-y-8 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center space-y-4"
        >
          <div className="inline-flex items-center gap-3 mb-4">
            <Trophy className="w-16 h-16 text-game-correct" />
          </div>
          <h1 className="text-4xl md:text-6xl font-display font-black">
            {isGameOver ? "Oyun Bitti!" : `Tur ${roundNumber} Sonuçları`}
          </h1>
          <Badge className="bg-game-correct text-white text-xl px-6 py-3 font-display">
            Doğru Cevap: {correctAnswer}
          </Badge>
        </motion.div>

        {/* Leaderboard */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-card border-2 border-card-border rounded-2xl p-8"
        >
          <Leaderboard players={players} />
        </motion.div>

        {/* Next Button */}
        {!isGameOver && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="flex justify-center"
          >
            <Button
              data-testid="button-next-round"
              onClick={onNextRound}
              className="h-16 px-12 text-2xl font-display bg-gradient-to-r from-primary to-game-celebration hover:opacity-90"
              size="lg"
            >
              Sıradaki Tur
              <ChevronRight className="w-6 h-6 ml-2" />
            </Button>
          </motion.div>
        )}

        {isGameOver && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="text-center space-y-4"
          >
            <p className="text-2xl font-display">
              Kazanan: <span className="text-primary font-bold">{players[0]?.name}</span>
            </p>
            <p className="text-muted-foreground">
              Oynadığınız için teşekkürler! 🎉
            </p>
          </motion.div>
        )}
      </div>
    </div>
  );
}
