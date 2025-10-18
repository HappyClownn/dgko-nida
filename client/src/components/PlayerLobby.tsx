import { motion } from "framer-motion";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Check } from "lucide-react";

interface Player {
  id: string;
  name: string;
  hasAnswered?: boolean;
}

interface PlayerLobbyProps {
  players: Player[];
  totalPlayers?: number;
  answeredCount?: number;
  showAnswerProgress?: boolean;
}

export default function PlayerLobby({
  players,
  totalPlayers,
  answeredCount = 0,
  showAnswerProgress = false,
}: PlayerLobbyProps) {
  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  const colors = [
    "bg-primary",
    "bg-game-celebration",
    "bg-game-timer",
    "bg-chart-4",
    "bg-game-correct",
    "bg-chart-1",
    "bg-chart-2",
    "bg-chart-3",
  ];

  return (
    <div className="w-full space-y-6">
      {showAnswerProgress && (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center"
        >
          <Badge className="bg-primary text-primary-foreground text-2xl px-8 py-4 font-display">
            {answeredCount}/{totalPlayers || players.length} Oyuncu Cevapladı
          </Badge>
        </motion.div>
      )}

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {players.map((player, idx) => (
          <motion.div
            key={player.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.05 }}
            className={`
              relative p-4 rounded-lg border-2 bg-card
              ${player.hasAnswered ? "border-game-correct" : "border-card-border"}
            `}
          >
            <div className="flex flex-col items-center gap-2">
              <div className="relative">
                <Avatar className={`w-16 h-16 ${colors[idx % colors.length]} text-white`}>
                  <AvatarFallback className="text-white font-display text-lg">
                    {getInitials(player.name)}
                  </AvatarFallback>
                </Avatar>
                {player.hasAnswered && (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="absolute -bottom-1 -right-1 w-6 h-6 bg-game-correct rounded-full flex items-center justify-center border-2 border-card"
                  >
                    <Check className="w-4 h-4 text-white" />
                  </motion.div>
                )}
              </div>
              <span className="text-sm font-semibold text-center line-clamp-2">
                {player.name}
              </span>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
