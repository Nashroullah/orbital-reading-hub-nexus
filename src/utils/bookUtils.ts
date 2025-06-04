import { Book } from "../types/library";

// Helper function to get a book cover based on metadata with more diverse and appropriate images
export const getBookCoverByMetadata = (book: Partial<Book>): string => {
  // Programming and Technology books
  if (book.title?.toLowerCase().includes('javascript') || 
      book.title?.toLowerCase().includes('programming') ||
      book.title?.toLowerCase().includes('code') ||
      (book.genre && book.genre.toLowerCase().includes('programming'))) {
    const programmingCovers = [
      "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
      "https://images.unsplash.com/photo-1516116216624-53e697fedbea?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
      "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3"
    ];
    return programmingCovers[Math.floor(Math.random() * programmingCovers.length)];
  }

  // Design books
  if (book.title?.toLowerCase().includes('design') ||
      (book.genre && book.genre.toLowerCase().includes('design'))) {
    const designCovers = [
      "https://images.unsplash.com/photo-1523726491678-bf852e717f6a?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
      "https://images.unsplash.com/photo-1581291518633-83b4ebd1d83e?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
      "https://images.unsplash.com/photo-1586953208448-b95a79798f07?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3"
    ];
    return designCovers[Math.floor(Math.random() * designCovers.length)];
  }

  // Science Fiction
  if (book.genre && (book.genre.toLowerCase().includes('science fiction') ||
      book.title?.toLowerCase().includes('future') ||
      book.title?.toLowerCase().includes('space'))) {
    const sciFiCovers = [
      "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
      "https://images.unsplash.com/photo-1446776653964-20c1d3a81b06?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
      "https://images.unsplash.com/photo-1419242902214-272b3f66ee7a?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3"
    ];
    return sciFiCovers[Math.floor(Math.random() * sciFiCovers.length)];
  }

  // Business books
  if (book.genre && book.genre.toLowerCase().includes('business')) {
    const businessCovers = [
      "https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
      "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
      "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3"
    ];
    return businessCovers[Math.floor(Math.random() * businessCovers.length)];
  }

  // Philosophy books
  if (book.genre && (book.genre.toLowerCase().includes('philosophy') ||
      book.title?.toLowerCase().includes('think'))) {
    const philosophyCovers = [
      "https://images.unsplash.com/photo-1532012197267-da84d127e765?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
      "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3"
    ];
    return philosophyCovers[Math.floor(Math.random() * philosophyCovers.length)];
  }

  // Romance books
  if (book.genre && book.genre.toLowerCase().includes('romance')) {
    const romanceCovers = [
      "https://images.unsplash.com/photo-1474552226712-ac0f0961a954?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
      "https://images.unsplash.com/photo-1518621012360-8da2a34fd87b?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
      "https://images.unsplash.com/photo-1516546453174-5e1098a4b4af?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3"
    ];
    return romanceCovers[Math.floor(Math.random() * romanceCovers.length)];
  }

  // Mystery books
  if (book.genre && book.genre.toLowerCase().includes('mystery')) {
    const mysteryCovers = [
      "https://images.unsplash.com/photo-1587876931567-564ce588bfbd?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
      "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
      "https://images.unsplash.com/photo-1574275564017-1a4da8c26f15?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3"
    ];
    return mysteryCovers[Math.floor(Math.random() * mysteryCovers.length)];
  }

  // Fantasy books
  if (book.genre && book.genre.toLowerCase().includes('fantasy')) {
    const fantasyCovers = [
      "https://images.unsplash.com/photo-1618944847828-82e943c3bdb7?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
      "https://images.unsplash.com/photo-1507400492013-162706c8c05e?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
      "https://images.unsplash.com/photo-1514539079130-25950c84af65?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3"
    ];
    return fantasyCovers[Math.floor(Math.random() * fantasyCovers.length)];
  }

  // Data/Technology books
  if (book.title?.toLowerCase().includes('data') ||
      (book.genre && book.genre.toLowerCase().includes('technology'))) {
    const techCovers = [
      "https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
      "https://images.unsplash.com/photo-1518186285589-2f7649de83e0?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
      "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3"
    ];
    return techCovers[Math.floor(Math.random() * techCovers.length)];
  }

  // History books
  if (book.genre && book.genre.toLowerCase().includes('history')) {
    const historyCovers = [
      "https://images.unsplash.com/photo-1461360370896-922624d12aa1?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
      "https://images.unsplash.com/photo-1553729459-efe14ef6055d?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
      "https://images.unsplash.com/photo-1568667256549-094345857637?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3"
    ];
    return historyCovers[Math.floor(Math.random() * historyCovers.length)];
  }

  // Psychology books
  if (book.genre && book.genre.toLowerCase().includes('psychology')) {
    const psychologyCovers = [
      "https://images.unsplash.com/photo-1576671414121-aa0c81c869e1?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
      "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
      "https://images.unsplash.com/photo-1472746041811-4fee3ee7ee80?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3"
    ];
    return psychologyCovers[Math.floor(Math.random() * psychologyCovers.length)];
  }

  // Adventure books
  if (book.genre && book.genre.toLowerCase().includes('adventure')) {
    const adventureCovers = [
      "https://images.unsplash.com/photo-1501854140801-50d01698950b?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
      "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
      "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3"
    ];
    return adventureCovers[Math.floor(Math.random() * adventureCovers.length)];
  }

  // Self-help books
  if (book.genre && book.genre.toLowerCase().includes('self-help')) {
    const selfHelpCovers = [
      "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
      "https://images.unsplash.com/photo-1483058712412-4245e9b90334?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
      "https://images.unsplash.com/photo-1512820790803-83ca734da794?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3"
    ];
    return selfHelpCovers[Math.floor(Math.random() * selfHelpCovers.length)];
  }

  // Art books
  if (book.title?.toLowerCase().includes('art') ||
      (book.genre && book.genre.toLowerCase().includes('art'))) {
    const artCovers = [
      "https://images.unsplash.com/photo-1513364776144-60967b0f800f?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
      "https://images.unsplash.com/photo-1578321272176-b7bbc0679853?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
      "https://images.unsplash.com/photo-1541961017774-22349e4a1262?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3"
    ];
    return artCovers[Math.floor(Math.random() * artCovers.length)];
  }

  // Science books
  if (book.genre && book.genre.toLowerCase().includes('science')) {
    const scienceCovers = [
      "https://images.unsplash.com/photo-1566345984367-8efca0503855?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
      "https://images.unsplash.com/photo-1532094349884-543bc11b234d?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
      "https://images.unsplash.com/photo-1628155930542-3c7a64e2c833?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3"
    ];
    return scienceCovers[Math.floor(Math.random() * scienceCovers.length)];
  }

  // Default covers for general books
  const defaultCovers = [
    "https://images.unsplash.com/photo-1495446815901-a7297e633e8d?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    "https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    "https://images.unsplash.com/photo-1512820790803-83ca734da794?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3"
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
