import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Zap, Users } from "lucide-react";
import AnimatedTitle from "@/components/AnimatedTitle";

interface JoinGameFormProps {
  onJoin?: (name: string, gameCode: string) => void;
}

export default function JoinGameForm({ onJoin }: JoinGameFormProps) {
  const [name, setName] = useState("");
  const [gameCode, setGameCode] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name.trim() && gameCode.trim()) {
      console.log("Joining game:", { name, gameCode });
      onJoin?.(name, gameCode);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/20 via-background to-game-celebration/20 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="w-full max-w-md"
      >
        {/* Logo */}
        <motion.div
          initial={{ y: -20 }}
          animate={{ y: 0 }}
          className="text-center mb-8"
        >
          <div className="inline-flex items-center gap-3 mb-4">
            <div className="w-16 h-16 bg-primary rounded-2xl flex items-center justify-center shadow-lg">
              <Zap className="w-10 h-10 text-primary-foreground" />
            </div>
          </div>
          <AnimatedTitle className="text-4xl md:text-5xl font-display font-black" />
          <p className="text-muted-foreground mt-2 text-lg">
            ins patlamaz amk
          </p>
        </motion.div>

        {/* Form Card */}
        <motion.div
          initial={{ y: 20 }}
          animate={{ y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-card border-2 border-card-border rounded-2xl p-8 shadow-xl"
        >
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="name" className="text-lg font-semibold">
                İsmin
              </Label>
              <Input
                id="name"
                data-testid="input-player-name"
                type="text"
                placeholder="Adını gir"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="h-14 text-lg"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="gameCode" className="text-lg font-semibold">
                Oyun Kodu
              </Label>
              <Input
                id="gameCode"
                data-testid="input-game-code"
                type="text"
                placeholder="Oyun kodunu gir"
                value={gameCode}
                onChange={(e) => setGameCode(e.target.value.toUpperCase())}
                className="h-14 text-lg font-mono"
                required
              />
            </div>

            <Button
              data-testid="button-join-game"
              type="submit"
              className="w-full h-16 text-xl font-display bg-gradient-to-r from-primary to-game-celebration hover:opacity-90"
              size="lg"
            >
              <Users className="w-6 h-6 mr-2" />
              Oyuna Katıl
            </Button>
          </form>
        </motion.div>

        {/* Waiting Animation */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="text-center mt-6 text-muted-foreground"
        >
          <div className="flex items-center justify-center gap-2">
            <motion.div
              animate={{ opacity: [0.3, 1, 0.3] }}
              transition={{ duration: 1.5, repeat: Infinity, delay: 0 }}
              className="w-2 h-2 bg-primary rounded-full"
            />
            <motion.div
              animate={{ opacity: [0.3, 1, 0.3] }}
              transition={{ duration: 1.5, repeat: Infinity, delay: 0.2 }}
              className="w-2 h-2 bg-primary rounded-full"
            />
            <motion.div
              animate={{ opacity: [0.3, 1, 0.3] }}
              transition={{ duration: 1.5, repeat: Infinity, delay: 0.4 }}
              className="w-2 h-2 bg-primary rounded-full"
            />
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}
