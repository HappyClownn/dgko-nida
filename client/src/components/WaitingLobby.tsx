import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import PlayerLobby from "./PlayerLobby";
import { Zap, Play } from "lucide-react";

interface Player {
  id: string;
  name: string;
}

interface WaitingLobbyProps {
  players: Player[];
  gameCode: string;
  isHost?: boolean;
  onStartGame?: () => void;
}

export default function WaitingLobby({
  players,
  gameCode,
  isHost = false,
  onStartGame,
}: WaitingLobbyProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/20 via-background to-game-celebration/20 p-6">
      <div className="max-w-6xl mx-auto space-y-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center"
        >
          <div className="inline-flex items-center gap-3 mb-4">
            <div className="w-16 h-16 bg-primary rounded-2xl flex items-center justify-center shadow-lg">
              <Zap className="w-10 h-10 text-primary-foreground" />
            </div>
          </div>
          <h1 className="text-4xl md:text-5xl font-display font-black mb-4">
            Oyun Lobisi
          </h1>
          <Badge className="bg-primary text-primary-foreground text-2xl px-8 py-3 font-display">
            Oyun Kodu: {gameCode}
          </Badge>
        </motion.div>

        {/* Player Count */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-center"
        >
          <p className="text-3xl font-display">
            <span className="text-primary font-bold">{players.length}</span> oyuncu bağlandı
          </p>
          <p className="text-muted-foreground mt-2">
            Oyuna katılmak için oyuncular yukarıdaki kodu girsin
          </p>
        </motion.div>

        {/* Players Grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <PlayerLobby players={players} />
        </motion.div>

        {/* Start Button (Host Only) */}
        {isHost && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="flex justify-center"
          >
            <Button
              data-testid="button-start-game"
              onClick={onStartGame}
              disabled={players.length < 2}
              className="h-16 px-12 text-2xl font-display bg-gradient-to-r from-game-correct to-primary hover:opacity-90"
              size="lg"
            >
              <Play className="w-6 h-6 mr-2" />
              Oyunu Başlat
            </Button>
          </motion.div>
        )}

        {/* Waiting Animation */}
        {!isHost && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="text-center space-y-4"
          >
            <p className="text-xl text-muted-foreground">
              Oyunun başlaması bekleniyor...
            </p>
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
      </div>
    </div>
  );
}
