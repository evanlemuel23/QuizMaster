
import React, { createContext, useContext, useState, ReactNode } from 'react';
import { Quiz, QuizQuestion, UserScore, User } from '../types/quiz';

// Mock data
const mockUsers: User[] = [
  {
    id: '1',
    name: 'John Doe',
    email: 'john@example.com',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?fit=crop&w=200&h=200',
  },
  {
    id: '2',
    name: 'Jane Smith',
    email: 'jane@example.com',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?fit=crop&w=200&h=200',
  },
  {
    id: '3',
    name: 'Alex Johnson',
    email: 'alex@example.com',
    avatar: 'https://images.unsplash.com/photo-1599566150163-29194dcaad36?fit=crop&w=200&h=200',
  },
];

const mockQuizzes: Quiz[] = [
  {
    id: '1',
    title: 'Web Development Basics',
    description: 'Test your knowledge of HTML, CSS, and JavaScript fundamentals',
    questions: [
      {
        id: '1-1',
        question: 'What does HTML stand for?',
        options: [
          'Hyper Text Markup Language',
          'High Tech Machine Learning',
          'Hyper Transfer Markup Language',
          'Home Tool Markup Language',
        ],
        correctAnswer: 0,
      },
      {
        id: '1-2',
        question: 'Which property is used to change the background color of an element in CSS?',
        options: [
          'color',
          'bgcolor',
          'background-color',
          'background',
        ],
        correctAnswer: 2,
      },
      {
        id: '1-3',
        question: 'Which of the following is NOT a JavaScript data type?',
        options: [
          'String',
          'Boolean',
          'Float',
          'Object',
        ],
        correctAnswer: 2,
      }
    ],
    createdBy: '1',
    createdAt: '2023-11-15T09:30:00Z',
  },
  {
    id: '2',
    title: 'General Knowledge Quiz',
    description: 'Test your knowledge about various topics around the world',
    questions: [
      {
        id: '2-1',
        question: 'Which planet is known as the Red Planet?',
        options: [
          'Venus',
          'Mars',
          'Jupiter',
          'Saturn',
        ],
        correctAnswer: 1,
      },
      {
        id: '2-2',
        question: 'Who painted the Mona Lisa?',
        options: [
          'Vincent Van Gogh',
          'Pablo Picasso',
          'Leonardo da Vinci',
          'Michelangelo',
        ],
        correctAnswer: 2,
      },
      {
        id: '2-3',
        question: 'What is the capital city of Australia?',
        options: [
          'Sydney',
          'Melbourne',
          'Perth',
          'Canberra',
        ],
        correctAnswer: 3,
      }
    ],
    createdBy: '2',
    createdAt: '2023-12-10T14:45:00Z',
  },
  {
    id: '3',
    title: 'Science Trivia',
    description: 'Challenge yourself with questions about biology, chemistry, and physics',
    questions: [
      {
        id: '3-1',
        question: 'What is the chemical symbol for gold?',
        options: [
          'Go',
          'Gd',
          'Au',
          'Ag',
        ],
        correctAnswer: 2,
      },
      {
        id: '3-2',
        question: 'Which of the following is NOT a state of matter?',
        options: [
          'Solid',
          'Liquid',
          'Gas',
          'Energy',
        ],
        correctAnswer: 3,
      },
      {
        id: '3-3',
        question: 'What is the smallest unit of life?',
        options: [
          'Cell',
          'Atom',
          'Molecule',
          'Organ',
        ],
        correctAnswer: 0,
      }
    ],
    createdBy: '3',
    createdAt: '2024-01-05T11:20:00Z',
  }
];

const mockScores: UserScore[] = [
  {
    quizId: '1',
    score: 3,
    totalQuestions: 3,
    completedAt: '2024-01-10T15:30:00Z',
    userId: '2',
    username: 'Jane Smith',
  },
  {
    quizId: '1',
    score: 2,
    totalQuestions: 3,
    completedAt: '2024-01-11T10:15:00Z',
    userId: '3',
    username: 'Alex Johnson',
  },
  {
    quizId: '2',
    score: 2,
    totalQuestions: 3,
    completedAt: '2024-02-05T14:20:00Z',
    userId: '1',
    username: 'John Doe',
  },
  {
    quizId: '3',
    score: 3,
    totalQuestions: 3,
    completedAt: '2024-02-10T09:45:00Z',
    userId: '1',
    username: 'John Doe',
  },
  {
    quizId: '3',
    score: 2,
    totalQuestions: 3,
    completedAt: '2024-02-12T16:30:00Z',
    userId: '2',
    username: 'Jane Smith',
  }
];

interface QuizContextType {
  quizzes: Quiz[];
  users: User[];
  scores: UserScore[];
  activeUser: User | null;
  setActiveUser: (user: User | null) => void;
  addQuiz: (quiz: Omit<Quiz, 'id' | 'createdAt'>) => void;
  addScore: (score: Omit<UserScore, 'completedAt' | 'username'>) => void;
  getQuizById: (id: string) => Quiz | undefined;
  getQuizzesByUser: (userId: string) => Quiz[];
  getScoresByQuiz: (quizId: string) => UserScore[];
  getScoresByUser: (userId: string) => UserScore[];
}

const QuizContext = createContext<QuizContextType | undefined>(undefined);

export const QuizProvider = ({ children }: { children: ReactNode }) => {
  const [quizzes, setQuizzes] = useState<Quiz[]>(mockQuizzes);
  const [scores, setScores] = useState<UserScore[]>(mockScores);
  const [users] = useState<User[]>(mockUsers);
  const [activeUser, setActiveUser] = useState<User | null>(null);

  const addQuiz = (quiz: Omit<Quiz, 'id' | 'createdAt'>) => {
    const newQuiz: Quiz = {
      ...quiz,
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
    };
    setQuizzes([...quizzes, newQuiz]);
  };

  const addScore = (score: Omit<UserScore, 'completedAt' | 'username'>) => {
    const user = users.find(u => u.id === score.userId);
    if (!user) return;

    const newScore: UserScore = {
      ...score,
      completedAt: new Date().toISOString(),
      username: user.name,
    };
    setScores([...scores, newScore]);
  };

  const getQuizById = (id: string) => {
    return quizzes.find(quiz => quiz.id === id);
  };

  const getQuizzesByUser = (userId: string) => {
    return quizzes.filter(quiz => quiz.createdBy === userId);
  };

  const getScoresByQuiz = (quizId: string) => {
    return scores.filter(score => score.quizId === quizId)
      .sort((a, b) => b.score - a.score);
  };

  const getScoresByUser = (userId: string) => {
    return scores.filter(score => score.userId === userId);
  };

  return (
    <QuizContext.Provider
      value={{
        quizzes,
        users,
        scores,
        activeUser,
        setActiveUser,
        addQuiz,
        addScore,
        getQuizById,
        getQuizzesByUser,
        getScoresByQuiz,
        getScoresByUser,
      }}
    >
      {children}
    </QuizContext.Provider>
  );
};

export const useQuiz = () => {
  const context = useContext(QuizContext);
  if (context === undefined) {
    throw new Error('useQuiz must be used within a QuizProvider');
  }
  return context;
};
