
import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ListChecks, Trophy, Users } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Layout from '@/components/layout/Layout';
import QuizGrid from '@/components/quiz/QuizGrid';
import { useQuiz } from '@/contexts/QuizContext';

const Index = () => {
  const { quizzes } = useQuiz();
  // Get the 3 most recent quizzes
  const recentQuizzes = [...quizzes].sort((a, b) => 
    new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  ).slice(0, 3);

  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative overflow-hidden quiz-gradient-bg">
        <div className="container pt-16 pb-20 md:pt-24 md:pb-28">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              Challenge Your Knowledge with <span className="gradient-text">QuizMaster</span>
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground mb-8 md:mb-10">
              Create, share, and participate in engaging quizzes. Challenge yourself and others with various topics and compete for the top spot on the leaderboard.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/explore">
                <Button size="lg" className="bg-quiz-primary hover:bg-quiz-secondary">
                  Explore Quizzes
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Link to="/create">
                <Button size="lg" variant="outline">
                  Create Your Own
                </Button>
              </Link>
            </div>
          </div>
        </div>
        
        {/* Decorative Elements */}
        <div className="absolute -top-12 -left-12 w-40 h-40 rounded-full bg-gradient-to-br from-quiz-light to-purple-100 opacity-50 blur-3xl"></div>
        <div className="absolute -bottom-20 -right-20 w-64 h-64 rounded-full bg-gradient-to-tl from-quiz-primary/30 to-quiz-light/30 opacity-50 blur-3xl"></div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-white">
        <div className="container">
          <h2 className="text-3xl font-bold text-center mb-12">Why Choose QuizMaster?</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="flex flex-col items-center text-center p-6 rounded-xl hover:shadow-md transition-shadow">
              <div className="w-16 h-16 rounded-full bg-quiz-light/50 flex items-center justify-center mb-4">
                <ListChecks size={32} className="text-quiz-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Create Custom Quizzes</h3>
              <p className="text-muted-foreground">
                Design your own quizzes with multiple-choice questions. Share knowledge and challenge others.
              </p>
            </div>
            
            <div className="flex flex-col items-center text-center p-6 rounded-xl hover:shadow-md transition-shadow">
              <div className="w-16 h-16 rounded-full bg-quiz-light/50 flex items-center justify-center mb-4">
                <Users size={32} className="text-quiz-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Community Engagement</h3>
              <p className="text-muted-foreground">
                Join a community of knowledge enthusiasts. Take quizzes created by others and get instant feedback.
              </p>
            </div>
            
            <div className="flex flex-col items-center text-center p-6 rounded-xl hover:shadow-md transition-shadow">
              <div className="w-16 h-16 rounded-full bg-quiz-light/50 flex items-center justify-center mb-4">
                <Trophy size={32} className="text-quiz-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Track Your Progress</h3>
              <p className="text-muted-foreground">
                Monitor your quiz performance over time. Compete on leaderboards and showcase your knowledge.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Recent Quizzes Section */}
      <section className="py-16 bg-gray-50">
        <div className="container">
          <div className="flex justify-between items-center mb-10">
            <h2 className="text-3xl font-bold">Recent Quizzes</h2>
            <Link to="/explore">
              <Button variant="ghost" className="text-quiz-primary hover:text-quiz-secondary hover:bg-quiz-light/20">
                View All
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
          
          <QuizGrid quizzes={recentQuizzes} />
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-white">
        <div className="container">
          <div className="bg-gradient-to-r from-quiz-primary/10 to-quiz-light/20 rounded-2xl p-8 md:p-12 text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Ready to Test Your Knowledge?
            </h2>
            <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
              Join thousands of users who are already creating and taking quizzes on QuizMaster.
              Start your journey of knowledge today!
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/login">
                <Button size="lg" className="bg-quiz-primary hover:bg-quiz-secondary">
                  Get Started
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Link to="/explore">
                <Button size="lg" variant="outline">
                  Browse Quizzes
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Index;
