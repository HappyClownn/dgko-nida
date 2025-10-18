import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";

interface Answer {
  id: string;
  text: string;
  letter: "A" | "B" | "C" | "D";
}

interface AnswerGridProps {
  answers: Answer[];
  selectedAnswer?: string;
  correctAnswer?: string;
  showResults?: boolean;
  onSelectAnswer?: (id: string) => void;
  disabled?: boolean;
  variant?: "host" | "player";
}

const answerColors = {
  A: "bg-primary hover:bg-primary/90",
  B: "bg-game-celebration hover:bg-game-celebration/90",
  C: "bg-game-timer hover:bg-game-timer/90",
  D: "bg-chart-4 hover:bg-chart-4/90",
};

export default function AnswerGrid({
  answers,
  selectedAnswer,
  correctAnswer,
  showResults = false,
  onSelectAnswer,
  disabled = false,
  variant = "player",
}: AnswerGridProps) {
  const isHost = variant === "host";

  return (
    <div className={`grid grid-cols-1 ${isHost ? "md:grid-cols-2" : ""} gap-4 w-full`}>
      {answers.map((answer, idx) => {
        const isSelected = selectedAnswer === answer.id;
        const isCorrect = showResults && correctAnswer === answer.id;
        const isWrong = showResults && isSelected && correctAnswer !== answer.id;

        return (
          <motion.div
            key={answer.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1 }}
          >
            <Button
              data-testid={`button-answer-${answer.letter}`}
              onClick={() => !disabled && onSelectAnswer?.(answer.id)}
              disabled={disabled}
              className={`
                w-full ${isHost ? "min-h-24" : "min-h-32"} rounded-2xl text-white font-display
                relative overflow-hidden group
                ${
                  showResults
                    ? isCorrect
                      ? "bg-game-correct border-4 border-white"
                      : isWrong
                      ? "bg-game-incorrect border-4 border-white"
                      : "opacity-50"
                    : isSelected
                    ? `${answerColors[answer.letter]} border-4 border-white scale-95`
                    : answerColors[answer.letter]
                }
                transition-all duration-200 shadow-lg
                ${!disabled && !showResults ? "hover:scale-[1.02] active:scale-95" : ""}
              `}
            >
              <div className="flex items-center gap-4 w-full">
                <div
                  className={`
                    ${isHost ? "w-12 h-12 text-2xl" : "w-16 h-16 text-3xl"}
                    bg-white/20 rounded-md flex items-center justify-center
                    font-display font-bold flex-shrink-0
                  `}
                >
                  {answer.letter}
                </div>
                <div className={`flex-1 text-left ${isHost ? "text-xl" : "text-2xl"} font-semibold`}>
                  {answer.text}
                </div>
                {isSelected && !showResults && (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="w-8 h-8 bg-white rounded-full flex items-center justify-center"
                  >
                    <Check className="w-5 h-5 text-primary" />
                  </motion.div>
                )}
                {isCorrect && (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="w-10 h-10 bg-white rounded-full flex items-center justify-center"
                  >
                    <Check className="w-6 h-6 text-game-correct" />
                  </motion.div>
                )}
              </div>
            </Button>
          </motion.div>
        );
      })}
    </div>
  );
}
