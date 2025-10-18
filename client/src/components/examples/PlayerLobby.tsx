import PlayerLobby from '../PlayerLobby';

export default function PlayerLobbyExample() {
  const players = [
    { id: '1', name: 'Ahmet Yılmaz', hasAnswered: true },
    { id: '2', name: 'Ayşe Demir', hasAnswered: true },
    { id: '3', name: 'Mehmet Kaya', hasAnswered: false },
    { id: '4', name: 'Zeynep Çelik', hasAnswered: false },
    { id: '5', name: 'Can Aydın', hasAnswered: true },
    { id: '6', name: 'Elif Şahin', hasAnswered: false },
    { id: '7', name: 'Burak Arslan', hasAnswered: false },
    { id: '8', name: 'Selin Öztürk', hasAnswered: false },
  ];

  return (
    <div className="p-8 bg-background min-h-screen">
      <div className="max-w-6xl mx-auto">
        <PlayerLobby
          players={players}
          totalPlayers={8}
          answeredCount={3}
          showAnswerProgress={true}
        />
      </div>
    </div>
  );
}
