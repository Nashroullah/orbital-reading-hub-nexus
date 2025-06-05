import React, { useState } from 'react';
import { useLibrary } from '@/contexts/LibraryContext';
import { Link } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { StarIcon, Search, BookOpen } from 'lucide-react';
import { AspectRatio } from '@/components/ui/aspect-ratio';
import { Badge } from '@/components/ui/badge';
import { getBookCoverByMetadata } from '@/utils/bookUtils';

const BooksPage: React.FC = () => {
  const { books, searchBooks } = useLibrary();
  const [searchQuery, setSearchQuery] = useState('');
  const [imageErrors, setImageErrors] = useState<Record<string, boolean>>({});
  
  const filteredBooks = searchQuery ? searchBooks(searchQuery) : books;

  const handleImageError = (bookId: string) => {
    setImageErrors(prev => ({
      ...prev,
      [bookId]: true
    }));
  };

  return (
    <div className="space-y-8 max-w-7xl mx-auto px-4 py-8">
      <div>
        <h1 className="text-3xl font-serif font-bold mb-2">Library Books</h1>
        <p className="text-gray-600 dark:text-gray-400">
          Browse our collection of {books.length} books across various genres
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
      
      {filteredBooks.length === 0 ? (
        <div className="text-center py-12">
          <BookOpen className="mx-auto h-12 w-12 text-gray-400 mb-4" />
          <h3 className="text-lg font-medium mb-2">No books found</h3>
          <p className="text-gray-500">Try adjusting your search criteria</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
          {filteredBooks.map((book) => {
            // Get fresh cover image
            const freshCoverImage = getBookCoverByMetadata(book);
            const displayCoverImage = freshCoverImage || book.coverImage;
            console.log(`BooksPage - "${book.title}" cover: ${displayCoverImage}`);
            
            return (
              <Card key={book.id} className="overflow-hidden flex flex-col h-full hover:shadow-lg transition-shadow">
                <Link to={`/books/${book.id}`} className="block">
                  <AspectRatio ratio={2/3} className="bg-muted">
                    <img 
                      src={imageErrors[book.id] ? "https://images.unsplash.com/photo-1495446815901-a7297e633e8d?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3" : displayCoverImage}
                      alt={`Cover of ${book.title}`} 
                      className="w-full h-full object-cover transition-transform hover:scale-105"
                      onError={() => handleImageError(book.id)}
                    />
                  </AspectRatio>
                </Link>
                <CardContent className="p-4 flex flex-col flex-grow">
                  <div className="mb-2">
                    <Badge variant="outline" className="text-xs">{book.genre}</Badge>
                  </div>
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
            );
          })}
        </div>
      )}
    </div>
  );
};

export default BooksPage;
