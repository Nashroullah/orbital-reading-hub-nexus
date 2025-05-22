
import React, { createContext, useContext } from 'react';
import { useAuth } from './AuthContext';
import { LibraryContextType, Book } from '../types/library';
import { useBooks } from '@/hooks/useBooks';
import { useBorrowedBooks } from '@/hooks/useBorrowedBooks';
import { useReviews } from '@/hooks/useReviews';
import { useUserActivity } from '@/hooks/useUserActivity';
import { useFeedback } from '@/hooks/useFeedback';
import { getBooksByGenre, getPopularBooks, searchBooks } from '@/utils/bookUtils';

// Create the library context with default values
export const LibraryContext = createContext<LibraryContextType>({
  books: [],
  borrowedBooks: [],
  reviews: [],
  userActivities: [],
  feedback: [],
  getBook: () => undefined,
  borrowBook: () => {},
  returnBook: () => {},
  addReview: () => {},
  updateReview: () => {},
  deleteReview: () => {},
  getUserBorrowedBooks: () => [],
  getFineAmount: () => 0,
  getUserActivities: () => [],
  recordUserActivity: () => {},
  getPopularBooks: () => [],
  getBooksByGenre: () => [],
  searchBooks: () => [],
  addFeedback: () => {},
  updateFeedback: () => {},
  deleteFeedback: () => {},
  getFeedback: () => [],
  addBook: () => {},
  updateBook: () => {},
  deleteBook: () => {},
  clearFine: () => {},
});

// Export types
export type { Book } from '../types/library';

// Library Provider Component
export const LibraryProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Use custom hooks to manage different aspects of the library
  const { 
    books, 
    getBook, 
    addBook, 
    updateBook, 
    deleteBook, 
    setBooks 
  } = useBooks();
  
  const { 
    borrowedBooks, 
    getFineAmount, 
    borrowBook, 
    returnBook, 
    getUserBorrowedBooks, 
    clearFine 
  } = useBorrowedBooks(books, setBooks);
  
  const { 
    reviews, 
    addReview, 
    updateReview, 
    deleteReview 
  } = useReviews(books, setBooks);
  
  const { 
    userActivities, 
    getUserActivities, 
    recordUserActivity 
  } = useUserActivity();
  
  const { 
    feedback, 
    addFeedback, 
    updateFeedback, 
    deleteFeedback, 
    getFeedback 
  } = useFeedback();

  // Create our context value
  const contextValue: LibraryContextType = {
    books,
    borrowedBooks,
    reviews,
    userActivities,
    feedback,
    getBook,
    borrowBook,
    returnBook,
    addReview,
    updateReview,
    deleteReview,
    getUserBorrowedBooks,
    getFineAmount,
    getUserActivities,
    recordUserActivity,
    getPopularBooks: () => getPopularBooks(books),
    getBooksByGenre: (genre: string) => getBooksByGenre(books, genre),
    searchBooks: (query: string) => searchBooks(books, query),
    addFeedback,
    updateFeedback,
    deleteFeedback,
    getFeedback,
    addBook,
    updateBook,
    deleteBook,
    clearFine
  };

  return (
    <LibraryContext.Provider value={contextValue}>
      {children}
    </LibraryContext.Provider>
  );
};

// Custom hook for using the library context
export const useLibrary = () => useContext(LibraryContext);
