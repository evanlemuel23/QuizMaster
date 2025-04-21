
import React, { useState } from 'react';
import { Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import Layout from '@/components/layout/Layout';
import QuizGrid from '@/components/quiz/QuizGrid';
import { useQuiz } from '@/contexts/QuizContext';
import { Quiz } from '@/types/quiz';

const Explore = () => {
  const { quizzes } = useQuiz();
  const [searchTerm, setSearchTerm] = useState('');

  // Filter quizzes based on search term
  const filteredQuizzes = quizzes.filter(quiz => 
    quiz.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    quiz.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Layout>
      <div className="container py-12">
        <div className="max-w-3xl mx-auto space-y-2 text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-bold">Explore Quizzes</h1>
          <p className="text-muted-foreground">
            Discover quizzes on various topics and test your knowledge
          </p>
        </div>

        <div className="max-w-lg mx-auto mb-10 relative">
          <Search className="absolute left-3 top-3 h-5 w-5 text-muted-foreground" />
          <Input
            placeholder="Search for quizzes..."
            className="pl-10"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <QuizGrid quizzes={filteredQuizzes} />
      </div>
    </Layout>
  );
};

export default Explore;
