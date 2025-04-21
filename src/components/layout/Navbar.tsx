
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X, LogIn } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useQuiz } from '@/contexts/QuizContext';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

export const Navbar = () => {
  const { activeUser } = useQuiz();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 w-full bg-white/90 backdrop-blur-md shadow-sm border-b">
      <div className="container flex items-center justify-between py-4">
        <Link to="/" className="flex items-center space-x-2">
          <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-quiz-primary to-quiz-secondary flex items-center justify-center">
            <span className="text-white font-bold text-xl">Q</span>
          </div>
          <span className="text-2xl font-bold gradient-text">QuizMaster</span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-8">
          <Link to="/" className="text-foreground hover:text-quiz-primary transition-colors">
            Home
          </Link>
          <Link to="/explore" className="text-foreground hover:text-quiz-primary transition-colors">
            Explore
          </Link>
          <Link to="/create" className="text-foreground hover:text-quiz-primary transition-colors">
            Create
          </Link>
          <Link to="/leaderboard" className="text-foreground hover:text-quiz-primary transition-colors">
            Leaderboard
          </Link>
        </div>

        <div className="hidden md:flex items-center space-x-4">
          {activeUser ? (
            <div className="flex items-center space-x-3">
              <span className="text-sm text-muted-foreground">
                {activeUser.name}
              </span>
              <Avatar>
                <AvatarImage src={activeUser.avatar} alt={activeUser.name} />
                <AvatarFallback>{activeUser.name.substring(0, 2)}</AvatarFallback>
              </Avatar>
            </div>
          ) : (
            <Link to="/login">
              <Button variant="default" className="bg-quiz-primary hover:bg-quiz-secondary">
                <LogIn className="mr-2 h-4 w-4" />
                Log In
              </Button>
            </Link>
          )}
        </div>

        {/* Mobile Navigation */}
        <div className="md:hidden flex items-center">
          <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="p-2">
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 bg-white/95 backdrop-blur-md border-b shadow-md animate-fade-in z-40">
          <div className="container py-4 flex flex-col space-y-4">
            <Link 
              to="/" 
              className="block py-2 px-4 hover:bg-secondary rounded-md"
              onClick={() => setIsMenuOpen(false)}
            >
              Home
            </Link>
            <Link 
              to="/explore" 
              className="block py-2 px-4 hover:bg-secondary rounded-md"
              onClick={() => setIsMenuOpen(false)}
            >
              Explore
            </Link>
            <Link 
              to="/create" 
              className="block py-2 px-4 hover:bg-secondary rounded-md"
              onClick={() => setIsMenuOpen(false)}
            >
              Create
            </Link>
            <Link 
              to="/leaderboard" 
              className="block py-2 px-4 hover:bg-secondary rounded-md"
              onClick={() => setIsMenuOpen(false)}
            >
              Leaderboard
            </Link>
            <div className="pt-2 border-t">
              {activeUser ? (
                <div className="flex items-center space-x-3 p-2">
                  <Avatar>
                    <AvatarImage src={activeUser.avatar} alt={activeUser.name} />
                    <AvatarFallback>{activeUser.name.substring(0, 2)}</AvatarFallback>
                  </Avatar>
                  <span>{activeUser.name}</span>
                </div>
              ) : (
                <Link to="/login" onClick={() => setIsMenuOpen(false)}>
                  <Button variant="default" className="w-full bg-quiz-primary hover:bg-quiz-secondary">
                    <LogIn className="mr-2 h-4 w-4" />
                    Log In
                  </Button>
                </Link>
              )}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
