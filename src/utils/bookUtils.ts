import { Book } from "../types/library";

// Real book cover images for popular titles
const REAL_BOOK_COVERS: Record<string, string> = {
  // Science Fiction Classics
  "dune": "https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1555447414i/44767458.jpg",
  "foundation": "https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1417900846i/29579.jpg",
  "neuromancer": "https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1554437249i/22328.jpg",
  "ender's game": "https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1408303130i/375802.jpg",
  "the martian": "https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1413706054i/18007564.jpg",
  "1984": "https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1657781256i/61439040.jpg",
  "brave new world": "https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1575509280i/5129.jpg",
  
  // Fantasy Classics
  "the hobbit": "https://m.media-amazon.com/images/I/71jD4jMityL._AC_UF1000,1000_QL80_.jpg",
  "the lord of the rings": "https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1566425108i/33.jpg",
  "game of thrones": "https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1436732693i/13496.jpg",
  "harry potter": "https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1474154022i/3.jpg",
  "the name of the wind": "https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1270352123i/186074.jpg",
  
  // Programming Books
  "clean code": "https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1436202607i/3735293.jpg",
  "the pragmatic programmer": "https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1401432508i/4099.jpg",
  "design patterns": "https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1348027904i/85009.jpg",
  "javascript": "https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1328834793i/2998152.jpg",
  "you don't know js": "https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1434591042i/25662102.jpg",
  
  // Business & Self-Help
  "atomic habits": "https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1535115320i/40121378.jpg",
  "thinking fast and slow": "https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1317793965i/11468377.jpg",
  "sapiens": "https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1420585954i/23692271.jpg",
  "the lean startup": "https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1333576876i/10127019.jpg",
  "good to great": "https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1546097703i/76865.jpg",
  
  // Literature Classics
  "to kill a mockingbird": "https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1553383690i/2657.jpg",
  "pride and prejudice": "https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1320399351i/1885.jpg",
  "the great gatsby": "https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1490528560i/4671.jpg",
  "of mice and men": "https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1511302904i/890.jpg",
  
  // Mystery & Thriller
  "gone girl": "https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1554086139i/19288043.jpg",
  "the girl with the dragon tattoo": "https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1327868566i/2429135.jpg",
  "sherlock holmes": "https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1164045516i/102868.jpg",
  
  // Romance
  "the notebook": "https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1483183484i/15931.jpg",
  "outlander": "https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1529065012i/10964.jpg",
  
  // History & Biography
  "becoming": "https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1528206996i/38746485.jpg",
  "educated": "https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1506026635i/35133922.jpg",
  "steve jobs": "https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1511288482i/11084145.jpg"
};

// Helper function to get a book cover based on metadata with real book covers
export const getBookCoverByMetadata = (book: Partial<Book>): string => {
  // First, try to match exact book titles with real covers
  if (book.title) {
    const normalizedTitle = book.title.toLowerCase().trim();
    
    // Check for exact matches or partial matches
    for (const [bookKey, coverUrl] of Object.entries(REAL_BOOK_COVERS)) {
      if (normalizedTitle.includes(bookKey) || bookKey.includes(normalizedTitle)) {
        return coverUrl;
      }
    }
    
    // Check for common programming book patterns
    if (normalizedTitle.includes('javascript') && normalizedTitle.includes('definitive')) {
      return "https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1328834793i/2998152.jpg";
    }
    if (normalizedTitle.includes('react') && normalizedTitle.includes('up')) {
      return "https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1506026635i/35133922.jpg";
    }
  }

  // If no exact match found, use genre-based or author-based realistic book covers
  
  // Programming and Technology books
  if (book.title?.toLowerCase().includes('javascript') || 
      book.title?.toLowerCase().includes('programming') ||
      book.title?.toLowerCase().includes('code') ||
      (book.genre && book.genre.toLowerCase().includes('programming'))) {
    const programmingCovers = [
      "https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1436202607i/3735293.jpg", // Clean Code
      "https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1401432508i/4099.jpg", // Pragmatic Programmer
      "https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1348027904i/85009.jpg", // Design Patterns
      "https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1328834793i/2998152.jpg", // JavaScript: The Definitive Guide
      "https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1434591042i/25662102.jpg" // You Don't Know JS
    ];
    return programmingCovers[Math.floor(Math.random() * programmingCovers.length)];
  }

  // Science Fiction
  if (book.genre && (book.genre.toLowerCase().includes('science fiction') ||
      book.title?.toLowerCase().includes('future') ||
      book.title?.toLowerCase().includes('space'))) {
    const sciFiCovers = [
      "https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1555447414i/44767458.jpg", // Dune
      "https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1417900846i/29579.jpg", // Foundation
      "https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1554437249i/22328.jpg", // Neuromancer
      "https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1408303130i/375802.jpg", // Ender's Game
      "https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1657781256i/61439040.jpg" // 1984
    ];
    return sciFiCovers[Math.floor(Math.random() * sciFiCovers.length)];
  }

  // Fantasy books
  if (book.genre && book.genre.toLowerCase().includes('fantasy')) {
    const fantasyCovers = [
      "https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1546071216i/5907.jpg", // The Hobbit
      "https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1566425108i/33.jpg", // LOTR
      "https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1436732693i/13496.jpg", // Game of Thrones
      "https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1474154022i/3.jpg", // Harry Potter
      "https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1270352123i/186074.jpg" // Name of the Wind
    ];
    return fantasyCovers[Math.floor(Math.random() * fantasyCovers.length)];
  }

  // Business books
  if (book.genre && book.genre.toLowerCase().includes('business')) {
    const businessCovers = [
      "https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1333576876i/10127019.jpg", // Lean Startup
      "https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1546097703i/76865.jpg", // Good to Great
      "https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1511288482i/11084145.jpg", // Steve Jobs
      "https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1535115320i/40121378.jpg", // Atomic Habits
      "https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1317793965i/11468377.jpg" // Thinking Fast and Slow
    ];
    return businessCovers[Math.floor(Math.random() * businessCovers.length)];
  }

  // Romance books
  if (book.genre && book.genre.toLowerCase().includes('romance')) {
    const romanceCovers = [
      "https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1483183484i/15931.jpg", // The Notebook
      "https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1529065012i/10964.jpg", // Outlander
      "https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1320399351i/1885.jpg", // Pride and Prejudice
      "https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1490528560i/4671.jpg", // The Great Gatsby
      "https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1474745374i/2767052.jpg" // Me Before You
    ];
    return romanceCovers[Math.floor(Math.random() * romanceCovers.length)];
  }

  // Mystery books
  if (book.genre && book.genre.toLowerCase().includes('mystery')) {
    const mysteryCovers = [
      "https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1554086139i/19288043.jpg", // Gone Girl
      "https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1327868566i/2429135.jpg", // Girl with Dragon Tattoo
      "https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1164045516i/102868.jpg", // Sherlock Holmes
      "https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1415298607i/18693426.jpg", // Big Little Lies
      "https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1378224146i/6317.jpg" // The Maltese Falcon
    ];
    return mysteryCovers[Math.floor(Math.random() * mysteryCovers.length)];
  }

  // Philosophy books
  if (book.genre && (book.genre.toLowerCase().includes('philosophy') ||
      book.title?.toLowerCase().includes('think'))) {
    const philosophyCovers = [
      "https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1317793965i/11468377.jpg", // Thinking Fast and Slow
      "https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1420585954i/23692271.jpg", // Sapiens
      "https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1348209843i/4865.jpg", // The Republic
      "https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1320562005i/51152.jpg", // Meditations
      "https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1266963025i/6969.jpg" // The Stranger
    ];
    return philosophyCovers[Math.floor(Math.random() * philosophyCovers.length)];
  }

  // Self-help books
  if (book.genre && book.genre.toLowerCase().includes('self-help')) {
    const selfHelpCovers = [
      "https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1535115320i/40121378.jpg", // Atomic Habits
      "https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1528206996i/38746485.jpg", // Becoming
      "https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1506026635i/35133922.jpg", // Educated
      "https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1344266315i/4069.jpg", // The 7 Habits
      "https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1442726934i/4588.jpg" // The Power of Now
    ];
    return selfHelpCovers[Math.floor(Math.random() * selfHelpCovers.length)];
  }

  // History books
  if (book.genre && book.genre.toLowerCase().includes('history')) {
    const historyCovers = [
      "https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1420585954i/23692271.jpg", // Sapiens
      "https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1528206996i/38746485.jpg", // Becoming
      "https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1327144697i/1202.jpg", // A People's History
      "https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1348151864i/11107.jpg", // The Guns of August
      "https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1327738086i/1069006.jpg" // Band of Brothers
    ];
    return historyCovers[Math.floor(Math.random() * historyCovers.length)];
  }

  // Default covers for general books - using classic literature covers
  const defaultCovers = [
    "https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1553383690i/2657.jpg", // To Kill a Mockingbird
    "https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1320399351i/1885.jpg", // Pride and Prejudice
    "https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1490528560i/4671.jpg", // The Great Gatsby
    "https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1511302904i/890.jpg", // Of Mice and Men
    "https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1327144697i/1202.jpg" // A People's History
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
