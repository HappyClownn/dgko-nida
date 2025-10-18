import ResultsScreen from '../ResultsScreen';

export default function ResultsScreenExample() {
  const players = [
    { id: '1', name: 'Ahmet Yılmaz', score: 2750, rank: 1, wasCorrect: true, pointsEarned: 1000 },
    { id: '2', name: 'Ayşe Demir', score: 2500, rank: 2, wasCorrect: true, pointsEarned: 750 },
    { id: '3', name: 'Mehmet Kaya', score: 2250, rank: 3, wasCorrect: false, pointsEarned: 0 },
    { id: '4', name: 'Zeynep Çelik', score: 1750, rank: 4, wasCorrect: true, pointsEarned: 500 },
    { id: '5', name: 'Can Aydın', score: 1500, rank: 5, wasCorrect: false, pointsEarned: 0 },
  ];

  return (
    <ResultsScreen
      players={players}
      correctAnswer="Galata Kulesi"
      roundNumber={3}
      isGameOver={false}
      onNextRound={() => console.log('Next round')}
    />
  );
}
