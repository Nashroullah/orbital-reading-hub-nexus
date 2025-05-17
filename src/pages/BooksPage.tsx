
import React, { useState } from 'react';
import { useLibrary } from '@/contexts/LibraryContext';
import { Link } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { StarIcon, Search } from 'lucide-react';

const BooksPage: React.FC = () => {
  const { books, searchBooks } = useLibrary();
  const [searchQuery, setSearchQuery] = useState('');
  
  const filteredBooks = searchQuery ? searchBooks(searchQuery) : books;

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-serif font-bold mb-2">Library Books</h1>
        <p className="text-gray-600 dark:text-gray-400">
          Browse our collection of books across various genres
        </p>
      </div>
      
      {/* Search */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
        <Input
          placeholder="Search by title, author, or keywords"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pl-10 max-w-lg"
        />
      </div>
      
      {/* Book Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
        {filteredBooks.map((book) => (
          <Card key={book.id} className="overflow-hidden">
            <Link to={`/books/${book.id}`} className="block">
              <img 
                src={book.coverImage} 
                alt={`Cover of ${book.title}`} 
                className="w-full h-56 object-cover"
              />
            </Link>
            <CardContent className="p-4">
              <Link to={`/books/${book.id}`} className="hover:underline">
                <h3 className="font-medium mb-1 line-clamp-2">{book.title}</h3>
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
              <p className="text-xs text-gray-500 dark:text-gray-400 mb-2">
                {book.availableCopies}/{book.totalCopies} copies available
              </p>
              <Button size="sm" className="w-full" asChild>
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
