
import { Book } from "../types/library";

// Helper function to get a book cover based on metadata
export const getBookCoverByMetadata = (book: Partial<Book>): string => {
  // Default cover
  let coverImage = "https://images.unsplash.com/photo-1495446815901-a7297e633e8d?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3";
  
  // Try to find a suitable image based on title, author, or genre
  if (book.title?.toLowerCase().includes('javascript') || 
      (book.genre && book.genre.toLowerCase().includes('programming'))) {
    coverImage = "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3";
  } else if (book.title?.toLowerCase().includes('design') ||
            (book.genre && book.genre.toLowerCase().includes('design'))) {
    coverImage = "https://images.unsplash.com/photo-1523726491678-bf852e717f6a?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3";
  } else if (book.genre && (book.genre.toLowerCase().includes('science fiction') ||
            book.title?.toLowerCase().includes('future'))) {
    coverImage = "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3";
  } else if (book.genre && book.genre.toLowerCase().includes('business')) {
    coverImage = "https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3";
  } else if (book.genre && (book.genre.toLowerCase().includes('philosophy') ||
            book.title?.toLowerCase().includes('think'))) {
    coverImage = "https://images.unsplash.com/photo-1532012197267-da84d127e765?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3";
  } else if (book.genre && book.genre.toLowerCase().includes('romance')) {
    coverImage = "https://images.unsplash.com/photo-1474552226712-ac0f0961a954?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3";
  } else if (book.genre && book.genre.toLowerCase().includes('mystery')) {
    coverImage = "https://images.unsplash.com/photo-1587876931567-564ce588bfbd?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3";
  } else if (book.genre && book.genre.toLowerCase().includes('fantasy')) {
    coverImage = "https://images.unsplash.com/photo-1618944847828-82e943c3bdb7?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3";
  } else if (book.title?.toLowerCase().includes('data') ||
            (book.genre && book.genre.toLowerCase().includes('technology'))) {
    coverImage = "https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3";
  } else if (book.genre && book.genre.toLowerCase().includes('history')) {
    coverImage = "https://images.unsplash.com/photo-1461360370896-922624d12aa1?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3";
  } else if (book.genre && book.genre.toLowerCase().includes('psychology')) {
    coverImage = "https://images.unsplash.com/photo-1576671414121-aa0c81c869e1?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3";
  } else if (book.genre && book.genre.toLowerCase().includes('adventure')) {
    coverImage = "https://images.unsplash.com/photo-1501854140801-50d01698950b?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3";
  } else if (book.genre && book.genre.toLowerCase().includes('self-help')) {
    coverImage = "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3";
  } else if (book.title?.toLowerCase().includes('art') ||
            (book.genre && book.genre.toLowerCase().includes('art'))) {
    coverImage = "https://images.unsplash.com/photo-1513364776144-60967b0f800f?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3";
  } else if (book.genre && book.genre.toLowerCase().includes('science')) {
    coverImage = "https://images.unsplash.com/photo-1566345984367-8efca0503855?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3";
  }
  
  return coverImage;
};

// Calculate fine for overdue books
export const calculateFine = (dueDate: string, returnDate: string | null): number => {
  if (!returnDate) {
    // Check if the book is overdue
    const due = new Date(dueDate);
    const today = new Date();
    if (today > due) {
      // Fine is Rs 1 per day
      const daysOverdue = Math.floor((today.getTime() - due.getTime()) / (1000 * 60 * 60 * 24));
      return daysOverdue;
    }
    return 0;
  }
  
  const due = new Date(dueDate);
  const returned = new Date(returnDate);
  
  if (returned > due) {
    // Fine is Rs 1 per day
    const daysOverdue = Math.floor((returned.getTime() - due.getTime()) / (1000 * 60 * 60 * 24));
    return daysOverdue;
  }
  
  return 0;
};

// Search books by query
export const searchBooks = (books: Book[], query: string): Book[] => {
  if (!query) return books;
  
  const normalizedQuery = query.toLowerCase();
  
  return books.filter(book => 
    book.title.toLowerCase().includes(normalizedQuery) ||
    book.author.toLowerCase().includes(normalizedQuery) ||
    book.genre.toLowerCase().includes(normalizedQuery) ||
    book.description.toLowerCase().includes(normalizedQuery) ||
    book.isbn.includes(normalizedQuery)
  );
};

// Get popular books
export const getPopularBooks = (books: Book[]): Book[] => {
  return [...books]
    .sort((a, b) => {
      // Sort by rating first
      if (b.averageRating !== a.averageRating) {
        return b.averageRating - a.averageRating;
      }
      // Then by number of ratings
      return b.totalRatings - a.totalRatings;
    })
    .slice(0, 5); // Top 5
};

// Get books by genre
export const getBooksByGenre = (books: Book[], genre: string): Book[] => {
  return books.filter(b => b.genre.toLowerCase() === genre.toLowerCase());
};
