
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { SidebarProvider } from "@/components/ui/sidebar";
import { AuthProvider } from "@/contexts/AuthContext";
import { LibraryProvider } from "@/contexts/LibraryContext";

// Pages
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import DashboardPage from "./pages/DashboardPage";
import BooksPage from "./pages/BooksPage";
import BookDetailPage from "./pages/BookDetailPage";
import MyBooksPage from "./pages/MyBooksPage";
import ProfilePage from "./pages/ProfilePage";
import FeedbackPage from "./pages/FeedbackPage";

// Layouts
import Layout from "./components/layout/Layout";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <LibraryProvider>
        <TooltipProvider>
          <SidebarProvider>
            <Toaster />
            <Sonner />
            <BrowserRouter>
              <Routes>
                {/* Public routes */}
                <Route path="/" element={<Index />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/register" element={<RegisterPage />} />
                
                {/* Protected routes */}
                <Route element={<Layout requireAuth={true} />}>
                  <Route path="/dashboard" element={<DashboardPage />} />
                  <Route path="/books" element={<BooksPage />} />
                  <Route path="/books/:id" element={<BookDetailPage />} />
                  <Route path="/my-books" element={<MyBooksPage />} />
                  <Route path="/profile" element={<ProfilePage />} />
                  <Route path="/feedback" element={<FeedbackPage />} />
                </Route>
                
                {/* Catch-all route */}
                <Route path="*" element={<NotFound />} />
              </Routes>
            </BrowserRouter>
          </SidebarProvider>
        </TooltipProvider>
      </LibraryProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
