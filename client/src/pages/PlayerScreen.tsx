import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useWebSocket } from "@/hooks/useWebSocket";
import AnswerGrid from "@/components/AnswerGrid";
import JoinGameForm from "@/components/JoinGameForm";
import { Badge } from "@/components/ui/badge";
import { Zap, Check, X } from "lucide-react";
import type { Question } from "@shared/schema";

type PlayerPhase = 'join' | 'waiting' | 'answering' | 'answered' | 'result-correct' | 'result-wrong';

export default function PlayerScreen() {
  const { isConnected, send, on } = useWebSocket();
  const [phase, setPhase] = useState<PlayerPhase>('join');
  const [playerId, setPlayerId] = useState<string>('');
  const [playerName, setPlayerName] = useState<string>('');
  const [gameCode, setGameCode] = useState<string>('');
  const [score, setScore] = useState(0);
  const [currentQuestion, setCurrentQuestion] = useState<Question | null>(null);
  const [currentZoomLevel, setCurrentZoomLevel] = useState(4);
  const [selectedAnswer, setSelectedAnswer] = useState<string>('');
  const [pointsEarned, setPointsEarned] = useState(0);
  const [correctAnswer, setCorrectAnswer] = useState<string>('');

  // Handle WebSocket messages
  useEffect(() => {
    const unsubscribe = on('player', (message) => {
      switch (message.type) {
        case 'player_joined':
          const player = message.players.find((p: any) => p.name === playerName);
          if (player) {
            setPlayerId(player.id);
            setPhase('waiting');
          }
          break;

        case 'game_started':
          setCurrentQuestion(message.question);
          setCurrentZoomLevel(message.currentZoomLevel);
          setPhase('answering');
          setSelectedAnswer('');
          break;

        case 'zoom_decreased':
          setCurrentZoomLevel(message.currentZoomLevel);
          break;

        case 'round_results':
          const myResult = message.players.find((p: any) => p.id === playerId);
          if (myResult) {
            setScore(myResult.score);
            const wasCorrect = myResult.currentAnswer === message.correctAnswer;
            const points = wasCorrect && currentQuestion ? 
              (currentQuestion.zoomLevels.find(z => z.level === myResult.answeredAtZoom)?.points || 0) : 0;
            setPointsEarned(points);
            setCorrectAnswer(message.correctAnswer);
            setPhase(wasCorrect ? 'result-correct' : 'result-wrong');
          }
          break;

        case 'game_finished':
          const finalResult = message.finalScores.find((p: any) => p.id === playerId);
          if (finalResult) {
            setScore(finalResult.score);
          }
          break;

        case 'error':
          alert(message.message);
          setPhase('join');
          break;
      }
    });

    return unsubscribe;
  }, [on, playerId, playerName, currentQuestion]);

  const handleJoin = (name: string, code: string) => {
    setPlayerName(name);
    setGameCode(code);
    send({
      type: 'join_game',
      playerName: name,
      gameCode: code,
    });
  };

  const handleSelectAnswer = (answerId: string) => {
    const answerText = currentQuestion?.options[parseInt(answerId)];
    if (!answerText) return;
    
    setSelectedAnswer(answerId);
    setPhase('answered');
    
    send({
      type: 'submit_answer',
      playerId,
      answer: answerText,
      gameCode,
    });
  };

  const getZoomLevelColor = (level: number) => {
    if (level === 4) return "bg-zoom-max";
    if (level >= 3) return "bg-zoom-mid";
    return "bg-zoom-min";
  };

  const currentPoints = currentQuestion?.zoomLevels.find(z => z.level === currentZoomLevel)?.points || 0;

  if (!isConnected) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="text-2xl font-display mb-2">Bağlanıyor...</div>
          <div className="text-muted-foreground">WebSocket bağlantısı kuruluyor</div>
        </div>
      </div>
    );
  }

  if (phase === 'join') {
    return <JoinGameForm onJoin={handleJoin} />;
  }

  const answers = currentQuestion?.options.map((opt, idx) => ({
    id: String(idx),
    text: opt,
    letter: ['A', 'B', 'C', 'D'][idx] as 'A' | 'B' | 'C' | 'D',
  })) || [];

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/20 via-background to-game-celebration/20 flex flex-col">
      {/* Header */}
      <div className="p-4 bg-card border-b-2 border-card-border">
        <div className="flex items-center justify-between max-w-2xl mx-auto">
          <div className="flex items-center gap-2">
            <Zap className="w-6 h-6 text-primary" />
            <span className="font-display font-bold text-lg">{playerName}</span>
          </div>
          <Badge className="bg-primary text-primary-foreground px-4 py-2 font-display">
            {score} Puan
          </Badge>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex items-center justify-center p-6">
        <div className="w-full max-w-2xl">
          <AnimatePresence mode="wait">
            {phase === 'waiting' && (
              <motion.div
                key="waiting"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="text-center space-y-6"
              >
                <div className="text-3xl font-display font-bold">
                  Oyun Başlamak Üzere...
                </div>
                <p className="text-xl text-muted-foreground">
                  Host oyunu başlatana kadar bekle
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

            {phase === 'answering' && (
              <motion.div
                key="answering"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="space-y-8"
              >
                {/* Zoom Level Info */}
                <div className="text-center space-y-4">
                  <Badge
                    className={`${getZoomLevelColor(currentZoomLevel)} text-white text-2xl px-8 py-4 font-display`}
                  >
                    Seviye {currentZoomLevel}/4
                  </Badge>
                  <p className="text-3xl font-display">
                    Bu seviyede{" "}
                    <span className="text-primary font-bold">{currentPoints} puan</span> kazanabilirsin!
                  </p>
                  <p className="text-muted-foreground">
                    Cevabını seç veya daha net görmek için bekle
                  </p>
                </div>

                {/* Answer Grid */}
                <AnswerGrid
                  answers={answers}
                  selectedAnswer={selectedAnswer}
                  onSelectAnswer={handleSelectAnswer}
                  variant="player"
                />
              </motion.div>
            )}

            {phase === 'answered' && (
              <motion.div
                key="answered"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
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

            {phase === 'result-correct' && (
              <motion.div
                key="correct"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
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
                  <p className="text-3xl font-display">+{pointsEarned} Puan</p>
                </div>
              </motion.div>
            )}

            {phase === 'result-wrong' && (
              <motion.div
                key="wrong"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
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
                  <p className="text-xl text-muted-foreground">Doğru cevap: {correctAnswer}</p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
