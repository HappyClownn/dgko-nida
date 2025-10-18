import GameHeader from '../GameHeader';

export default function GameHeaderExample() {
  return (
    <div className="p-8 bg-background min-h-screen">
      <GameHeader
        currentRound={3}
        totalRounds={10}
        gameCode="ABC123"
      />
    </div>
  );
}
