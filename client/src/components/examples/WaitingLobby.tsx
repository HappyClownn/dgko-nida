import WaitingLobby from '../WaitingLobby';

export default function WaitingLobbyExample() {
  const players = [
    { id: '1', name: 'Ahmet Yılmaz' },
    { id: '2', name: 'Ayşe Demir' },
    { id: '3', name: 'Mehmet Kaya' },
    { id: '4', name: 'Zeynep Çelik' },
    { id: '5', name: 'Can Aydın' },
  ];

  return (
    <WaitingLobby
      players={players}
      gameCode="ABC123"
      isHost={true}
      onStartGame={() => console.log('Starting game...')}
    />
  );
}
