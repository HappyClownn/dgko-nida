import { useState } from 'react';
import AnswerGrid from '../AnswerGrid';

export default function AnswerGridExample() {
  const [selectedAnswer, setSelectedAnswer] = useState<string>();

  const answers = [
    { id: '1', text: 'Eiffel Kulesi', letter: 'A' as const },
    { id: '2', text: 'Kız Kulesi', letter: 'B' as const },
    { id: '3', text: 'Big Ben', letter: 'C' as const },
    { id: '4', text: 'Galata Kulesi', letter: 'D' as const },
  ];

  return (
    <div className="p-8 bg-background min-h-screen">
      <div className="max-w-4xl mx-auto space-y-8">
        <div>
          <h2 className="text-2xl font-display mb-4">Player View</h2>
          <AnswerGrid
            answers={answers}
            selectedAnswer={selectedAnswer}
            onSelectAnswer={setSelectedAnswer}
            variant="player"
          />
        </div>
        <div>
          <h2 className="text-2xl font-display mb-4">Host View</h2>
          <AnswerGrid
            answers={answers}
            selectedAnswer={selectedAnswer}
            onSelectAnswer={setSelectedAnswer}
            variant="host"
          />
        </div>
      </div>
    </div>
  );
}
