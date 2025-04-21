
import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Clock, List, User } from 'lucide-react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Quiz } from '@/types/quiz';
import { useQuiz } from '@/contexts/QuizContext';

interface QuizCardProps {
  quiz: Quiz;
}

export const QuizCard = ({ quiz }: QuizCardProps) => {
  const { users } = useQuiz();
  const creator = users.find(user => user.id === quiz.createdBy);
  
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric' 
    });
  };

  return (
    <Card className="quiz-card overflow-hidden hover:shadow-lg transition-all">
      <CardHeader className="pb-2">
        <CardTitle className="text-xl font-bold">{quiz.title}</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-muted-foreground text-sm mb-4">{quiz.description}</p>
        <div className="flex flex-wrap gap-3 text-xs text-muted-foreground mb-4">
          <div className="flex items-center gap-1">
            <List size={14} />
            <span>{quiz.questions.length} Questions</span>
          </div>
          <div className="flex items-center gap-1">
            <Clock size={14} />
            <span>{formatDate(quiz.createdAt)}</span>
          </div>
          <div className="flex items-center gap-1">
            <User size={14} />
            <span>{creator?.name || 'Unknown User'}</span>
          </div>
        </div>
      </CardContent>
      <CardFooter className="pt-0">
        <Link to={`/quiz/${quiz.id}`} className="w-full">
          <Button variant="default" className="w-full bg-quiz-primary hover:bg-quiz-secondary">
            Take Quiz
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </Link>
      </CardFooter>
    </Card>
  );
};

export default QuizCard;
