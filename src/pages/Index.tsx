
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';
import { BookOpen, User, MessageSquare } from 'lucide-react';

const Index = () => {
  const { isAuthenticated } = useAuth();

  return (
    <div className="min-h-screen flex flex-col">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-purple-600 to-blue-500 py-16 md:py-24">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8bGlicmFyeXxlbnwwfHwwfHx8MA%3D%3D')] bg-cover bg-center opacity-20"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold text-white leading-tight mb-6 animate-fade-in">
              Welcome to <span className="text-purple-200">The Reading Orbital</span>
            </h1>
            <p className="text-xl text-white/90 mb-8 animate-slide-in">
              Discover a universe of knowledge in our comprehensive library management system. 
              Access thousands of books, track your reading journey, and connect with a 
              community of book lovers.
            </p>
            <div className="flex flex-wrap gap-4 animate-slide-in" style={{ animationDelay: '0.2s' }}>
              {isAuthenticated ? (
                <Button size="lg" asChild>
                  <Link to="/dashboard">Go to Dashboard</Link>
                </Button>
              ) : (
                <>
                  <Button size="lg" asChild>
                    <Link to="/register">Get Started</Link>
                  </Button>
                  <Button size="lg" variant="outline" className="bg-white/10 text-white border-white/20 hover:bg-white/20" asChild>
                    <Link to="/login">Log In</Link>
                  </Button>
                </>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-white dark:bg-gray-900">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-serif font-bold text-center mb-12">
            Discover The Reading Orbital Experience
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-gray-50 dark:bg-gray-800 p-6 rounded-lg text-center flex flex-col items-center">
              <div className="bg-primary/10 p-4 rounded-full mb-4">
                <BookOpen className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-medium mb-3">Extensive Collection</h3>
              <p className="text-gray-600 dark:text-gray-400">
                Access thousands of books across multiple genres and categories, 
                with detailed information and availability tracking.
              </p>
            </div>
            
            <div className="bg-gray-50 dark:bg-gray-800 p-6 rounded-lg text-center flex flex-col items-center">
              <div className="bg-primary/10 p-4 rounded-full mb-4">
                <User className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-medium mb-3">Personalized Dashboard</h3>
              <p className="text-gray-600 dark:text-gray-400">
                Track your borrowed books, reading time, and preferences 
                with a customized user experience for students, faculty, and administrators.
              </p>
            </div>
            
            <div className="bg-gray-50 dark:bg-gray-800 p-6 rounded-lg text-center flex flex-col items-center">
              <div className="bg-primary/10 p-4 rounded-full mb-4">
                <MessageSquare className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-medium mb-3">Help & Support</h3>
              <p className="text-gray-600 dark:text-gray-400">
                Get assistance with your library-related questions and support
                for all your reading needs from our dedicated team.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 bg-gray-50 dark:bg-gray-800">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-serif font-bold mb-6">
            Ready to Start Your Reading Journey?
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-400 mb-8 max-w-2xl mx-auto">
            Join thousands of readers who have enhanced their library experience 
            with The Reading Orbital. Registration is quick and easy.
          </p>
          {isAuthenticated ? (
            <Button size="lg" asChild>
              <Link to="/books">Browse Books</Link>
            </Button>
          ) : (
            <Button size="lg" asChild>
              <Link to="/register">Create an Account</Link>
            </Button>
          )}
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-100 dark:bg-gray-900 py-12 mt-auto">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-6 md:mb-0">
              <h3 className="text-xl font-serif font-bold flex items-center">
                <BookOpen className="h-6 w-6 mr-2 text-primary" />
                The Reading Orbital
              </h3>
              <p className="text-gray-600 dark:text-gray-400 mt-2">
                Expanding minds through literature
              </p>
            </div>
            <div className="flex gap-8">
              <div>
                <h4 className="font-medium mb-3">Quick Links</h4>
                <ul className="space-y-2">
                  <li><Link to="/books" className="text-gray-600 dark:text-gray-400 hover:text-primary">Books</Link></li>
                </ul>
              </div>
              <div>
                <h4 className="font-medium mb-3">Account</h4>
                <ul className="space-y-2">
                  <li><Link to="/login" className="text-gray-600 dark:text-gray-400 hover:text-primary">Login</Link></li>
                  <li><Link to="/register" className="text-gray-600 dark:text-gray-400 hover:text-primary">Register</Link></li>
                  <li><Link to="/dashboard" className="text-gray-600 dark:text-gray-400 hover:text-primary">Dashboard</Link></li>
                </ul>
              </div>
            </div>
          </div>
          <div className="border-t border-gray-200 dark:border-gray-800 mt-8 pt-8 text-center text-gray-500 dark:text-gray-400">
            <p>&copy; {new Date().getFullYear()} The Reading Orbital. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
