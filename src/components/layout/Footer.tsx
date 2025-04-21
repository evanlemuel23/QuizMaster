
import React from 'react';
import { Link } from 'react-router-dom';

export const Footer = () => {
  return (
    <footer className="w-full bg-white border-t mt-auto">
      <div className="container py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 rounded-md bg-gradient-to-br from-quiz-primary to-quiz-secondary flex items-center justify-center">
                <span className="text-white font-bold text-sm">Q</span>
              </div>
              <span className="text-xl font-bold gradient-text">QuizMaster</span>
            </div>
            <p className="text-sm text-muted-foreground">
              Create, share, and participate in engaging quizzes. Challenge your knowledge and compete with others.
            </p>
          </div>

          <div>
            <h3 className="font-semibold text-lg mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-sm text-muted-foreground hover:text-quiz-primary transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/explore" className="text-sm text-muted-foreground hover:text-quiz-primary transition-colors">
                  Explore Quizzes
                </Link>
              </li>
              <li>
                <Link to="/create" className="text-sm text-muted-foreground hover:text-quiz-primary transition-colors">
                  Create Quiz
                </Link>
              </li>
              <li>
                <Link to="/leaderboard" className="text-sm text-muted-foreground hover:text-quiz-primary transition-colors">
                  Leaderboard
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-lg mb-4">Contact</h3>
            <ul className="space-y-2">
              <li className="text-sm text-muted-foreground">
                <span>Email: support@quizmaster.com</span>
              </li>
              <li className="text-sm text-muted-foreground">
                <span>Phone: +1 (555) 123-4567</span>
              </li>
              <li className="text-sm text-muted-foreground">
                <span>123 Quiz Street, Knowledge City</span>
              </li>
            </ul>
          </div>
        </div>
        <div className="border-t mt-8 pt-6 flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} QuizMaster. All rights reserved.
          </p>
          <div className="mt-4 md:mt-0 flex space-x-4">
            <Link to="/terms" className="text-sm text-muted-foreground hover:text-quiz-primary transition-colors">
              Terms of Service
            </Link>
            <Link to="/privacy" className="text-sm text-muted-foreground hover:text-quiz-primary transition-colors">
              Privacy Policy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
