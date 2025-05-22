
import { useState, useEffect } from "react";
import { BorrowedBook, Book } from "../types/library";
import { generateMockBorrowedBooks } from "../data/mockLibraryData";
import { useAuth } from "@/contexts/AuthContext";
import { calculateFine } from "@/utils/bookUtils";
import { toast } from "@/components/ui/sonner";
import { addDays, format } from 'date-fns';

export const useBorrowedBooks = (books: Book[], updateBooks: (updatedBooks: Book[]) => void) => {
  const { user } = useAuth();
  const [borrowedBooks, setBorrowedBooks] = useState<BorrowedBook[]>([]);
  
  useEffect(() => {
    // Load borrowed books from localStorage if available
    const storedBorrowedBooks = localStorage.getItem('borrowedBooks');
    setBorrowedBooks(storedBorrowedBooks ? JSON.parse(storedBorrowedBooks) : generateMockBorrowedBooks());
  }, []);
  
  // Save data to localStorage when it changes
  useEffect(() => {
    localStorage.setItem('borrowedBooks', JSON.stringify(borrowedBooks));
  }, [borrowedBooks]);
  
  // Get fine amount for a borrowed book
  const getFineAmount = (borrowId: string): number => {
    const borrow = borrowedBooks.find(b => b.id === borrowId);
    
    if (borrow) {
      return borrow.fine || calculateFine(borrow.dueDate, borrow.returnDate);
    }
    
    return 0;
  };
  
  // Borrow a book
  const borrowBook = (bookId: string) => {
    if (!user) {
      toast.error("You need to log in to borrow books");
      return;
    }
    
    const book = books.find(b => b.id === bookId);
    
    if (!book) {
      toast.error("Book not found");
      return;
    }
    
    if (book.availableCopies <= 0) {
      toast.error("No copies available for borrowing");
      return;
    }
    
    // Check if user already has this book borrowed
    const alreadyBorrowed = borrowedBooks.some(
      b => b.bookId === bookId && b.userId === user.id && !b.returnDate
    );
    
    if (alreadyBorrowed) {
      toast.error("You have already borrowed this book");
      return;
    }
    
    // Create new borrowed book record
    const borrowDate = new Date();
    const dueDate = addDays(borrowDate, 25); // 25 days from now
    
    const newBorrowedBook: BorrowedBook = {
      id: (borrowedBooks.length + 1).toString(),
      bookId,
      userId: user.id,
      borrowDate: borrowDate.toISOString(),
      dueDate: dueDate.toISOString(),
      returnDate: null,
      fine: 0,
    };
    
    // Update book availability
    const updatedBooks = books.map(b => {
      if (b.id === bookId) {
        return {
          ...b,
          availableCopies: b.availableCopies - 1,
        };
      }
      return b;
    });
    
    setBorrowedBooks([...borrowedBooks, newBorrowedBook]);
    updateBooks(updatedBooks);
    toast.success(`You have borrowed "${book.title}". Please return by ${format(dueDate, 'PPP')}`);
  };
  
  // Return a borrowed book
  const returnBook = (borrowId: string) => {
    const borrowedBook = borrowedBooks.find(b => b.id === borrowId);
    
    if (!borrowedBook) {
      toast.error("Borrowed record not found");
      return;
    }
    
    if (borrowedBook.returnDate) {
      toast.error("This book has already been returned");
      return;
    }
    
    const returnDate = new Date();
    const fine = calculateFine(borrowedBook.dueDate, returnDate.toISOString());
    
    // Update borrowed book record
    const updatedBorrowedBooks = borrowedBooks.map(b => {
      if (b.id === borrowId) {
        return {
          ...b,
          returnDate: returnDate.toISOString(),
          fine,
        };
      }
      return b;
    });
    
    // Update book availability
    const updatedBooks = books.map(b => {
      if (b.id === borrowedBook.bookId) {
        return {
          ...b,
          availableCopies: b.availableCopies + 1,
        };
      }
      return b;
    });
    
    setBorrowedBooks(updatedBorrowedBooks);
    updateBooks(updatedBooks);
    
    const book = books.find(b => b.id === borrowedBook.bookId);
    
    if (fine > 0) {
      toast.warning(`Book returned with a fine of Rs${fine}. Please pay at the counter.`);
    } else {
      toast.success(`Thank you for returning "${book?.title}"`);
    }
  };
  
  // Get user borrowed books
  const getUserBorrowedBooks = (): BorrowedBook[] => {
    if (!user) return [];
    return borrowedBooks.filter(b => b.userId === user.id);
  };
  
  // Clear a fine
  const clearFine = (borrowId: string) => {
    if (!user || user.role !== 'admin') {
      toast.error("You don't have permission to clear fines");
      return;
    }

    const updatedBorrowedBooks = borrowedBooks.map(b => {
      if (b.id === borrowId) {
        return { ...b, fine: 0 };
      }
      return b;
    });
    
    setBorrowedBooks(updatedBorrowedBooks);
  };
  
  return {
    borrowedBooks,
    getFineAmount,
    borrowBook,
    returnBook,
    getUserBorrowedBooks,
    clearFine
  };
};
