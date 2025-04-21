
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import { QuizProvider } from "@/contexts/QuizContext";

// Pages
import Index from "./pages/Index";
import Explore from "./pages/Explore";
import QuizDetail from "./pages/QuizDetail";
import Create from "./pages/Create";
import Leaderboard from "./pages/Leaderboard";
import Login from "./pages/Login";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <QuizProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/explore" element={<Explore />} />
            <Route path="/quiz/:id" element={<QuizDetail />} />
            <Route path="/create" element={<Create />} />
            <Route path="/leaderboard" element={<Leaderboard />} />
            <Route path="/login" element={<Login />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </QuizProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
