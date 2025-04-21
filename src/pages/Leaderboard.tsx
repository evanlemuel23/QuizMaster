
import React, { useState } from 'react';
import { Search } from 'lucide-react';
import Layout from '@/components/layout/Layout';
import { Input } from '@/components/ui/input';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { useQuiz } from '@/contexts/QuizContext';
import { UserScore } from '@/types/quiz';

const Leaderboard = () => {
  const { scores, quizzes } = useQuiz();
  const [searchTerm, setSearchTerm] = useState('');

  // Group scores by user, calculate total score and completion count
  const userStats = scores.reduce<Record<string, { 
    userId: string, 
    username: string, 
    totalScore: number, 
    totalQuestions: number, 
    quizzesTaken: number 
  }>>((acc, score) => {
    if (!acc[score.userId]) {
      acc[score.userId] = {
        userId: score.userId,
        username: score.username,
        totalScore: 0,
        totalQuestions: 0,
        quizzesTaken: 0
      };
    }
    
    acc[score.userId].totalScore += score.score;
    acc[score.userId].totalQuestions += score.totalQuestions;
    acc[score.userId].quizzesTaken += 1;
    
    return acc;
  }, {});

  // Convert to array and sort by percentage
  const leaderboardData = Object.values(userStats)
    .map(user => ({
      ...user,
      percentage: (user.totalScore / user.totalQuestions) * 100
    }))
    .sort((a, b) => b.percentage - a.percentage || b.totalScore - a.totalScore);

  // Filter by search term
  const filteredLeaderboard = leaderboardData.filter(user =>
    user.username.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Layout>
      <div className="container py-12">
        <div className="max-w-3xl mx-auto space-y-2 text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-bold">Leaderboard</h1>
          <p className="text-muted-foreground">
            See who's leading the pack in quiz performance
          </p>
        </div>

        <div className="max-w-lg mx-auto mb-8 relative">
          <Search className="absolute left-3 top-3 h-5 w-5 text-muted-foreground" />
          <Input
            placeholder="Search users..."
            className="pl-10"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-sm border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-12 text-center">Rank</TableHead>
                <TableHead>User</TableHead>
                <TableHead className="text-center">Quizzes Taken</TableHead>
                <TableHead className="text-center">Score</TableHead>
                <TableHead className="text-center">Percentage</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredLeaderboard.length > 0 ? (
                filteredLeaderboard.map((user, index) => (
                  <TableRow key={user.userId} className={index < 3 ? "bg-quiz-light/20" : ""}>
                    <TableCell className="text-center font-medium">
                      {index + 1}
                    </TableCell>
                    <TableCell className="font-medium">{user.username}</TableCell>
                    <TableCell className="text-center">{user.quizzesTaken}</TableCell>
                    <TableCell className="text-center">
                      {user.totalScore} / {user.totalQuestions}
                    </TableCell>
                    <TableCell className="text-center">
                      {user.percentage.toFixed(1)}%
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={5} className="text-center py-8">
                    No users found matching your search.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </div>
    </Layout>
  );
};

export default Leaderboard;
