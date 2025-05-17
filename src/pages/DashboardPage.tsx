
import React from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useLibrary } from '@/contexts/LibraryContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { BookCopy, Clock, Calendar, FileMinus } from 'lucide-react';
import { Link } from 'react-router-dom';

const DashboardPage: React.FC = () => {
  const { user } = useAuth();
  const { getPopularBooks, getUserBorrowedBooks, getFineAmount } = useLibrary();

  if (!user) {
    return null; // Should be handled by the Layout component
  }

  const isAdmin = user.role === 'admin';
  const books = getPopularBooks();
  const borrowedBooks = getUserBorrowedBooks();
  const currentlyBorrowed = borrowedBooks.filter(b => !b.returnDate);
  
  // Calculate total fines
  const totalFines = borrowedBooks.reduce((sum, book) => {
    return sum + getFineAmount(book.id);
  }, 0);

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-serif font-bold mb-2">Welcome, {user.name}!</h1>
        <p className="text-gray-600 dark:text-gray-400">
          {new Date().toLocaleDateString('en-US', { 
            weekday: 'long', 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric' 
          })}
        </p>
      </div>
      
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-gray-500 dark:text-gray-400">
              Books Borrowed
            </CardTitle>
            <BookCopy className="h-5 w-5 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{currentlyBorrowed.length}</div>
            <p className="text-xs text-gray-500 dark:text-gray-400">
              {borrowedBooks.length} total checkouts
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-gray-500 dark:text-gray-400">
              Due This Week
            </CardTitle>
            <Calendar className="h-5 w-5 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">0</div>
            <p className="text-xs text-gray-500 dark:text-gray-400">
              No books due soon
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-gray-500 dark:text-gray-400">
              Total Reading Time
            </CardTitle>
            <Clock className="h-5 w-5 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">3h 30m</div>
            <p className="text-xs text-gray-500 dark:text-gray-400">
              This month
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-gray-500 dark:text-gray-400">
              Total Fines
            </CardTitle>
            <FileMinus className="h-5 w-5 text-red-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">Rs{totalFines.toFixed(2)}</div>
            <p className="text-xs text-gray-500 dark:text-gray-400">
              {totalFines > 0 ? 'Payment required' : 'No outstanding fines'}
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Book Recommendations */}
      <div>
        <h2 className="text-2xl font-serif font-semibold mb-4">Recommended Books</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
          {books.map((book) => (
            <Card key={book.id} className="overflow-hidden">
              <img 
                src={book.coverImage} 
                alt={book.title} 
                className="w-full h-56 object-cover"
              />
              <CardContent className="p-4">
                <h3 className="font-medium mb-1 line-clamp-1">{book.title}</h3>
                <p className="text-sm text-gray-500 mb-2">{book.author}</p>
                <Button asChild className="w-full mt-2" size="sm">
                  <Link to={`/books/${book.id}`}>View Details</Link>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
        <div className="flex justify-center mt-4">
          <Button variant="outline" asChild>
            <Link to="/books">Browse All Books</Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
