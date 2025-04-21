import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X, LogIn, LogOut } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useToast } from '@/components/ui/use-toast';

export const Navbar = () => {
  const { user, signOut } = useAuth();
  const { toast } = useToast();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleSignOut = async () => {
    try {
      await signOut();
      toast({
        title: "Logged out",
        description: "You have been successfully logged out.",
      });
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  return (
    <nav className="sticky top-0 z-50 w-full bg-white/90 backdrop-blur-md shadow-sm border-b">
      <div className="container flex items-center justify-between py-4">
        <Link to="/" className="flex items-center space-x-2">
          <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-quiz-primary to-quiz-secondary flex items-center justify-center">
            <span className="text-white font-bold text-xl">Q</span>
          </div>
          <span className="text-2xl font-bold gradient-text">QuizMaster</span>
        </Link>

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
          {user ? (
            <div className="flex items-center space-x-3">
              <Avatar>
                <AvatarImage src={user.user_metadata.avatar_url} alt={user.user_metadata.username} />
                <AvatarFallback>{user.user_metadata.username?.substring(0, 2)}</AvatarFallback>
              </Avatar>
              <Button variant="ghost" onClick={handleSignOut}>
                <LogOut className="mr-2 h-4 w-4" />
                Sign Out
              </Button>
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

        <div className="md:hidden flex items-center">
          <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="p-2">
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

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
              {user ? (
                <div className="flex items-center space-x-3 p-2">
                  <Avatar>
                    <AvatarImage src={user.user_metadata.avatar_url} alt={user.user_metadata.username} />
                    <AvatarFallback>{user.user_metadata.username?.substring(0, 2)}</AvatarFallback>
                  </Avatar>
                  <span>{user.user_metadata.username}</span>
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
