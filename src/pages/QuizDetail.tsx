
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Loader2, Check, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import Layout from '@/components/layout/Layout';
import QuizQuestion from '@/components/quiz/QuizQuestion';
import { useQuiz } from '@/contexts/QuizContext';
import { useToast } from '@/components/ui/use-toast';

const QuizDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();
  const { getQuizById, activeUser, addScore } = useQuiz();
  
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<number[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [score, setScore] = useState(0);
  
  const quiz = getQuizById(id || '');
  
  useEffect(() => {
    if (!quiz) {
      toast({
        title: "Quiz not found",
        description: "The quiz you're looking for doesn't exist.",
        variant: "destructive"
      });
      navigate('/explore');
    }
  }, [quiz, navigate, toast]);
  
  if (!quiz) {
    return (
      <Layout>
        <div className="container py-12 flex justify-center items-center">
          <Loader2 className="h-10 w-10 animate-spin text-quiz-primary" />
        </div>
      </Layout>
    );
  }
  
  const currentQuestion = quiz.questions[currentQuestionIndex];
  const progress = ((currentQuestionIndex + 1) / quiz.questions.length) * 100;
  
  const handleAnswer = (selectedOption: number) => {
    const newAnswers = [...answers];
    newAnswers[currentQuestionIndex] = selectedOption;
    setAnswers(newAnswers);
  };
  
  const handleNext = () => {
    if (currentQuestionIndex < quiz.questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  };
  
  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };
  
  const handleSubmit = () => {
    // Check if all questions have been answered
    if (answers.length < quiz.questions.length) {
      const unansweredQuestions = quiz.questions.length - answers.length;
      toast({
        title: "Incomplete quiz",
        description: `You have ${unansweredQuestions} unanswered ${
          unansweredQuestions === 1 ? 'question' : 'questions'
        }.`,
        variant: "destructive"
      });
      return;
    }
    
    setIsSubmitting(true);
    
    // Calculate score
    let correctAnswers = 0;
    quiz.questions.forEach((question, index) => {
      if (answers[index] === question.correctAnswer) {
        correctAnswers++;
      }
    });
    
    // Save score
    if (activeUser) {
      addScore({
        quizId: quiz.id,
        score: correctAnswers,
        totalQuestions: quiz.questions.length,
        userId: activeUser.id
      });
    }
    
    setScore(correctAnswers);
    setShowResults(true);
    setIsSubmitting(false);
  };
  
  const handleRetry = () => {
    setAnswers([]);
    setCurrentQuestionIndex(0);
    setShowResults(false);
  };
  
  return (
    <Layout>
      <div className="container py-8">
        <Button
          variant="ghost"
          className="mb-6"
          onClick={() => navigate('/explore')}
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Quizzes
        </Button>
        
        <div className="max-w-3xl mx-auto">
          <h1 className="text-3xl font-bold mb-2">{quiz.title}</h1>
          <p className="text-muted-foreground mb-6">{quiz.description}</p>
          
          {!showResults ? (
            <>
              <div className="mb-6">
                <div className="flex justify-between text-sm mb-2">
                  <span>Question {currentQuestionIndex + 1} of {quiz.questions.length}</span>
                  <span>{Math.round(progress)}% Complete</span>
                </div>
                <Progress value={progress} className="h-2" />
              </div>
              
              <QuizQuestion
                question={currentQuestion}
                onAnswer={handleAnswer}
                showResults={false}
                selectedOption={answers[currentQuestionIndex]}
              />
              
              <div className="flex justify-between mt-8">
                <Button
                  variant="outline"
                  onClick={handlePrevious}
                  disabled={currentQuestionIndex === 0}
                >
                  Previous
                </Button>
                
                <div className="flex gap-3">
                  {currentQuestionIndex === quiz.questions.length - 1 ? (
                    <Button
                      onClick={handleSubmit}
                      disabled={isSubmitting}
                      className="bg-quiz-primary hover:bg-quiz-secondary"
                    >
                      {isSubmitting ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Submitting...
                        </>
                      ) : (
                        <>Submit Quiz</>
                      )}
                    </Button>
                  ) : (
                    <Button
                      onClick={handleNext}
                      disabled={answers[currentQuestionIndex] === undefined}
                    >
                      Next
                    </Button>
                  )}
                </div>
              </div>
            </>
          ) : (
            <div className="space-y-8">
              <div className="bg-white rounded-xl p-8 text-center border shadow-sm">
                <div className="mb-6">
                  {score / quiz.questions.length >= 0.7 ? (
                    <div className="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-4">
                      <Check className="h-10 w-10 text-green-600" />
                    </div>
                  ) : (
                    <div className="w-20 h-20 rounded-full bg-amber-100 flex items-center justify-center mx-auto mb-4">
                      <AlertCircle className="h-10 w-10 text-amber-600" />
                    </div>
                  )}
                  <h2 className="text-2xl font-bold mb-2">Quiz Results</h2>
                  <p className="text-muted-foreground">You scored:</p>
                  <div className="text-4xl font-bold my-4">
                    {score} / {quiz.questions.length}
                  </div>
                  <p className="text-muted-foreground">
                    {score / quiz.questions.length >= 0.7
                      ? "Great job! You've passed the quiz."
                      : "Keep practicing! You'll do better next time."}
                  </p>
                </div>
                
                <div className="flex flex-col sm:flex-row gap-3 justify-center">
                  <Button onClick={handleRetry} variant="outline">
                    Retry Quiz
                  </Button>
                  <Button
                    onClick={() => navigate('/explore')}
                    className="bg-quiz-primary hover:bg-quiz-secondary"
                  >
                    Explore More Quizzes
                  </Button>
                </div>
              </div>
              
              <h3 className="text-xl font-bold mt-8 mb-4">Review Your Answers</h3>
              {quiz.questions.map((question, index) => (
                <QuizQuestion
                  key={question.id}
                  question={question}
                  onAnswer={() => {}}
                  showResults={true}
                  selectedOption={answers[index]}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default QuizDetail;
