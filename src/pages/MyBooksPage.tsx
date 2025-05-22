
import React from 'react';
import { useLibrary } from '@/contexts/LibraryContext';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { BookOpen } from 'lucide-react';
import { format, parseISO } from 'date-fns';
import { AspectRatio } from '@/components/ui/aspect-ratio';
import { getBookCoverByMetadata } from '@/utils/bookUtils';

const MyBooksPage: React.FC = () => {
  const { getUserBorrowedBooks, getBook, returnBook } = useLibrary();
  const { user } = useAuth();
  
  const borrowedBooks = getUserBorrowedBooks();
  const currentlyBorrowed = borrowedBooks.filter(b => !b.returnDate);
  const borrowingHistory = borrowedBooks.filter(b => b.returnDate);

  return (
    <div className="space-y-8 max-w-7xl mx-auto px-4">
      <div>
        <h1 className="text-3xl font-serif font-bold mb-2">My Books</h1>
        <p className="text-gray-600 dark:text-gray-400">
          Manage your borrowed books and view your borrowing history
        </p>
      </div>
      
      {/* Currently Borrowed Books */}
      <div>
        <h2 className="text-2xl font-serif font-semibold mb-4">Currently Borrowed</h2>
        
        {currentlyBorrowed.length === 0 ? (
          <Card>
            <CardContent className="pt-6">
              <div className="text-center py-8">
                <BookOpen className="mx-auto h-12 w-12 text-gray-400 mb-4" />
                <h3 className="text-lg font-medium mb-2">No books currently borrowed</h3>
                <p className="text-gray-500 dark:text-gray-400 mb-6">
                  Browse our collection and find your next great read!
                </p>
                <Button asChild>
                  <a href="/books">Browse Books</a>
                </Button>
              </div>
            </CardContent>
          </Card>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {currentlyBorrowed.map(borrowed => {
              const book = getBook(borrowed.bookId);
              if (!book) return null;
              
              return (
                <Card key={borrowed.id} className="overflow-hidden">
                  <div className="flex h-full">
                    <div className="w-1/3">
                      <AspectRatio ratio={2/3} className="h-full">
                        <img 
                          src={getBookCoverByMetadata(book)} 
                          alt={`Cover of ${book.title}`} 
                          className="h-full w-full object-cover"
                        />
                      </AspectRatio>
                    </div>
                    <div className="w-2/3 flex flex-col p-4">
                      <div>
                        <h3 className="font-medium mb-1 line-clamp-2">
                          <a href={`/books/${book.id}`} className="hover:text-primary">
                            {book.title}
                          </a>
                        </h3>
                        <p className="text-sm text-gray-500 dark:text-gray-400">{book.author}</p>
                      </div>
                      
                      <div className="mt-2 text-sm space-y-1">
                        <div className="flex justify-between">
                          <span>Borrowed:</span>
                          <span>{format(parseISO(borrowed.borrowDate), 'MMM d, yyyy')}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Due Date:</span>
                          <span>{format(parseISO(borrowed.dueDate), 'MMM d, yyyy')}</span>
                        </div>
                      </div>
                      
                      <Button 
                        className="mt-4"
                        onClick={() => returnBook(borrowed.id)}
                      >
                        Return Book
                      </Button>
                    </div>
                  </div>
                </Card>
              );
            })}
          </div>
        )}
      </div>
      
      {/* Borrowing History */}
      <div>
        <h2 className="text-2xl font-serif font-semibold mb-4">Borrowing History</h2>
        
        {borrowingHistory.length === 0 ? (
          <Card>
            <CardContent className="pt-6">
              <div className="text-center py-8 text-gray-500">
                <p>You haven't returned any books yet.</p>
              </div>
            </CardContent>
          </Card>
        ) : (
          <Card>
            <CardContent className="pt-6 overflow-auto">
              <table className="w-full min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                <thead>
                  <tr>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      Book
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      Borrowed Date
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      Return Date
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                  {borrowingHistory.map((borrow) => {
                    const book = getBook(borrow.bookId);
                    if (!book) return null;
                    
                    return (
                      <tr key={borrow.id}>
                        <td className="px-4 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <div className="h-10 w-10 flex-shrink-0">
                              <img 
                                src={getBookCoverByMetadata(book)} 
                                alt={`Cover of ${book.title}`}
                                className="h-10 w-10 rounded-sm object-cover"
                              />
                            </div>
                            <div className="ml-4">
                              <div className="font-medium">
                                <a href={`/books/${book.id}`} className="hover:text-primary">
                                  {book.title}
                                </a>
                              </div>
                              <div className="text-sm text-gray-500 dark:text-gray-400">
                                {book.author}
                              </div>
                            </div>
                          </div>
                        </td>
                        <td className="px-4 py-4 whitespace-nowrap text-sm">
                          {format(parseISO(borrow.borrowDate), 'MMM d, yyyy')}
                        </td>
                        <td className="px-4 py-4 whitespace-nowrap text-sm">
                          {borrow.returnDate ? format(parseISO(borrow.returnDate), 'MMM d, yyyy') : '-'}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default MyBooksPage;
