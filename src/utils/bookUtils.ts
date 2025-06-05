import { Book } from "../types/library";

// Real book cover images for popular titles with better matching
const REAL_BOOK_COVERS: Record<string, string> = {
  // Exact title matches (normalized to lowercase)
  "to kill a mockingbird": "https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1553383690i/2657.jpg",
  "1984": "https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1657781256i/61439040.jpg",
  "the great gatsby": "https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1490528560i/4671.jpg",
  "pride and prejudice": "https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1320399351i/1885.jpg",
  "brave new world": "https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1575509280i/5129.jpg",
  "the hobbit": "https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1546071216i/5907.jpg",
  "harry potter and the philosopher's stone": "https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1474154022i/3.jpg",
  "the lord of the rings": "https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1566425108i/33.jpg",
  "a brief history of time": "https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1333578746i/3869.jpg",
  "the alchemist": "https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1654371463i/18144590.jpg",
  "sapiens: a brief history of humankind": "https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1420585954i/23692271.jpg",
  "the silent patient": "https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1582398742i/40097951.jpg",
  "atomic habits": "https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1535115320i/40121378.jpg",
  "educated": "https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1506026635i/35133922.jpg",
  "the midnight library": "https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1602190253i/52578297.jpg",
  "dune": "https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1555447414i/44767458.jpg",
  "the catcher in the rye": "https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1398034300i/5107.jpg",
  "the da vinci code": "https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1579621267i/968.jpg",
  "think and grow rich": "https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1463241782i/30186948.jpg",
  "the girl on the train": "https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1574530532i/22557272.jpg",
  "thinking, fast and slow": "https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1317793965i/11468377.jpg",
  "the pragmatic programmer": "https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1401432508i/4099.jpg",
  "the art of war": "https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1453417993i/10534.jpg",
  "clean code": "https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1436202607i/3735293.jpg",
  "the design of everyday things": "https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1442460745i/840.jpg",
  "cosmos": "https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1481256651i/61663.jpg",
  "javascript: the definitive guide": "https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1328834793i/2998152.jpg",
  "the handmaid's tale": "https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1578028274i/38447.jpg",
  "where the crawdads sing": "https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1582135294i/36809135.jpg",
  "becoming": "https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1528206996i/38746485.jpg",
  "react: up & running": "https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1468096738i/26738168.jpg",
  "the seven husbands of evelyn hugo": "https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1521739808i/32620332.jpg",
  "the four agreements": "https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1440935644i/6596.jpg",
  "the kite runner": "https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1579036753i/77203.jpg",
  "python crash course": "https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1557128449i/23241059.jpg",
  "the book thief": "https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1522157426i/19063.jpg"
};

// Helper function to get a book cover based on metadata with exact title matching
export const getBookCoverByMetadata = (book: Partial<Book>): string => {
  // First, try exact title matching (case insensitive)
  if (book.title) {
    const normalizedTitle = book.title.toLowerCase().trim();
    
    // Check for exact match first
    if (REAL_BOOK_COVERS[normalizedTitle]) {
      return REAL_BOOK_COVERS[normalizedTitle];
    }
    
    // Check for partial matches - handle variations in titles
    for (const [bookKey, coverUrl] of Object.entries(REAL_BOOK_COVERS)) {
      // Check if the book title contains the key or vice versa
      if (normalizedTitle.includes(bookKey) || bookKey.includes(normalizedTitle.split(':')[0])) {
        return coverUrl;
      }
      
      // Special handling for common variations
      if (normalizedTitle.includes("python crash course") && bookKey === "python crash course") {
        return coverUrl;
      }
      if (normalizedTitle.includes("four agreements") && bookKey === "the four agreements") {
        return coverUrl;
      }
      if (normalizedTitle.includes("seven husbands") && bookKey === "the seven husbands of evelyn hugo") {
        return coverUrl;
      }
      if (normalizedTitle.includes("react: up") && bookKey === "react: up & running") {
        return coverUrl;
      }
      if (normalizedTitle.includes("girl on the train") && bookKey === "the girl on the train") {
        return coverUrl;
      }
      if (normalizedTitle.includes("silent patient") && bookKey === "the silent patient") {
        return coverUrl;
      }
      if (normalizedTitle.includes("cosmos") && bookKey === "cosmos") {
        return coverUrl;
      }
    }
  }

  // If no exact match found, use genre-based realistic book covers
  
  // Programming and Technology books
  if (book.title?.toLowerCase().includes('javascript') || 
      book.title?.toLowerCase().includes('programming') ||
      book.title?.toLowerCase().includes('code') ||
      book.title?.toLowerCase().includes('python') ||
      book.title?.toLowerCase().includes('react') ||
      (book.genre && ['programming', 'technology'].includes(book.genre.toLowerCase()))) {
    const programmingCovers = [
      "https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1436202607i/3735293.jpg",
      "https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1401432508i/4099.jpg",
      "https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1328834793i/2998152.jpg",
      "https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1557128449i/23241059.jpg",
      "https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1468096738i/26738168.jpg"
    ];
    return programmingCovers[Math.floor(Math.random() * programmingCovers.length)];
  }

  // Science Fiction
  if (book.genre && book.genre.toLowerCase().includes('science fiction')) {
    const sciFiCovers = [
      "https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1555447414i/44767458.jpg",
      "https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1657781256i/61439040.jpg",
      "https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1575509280i/5129.jpg"
    ];
    return sciFiCovers[Math.floor(Math.random() * sciFiCovers.length)];
  }

  // Fantasy books
  if (book.genre && book.genre.toLowerCase().includes('fantasy')) {
    const fantasyCovers = [
      "https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1546071216i/5907.jpg",
      "https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1566425108i/33.jpg",
      "https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1474154022i/3.jpg"
    ];
    return fantasyCovers[Math.floor(Math.random() * fantasyCovers.length)];
  }

  // Self-Help books
  if (book.genre && book.genre.toLowerCase().includes('self-help')) {
    const selfHelpCovers = [
      "https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1535115320i/40121378.jpg",
      "https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1463241782i/30186948.jpg",
      "https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1440935644i/6596.jpg"
    ];
    return selfHelpCovers[Math.floor(Math.random() * selfHelpCovers.length)];
  }

  // Thriller books
  if (book.genre && book.genre.toLowerCase().includes('thriller')) {
    const thrillerCovers = [
      "https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1582398742i/40097951.jpg",
      "https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1574530532i/22557272.jpg"
    ];
    return thrillerCovers[Math.floor(Math.random() * thrillerCovers.length)];
  }

  // Default fallback covers for other genres
  const defaultCovers = [
    "https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1553383690i/2657.jpg",
    "https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1320399351i/1885.jpg",
    "https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1490528560i/4671.jpg"
  ];
  
  return defaultCovers[Math.floor(Math.random() * defaultCovers.length)];
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
