
import React, { useState } from 'react';
import { useLibrary } from '@/contexts/LibraryContext';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { Search } from 'lucide-react';
import { AspectRatio } from '@/components/ui/aspect-ratio';
import { getBookCoverByMetadata } from '@/utils/bookUtils';

const SearchPage: React.FC = () => {
  const [query, setQuery] = useState('');
  const { searchBooks } = useLibrary();
  const [results, setResults] = useState(searchBooks(''));

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setResults(searchBooks(query));
  };

  return (
    <div className="space-y-8 max-w-7xl mx-auto px-4">
      <div>
        <h1 className="text-3xl font-serif font-bold mb-2">Search Books</h1>
        <p className="text-gray-600 dark:text-gray-400">
          Find books by title, author, genre or keywords
        </p>
      </div>
      
      <form onSubmit={handleSearch} className="flex gap-2 max-w-md">
        <Input
          placeholder="Search books..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="flex-1"
        />
        <Button type="submit">
          <Search className="h-4 w-4 mr-2" />
          Search
        </Button>
      </form>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
        {results.length > 0 ? (
          results.map((book) => (
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
                <p className="text-sm text-gray-500 mb-2">{book.author}</p>
                <p className="text-sm text-gray-500 mt-auto">
                  {book.availableCopies} of {book.totalCopies} available
                </p>
                <Button asChild className="w-full mt-4" size="sm">
                  <Link to={`/books/${book.id}`}>View Details</Link>
                </Button>
              </CardContent>
            </Card>
          ))
        ) : (
          <div className="col-span-full text-center py-8">
            <p className="text-gray-500 text-lg">No books found matching your query</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchPage;
