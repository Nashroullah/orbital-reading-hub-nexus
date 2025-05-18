
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';
import { BookOpen, User, MessageSquare, Library, GraduationCap, Clock, Calendar, BookCheck } from 'lucide-react';

const Index = () => {
  const { isAuthenticated } = useAuth();

  return (
    <div className="min-h-screen w-full flex flex-col">
      {/* Hero Section - Enhanced with richer blue gradients */}
      <section className="relative bg-gradient-to-r from-blue-800 to-blue-600 py-20 md:py-28">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8bGlicmFyeXxlbnwwfHwwfHx8MA%3D%3D')] bg-cover bg-center opacity-10"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold text-white leading-tight mb-6 animate-fade-in">
              Welcome to <span className="text-blue-200">The Reading Orbital</span>
            </h1>
            <p className="text-xl text-white/90 mb-8 animate-slide-in">
              Discover a universe of knowledge in our comprehensive library management system. 
              Access thousands of books, track your reading journey, and connect with a 
              community of book lovers.
            </p>
            <div className="flex flex-wrap gap-4 animate-slide-in" style={{ animationDelay: '0.2s' }}>
              {isAuthenticated ? (
                <Button size="lg" className="bg-blue-500 hover:bg-blue-600 text-white" asChild>
                  <Link to="/dashboard">Go to Dashboard</Link>
                </Button>
              ) : (
                <>
                  <Button size="lg" className="bg-blue-500 hover:bg-blue-600 text-white" asChild>
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

      {/* Statistics Section - New */}
      <section className="py-12 bg-blue-50 dark:bg-gray-800">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            <div className="p-4">
              <div className="text-3xl font-bold text-blue-700 dark:text-blue-400 mb-1">10,000+</div>
              <div className="text-gray-600 dark:text-gray-300">Books Available</div>
            </div>
            <div className="p-4">
              <div className="text-3xl font-bold text-blue-700 dark:text-blue-400 mb-1">5,000+</div>
              <div className="text-gray-600 dark:text-gray-300">Active Users</div>
            </div>
            <div className="p-4">
              <div className="text-3xl font-bold text-blue-700 dark:text-blue-400 mb-1">200+</div>
              <div className="text-gray-600 dark:text-gray-300">Daily Checkouts</div>
            </div>
            <div className="p-4">
              <div className="text-3xl font-bold text-blue-700 dark:text-blue-400 mb-1">24/7</div>
              <div className="text-gray-600 dark:text-gray-300">Digital Access</div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section - Enhanced with better icons and layout */}
      <section className="py-16 bg-white dark:bg-gray-900">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-serif font-bold text-center mb-4">
            Discover The Reading Orbital Experience
          </h2>
          <p className="text-center text-gray-600 dark:text-gray-400 max-w-2xl mx-auto mb-12">
            Our library management system offers a comprehensive suite of tools designed to enhance your reading experience.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-gray-50 dark:bg-gray-800 p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow text-center flex flex-col items-center">
              <div className="bg-blue-100 dark:bg-blue-900/30 p-4 rounded-full mb-4">
                <BookOpen className="h-8 w-8 text-blue-600 dark:text-blue-400" />
              </div>
              <h3 className="text-xl font-medium mb-3">Extensive Collection</h3>
              <p className="text-gray-600 dark:text-gray-400">
                Access thousands of books across multiple genres and categories, 
                with detailed information and availability tracking.
              </p>
            </div>
            
            <div className="bg-gray-50 dark:bg-gray-800 p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow text-center flex flex-col items-center">
              <div className="bg-blue-100 dark:bg-blue-900/30 p-4 rounded-full mb-4">
                <User className="h-8 w-8 text-blue-600 dark:text-blue-400" />
              </div>
              <h3 className="text-xl font-medium mb-3">Personalized Dashboard</h3>
              <p className="text-gray-600 dark:text-gray-400">
                Track your borrowed books, reading time, and preferences 
                with a customized user experience for students, faculty, and administrators.
              </p>
            </div>
            
            <div className="bg-gray-50 dark:bg-gray-800 p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow text-center flex flex-col items-center">
              <div className="bg-blue-100 dark:bg-blue-900/30 p-4 rounded-full mb-4">
                <MessageSquare className="h-8 w-8 text-blue-600 dark:text-blue-400" />
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

      {/* Services Section - New */}
      <section className="py-16 bg-gray-50 dark:bg-gray-800">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-serif font-bold text-center mb-4">
            Our Services
          </h2>
          <p className="text-center text-gray-600 dark:text-gray-400 max-w-2xl mx-auto mb-12">
            The Reading Orbital offers a variety of services to meet all your literary needs.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="flex flex-col items-center p-4">
              <div className="bg-blue-100 dark:bg-blue-900/30 p-3 rounded-full mb-3">
                <Library className="h-6 w-6 text-blue-600 dark:text-blue-400" />
              </div>
              <h3 className="text-lg font-medium mb-1">Book Borrowing</h3>
              <p className="text-sm text-center text-gray-500 dark:text-gray-400">Borrow physical and digital books</p>
            </div>
            
            <div className="flex flex-col items-center p-4">
              <div className="bg-blue-100 dark:bg-blue-900/30 p-3 rounded-full mb-3">
                <Clock className="h-6 w-6 text-blue-600 dark:text-blue-400" />
              </div>
              <h3 className="text-lg font-medium mb-1">Reading Tracking</h3>
              <p className="text-sm text-center text-gray-500 dark:text-gray-400">Track your reading time and habits</p>
            </div>
            
            <div className="flex flex-col items-center p-4">
              <div className="bg-blue-100 dark:bg-blue-900/30 p-3 rounded-full mb-3">
                <Calendar className="h-6 w-6 text-blue-600 dark:text-blue-400" />
              </div>
              <h3 className="text-lg font-medium mb-1">Event Calendar</h3>
              <p className="text-sm text-center text-gray-500 dark:text-gray-400">Literary events and book clubs</p>
            </div>
            
            <div className="flex flex-col items-center p-4">
              <div className="bg-blue-100 dark:bg-blue-900/30 p-3 rounded-full mb-3">
                <GraduationCap className="h-6 w-6 text-blue-600 dark:text-blue-400" />
              </div>
              <h3 className="text-lg font-medium mb-1">Learning Resources</h3>
              <p className="text-sm text-center text-gray-500 dark:text-gray-400">Educational materials and guides</p>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action - Enhanced with better visuals */}
      <section className="py-16 bg-gradient-to-r from-blue-700 to-blue-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-serif font-bold mb-6">
            Ready to Start Your Reading Journey?
          </h2>
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            Join thousands of readers who have enhanced their library experience 
            with The Reading Orbital. Registration is quick and easy.
          </p>
          {isAuthenticated ? (
            <Button size="lg" className="bg-white text-blue-700 hover:bg-blue-50" asChild>
              <Link to="/books">Browse Books</Link>
            </Button>
          ) : (
            <Button size="lg" className="bg-white text-blue-700 hover:bg-blue-50" asChild>
              <Link to="/register">Create an Account</Link>
            </Button>
          )}
        </div>
      </section>

      {/* Footer - Enhanced with better organization */}
      <footer className="bg-gray-100 dark:bg-gray-900 py-12 mt-auto">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-6 md:mb-0">
              <h3 className="text-xl font-serif font-bold flex items-center">
                <BookOpen className="h-6 w-6 mr-2 text-blue-600 dark:text-blue-400" />
                The Reading Orbital
              </h3>
              <p className="text-gray-600 dark:text-gray-400 mt-2">
                Expanding minds through literature
              </p>
            </div>
            <div className="flex gap-12">
              <div>
                <h4 className="font-medium mb-3">Quick Links</h4>
                <ul className="space-y-2">
                  <li><Link to="/books" className="text-gray-600 dark:text-gray-400 hover:text-blue-600">Books</Link></li>
                  <li><Link to="/activity" className="text-gray-600 dark:text-gray-400 hover:text-blue-600">Reading Activity</Link></li>
                  <li><Link to="/feedback" className="text-gray-600 dark:text-gray-400 hover:text-blue-600">Feedback</Link></li>
                </ul>
              </div>
              <div>
                <h4 className="font-medium mb-3">Account</h4>
                <ul className="space-y-2">
                  <li><Link to="/login" className="text-gray-600 dark:text-gray-400 hover:text-blue-600">Login</Link></li>
                  <li><Link to="/register" className="text-gray-600 dark:text-gray-400 hover:text-blue-600">Register</Link></li>
                  <li><Link to="/dashboard" className="text-gray-600 dark:text-gray-400 hover:text-blue-600">Dashboard</Link></li>
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
