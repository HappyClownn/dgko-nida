import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import GameHeader from "@/components/GameHeader";
import PhotoDisplay from "@/components/PhotoDisplay";
import AnswerGrid from "@/components/AnswerGrid";
import PlayerLobby from "@/components/PlayerLobby";
import Leaderboard from "@/components/Leaderboard";
import { Button } from "@/components/ui/button";
import { ChevronRight } from "lucide-react";

//todo: remove mock functionality - Replace with real WebSocket data
const MOCK_GAME_DATA = {
  gameCode: "ABC123",
  currentRound: 2,
  totalRounds: 5,
  currentZoomLevel: 3,
  maxZoomLevel: 5,
  points: [1000, 750, 500, 250, 100],
  imageUrl: "https://images.unsplash.com/photo-1524231757912-21f4fe3a7200?w=800",
  answers: [
    { id: "1", text: "Eiffel Kulesi", letter: "A" as const },
    { id: "2", text: "Kız Kulesi", letter: "B" as const },
    { id: "3", text: "Big Ben", letter: "C" as const },
    { id: "4", text: "Galata Kulesi", letter: "D" as const },
  ],
  correctAnswer: "4",
  players: [
    { id: "1", name: "Ahmet Yılmaz", hasAnswered: true, score: 2750, rank: 1 },
    { id: "2", name: "Ayşe Demir", hasAnswered: true, score: 2500, rank: 2 },
    { id: "3", name: "Mehmet Kaya", hasAnswered: false, score: 2250, rank: 3 },
    { id: "4", name: "Zeynep Çelik", hasAnswered: false, score: 1750, rank: 4 },
    { id: "5", name: "Can Aydın", hasAnswered: true, score: 1500, rank: 5 },
    { id: "6", name: "Elif Şahin", hasAnswered: false, score: 1250, rank: 6 },
  ],
};

export default function HostScreen() {
  const [zoomLevel, setZoomLevel] = useState(1);
  const [showResults, setShowResults] = useState(false);
  const answeredCount = MOCK_GAME_DATA.players.filter((p) => p.hasAnswered).length;

  const handleNextZoom = () => {
    if (zoomLevel < MOCK_GAME_DATA.maxZoomLevel) {
      setZoomLevel((prev) => prev + 1);
    }
  };

  const handleShowResults = () => {
    setShowResults(true);
  };

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-[1800px] mx-auto space-y-6">
        {/* Header */}
        <GameHeader
          currentRound={MOCK_GAME_DATA.currentRound}
          totalRounds={MOCK_GAME_DATA.totalRounds}
          gameCode={MOCK_GAME_DATA.gameCode}
        />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Game Area */}
          <div className="lg:col-span-2 space-y-6">
            {/* Photo */}
            <PhotoDisplay
              imageUrl={MOCK_GAME_DATA.imageUrl}
              currentZoomLevel={zoomLevel}
              maxZoomLevel={MOCK_GAME_DATA.maxZoomLevel}
              points={MOCK_GAME_DATA.points}
            />

            {/* Answers */}
            <div className="bg-card border-2 border-card-border rounded-lg p-6">
              <h3 className="text-2xl font-display mb-4">Cevap Seçenekleri</h3>
              <AnswerGrid
                answers={MOCK_GAME_DATA.answers}
                correctAnswer={showResults ? MOCK_GAME_DATA.correctAnswer : undefined}
                showResults={showResults}
                variant="host"
                disabled
              />
            </div>

            {/* Host Controls */}
            <div className="flex gap-4">
              <Button
                data-testid="button-next-zoom"
                onClick={handleNextZoom}
                disabled={zoomLevel >= MOCK_GAME_DATA.maxZoomLevel}
                className="flex-1 h-14 text-lg font-display"
                variant="default"
              >
                <ChevronRight className="w-5 h-5 mr-2" />
                Sonraki Yakınlaştırma ({zoomLevel}/{MOCK_GAME_DATA.maxZoomLevel})
              </Button>
              <Button
                data-testid="button-show-results"
                onClick={handleShowResults}
                disabled={showResults}
                className="flex-1 h-14 text-lg font-display bg-game-correct hover:bg-game-correct/90"
              >
                Sonuçları Göster
              </Button>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Player Status */}
            <div className="bg-card border-2 border-card-border rounded-lg p-6">
              <PlayerLobby
                players={MOCK_GAME_DATA.players}
                totalPlayers={MOCK_GAME_DATA.players.length}
                answeredCount={answeredCount}
                showAnswerProgress={true}
              />
            </div>

            {/* Leaderboard */}
            <div className="bg-card border-2 border-card-border rounded-lg p-6">
              <Leaderboard players={MOCK_GAME_DATA.players} compact />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
