import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useWebSocket } from "@/hooks/useWebSocket";
import GameHeader from "@/components/GameHeader";
import PhotoDisplay from "@/components/PhotoDisplay";
import AnswerGrid from "@/components/AnswerGrid";
import PlayerLobby from "@/components/PlayerLobby";
import Leaderboard from "@/components/Leaderboard";
import WaitingLobby from "@/components/WaitingLobby";
import ResultsScreen from "@/components/ResultsScreen";
import { Button } from "@/components/ui/button";
import { ChevronRight, ZoomIn } from "lucide-react";
import { sampleQuestions } from "@shared/sampleQuestions";
import type { Player, Question } from "@shared/schema";

type GamePhase = 'waiting' | 'lobby' | 'playing' | 'results' | 'finished';

export default function HostScreen() {
  const { isConnected, send, on } = useWebSocket();
  const [gameCode, setGameCode] = useState<string>('');
  const [hostId, setHostId] = useState<string>('');
  const [phase, setPhase] = useState<GamePhase>('waiting');
  const [players, setPlayers] = useState<Player[]>([]);
  const [currentQuestion, setCurrentQuestion] = useState<Question | null>(null);
  const [currentZoomLevel, setCurrentZoomLevel] = useState(4);
  const [currentRound, setCurrentRound] = useState(0);
  const [totalRounds] = useState(sampleQuestions.length);
  const [answeredCount, setAnsweredCount] = useState(0);
  const [correctAnswer, setCorrectAnswer] = useState<string>('');

  // Create game on mount
  useEffect(() => {
    if (isConnected && !gameCode) {
      send({
        type: 'create_game',
        questions: sampleQuestions,
      });
    }
  }, [isConnected, gameCode, send]);

  // Handle WebSocket messages
  useEffect(() => {
    const unsubscribe = on('host', (message) => {
      switch (message.type) {
        case 'game_created':
          setGameCode(message.gameCode);
          setHostId(message.hostId);
          setPhase('lobby');
          break;

        case 'player_joined':
          setPlayers(message.players);
          break;

        case 'game_started':
          setPhase('playing');
          setCurrentQuestion(message.question);
          setCurrentZoomLevel(message.currentZoomLevel);
          setCurrentRound(prev => prev + 1);
          setAnsweredCount(0);
          break;

        case 'zoom_decreased':
          setCurrentZoomLevel(message.currentZoomLevel);
          break;

        case 'answer_submitted':
          setAnsweredCount(message.answeredCount);
          break;

        case 'round_results':
          setPlayers(message.players);
          setCorrectAnswer(message.correctAnswer);
          setPhase('results');
          break;

        case 'game_finished':
          setPlayers(message.finalScores);
          setPhase('finished');
          break;
      }
    });

    return unsubscribe;
  }, [on]);

  const handleStartGame = () => {
    send({
      type: 'start_game',
      gameCode,
    });
  };

  const handleDecreaseZoom = () => {
    if (currentZoomLevel > 1) {
      send({
        type: 'decrease_zoom',
        gameCode,
      });
    }
  };

  const handleNextRound = () => {
    send({
      type: 'next_round',
      gameCode,
    });
  };

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

  if (phase === 'waiting') {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="text-2xl font-display mb-2">Oyun Oluşturuluyor...</div>
        </div>
      </div>
    );
  }

  if (phase === 'lobby') {
    return (
      <WaitingLobby
        players={players}
        gameCode={gameCode}
        isHost={true}
        onStartGame={handleStartGame}
      />
    );
  }

  if (phase === 'results' && currentQuestion) {
    return (
      <ResultsScreen
        players={players.map((p, idx) => ({
          ...p,
          rank: idx + 1,
          wasCorrect: p.currentAnswer === correctAnswer,
          pointsEarned: p.currentAnswer === correctAnswer ? 
            (currentQuestion.zoomLevels.find(z => z.level === p.answeredAtZoom)?.points || 0) : 0,
        }))}
        correctAnswer={correctAnswer}
        roundNumber={currentRound}
        onNextRound={handleNextRound}
      />
    );
  }

  if (phase === 'finished') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-game-celebration/20 via-background to-primary/20 flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="w-full max-w-4xl"
        >
          <div className="bg-card border-2 border-card-border rounded-2xl p-8 text-center">
            <h1 className="text-5xl font-display font-bold mb-8 bg-gradient-to-r from-primary to-game-celebration bg-clip-text text-transparent">
              Oyun Bitti! 🎉
            </h1>
            <Leaderboard players={players.map((p, idx) => ({ ...p, rank: idx + 1 }))} />
            <div className="mt-8">
              <p className="text-muted-foreground text-lg">
                Oyun Kodu: <span className="font-mono font-bold">{gameCode}</span>
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    );
  }

  // Playing phase
  const currentZoomData = currentQuestion?.zoomLevels.find(z => z.level === currentZoomLevel);
  const answers = currentQuestion?.options.map((opt, idx) => ({
    id: String(idx),
    text: opt,
    letter: ['A', 'B', 'C', 'D'][idx] as 'A' | 'B' | 'C' | 'D',
  })) || [];

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-[1800px] mx-auto space-y-6">
        <GameHeader
          currentRound={currentRound}
          totalRounds={totalRounds}
          gameCode={gameCode}
        />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <PhotoDisplay
              imageUrl={currentZoomData?.imageUrl || currentQuestion?.imageUrl || ''}
              currentZoomLevel={currentZoomLevel}
              maxZoomLevel={4}
              points={currentQuestion?.zoomLevels.map(z => z.points).reverse() || []}
            />

            <div className="bg-card border-2 border-card-border rounded-lg p-6">
              <h3 className="text-2xl font-display mb-4">Cevap Seçenekleri</h3>
              <AnswerGrid
                answers={answers}
                variant="host"
                disabled
              />
            </div>

            <div className="flex gap-4">
              <Button
                data-testid="button-decrease-zoom"
                onClick={handleDecreaseZoom}
                disabled={currentZoomLevel <= 1}
                className="flex-1 h-14 text-lg font-display"
                variant="default"
              >
                <ZoomIn className="w-5 h-5 mr-2" />
                Uzaklaştır (Seviye {currentZoomLevel}/4)
              </Button>
            </div>
          </div>

          <div className="space-y-6">
            <div className="bg-card border-2 border-card-border rounded-lg p-6">
              <PlayerLobby
                players={players}
                totalPlayers={players.length}
                answeredCount={answeredCount}
                showAnswerProgress={true}
              />
            </div>

            <div className="bg-card border-2 border-card-border rounded-lg p-6">
              <Leaderboard players={players.map((p, idx) => ({ ...p, rank: idx + 1 }))} compact />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
