
import React from 'react';
import { Quiz } from '@/types/quiz';
import QuizCard from './QuizCard';

interface QuizGridProps {
  quizzes: Quiz[];
}

export const QuizGrid = ({ quizzes }: QuizGridProps) => {
  if (quizzes.length === 0) {
    return (
      <div className="text-center py-16">
        <h3 className="text-xl font-medium">No quizzes found</h3>
        <p className="text-muted-foreground mt-2">Try exploring different categories or create your own quiz.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {quizzes.map((quiz) => (
        <QuizCard key={quiz.id} quiz={quiz} />
      ))}
    </div>
  );
};

export default QuizGrid;
