import { motion, AnimatePresence } from "framer-motion";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Trophy, Medal, Award, Sparkles, Crown } from "lucide-react";
import { useState, useEffect } from "react";

interface LeaderboardPlayer {
  id: string;
  name: string;
  score: number;
  rank: number;
}

interface FinalLeaderboardProps {
  players: LeaderboardPlayer[];
}

export default function FinalLeaderboard({ players }: FinalLeaderboardProps) {
  const [visiblePlayers, setVisiblePlayers] = useState<number[]>([]);
  const sortedPlayers = [...players].sort((a, b) => b.score - a.score);

  useEffect(() => {
    // İlk 3'e kadar olanları hızlı hızlı göster (100ms aralarla)
    const othersCount = sortedPlayers.length - 3;
    const delays: number[] = [];

    // İlk 3'e kadar olanlar için hızlı timing
    for (let i = othersCount - 1; i >= 0; i--) {
      delays.push(i * 100); // 100ms aralarla
    }

    // İlk 3 için daha yavaş timing ve özel animasyonlar
    if (sortedPlayers.length >= 3) {
      delays.push(othersCount * 100 + 500); // 3. için ekstra bekleme
    }
    if (sortedPlayers.length >= 2) {
      delays.push(othersCount * 100 + 1200); // 2. için daha fazla bekleme
    }
    if (sortedPlayers.length >= 1) {
      delays.push(othersCount * 100 + 2000); // 1. için en fazla bekleme
    }

    // Her oyuncuyu sırayla göster
    sortedPlayers.forEach((_, idx) => {
      setTimeout(() => {
        setVisiblePlayers((prev) => [...prev, idx]);
      }, delays[idx] || 0);
    });
  }, [sortedPlayers.length]);

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  const getRankIcon = (rank: number) => {
    if (rank === 1) return <Crown className="w-8 h-8 text-yellow-400" />;
    if (rank === 2) return <Medal className="w-7 h-7 text-gray-400" />;
    if (rank === 3) return <Award className="w-6 h-6 text-amber-600" />;
    return null;
  };

  const getRankColor = (rank: number) => {
    if (rank === 1) return "bg-gradient-to-r from-yellow-400 to-yellow-600";
    if (rank === 2) return "bg-gradient-to-r from-gray-300 to-gray-500";
    if (rank === 3) return "bg-gradient-to-r from-amber-500 to-amber-700";
    return "bg-muted";
  };

  const getEntryAnimation = (rank: number) => {
    if (rank === 1) {
      // 1. için en ihtişamlı animasyon
      return {
        initial: { scale: 0, rotate: -180, opacity: 0, y: 100 },
        animate: { scale: 1, rotate: 0, opacity: 1, y: 0 },
        transition: {
          type: "spring",
          stiffness: 200,
          damping: 15,
          duration: 1.2,
        },
      };
    } else if (rank === 2) {
      // 2. için orta seviye animasyon
      return {
        initial: { scale: 0, x: -100, opacity: 0 },
        animate: { scale: 1, x: 0, opacity: 1 },
        transition: {
          type: "spring",
          stiffness: 150,
          damping: 12,
          duration: 0.8,
        },
      };
    } else if (rank === 3) {
      // 3. için hafif özel animasyon
      return {
        initial: { scale: 0, x: 100, opacity: 0 },
        animate: { scale: 1, x: 0, opacity: 1 },
        transition: {
          type: "spring",
          stiffness: 150,
          damping: 12,
          duration: 0.8,
        },
      };
    } else {
      // Diğerleri için basit hızlı animasyon
      return {
        initial: { opacity: 0, y: -20 },
        animate: { opacity: 1, y: 0 },
        transition: { duration: 0.3 },
      };
    }
  };

  return (
    <div className="w-full space-y-3">
      <h3 className="text-2xl font-display text-center mb-4">Final Sıralama</h3>
      <AnimatePresence>
        {sortedPlayers.map((player, idx) => {
          const actualRank = idx + 1;
          const isVisible = visiblePlayers.includes(idx);
          const animation = getEntryAnimation(actualRank);

          if (!isVisible) return null;

          return (
            <motion.div
              key={player.id}
              {...animation}
              className={`
                relative p-4 rounded-lg border-2 flex items-center gap-4
                ${actualRank <= 3 ? "border-primary bg-card" : "border-card-border bg-card"}
                ${actualRank === 1 ? "shadow-2xl shadow-primary/40 ring-4 ring-primary/30" : ""}
                ${actualRank === 2 ? "shadow-xl shadow-gray-400/30" : ""}
                ${actualRank === 3 ? "shadow-lg shadow-amber-500/30" : ""}
              `}
            >
              {/* 1. için özel parıltı efekti */}
              {actualRank === 1 && (
                <>
                  <motion.div
                    className="absolute -top-2 -right-2"
                    animate={{
                      rotate: 360,
                      scale: [1, 1.2, 1],
                    }}
                    transition={{
                      rotate: { duration: 3, repeat: Infinity, ease: "linear" },
                      scale: { duration: 2, repeat: Infinity },
                    }}
                  >
                    <Sparkles className="w-8 h-8 text-yellow-400" />
                  </motion.div>
                  <motion.div
                    className="absolute -top-2 -left-2"
                    animate={{
                      rotate: -360,
                      scale: [1, 1.3, 1],
                    }}
                    transition={{
                      rotate: { duration: 2.5, repeat: Infinity, ease: "linear" },
                      scale: { duration: 1.5, repeat: Infinity },
                    }}
                  >
                    <Sparkles className="w-6 h-6 text-yellow-400" />
                  </motion.div>
                </>
              )}

              {/* Rank Icon */}
              <div className="flex-shrink-0 w-14 h-14 flex items-center justify-center">
                {getRankIcon(actualRank) ? (
                  <motion.div
                    animate={
                      actualRank === 1
                        ? {
                            scale: [1, 1.2, 1],
                            rotate: [0, 5, -5, 0],
                          }
                        : actualRank <= 3
                        ? { scale: [1, 1.1, 1] }
                        : {}
                    }
                    transition={{
                      duration: actualRank === 1 ? 2 : 1.5,
                      repeat: Infinity,
                    }}
                  >
                    {getRankIcon(actualRank)}
                  </motion.div>
                ) : (
                  <div className="text-2xl font-display text-muted-foreground">
                    {actualRank}
                  </div>
                )}
              </div>

              {/* Avatar */}
              <Avatar
                className={`
                  ${actualRank === 1 ? "w-16 h-16" : actualRank <= 3 ? "w-14 h-14" : "w-12 h-12"}
                  ${getRankColor(actualRank)} text-white
                  ${actualRank === 1 ? "ring-4 ring-yellow-400/50" : ""}
                `}
              >
                <AvatarFallback className="text-white font-display text-lg">
                  {getInitials(player.name)}
                </AvatarFallback>
              </Avatar>

              {/* Name */}
              <div className="flex-1">
                <div
                  className={`
                    font-semibold
                    ${actualRank === 1 ? "text-2xl" : actualRank <= 3 ? "text-xl" : "text-lg"}
                  `}
                >
                  {player.name}
                </div>
                {actualRank === 1 && (
                  <div className="text-sm text-yellow-600 dark:text-yellow-400 font-display">
                    🏆 Şampiyon!
                  </div>
                )}
              </div>

              {/* Score */}
              <Badge
                className={`
                  ${actualRank === 1 ? "bg-gradient-to-r from-yellow-400 to-yellow-600" : "bg-primary"}
                  text-white px-4 py-2
                  ${actualRank === 1 ? "text-2xl" : actualRank <= 3 ? "text-xl" : "text-lg"}
                  font-display
                  ${actualRank === 1 ? "shadow-lg shadow-yellow-400/50" : ""}
                `}
              >
                {player.score}
              </Badge>

              {/* 1. için arka plan ışıltısı */}
              {actualRank === 1 && (
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-yellow-400/10 via-transparent to-yellow-400/10 rounded-lg pointer-events-none"
                  animate={{
                    opacity: [0.3, 0.6, 0.3],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                  }}
                />
              )}
            </motion.div>
          );
        })}
      </AnimatePresence>
    </div>
  );
}
