
import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { useLibrary } from '@/contexts/LibraryContext';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { ArrowLeft, Star, BookCopy } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { AspectRatio } from '@/components/ui/aspect-ratio';

const BookDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { getBook, borrowBook } = useLibrary();
  const { isAuthenticated } = useAuth();

  if (!id) {
    return <div>Book ID not found</div>;
  }

  const book = getBook(id);

  if (!book) {
    return (
      <div className="flex flex-col items-center justify-center py-12">
        <h2 className="text-2xl font-bold mb-4">Book Not Found</h2>
        <p className="mb-6 text-gray-600">Sorry, we couldn't find the book you're looking for.</p>
        <Button asChild>
          <Link to="/books">Browse All Books</Link>
        </Button>
      </div>
    );
  }

  const handleBorrow = () => {
    borrowBook(id);
  };

  // Helper function to get a professional cover based on the book title/author/genre
  const getBookCoverByMetadata = (book) => {
    // Mapping genres to appropriate cover styles
    if (book.title.toLowerCase().includes('javascript') || 
        book.genre.toLowerCase().includes('programming')) {
      return "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3";
    } else if (book.title.toLowerCase().includes('design') ||
              book.genre.toLowerCase().includes('design')) {
      return "https://images.unsplash.com/photo-1523726491678-bf852e717f6a?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3";
    } else if (book.genre.toLowerCase().includes('science fiction') ||
              book.title.toLowerCase().includes('future')) {
      return "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3";
    } else if (book.genre.toLowerCase().includes('business')) {
      return "https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3";
    } else if (book.genre.toLowerCase().includes('philosophy') ||
              book.title.toLowerCase().includes('think')) {
      return "https://images.unsplash.com/photo-1532012197267-da84d127e765?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3";
    } else if (book.genre.toLowerCase().includes('romance')) {
      return "https://images.unsplash.com/photo-1474552226712-ac0f0961a954?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3";
    } else if (book.genre.toLowerCase().includes('mystery')) {
      return "https://images.unsplash.com/photo-1587876931567-564ce588bfbd?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3";
    } else if (book.genre.toLowerCase().includes('fantasy')) {
      return "https://images.unsplash.com/photo-1500673922987-e212871fec22?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3";
    } else if (book.title.toLowerCase().includes('data') ||
              book.genre.toLowerCase().includes('technology')) {
      return "https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3";
    } else if (book.genre.toLowerCase().includes('history')) {
      return "https://images.unsplash.com/photo-1461360370896-922624d12aa1?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3";
    } else if (book.genre.toLowerCase().includes('adventure')) {
      return "https://images.unsplash.com/photo-1501854140801-50d01698950b?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3";
    } else if (book.genre.toLowerCase().includes('self-help')) {
      return "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3";
    } else if (book.title.toLowerCase().includes('art') ||
              book.genre.toLowerCase().includes('art')) {
      return "https://images.unsplash.com/photo-1513364776144-60967b0f800f?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3";
    } else {
      // Default cover for other genres
      return "https://images.unsplash.com/photo-1495446815901-a7297e633e8d?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3";
    }
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto px-4">
      <Link to="/books" className="flex items-center text-primary hover:underline mb-6">
        <ArrowLeft className="mr-2 h-4 w-4" />
        Back to Books
      </Link>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Book Cover */}
        <div className="md:col-span-1">
          <AspectRatio ratio={2/3} className="rounded-lg overflow-hidden shadow-lg mb-6">
            <img 
              src={getBookCoverByMetadata(book)} 
              alt={`Cover of ${book.title}`} 
              className="w-full h-full object-cover"
            />
          </AspectRatio>
          <Button 
            className="w-full mb-2" 
            onClick={handleBorrow}
            disabled={!isAuthenticated || book.availableCopies <= 0}
          >
            <BookCopy className="mr-2 h-4 w-4" />
            {book.availableCopies > 0 ? 'Borrow This Book' : 'Currently Unavailable'}
          </Button>
          {!isAuthenticated && (
            <p className="text-sm text-gray-500 text-center mt-2">
              <Link to="/login" className="text-primary hover:underline">Log in</Link> to borrow this book
            </p>
          )}
        </div>

        {/* Book Details */}
        <div className="md:col-span-2">
          <h1 className="text-3xl font-serif font-bold mb-2">{book.title}</h1>
          <p className="text-xl text-gray-600 dark:text-gray-400 mb-4">by {book.author}</p>
          
          <div className="flex flex-wrap items-center gap-2 mb-4">
            <Badge variant="outline" className="mr-2">{book.genre}</Badge>
            <div className="flex items-center">
              <div className="flex items-center">
                <Star 
                  className="h-5 w-5 text-yellow-500 mr-1" 
                  fill="currentColor"
                />
                <span className="font-medium">{book.averageRating.toFixed(1)}</span>
              </div>
              <span className="text-gray-500 dark:text-gray-400 ml-1">
                ({book.totalRatings} {book.totalRatings === 1 ? 'review' : 'reviews'})
              </span>
            </div>
          </div>
          
          <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg mb-6">
            <h3 className="font-medium mb-2">Availability</h3>
            <p>
              <span className="font-medium">{book.availableCopies}</span> of <span className="font-medium">{book.totalCopies}</span> copies available
            </p>
          </div>
          
          <div className="prose dark:prose-invert max-w-none">
            <h2 className="text-xl font-semibold mb-2">Description</h2>
            <p className="mb-6">{book.description}</p>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <h3 className="text-lg font-medium mb-2">Book Information</h3>
                <ul className="space-y-1">
                  <li><span className="font-medium">ISBN:</span> {book.isbn}</li>
                  <li><span className="font-medium">Published:</span> {book.publicationYear}</li>
                  <li><span className="font-medium">Genre:</span> {book.genre}</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookDetailPage;
