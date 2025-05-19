
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';
import { BookOpen, User, MessageSquare, Library, GraduationCap, Clock, Calendar, BookCheck, ChevronRight, Star, Award } from 'lucide-react';

const Index = () => {
  const { isAuthenticated } = useAuth();

  return (
    <div className="min-h-screen w-full flex flex-col font-montserrat">
      {/* Hero Section - Enhanced with elegant color scheme */}
      <section className="relative bg-gradient-to-r from-elegant-darkpurple to-elegant-purple py-20 md:py-28">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8bGlicmFyeXxlbnwwfHwwfHx8MA%3D%3D')] bg-cover bg-center opacity-10"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-playfair font-bold text-white leading-tight mb-6 animate-fade-in">
              Welcome to <span className="text-elegant-gold">The Reading Orbital</span>
            </h1>
            <p className="text-xl text-white/90 mb-8 animate-slide-in">
              Discover a universe of knowledge in our comprehensive library management system. 
              Access thousands of books, track your reading journey, and connect with a 
              community of book lovers.
            </p>
            <div className="flex flex-wrap gap-4 animate-slide-in" style={{ animationDelay: '0.2s' }}>
              {isAuthenticated ? (
                <Button size="lg" className="bg-elegant-gold hover:bg-elegant-gold/90 text-elegant-darkpurple" asChild>
                  <Link to="/dashboard">Go to Dashboard</Link>
                </Button>
              ) : (
                <>
                  <Button size="lg" className="bg-elegant-gold hover:bg-elegant-gold/90 text-elegant-darkpurple" asChild>
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

      {/* Statistics Section - Updated with elegant styling */}
      <section className="py-12 bg-elegant-cream dark:bg-gray-800">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            <div className="p-4">
              <div className="text-3xl font-playfair font-bold text-elegant-purple dark:text-elegant-lightpurple mb-1">10,000+</div>
              <div className="text-elegant-darkpurple dark:text-gray-300">Books Available</div>
            </div>
            <div className="p-4">
              <div className="text-3xl font-playfair font-bold text-elegant-purple dark:text-elegant-lightpurple mb-1">5,000+</div>
              <div className="text-elegant-darkpurple dark:text-gray-300">Active Users</div>
            </div>
            <div className="p-4">
              <div className="text-3xl font-playfair font-bold text-elegant-purple dark:text-elegant-lightpurple mb-1">200+</div>
              <div className="text-elegant-darkpurple dark:text-gray-300">Daily Checkouts</div>
            </div>
            <div className="p-4">
              <div className="text-3xl font-playfair font-bold text-elegant-purple dark:text-elegant-lightpurple mb-1">24/7</div>
              <div className="text-elegant-darkpurple dark:text-gray-300">Digital Access</div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section - Enhanced with elegant styling */}
      <section className="py-16 bg-white dark:bg-gray-900">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-playfair font-bold text-center mb-4 text-elegant-darkpurple">
            Discover The Reading Orbital Experience
          </h2>
          <p className="text-center text-gray-600 dark:text-gray-400 max-w-2xl mx-auto mb-12">
            Our library management system offers a comprehensive suite of tools designed to enhance your reading experience.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-elegant-cream dark:bg-gray-800 p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow text-center flex flex-col items-center">
              <div className="bg-elegant-purple/10 dark:bg-elegant-purple/30 p-4 rounded-full mb-4">
                <BookOpen className="h-8 w-8 text-elegant-purple dark:text-elegant-lightpurple" />
              </div>
              <h3 className="text-xl font-playfair font-medium mb-3 text-elegant-darkpurple">Extensive Collection</h3>
              <p className="text-gray-600 dark:text-gray-400">
                Access thousands of books across multiple genres and categories, 
                with detailed information and availability tracking.
              </p>
            </div>
            
            <div className="bg-elegant-cream dark:bg-gray-800 p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow text-center flex flex-col items-center">
              <div className="bg-elegant-purple/10 dark:bg-elegant-purple/30 p-4 rounded-full mb-4">
                <User className="h-8 w-8 text-elegant-purple dark:text-elegant-lightpurple" />
              </div>
              <h3 className="text-xl font-playfair font-medium mb-3 text-elegant-darkpurple">Personalized Dashboard</h3>
              <p className="text-gray-600 dark:text-gray-400">
                Track your borrowed books, reading time, and preferences 
                with a customized user experience for students, faculty, and administrators.
              </p>
            </div>
            
            <div className="bg-elegant-cream dark:bg-gray-800 p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow text-center flex flex-col items-center">
              <div className="bg-elegant-purple/10 dark:bg-elegant-purple/30 p-4 rounded-full mb-4">
                <MessageSquare className="h-8 w-8 text-elegant-purple dark:text-elegant-lightpurple" />
              </div>
              <h3 className="text-xl font-playfair font-medium mb-3 text-elegant-darkpurple">Help & Support</h3>
              <p className="text-gray-600 dark:text-gray-400">
                Get assistance with your library-related questions and support
                for all your reading needs from our dedicated team.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section - Updated with elegant styling */}
      <section className="py-16 bg-elegant-cream/50 dark:bg-gray-800">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-playfair font-bold text-center mb-4 text-elegant-darkpurple">
            Our Services
          </h2>
          <p className="text-center text-gray-600 dark:text-gray-400 max-w-2xl mx-auto mb-12">
            The Reading Orbital offers a variety of services to meet all your literary needs.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="flex flex-col items-center p-4">
              <div className="bg-elegant-purple/10 dark:bg-elegant-purple/30 p-3 rounded-full mb-3">
                <Library className="h-6 w-6 text-elegant-purple dark:text-elegant-lightpurple" />
              </div>
              <h3 className="text-lg font-playfair font-medium mb-1 text-elegant-darkpurple">Book Borrowing</h3>
              <p className="text-sm text-center text-gray-500 dark:text-gray-400">Borrow physical and digital books</p>
            </div>
            
            <div className="flex flex-col items-center p-4">
              <div className="bg-elegant-purple/10 dark:bg-elegant-purple/30 p-3 rounded-full mb-3">
                <Clock className="h-6 w-6 text-elegant-purple dark:text-elegant-lightpurple" />
              </div>
              <h3 className="text-lg font-playfair font-medium mb-1 text-elegant-darkpurple">Reading Tracking</h3>
              <p className="text-sm text-center text-gray-500 dark:text-gray-400">Track your reading time and habits</p>
            </div>
            
            <div className="flex flex-col items-center p-4">
              <div className="bg-elegant-purple/10 dark:bg-elegant-purple/30 p-3 rounded-full mb-3">
                <Calendar className="h-6 w-6 text-elegant-purple dark:text-elegant-lightpurple" />
              </div>
              <h3 className="text-lg font-playfair font-medium mb-1 text-elegant-darkpurple">Event Calendar</h3>
              <p className="text-sm text-center text-gray-500 dark:text-gray-400">Literary events and book clubs</p>
            </div>
            
            <div className="flex flex-col items-center p-4">
              <div className="bg-elegant-purple/10 dark:bg-elegant-purple/30 p-3 rounded-full mb-3">
                <GraduationCap className="h-6 w-6 text-elegant-purple dark:text-elegant-lightpurple" />
              </div>
              <h3 className="text-lg font-playfair font-medium mb-1 text-elegant-darkpurple">Learning Resources</h3>
              <p className="text-sm text-center text-gray-500 dark:text-gray-400">Educational materials and guides</p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section - New */}
      <section className="py-16 bg-white dark:bg-gray-900">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-playfair font-bold text-center mb-4 text-elegant-darkpurple">
            What Our Users Say
          </h2>
          <p className="text-center text-gray-600 dark:text-gray-400 max-w-2xl mx-auto mb-12">
            Hear from our community of readers and library enthusiasts.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-elegant-cream dark:bg-gray-800 p-6 rounded-lg shadow">
              <div className="flex items-center mb-4">
                <div className="flex">
                  <Star className="h-5 w-5 text-elegant-gold" />
                  <Star className="h-5 w-5 text-elegant-gold" />
                  <Star className="h-5 w-5 text-elegant-gold" />
                  <Star className="h-5 w-5 text-elegant-gold" />
                  <Star className="h-5 w-5 text-elegant-gold" />
                </div>
              </div>
              <p className="italic text-gray-600 dark:text-gray-400 mb-4">
                "The Reading Orbital has transformed how our university manages its library resources. 
                The intuitive interface makes it easy for students to find and check out books."
              </p>
              <div className="font-medium text-elegant-darkpurple">Dr. Sarah Johnson</div>
              <div className="text-sm text-gray-500">University Librarian</div>
            </div>
            
            <div className="bg-elegant-cream dark:bg-gray-800 p-6 rounded-lg shadow">
              <div className="flex items-center mb-4">
                <div className="flex">
                  <Star className="h-5 w-5 text-elegant-gold" />
                  <Star className="h-5 w-5 text-elegant-gold" />
                  <Star className="h-5 w-5 text-elegant-gold" />
                  <Star className="h-5 w-5 text-elegant-gold" />
                  <Star className="h-5 w-5 text-elegant-gold" />
                </div>
              </div>
              <p className="italic text-gray-600 dark:text-gray-400 mb-4">
                "As a student, I love how I can track my reading history and get recommendations 
                based on my interests. The Reading Orbital has made me read more!"
              </p>
              <div className="font-medium text-elegant-darkpurple">Michael Chen</div>
              <div className="text-sm text-gray-500">Graduate Student</div>
            </div>
            
            <div className="bg-elegant-cream dark:bg-gray-800 p-6 rounded-lg shadow">
              <div className="flex items-center mb-4">
                <div className="flex">
                  <Star className="h-5 w-5 text-elegant-gold" />
                  <Star className="h-5 w-5 text-elegant-gold" />
                  <Star className="h-5 w-5 text-elegant-gold" />
                  <Star className="h-5 w-5 text-elegant-gold" />
                  <Star className="h-5 w-5 text-elegant-gold" />
                </div>
              </div>
              <p className="italic text-gray-600 dark:text-gray-400 mb-4">
                "Managing our collection has never been easier. The administrative features 
                are robust, and the reporting tools provide valuable insights."
              </p>
              <div className="font-medium text-elegant-darkpurple">Emily Rodriguez</div>
              <div className="text-sm text-gray-500">Library Administrator</div>
            </div>
          </div>
        </div>
      </section>

      {/* Awards Section - New */}
      <section className="py-16 bg-elegant-cream/50 dark:bg-gray-800">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="md:w-1/2 mb-8 md:mb-0">
              <h2 className="text-3xl font-playfair font-bold mb-4 text-elegant-darkpurple">Award-Winning<br />Library Management</h2>
              <p className="text-gray-600 dark:text-gray-400 mb-6">
                The Reading Orbital has been recognized for excellence in library management systems, 
                winning multiple awards for user experience and technological innovation.
              </p>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <Award className="h-5 w-5 text-elegant-gold mr-2 mt-1" />
                  <span>Best Library Management System 2024</span>
                </li>
                <li className="flex items-start">
                  <Award className="h-5 w-5 text-elegant-gold mr-2 mt-1" />
                  <span>Excellence in User Experience Design</span>
                </li>
                <li className="flex items-start">
                  <Award className="h-5 w-5 text-elegant-gold mr-2 mt-1" />
                  <span>Innovation in Educational Technology</span>
                </li>
              </ul>
            </div>
            <div className="md:w-1/2">
              <div className="bg-gradient-to-br from-elegant-purple to-elegant-darkpurple p-1 rounded-lg">
                <img 
                  src="https://images.unsplash.com/photo-1507842217343-583bb7270b66?q=80&w=2080&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" 
                  alt="Books in library" 
                  className="rounded-lg w-full h-80 object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action - Enhanced with elegant styling */}
      <section className="py-16 bg-gradient-to-r from-elegant-darkpurple to-elegant-purple text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-playfair font-bold mb-6">
            Ready to Start Your Reading Journey?
          </h2>
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            Join thousands of readers who have enhanced their library experience 
            with The Reading Orbital. Registration is quick and easy.
          </p>
          {isAuthenticated ? (
            <Button size="lg" className="bg-elegant-gold text-elegant-darkpurple hover:bg-elegant-gold/90" asChild>
              <Link to="/books">Browse Books</Link>
            </Button>
          ) : (
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Button size="lg" className="bg-elegant-gold text-elegant-darkpurple hover:bg-elegant-gold/90" asChild>
                <Link to="/register">Create an Account</Link>
              </Button>
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10" asChild>
                <Link to="/login" className="flex items-center">
                  Login <ChevronRight className="ml-1 h-4 w-4" />
                </Link>
              </Button>
            </div>
          )}
        </div>
      </section>

      {/* Footer - Enhanced with elegant styling */}
      <footer className="bg-elegant-cream dark:bg-gray-900 py-12 mt-auto">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-6 md:mb-0">
              <h3 className="text-xl font-playfair font-bold flex items-center text-elegant-darkpurple">
                <BookOpen className="h-6 w-6 mr-2 text-elegant-purple" />
                The Reading Orbital
              </h3>
              <p className="text-gray-600 dark:text-gray-400 mt-2">
                Expanding minds through literature
              </p>
            </div>
            <div className="flex gap-12">
              <div>
                <h4 className="font-playfair font-medium mb-3 text-elegant-darkpurple">Quick Links</h4>
                <ul className="space-y-2">
                  <li><Link to="/books" className="text-gray-600 dark:text-gray-400 hover:text-elegant-purple">Books</Link></li>
                  <li><Link to="/activity" className="text-gray-600 dark:text-gray-400 hover:text-elegant-purple">Reading Activity</Link></li>
                  <li><Link to="/feedback" className="text-gray-600 dark:text-gray-400 hover:text-elegant-purple">Feedback</Link></li>
                </ul>
              </div>
              <div>
                <h4 className="font-playfair font-medium mb-3 text-elegant-darkpurple">Account</h4>
                <ul className="space-y-2">
                  <li><Link to="/login" className="text-gray-600 dark:text-gray-400 hover:text-elegant-purple">Login</Link></li>
                  <li><Link to="/register" className="text-gray-600 dark:text-gray-400 hover:text-elegant-purple">Register</Link></li>
                  <li><Link to="/dashboard" className="text-gray-600 dark:text-gray-400 hover:text-elegant-purple">Dashboard</Link></li>
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
