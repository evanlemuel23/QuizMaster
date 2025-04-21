
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { QuizQuestion as QuizQuestionType } from '@/types/quiz';
import { cn } from '@/lib/utils';

interface QuizQuestionProps {
  question: QuizQuestionType;
  onAnswer: (selectedOption: number) => void;
  showResults: boolean;
  selectedOption?: number;
}

export const QuizQuestion = ({ 
  question, 
  onAnswer, 
  showResults,
  selectedOption 
}: QuizQuestionProps) => {
  const [selected, setSelected] = useState<number | undefined>(selectedOption);

  const handleOptionChange = (value: string) => {
    const optionIndex = parseInt(value);
    setSelected(optionIndex);
    onAnswer(optionIndex);
  };

  return (
    <div className="space-y-6 p-4 md:p-6 bg-white rounded-xl shadow-sm border">
      <h2 className="text-xl font-semibold">{question.question}</h2>
      <RadioGroup 
        value={selected !== undefined ? selected.toString() : undefined} 
        onValueChange={handleOptionChange}
        disabled={showResults}
        className="space-y-3"
      >
        {question.options.map((option, index) => {
          const isCorrect = index === question.correctAnswer;
          const isSelected = selected === index;
          
          let optionClassName = "relative flex items-center border p-4 rounded-lg transition-all";
          
          if (showResults) {
            if (isCorrect) {
              optionClassName = cn(optionClassName, "border-quiz-correct bg-green-50");
            } else if (isSelected && !isCorrect) {
              optionClassName = cn(optionClassName, "border-quiz-incorrect bg-red-50");
            }
          } else {
            optionClassName = cn(optionClassName, "cursor-pointer hover:border-quiz-primary");
            if (isSelected) {
              optionClassName = cn(optionClassName, "border-quiz-primary bg-purple-50");
            }
          }
          
          return (
            <div key={index} className={optionClassName}>
              <RadioGroupItem 
                value={index.toString()} 
                id={`option-${index}`} 
                className="mr-3"
              />
              <Label htmlFor={`option-${index}`} className="flex-1 cursor-pointer">
                {option}
              </Label>
              {showResults && isCorrect && (
                <span className="absolute right-3 text-quiz-correct text-sm font-medium">
                  Correct
                </span>
              )}
              {showResults && isSelected && !isCorrect && (
                <span className="absolute right-3 text-quiz-incorrect text-sm font-medium">
                  Incorrect
                </span>
              )}
            </div>
          );
        })}
      </RadioGroup>
    </div>
  );
};

export default QuizQuestion;
