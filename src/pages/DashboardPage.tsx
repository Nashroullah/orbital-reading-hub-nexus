
import React from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useLibrary } from '@/contexts/LibraryContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { BookCopy, Clock, Calendar, FileMinus } from 'lucide-react';
import { Link } from 'react-router-dom';
import { AspectRatio } from '@/components/ui/aspect-ratio';

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

  // Helper function to get a professional cover based on the book title/author/genre
  const getBookCoverByMetadata = (book) => {
    // Mapping genres to appropriate cover styles
    if (book.title.toLowerCase().includes('javascript') || 
        book.genre.toLowerCase().includes('programming')) {
      return "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3";
    } else if (book.title.toLowerCase().includes('design') ||
              book.genre.toLowerCase().includes('design')) {
      return "https://images.unsplash.com/photo-1523726491678-bf852e717f6a?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3";
    } else if (book.genre.toLowerCase().includes('science fiction') ||
              book.title.toLowerCase().includes('future')) {
      return "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3";
    } else if (book.genre.toLowerCase().includes('business')) {
      return "https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3";
    } else if (book.genre.toLowerCase().includes('philosophy') ||
              book.title.toLowerCase().includes('think')) {
      return "https://images.unsplash.com/photo-1532012197267-da84d127e765?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3";
    } else if (book.genre.toLowerCase().includes('romance')) {
      return "https://images.unsplash.com/photo-1474552226712-ac0f0961a954?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3";
    } else if (book.genre.toLowerCase().includes('mystery')) {
      return "https://images.unsplash.com/photo-1587876931567-564ce588bfbd?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3";
    } else if (book.genre.toLowerCase().includes('fantasy')) {
      return "https://images.unsplash.com/photo-1500673922987-e212871fec22?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3";
    } else if (book.title.toLowerCase().includes('data') ||
              book.genre.toLowerCase().includes('technology')) {
      return "https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3";
    } else if (book.genre.toLowerCase().includes('history')) {
      return "https://images.unsplash.com/photo-1461360370896-922624d12aa1?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3";
    } else if (book.genre.toLowerCase().includes('adventure')) {
      return "https://images.unsplash.com/photo-1501854140801-50d01698950b?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3";
    } else if (book.genre.toLowerCase().includes('self-help')) {
      return "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3";
    } else if (book.title.toLowerCase().includes('art') ||
              book.genre.toLowerCase().includes('art')) {
      return "https://images.unsplash.com/photo-1513364776144-60967b0f800f?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3";
    } else {
      // Default cover for other genres
      return "https://images.unsplash.com/photo-1495446815901-a7297e633e8d?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3";
    }
  };

  return (
    <div className="space-y-8 max-w-7xl mx-auto px-4">
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
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
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
            <Card key={book.id} className="overflow-hidden flex flex-col h-full">
              <AspectRatio ratio={2/3} className="bg-muted">
                <img 
                  src={getBookCoverByMetadata(book)} 
                  alt={book.title} 
                  className="w-full h-full object-cover transition-transform hover:scale-105"
                />
              </AspectRatio>
              <CardContent className="p-4 flex flex-col flex-grow">
                <h3 className="font-medium mb-1 line-clamp-2 min-h-[2.5rem]">{book.title}</h3>
                <p className="text-sm text-gray-500 mb-auto">{book.author}</p>
                <Button asChild className="w-full mt-4" size="sm">
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
