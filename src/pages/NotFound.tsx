
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
    <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900">
      <div className="text-center bg-white dark:bg-gray-800 p-8 rounded-lg shadow-lg max-w-md">
        <h1 className="text-6xl font-bold mb-4">404</h1>
        <p className="text-xl text-gray-600 dark:text-gray-400 mb-6">Oops! This page doesn't exist</p>
        <p className="text-gray-500 dark:text-gray-400 mb-6">
          The page you're looking for might have been removed, had its name changed,
          or is temporarily unavailable.
        </p>
        <div className="space-y-3">
          <Link to="/" className="block w-full bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded">
            Return to Home
          </Link>
          <Link to="/books" className="block w-full bg-purple-500 hover:bg-purple-600 text-white py-2 px-4 rounded">
            Browse Books
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
