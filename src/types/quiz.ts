
export interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number;
}

export interface Quiz {
  id: string;
  title: string;
  description: string;
  questions: QuizQuestion[];
  createdBy: string;
  createdAt: string;
}

export interface UserScore {
  quizId: string;
  score: number;
  totalQuestions: number;
  completedAt: string;
  userId: string;
  username: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  avatar: string;
}
