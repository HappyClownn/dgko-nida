import Leaderboard from '../Leaderboard';

export default function LeaderboardExample() {
  const players = [
    { id: '1', name: 'Ahmet Yılmaz', score: 2750, rank: 1 },
    { id: '2', name: 'Ayşe Demir', score: 2500, rank: 2 },
    { id: '3', name: 'Mehmet Kaya', score: 2250, rank: 3 },
    { id: '4', name: 'Zeynep Çelik', score: 1750, rank: 4 },
    { id: '5', name: 'Can Aydın', score: 1500, rank: 5 },
    { id: '6', name: 'Elif Şahin', score: 1250, rank: 6 },
    { id: '7', name: 'Burak Arslan', score: 1000, rank: 7 },
    { id: '8', name: 'Selin Öztürk', score: 750, rank: 8 },
  ];

  return (
    <div className="p-8 bg-background min-h-screen">
      <div className="max-w-2xl mx-auto">
        <Leaderboard players={players} />
      </div>
    </div>
  );
}
