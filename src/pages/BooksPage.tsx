
import React, { useState } from 'react';
import { useLibrary } from '@/contexts/LibraryContext';
import { Link } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { StarIcon, Search } from 'lucide-react';
import { AspectRatio } from '@/components/ui/aspect-ratio';

const BooksPage: React.FC = () => {
  const { books, searchBooks } = useLibrary();
  const [searchQuery, setSearchQuery] = useState('');
  
  const filteredBooks = searchQuery ? searchBooks(searchQuery) : books;

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
        <h1 className="text-3xl font-serif font-bold mb-2">Library Books</h1>
        <p className="text-gray-600 dark:text-gray-400">
          Browse our collection of books across various genres
        </p>
      </div>
      
      {/* Search with improved styling */}
      <div className="relative max-w-md">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
        <Input
          placeholder="Search by title, author, or keywords"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pl-10"
        />
      </div>
      
      {/* Responsive Book Grid with consistent card heights */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
        {filteredBooks.map((book) => (
          <Card key={book.id} className="overflow-hidden flex flex-col h-full">
            <Link to={`/books/${book.id}`} className="block">
              <AspectRatio ratio={2/3} className="bg-muted">
                <img 
                  src={getBookCoverByMetadata(book)}
                  alt={`Cover of ${book.title}`} 
                  className="w-full h-full object-cover transition-transform hover:scale-105"
                />
              </AspectRatio>
            </Link>
            <CardContent className="p-4 flex flex-col flex-grow">
              <Link to={`/books/${book.id}`} className="hover:underline">
                <h3 className="font-medium mb-1 line-clamp-2 min-h-[2.5rem]">{book.title}</h3>
              </Link>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">{book.author}</p>
              <div className="flex items-center mb-2">
                <div className="flex items-center">
                  <StarIcon className="h-4 w-4 text-yellow-500 mr-1" fill="currentColor" />
                  <span className="text-sm font-medium">{book.averageRating.toFixed(1)}</span>
                </div>
                <span className="text-xs text-gray-500 dark:text-gray-400 ml-1">
                  ({book.totalRatings} {book.totalRatings === 1 ? 'review' : 'reviews'})
                </span>
              </div>
              <p className="text-xs text-gray-500 dark:text-gray-400 mb-auto">
                {book.availableCopies}/{book.totalCopies} copies available
              </p>
              <Button size="sm" className="w-full mt-4" asChild>
                <Link to={`/books/${book.id}`}>View Details</Link>
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default BooksPage;
