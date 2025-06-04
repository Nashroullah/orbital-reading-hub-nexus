
import { useState, useEffect } from "react";
import { Book } from "../types/library";
import { getBookCoverByMetadata } from "../utils/bookUtils";
import { generateMockBooks } from "../data/mockLibraryData";
import { toast } from "@/components/ui/sonner";
import { useAuth } from "@/contexts/AuthContext";

export const useBooks = () => {
  const { user } = useAuth();
  const [books, setBooks] = useState<Book[]>([]);
  
  useEffect(() => {
    // Load books from localStorage if available
    const storedBooks = localStorage.getItem('books');
    let loadedBooks = storedBooks ? JSON.parse(storedBooks) : generateMockBooks();
    
    // Update book covers with real images
    loadedBooks = loadedBooks.map((book: Book) => ({
      ...book,
      coverImage: getBookCoverByMetadata(book)
    }));
    
    setBooks(loadedBooks);
  }, []);
  
  // Save books to localStorage when it changes
  useEffect(() => {
    localStorage.setItem('books', JSON.stringify(books));
  }, [books]);
  
  // Get book by ID
  const getBook = (id: string): Book | undefined => {
    return books.find(book => book.id === id);
  };
  
  // Add a new book
  const addBook = (bookData: Partial<Book>) => {
    if (!user || (user.role !== 'admin' && user.role !== 'faculty')) {
      toast.error("You don't have permission to add books");
      return;
    }

    if (!bookData.title || !bookData.author) {
      toast.error("Title and author are required");
      return;
    }

    // Generate a cover image based on genre, title, or author
    let coverImage = getBookCoverByMetadata(bookData);
    
    const newBook: Book = {
      id: (books.length + 1).toString(),
      title: bookData.title,
      author: bookData.author,
      coverImage: bookData.coverImage || coverImage,
      genre: bookData.genre || "Uncategorized",
      description: bookData.description || "",
      isbn: bookData.isbn || `ISBN-${Math.floor(Math.random() * 9000000000) + 1000000000}`,
      publicationYear: bookData.publicationYear || new Date().getFullYear(),
      available: true,
      totalCopies: bookData.totalCopies || 1,
      availableCopies: bookData.availableCopies || bookData.totalCopies || 1,
      averageRating: 0,
      totalRatings: 0,
    };

    setBooks([...books, newBook]);
  };
  
  // Update an existing book
  const updateBook = (bookId: string, updatedBookData: Partial<Book>) => {
    if (!user || (user.role !== 'admin' && user.role !== 'faculty')) {
      toast.error("You don't have permission to update books");
      return;
    }

    const bookIndex = books.findIndex(b => b.id === bookId);
    
    if (bookIndex === -1) {
      toast.error("Book not found");
      return;
    }

    const updatedBooks = [...books];
    updatedBooks[bookIndex] = { ...updatedBooks[bookIndex], ...updatedBookData };
    setBooks(updatedBooks);
  };
  
  // Delete a book
  const deleteBook = (bookId: string) => {
    if (!user || (user.role !== 'admin' && user.role !== 'faculty')) {
      toast.error("You don't have permission to delete books");
      return;
    }

    setBooks(books.filter(b => b.id !== bookId));
  };
  
  return {
    books,
    getBook,
    addBook,
    updateBook,
    deleteBook,
    setBooks
  };
};
