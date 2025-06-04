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
  "the hobbit": "data:image/jpeg;base64,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",
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
