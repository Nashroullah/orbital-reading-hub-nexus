
import { Link, useLocation } from "react-router-dom";
import { useEffect } from "react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-elegant-cream dark:from-gray-900 dark:to-elegant-darkpurple/30">
      <div className="text-center bg-white/90 dark:bg-gray-800/90 p-8 rounded-lg shadow-lg max-w-md backdrop-blur-sm border border-elegant-lightpurple/20">
        <h1 className="text-7xl font-bold mb-4 text-elegant-darkpurple dark:text-elegant-lightpurple font-playfair">404</h1>
        <p className="text-xl text-gray-700 dark:text-gray-300 mb-6 font-montserrat">Oops! This page doesn't exist</p>
        <p className="text-gray-600 dark:text-gray-400 mb-8 font-montserrat">
          The page you're looking for might have been removed, had its name changed,
          or is temporarily unavailable.
        </p>
        <div className="space-y-4">
          <Link to="/" className="block w-full bg-elegant-purple hover:bg-elegant-darkpurple text-white py-3 px-4 rounded-md transition-all duration-300 shadow-md font-montserrat">
            Return to Home
          </Link>
          <Link to="/books" className="block w-full bg-elegant-gold hover:bg-elegant-gold/90 text-elegant-darkpurple py-3 px-4 rounded-md transition-all duration-300 shadow-md font-montserrat">
            Browse Books
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
