
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Plus, Trash2, Save } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/components/ui/use-toast';
import { QuizQuestion, Quiz } from '@/types/quiz';
import { useQuiz } from '@/contexts/QuizContext';

export const CreateQuizForm = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { activeUser, addQuiz } = useQuiz();
  
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [questions, setQuestions] = useState<Partial<QuizQuestion>[]>([
    {
      id: `temp-${Date.now()}`,
      question: '',
      options: ['', '', '', ''],
      correctAnswer: 0
    }
  ]);

  const handleQuestionChange = (index: number, field: keyof QuizQuestion, value: string | number | string[]) => {
    const updatedQuestions = [...questions];
    updatedQuestions[index] = {
      ...updatedQuestions[index],
      [field]: value
    };
    setQuestions(updatedQuestions);
  };

  const handleOptionChange = (questionIndex: number, optionIndex: number, value: string) => {
    const updatedQuestions = [...questions];
    const currentOptions = [...(updatedQuestions[questionIndex].options || [])];
    currentOptions[optionIndex] = value;
    updatedQuestions[questionIndex] = {
      ...updatedQuestions[questionIndex],
      options: currentOptions
    };
    setQuestions(updatedQuestions);
  };

  const addQuestion = () => {
    setQuestions([
      ...questions,
      {
        id: `temp-${Date.now()}-${questions.length}`,
        question: '',
        options: ['', '', '', ''],
        correctAnswer: 0
      }
    ]);
  };

  const removeQuestion = (index: number) => {
    if (questions.length === 1) {
      toast({
        title: "Cannot remove",
        description: "A quiz must have at least one question.",
        variant: "destructive"
      });
      return;
    }
    const updatedQuestions = [...questions];
    updatedQuestions.splice(index, 1);
    setQuestions(updatedQuestions);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Validation
    if (!title.trim()) {
      toast({
        title: "Title required",
        description: "Please provide a title for your quiz.",
        variant: "destructive"
      });
      return;
    }

    if (!description.trim()) {
      toast({
        title: "Description required",
        description: "Please provide a description for your quiz.",
        variant: "destructive"
      });
      return;
    }

    const incompleteQuestion = questions.find(q => 
      !q.question?.trim() || 
      !q.options?.every(option => option.trim()) ||
      q.correctAnswer === undefined
    );

    if (incompleteQuestion) {
      toast({
        title: "Incomplete questions",
        description: "Please complete all questions and options.",
        variant: "destructive"
      });
      return;
    }

    if (!activeUser) {
      toast({
        title: "Login required",
        description: "Please log in to create a quiz.",
        variant: "destructive"
      });
      navigate('/login');
      return;
    }

    // Create quiz
    try {
      addQuiz({
        title,
        description,
        questions: questions as QuizQuestion[],
        createdBy: activeUser.id
      });

      toast({
        title: "Quiz created",
        description: "Your quiz has been created successfully.",
      });

      navigate('/');
    } catch (error) {
      toast({
        title: "Error creating quiz",
        description: "There was an error creating your quiz. Please try again.",
        variant: "destructive"
      });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      <div className="space-y-4">
        <h2 className="text-2xl font-bold">Quiz Details</h2>
        <div className="space-y-2">
          <label htmlFor="title" className="text-sm font-medium">
            Quiz Title
          </label>
          <Input
            id="title"
            value={title}
            onChange={e => setTitle(e.target.value)}
            placeholder="e.g., Web Development Basics"
            className="w-full"
          />
        </div>

        <div className="space-y-2">
          <label htmlFor="description" className="text-sm font-medium">
            Quiz Description
          </label>
          <Textarea
            id="description"
            value={description}
            onChange={e => setDescription(e.target.value)}
            placeholder="Provide a brief description of your quiz..."
            className="w-full"
            rows={3}
          />
        </div>
      </div>

      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold">Questions</h2>
          <Button
            type="button"
            onClick={addQuestion}
            variant="outline"
            className="flex items-center gap-2"
          >
            <Plus size={16} />
            Add Question
          </Button>
        </div>

        {questions.map((question, questionIndex) => (
          <div
            key={question.id}
            className="border rounded-lg p-4 md:p-6 space-y-4 quiz-card"
          >
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold">Question {questionIndex + 1}</h3>
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={() => removeQuestion(questionIndex)}
                className="text-red-500 hover:text-red-700 hover:bg-red-50"
              >
                <Trash2 size={16} />
              </Button>
            </div>

            <div className="space-y-2">
              <label htmlFor={`question-${questionIndex}`} className="text-sm font-medium">
                Question Text
              </label>
              <Input
                id={`question-${questionIndex}`}
                value={question.question || ''}
                onChange={e => handleQuestionChange(questionIndex, 'question', e.target.value)}
                placeholder="e.g., What is HTML?"
                className="w-full"
              />
            </div>

            <div className="space-y-4">
              <label className="text-sm font-medium">Options</label>
              {question.options?.map((option, optionIndex) => (
                <div key={optionIndex} className="flex items-center gap-3">
                  <div className="flex-none">
                    <input
                      type="radio"
                      name={`correct-${question.id}`}
                      id={`option-${question.id}-${optionIndex}`}
                      checked={question.correctAnswer === optionIndex}
                      onChange={() => handleQuestionChange(questionIndex, 'correctAnswer', optionIndex)}
                      className="h-4 w-4 text-quiz-primary focus:ring-quiz-primary"
                    />
                  </div>
                  <label
                    htmlFor={`option-${question.id}-${optionIndex}`}
                    className="flex-none text-sm font-medium w-20"
                  >
                    {optionIndex === question.correctAnswer ? 'Correct' : 'Option'} {optionIndex + 1}
                  </label>
                  <Input
                    value={option}
                    onChange={e => handleOptionChange(questionIndex, optionIndex, e.target.value)}
                    placeholder={`Option ${optionIndex + 1}`}
                    className="w-full"
                  />
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="pt-4 border-t">
        <Button type="submit" className="w-full md:w-auto bg-quiz-primary hover:bg-quiz-secondary">
          <Save className="mr-2 h-4 w-4" />
          Save Quiz
        </Button>
      </div>
    </form>
  );
};

export default CreateQuizForm;
