import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { Zap } from "lucide-react";

interface GameHeaderProps {
  currentRound: number;
  totalRounds: number;
  gameCode?: string;
}

export default function GameHeader({
  currentRound,
  totalRounds,
  gameCode,
}: GameHeaderProps) {
  return (
    <div className="w-full flex items-center justify-between p-6 bg-gradient-to-r from-primary/20 to-game-celebration/20 rounded-lg border-2 border-primary/30">
      {/* Logo/Title */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        className="flex items-center gap-3"
      >
        <div className="w-12 h-12 bg-primary rounded-lg flex items-center justify-center">
          <Zap className="w-7 h-7 text-primary-foreground" />
        </div>
        <div>
          <h1 className="text-2xl md:text-3xl font-display font-bold">
            Fotoğraf Tahmin
          </h1>
          {gameCode && (
            <p className="text-sm text-muted-foreground">
              Oyun Kodu: <span className="font-mono font-bold">{gameCode}</span>
            </p>
          )}
        </div>
      </motion.div>

      {/* Round Counter */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <Badge className="bg-primary text-primary-foreground text-xl md:text-2xl px-6 py-3 font-display">
          Tur {currentRound}/{totalRounds}
        </Badge>
      </motion.div>
    </div>
  );
}
