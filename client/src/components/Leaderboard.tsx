import { motion } from "framer-motion";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Trophy, Medal, Award } from "lucide-react";

interface LeaderboardPlayer {
  id: string;
  name: string;
  score: number;
  rank: number;
}

interface LeaderboardProps {
  players: LeaderboardPlayer[];
  compact?: boolean;
}

export default function Leaderboard({ players, compact = false }: LeaderboardProps) {
  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  const getRankIcon = (rank: number) => {
    if (rank === 1) return <Trophy className="w-6 h-6 text-yellow-400" />;
    if (rank === 2) return <Medal className="w-6 h-6 text-gray-400" />;
    if (rank === 3) return <Award className="w-6 h-6 text-amber-600" />;
    return null;
  };

  const getRankColor = (rank: number) => {
    if (rank === 1) return "bg-gradient-to-r from-yellow-400 to-yellow-600";
    if (rank === 2) return "bg-gradient-to-r from-gray-300 to-gray-500";
    if (rank === 3) return "bg-gradient-to-r from-amber-500 to-amber-700";
    return "bg-muted";
  };

  const sortedPlayers = [...players].sort((a, b) => b.score - a.score);

  return (
    <div className={`w-full space-y-3 ${compact ? "max-h-96 overflow-y-auto" : ""}`}>
      <h3 className="text-2xl font-display text-center mb-4">Puan Durumu</h3>
      {sortedPlayers.map((player, idx) => {
        const actualRank = idx + 1;
        return (
          <motion.div
            key={player.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: idx * 0.05 }}
            className={`
              relative p-4 rounded-lg border-2 flex items-center gap-4
              ${actualRank <= 3 ? "border-primary bg-card" : "border-card-border bg-card"}
              ${actualRank === 1 ? "shadow-lg shadow-primary/20" : ""}
            `}
          >
            {/* Rank */}
            <div className="flex-shrink-0 w-12 h-12 flex items-center justify-center">
              {getRankIcon(actualRank) || (
                <div className="text-2xl font-display text-muted-foreground">
                  {actualRank}
                </div>
              )}
            </div>

            {/* Avatar */}
            <Avatar className={`w-12 h-12 ${getRankColor(actualRank)} text-white`}>
              <AvatarFallback className="text-white font-display">
                {getInitials(player.name)}
              </AvatarFallback>
            </Avatar>

            {/* Name */}
            <div className="flex-1">
              <div className="font-semibold text-lg">{player.name}</div>
            </div>

            {/* Score */}
            <Badge className="bg-primary text-primary-foreground px-4 py-2 text-xl font-display">
              {player.score}
            </Badge>
          </motion.div>
        );
      })}
    </div>
  );
}
