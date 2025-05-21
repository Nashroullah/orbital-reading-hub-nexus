
import React, { createContext, useState, useContext, useEffect } from 'react';
import { useAuth } from './AuthContext';
import { toast } from "@/components/ui/sonner";
import { addDays, format, parseISO, isAfter } from 'date-fns';

export interface Book {
  id: string;
  title: string;
  author: string;
  coverImage: string;
  genre: string;
  description: string;
  isbn: string;
  publicationYear: number;
  available: boolean;
  totalCopies: number;
  availableCopies: number;
  averageRating: number;
  totalRatings: number;
}

export interface BookReview {
  id: string;
  bookId: string;
  userId: string;
  userName: string;
  rating: number;
  comment: string;
  date: string;
}

export interface BorrowedBook {
  id: string;
  bookId: string;
  userId: string;
  borrowDate: string;
  dueDate: string;
  returnDate: string | null;
  fine: number;
}

export interface UserActivity {
  date: string;
  timeSpent: number; // minutes
  userId: string;
}

export interface Feedback {
  id: string;
  userId: string;
  userName: string;
  rating: number;
  comment: string;
  date: string;
}

interface LibraryContextType {
  books: Book[];
  borrowedBooks: BorrowedBook[];
  reviews: BookReview[];
  userActivities: UserActivity[];
  feedback: Feedback[];
  getBook: (id: string) => Book | undefined;
  borrowBook: (bookId: string) => void;
  returnBook: (borrowId: string) => void;
  addReview: (bookId: string, rating: number, comment: string) => void;
  updateReview: (reviewId: string, rating: number, comment: string) => void;
  deleteReview: (reviewId: string) => void;
  getUserBorrowedBooks: () => BorrowedBook[];
  getFineAmount: (borrowId: string) => number;
  getUserActivities: () => UserActivity[];
  recordUserActivity: (minutes: number) => void;
  getPopularBooks: () => Book[];
  getBooksByGenre: (genre: string) => Book[];
  searchBooks: (query: string) => Book[];
  addFeedback: (rating: number, comment: string) => void;
  updateFeedback: (feedbackId: string, rating: number, comment: string) => void;
  deleteFeedback: (feedbackId: string) => void;
  getFeedback: () => Feedback[];
  // New methods for admin functionality
  addBook: (book: Partial<Book>) => void;
  updateBook: (bookId: string, updatedBook: Partial<Book>) => void;
  deleteBook: (bookId: string) => void;
  clearFine: (borrowId: string) => void;
}

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
  // New methods for admin functionality
  addBook: () => {},
  updateBook: () => {},
  deleteBook: () => {},
  clearFine: () => {},
});

// Mock data - Books
const generateMockBooks = (): Book[] => [
  {
    id: '1',
    title: 'To Kill a Mockingbird',
    author: 'Harper Lee',
    coverImage: 'https://images.unsplash.com/photo-1603162617002-f880f561cee5?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
    genre: 'Fiction',
    description: 'The unforgettable novel of a childhood in a sleepy Southern town and the crisis of conscience that rocked it.',
    isbn: '978-0061120084',
    publicationYear: 1960,
    available: true,
    totalCopies: 10,
    availableCopies: 8,
    averageRating: 4.8,
    totalRatings: 128
  },
  {
    id: '2',
    title: '1984',
    author: 'George Orwell',
    coverImage: 'https://images.unsplash.com/photo-1617575521317-d2974f3b56d2?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
    genre: 'Science Fiction',
    description: 'A chilling vision of a dystopian future that remains relevant today. Required reading for understanding modern surveillance.',
    isbn: '978-0451524935',
    publicationYear: 1949,
    available: true,
    totalCopies: 15,
    availableCopies: 12,
    averageRating: 4.7,
    totalRatings: 145
  },
  {
    id: '3',
    title: 'The Great Gatsby',
    author: 'F. Scott Fitzgerald',
    coverImage: 'https://images.unsplash.com/photo-1541963463532-d68292c34b19?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
    genre: 'Fiction',
    description: 'A tragic story about the American dream, love, wealth, and excess.',
    isbn: '978-0743273565',
    publicationYear: 1925,
    available: true,
    totalCopies: 8,
    availableCopies: 6,
    averageRating: 4.5,
    totalRatings: 110
  },
  {
    id: '4',
    title: 'Pride and Prejudice',
    author: 'Jane Austen',
    coverImage: 'https://images.unsplash.com/photo-1589829085413-56de8ae18c73?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
    genre: 'Romance',
    description: 'A romantic novel of manners that depicts the emotional development of the protagonist, Elizabeth Bennet.',
    isbn: '978-0141439518',
    publicationYear: 1813,
    available: true,
    totalCopies: 10,
    availableCopies: 7,
    averageRating: 4.6,
    totalRatings: 120
  },
  {
    id: '5',
    title: 'Brave New World',
    author: 'Aldous Huxley',
    coverImage: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
    genre: 'Science Fiction',
    description: 'A dystopian novel set in a futuristic World State, inhabited by genetically modified citizens.',
    isbn: '978-0060850524',
    publicationYear: 1932,
    available: true,
    totalCopies: 12,
    availableCopies: 9,
    averageRating: 4.4,
    totalRatings: 95
  },
  {
    id: '6',
    title: 'The Hobbit',
    author: 'J.R.R. Tolkien',
    coverImage: 'https://images.unsplash.com/photo-1622052803775-71be04d1937b?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
    genre: 'Fantasy',
    description: 'A fantasy novel about the quest of home-loving Bilbo Baggins to win a share of the treasure guarded by Smaug the dragon.',
    isbn: '978-0547928227',
    publicationYear: 1937,
    available: true,
    totalCopies: 20,
    availableCopies: 15,
    averageRating: 4.9,
    totalRatings: 200
  },
  {
    id: '7',
    title: 'Harry Potter and the Philosopher\'s Stone',
    author: 'J.K. Rowling',
    coverImage: 'https://images.unsplash.com/photo-1556244573-c3686c0f0e78?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
    genre: 'Fantasy',
    description: 'The first novel in the Harry Potter series, featuring a young wizard who discovers his magical heritage.',
    isbn: '978-0747532699',
    publicationYear: 1997,
    available: true,
    totalCopies: 25,
    availableCopies: 18,
    averageRating: 4.8,
    totalRatings: 220
  },
  {
    id: '8',
    title: 'The Lord of the Rings',
    author: 'J.R.R. Tolkien',
    coverImage: 'https://images.unsplash.com/photo-1516796181074-bf453fbfa3e6?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
    genre: 'Fantasy',
    description: 'An epic high fantasy novel that follows the quest to destroy the One Ring, which was created by the Dark Lord Sauron.',
    isbn: '978-0618640157',
    publicationYear: 1954,
    available: true,
    totalCopies: 15,
    availableCopies: 10,
    averageRating: 4.9,
    totalRatings: 180
  },
  {
    id: '9',
    title: 'A Brief History of Time',
    author: 'Stephen Hawking',
    coverImage: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
    genre: 'Science',
    description: 'A landmark volume in science writing that explores the nature of the universe and our place within it.',
    isbn: '978-0553380163',
    publicationYear: 1988,
    available: true,
    totalCopies: 8,
    availableCopies: 6,
    averageRating: 4.5,
    totalRatings: 95
  },
  {
    id: '10',
    title: 'The Alchemist',
    author: 'Paulo Coelho',
    coverImage: 'https://images.unsplash.com/photo-1543002588-bfa74002ed7e?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
    genre: 'Fiction',
    description: 'A philosophical novel that follows the journey of a young Andalusian shepherd named Santiago in his quest for treasure.',
    isbn: '978-0062315007',
    publicationYear: 1988,
    available: true,
    totalCopies: 12,
    availableCopies: 9,
    averageRating: 4.7,
    totalRatings: 150
  },
  {
    id: '11',
    title: 'Sapiens: A Brief History of Humankind',
    author: 'Yuval Noah Harari',
    coverImage: 'https://images.unsplash.com/photo-1575286368486-a08c9b436c03?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
    genre: 'History',
    description: 'A book that explores the history and impact of Homo sapiens across the planet, from ancient times to the present.',
    isbn: '978-0062316097',
    publicationYear: 2011,
    available: true,
    totalCopies: 15,
    availableCopies: 11,
    averageRating: 4.6,
    totalRatings: 185
  },
  {
    id: '12',
    title: 'The Silent Patient',
    author: 'Alex Michaelides',
    coverImage: 'https://images.unsplash.com/photo-1614332125861-ff04ae6a62df?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
    genre: 'Thriller',
    description: 'A psychological thriller about a woman who shoots her husband and then stops speaking, and the therapist determined to treat her.',
    isbn: '978-1250301697',
    publicationYear: 2019,
    available: true,
    totalCopies: 10,
    availableCopies: 8,
    averageRating: 4.5,
    totalRatings: 110
  },
  {
    id: '13',
    title: 'Atomic Habits',
    author: 'James Clear',
    coverImage: 'https://images.unsplash.com/photo-1499750310107-5fef28a66643?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
    genre: 'Self-Help',
    description: 'A guide about how tiny changes can lead to remarkable results in forming good habits and breaking bad ones.',
    isbn: '978-0735211292',
    publicationYear: 2018,
    available: true,
    totalCopies: 18,
    availableCopies: 14,
    averageRating: 4.8,
    totalRatings: 200
  },
  {
    id: '14',
    title: 'Educated',
    author: 'Tara Westover',
    coverImage: 'https://images.unsplash.com/photo-1491841550275-ad7854e35ca6?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
    genre: 'Memoir',
    description: 'A memoir about a young girl who leaves her survivalist family and goes on to earn a PhD from Cambridge University.',
    isbn: '978-0399590504',
    publicationYear: 2018,
    available: true,
    totalCopies: 12,
    availableCopies: 9,
    averageRating: 4.7,
    totalRatings: 170
  },
  {
    id: '15',
    title: 'The Midnight Library',
    author: 'Matt Haig',
    coverImage: 'https://images.unsplash.com/photo-1507842217343-583bb7270b66?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
    genre: 'Fiction',
    description: 'A novel about a library beyond the edge of the universe that contains books with alternate versions of your life.',
    isbn: '978-0525559474',
    publicationYear: 2020,
    available: true,
    totalCopies: 15,
    availableCopies: 12,
    averageRating: 4.5,
    totalRatings: 145
  },
  {
    id: '16',
    title: 'Dune',
    author: 'Frank Herbert',
    coverImage: 'https://images.unsplash.com/photo-1589152645948-1640ade48101?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
    genre: 'Science Fiction',
    description: 'A science fiction novel set in the distant future amidst a feudal interstellar society where noble houses control individual planets.',
    isbn: '978-0441172719',
    publicationYear: 1965,
    available: true,
    totalCopies: 20,
    availableCopies: 16,
    averageRating: 4.7,
    totalRatings: 210
  },
  {
    id: '17',
    title: 'The Catcher in the Rye',
    author: 'J.D. Salinger',
    coverImage: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
    genre: 'Fiction',
    description: 'A classic novel about a teenager\'s experiences of alienation and his search for authenticity in the "phony" adult world.',
    isbn: '978-0316769488',
    publicationYear: 1951,
    available: true,
    totalCopies: 14,
    availableCopies: 11,
    averageRating: 4.2,
    totalRatings: 130
  },
  {
    id: '18',
    title: 'The Da Vinci Code',
    author: 'Dan Brown',
    coverImage: 'https://images.unsplash.com/photo-1587876931567-564ce588bfbd?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
    genre: 'Mystery',
    description: 'A mystery thriller that follows symbologist Robert Langdon as he investigates a murder in Paris\'s Louvre Museum.',
    isbn: '978-0307474278',
    publicationYear: 2003,
    available: true,
    totalCopies: 19,
    availableCopies: 14,
    averageRating: 4.1,
    totalRatings: 190
  },
  {
    id: '19',
    title: 'Think and Grow Rich',
    author: 'Napoleon Hill',
    coverImage: 'https://images.unsplash.com/photo-1553729784-e91953dec042?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
    genre: 'Self-Help',
    description: 'One of the best-selling books of all time, examining the psychological power of thought and the role it plays in success.',
    isbn: '978-1585424337',
    publicationYear: 1937,
    available: true,
    totalCopies: 15,
    availableCopies: 12,
    averageRating: 4.7,
    totalRatings: 165
  },
  {
    id: '20',
    title: 'The Girl on the Train',
    author: 'Paula Hawkins',
    coverImage: 'https://images.unsplash.com/photo-1614332287897-cdc485fa562d?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
    genre: 'Thriller',
    description: 'A psychological thriller about a divorced alcoholic who becomes entangled in a missing person investigation.',
    isbn: '978-1594634024',
    publicationYear: 2015,
    available: true,
    totalCopies: 12,
    availableCopies: 9,
    averageRating: 4.0,
    totalRatings: 130
  },
  {
    id: '21',
    title: 'Thinking, Fast and Slow',
    author: 'Daniel Kahneman',
    coverImage: 'https://images.unsplash.com/photo-1532012197267-da84d127e765?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
    genre: 'Psychology',
    description: 'A book that summarizes research on the two systems that drive the way we think: System 1, which is fast, intuitive, and emotional; and System 2, which is slower, more deliberative, and more logical.',
    isbn: '978-0374533557',
    publicationYear: 2011,
    available: true,
    totalCopies: 13,
    availableCopies: 9,
    averageRating: 4.6,
    totalRatings: 155
  },
  // Adding new books with proper cover images
  {
    id: '22',
    title: 'The Pragmatic Programmer',
    author: 'Andrew Hunt & David Thomas',
    coverImage: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
    genre: 'Technology',
    description: 'A guide to software craftsmanship that offers pragmatic advice on improving the development process in practical, manageable ways.',
    isbn: '978-0201616224',
    publicationYear: 1999,
    available: true,
    totalCopies: 10,
    availableCopies: 7,
    averageRating: 4.7,
    totalRatings: 135
  },
  {
    id: '23',
    title: 'The Art of War',
    author: 'Sun Tzu',
    coverImage: 'https://images.unsplash.com/photo-1581089778245-3ce67677f718?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
    genre: 'Philosophy',
    description: 'An ancient Chinese military treatise dating from the 5th century BC, attributed to the ancient Chinese military strategist Sun Tzu.',
    isbn: '978-1590302255',
    publicationYear: -500,
    available: true,
    totalCopies: 15,
    availableCopies: 12,
    averageRating: 4.5,
    totalRatings: 180
  },
  {
    id: '24',
    title: 'Clean Code',
    author: 'Robert C. Martin',
    coverImage: 'https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
    genre: 'Technology',
    description: 'A handbook of agile software craftsmanship that helps programmers create more maintainable code.',
    isbn: '978-0132350884',
    publicationYear: 2008,
    available: true,
    totalCopies: 12,
    availableCopies: 9,
    averageRating: 4.8,
    totalRatings: 160
  },
  {
    id: '25',
    title: 'The Design of Everyday Things',
    author: 'Don Norman',
    coverImage: 'https://images.unsplash.com/photo-1523726491678-bf852e717f6a?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
    genre: 'Design',
    description: 'A powerful primer on how and why some products satisfy customers while others only frustrate them.',
    isbn: '978-0465050659',
    publicationYear: 1988,
    available: true,
    totalCopies: 8,
    availableCopies: 6,
    averageRating: 4.6,
    totalRatings: 120
  },
  {
    id: '26',
    title: 'Cosmos',
    author: 'Carl Sagan',
    coverImage: 'https://images.unsplash.com/photo-1566345984367-8efca0503855?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
    genre: 'Science',
    description: 'A book that explores the mutual development of science and civilization, tracing the evolution of human knowledge from the ancient world to modern science.',
    isbn: '978-0345539434',
    publicationYear: 1980,
    available: true,
    totalCopies: 10,
    availableCopies: 8,
    averageRating: 4.9,
    totalRatings: 190
  }
];

// Mock reviews
const generateMockReviews = (): BookReview[] => [
  {
    id: '1',
    bookId: '1',
    userId: '3',
    userName: 'Student User',
    rating: 5,
    comment: 'A timeless classic that everyone should read. The characters are so well-developed and the story is powerful.',
    date: '2023-04-15T10:30:00Z'
  },
  {
    id: '2',
    bookId: '2',
    userId: '2',
    userName: 'Faculty Member',
    rating: 4,
    comment: 'A chilling vision of a dystopian future that remains relevant today. Required reading for understanding modern surveillance.',
    date: '2023-05-20T14:45:00Z'
  },
  {
    id: '3',
    bookId: '6',
    userId: '3',
    userName: 'Student User',
    rating: 5,
    comment: 'An amazing adventure that transports you to another world. Tolkien\'s world-building is unmatched.',
    date: '2023-06-10T09:15:00Z'
  }
];

// Mock borrowed books
const generateMockBorrowedBooks = (): BorrowedBook[] => [
  {
    id: '1',
    bookId: '1',
    userId: '3',
    borrowDate: '2023-04-01T10:00:00Z',
    dueDate: '2023-04-26T10:00:00Z',
    returnDate: '2023-04-20T14:30:00Z',
    fine: 0
  },
  {
    id: '2',
    bookId: '6',
    userId: '3',
    borrowDate: '2023-05-05T11:30:00Z',
    dueDate: '2023-05-30T11:30:00Z',
    returnDate: null,
    fine: 0
  }
];

// Mock user activities
const generateMockUserActivities = (): UserActivity[] => [
  {
    date: '2023-04-01',
    timeSpent: 120, // 2 hours
    userId: '3'
  },
  {
    date: '2023-04-02',
    timeSpent: 90, // 1.5 hours
    userId: '3'
  }
];

// Mock feedback
const generateMockFeedback = (): Feedback[] => [
  {
    id: '1',
    userId: '2',
    userName: 'Faculty Member',
    rating: 4,
    comment: 'The library services are excellent. The staff is very helpful and the collection is extensive.',
    date: '2023-05-15T10:30:00Z'
  },
  {
    id: '2',
    userId: '3',
    userName: 'Student User',
    rating: 5,
    comment: 'I love the quiet study spaces and the online reservation system is very convenient.',
    date: '2023-06-20T14:45:00Z'
  }
];

export const LibraryProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user } = useAuth();
  const [books, setBooks] = useState<Book[]>(generateMockBooks());
  const [borrowedBooks, setBorrowedBooks] = useState<BorrowedBook[]>(generateMockBorrowedBooks());
  const [reviews, setReviews] = useState<BookReview[]>(generateMockReviews());
  const [userActivities, setUserActivities] = useState<UserActivity[]>(generateMockUserActivities());
  const [feedback, setFeedback] = useState<Feedback[]>(generateMockFeedback());

  // Load data from localStorage if available
  useEffect(() => {
    const storedBooks = localStorage.getItem('books');
    const storedBorrowedBooks = localStorage.getItem('borrowedBooks');
    const storedReviews = localStorage.getItem('reviews');
    const storedUserActivities = localStorage.getItem('userActivities');
    const storedFeedback = localStorage.getItem('feedback');

    if (storedBooks) setBooks(JSON.parse(storedBooks));
    if (storedBorrowedBooks) setBorrowedBooks(JSON.parse(storedBorrowedBooks));
    if (storedReviews) setReviews(JSON.parse(storedReviews));
    if (storedUserActivities) setUserActivities(JSON.parse(storedUserActivities));
    if (storedFeedback) setFeedback(JSON.parse(storedFeedback));
  }, []);

  // Save data to localStorage when it changes
  useEffect(() => {
    localStorage.setItem('books', JSON.stringify(books));
    localStorage.setItem('borrowedBooks', JSON.stringify(borrowedBooks));
    localStorage.setItem('reviews', JSON.stringify(reviews));
    localStorage.setItem('userActivities', JSON.stringify(userActivities));
    localStorage.setItem('feedback', JSON.stringify(feedback));
  }, [books, borrowedBooks, reviews, userActivities, feedback]);

  // Get book by ID
  const getBook = (id: string): Book | undefined => {
    return books.find(book => book.id === id);
  };

  // Calculate fine for overdue books
  const calculateFine = (dueDate: string, returnDate: string | null): number => {
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
    setBooks(updatedBooks);
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
    setBooks(updatedBooks);
    
    const book = books.find(b => b.id === borrowedBook.bookId);
    
    if (fine > 0) {
      toast.warning(`Book returned with a fine of Rs${fine}. Please pay at the counter.`);
    } else {
      toast.success(`Thank you for returning "${book?.title}"`);
    }
  };

  // Add a review
  const addReview = (bookId: string, rating: number, comment: string) => {
    if (!user) {
      toast.error("You need to log in to add reviews");
      return;
    }
    
    // Check if user already reviewed this book
    const existingReview = reviews.find(
      r => r.bookId === bookId && r.userId === user.id
    );
    
    if (existingReview) {
      toast.error("You have already reviewed this book. You can edit your review.");
      return;
    }
    
    const newReview: BookReview = {
      id: (reviews.length + 1).toString(),
      bookId,
      userId: user.id,
      userName: user.name,
      rating,
      comment,
      date: new Date().toISOString(),
    };
    
    // Update book rating
    const bookReviews = [...reviews, newReview].filter(r => r.bookId === bookId);
    const totalRating = bookReviews.reduce((sum, r) => sum + r.rating, 0);
    const averageRating = totalRating / bookReviews.length;
    
    const updatedBooks = books.map(b => {
      if (b.id === bookId) {
        return {
          ...b,
          averageRating: parseFloat(averageRating.toFixed(1)),
          totalRatings: b.totalRatings + 1,
        };
      }
      return b;
    });
    
    setReviews([...reviews, newReview]);
    setBooks(updatedBooks);
    toast.success("Review added successfully");
  };

  // Update a review
  const updateReview = (reviewId: string, rating: number, comment: string) => {
    const review = reviews.find(r => r.id === reviewId);
    
    if (!review) {
      toast.error("Review not found");
      return;
    }
    
    if (!user || review.userId !== user.id) {
      toast.error("You can only edit your own reviews");
      return;
    }
    
    const updatedReviews = reviews.map(r => {
      if (r.id === reviewId) {
        return {
          ...r,
          rating,
          comment,
          date: new Date().toISOString(), // Update the date
        };
      }
      return r;
    });
    
    // Recalculate book rating
    const bookReviews = updatedReviews.filter(r => r.bookId === review.bookId);
    const totalRating = bookReviews.reduce((sum, r) => sum + r.rating, 0);
    const averageRating = totalRating / bookReviews.length;
    
    const updatedBooks = books.map(b => {
      if (b.id === review.bookId) {
        return {
          ...b,
          averageRating: parseFloat(averageRating.toFixed(1)),
        };
      }
      return b;
    });
    
    setReviews(updatedReviews);
    setBooks(updatedBooks);
    toast.success("Review updated successfully");
  };

  // Delete a review
  const deleteReview = (reviewId: string) => {
    const review = reviews.find(r => r.id === reviewId);
    
    if (!review) {
      toast.error("Review not found");
      return;
    }
    
    if (!user || review.userId !== user.id) {
      toast.error("You can only delete your own reviews");
      return;
    }
    
    const updatedReviews = reviews.filter(r => r.id !== reviewId);
    
    // Recalculate book rating
    const bookReviews = updatedReviews.filter(r => r.bookId === review.bookId);
    
    let averageRating = 0;
    if (bookReviews.length > 0) {
      const totalRating = bookReviews.reduce((sum, r) => sum + r.rating, 0);
      averageRating = totalRating / bookReviews.length;
    }
    
    const updatedBooks = books.map(b => {
      if (b.id === review.bookId) {
        return {
          ...b,
          averageRating: parseFloat(averageRating.toFixed(1)),
          totalRatings: b.totalRatings - 1,
        };
      }
      return b;
    });
    
    setReviews(updatedReviews);
    setBooks(updatedBooks);
    toast.success("Review deleted successfully");
  };

  // Add feedback
  const addFeedback = (rating: number, comment: string) => {
    if (!user) {
      toast.error("You need to log in to add feedback");
      return;
    }
    
    const newFeedback: Feedback = {
      id: (feedback.length + 1).toString(),
      userId: user.id,
      userName: user.name,
      rating,
      comment,
      date: new Date().toISOString(),
    };
    
    setFeedback([...feedback, newFeedback]);
  };
  
  // Update feedback
  const updateFeedback = (feedbackId: string, rating: number, comment: string) => {
    const existingFeedback = feedback.find(f => f.id === feedbackId);
    
    if (!existingFeedback) {
      toast.error("Feedback not found");
      return;
    }
    
    if (!user || existingFeedback.userId !== user.id) {
      toast.error("You can only edit your own feedback");
      return;
    }
    
    const updatedFeedback = feedback.map(f => {
      if (f.id === feedbackId) {
        return {
          ...f,
          rating,
          comment,
          date: new Date().toISOString(),
        };
      }
      return f;
    });
    
    setFeedback(updatedFeedback);
  };
  
  // Delete feedback
  const deleteFeedback = (feedbackId: string) => {
    const existingFeedback = feedback.find(f => f.id === feedbackId);
    
    if (!existingFeedback) {
      toast.error("Feedback not found");
      return;
    }
    
    if (!user || existingFeedback.userId !== user.id) {
      toast.error("You can only delete your own feedback");
      return;
    }
    
    const updatedFeedback = feedback.filter(f => f.id !== feedbackId);
    setFeedback(updatedFeedback);
  };
  
  // Get all feedback
  const getFeedback = () => {
    return feedback;
  };

  // Get user borrowed books
  const getUserBorrowedBooks = () => {
    if (!user) return [];
    return borrowedBooks.filter(b => b.userId === user.id);
  };

  // Get user activities
  const getUserActivities = () => {
    if (!user) {
      // For admin users, return all activities
      if (user && user.role === 'admin') {
        return userActivities;
      }
      return [];
    }
    return userActivities.filter(a => a.userId === user.id);
  };

  // Record user activity
  const recordUserActivity = (minutes: number) => {
    if (!user) return;
    
    const today = format(new Date(), 'yyyy-MM-dd');
    
    // Check if there's already an activity record for today
    const existingActivityIndex = userActivities.findIndex(
      a => a.userId === user.id && a.date === today
    );
    
    if (existingActivityIndex >= 0) {
      // Update existing record
      const updatedActivities = [...userActivities];
      updatedActivities[existingActivityIndex] = {
        ...updatedActivities[existingActivityIndex],
        timeSpent: updatedActivities[existingActivityIndex].timeSpent + minutes,
      };
      setUserActivities(updatedActivities);
    } else {
      // Create new record
      const newActivity: UserActivity = {
        date: today,
        timeSpent: minutes,
        userId: user.id,
      };
      setUserActivities([...userActivities, newActivity]);
    }
  };

  // Get popular books
  const getPopularBooks = (): Book[] => {
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
  const getBooksByGenre = (genre: string): Book[] => {
    return books.filter(b => b.genre.toLowerCase() === genre.toLowerCase());
  };

  // Search books
  const searchBooks = (query: string): Book[] => {
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

  // New methods for admin functionality
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

  // Helper function to get a book cover based on metadata
  const getBookCoverByMetadata = (book: Partial<Book>) => {
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

    // Check if book is currently borrowed
    const bookBorrowed = borrowedBooks.some(b => b.bookId === bookId && b.returnDate === null);
    
    if (bookBorrowed) {
      toast.error("Can't delete a book that is currently borrowed");
      return;
    }

    setBooks(books.filter(b => b.id !== bookId));
    // Remove all related reviews and borrow history
    setReviews(reviews.filter(r => r.bookId !== bookId));
    setBorrowedBooks(borrowedBooks.filter(b => b.bookId !== bookId));
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

  return (
    <LibraryContext.Provider
      value={{
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
        getPopularBooks,
        getBooksByGenre,
        searchBooks,
        addFeedback,
        updateFeedback,
        deleteFeedback,
        getFeedback,
        // New methods
        addBook,
        updateBook,
        deleteBook,
        clearFine,
      }}
    >
      {children}
    </LibraryContext.Provider>
  );
};

export const useLibrary = () => useContext(LibraryContext);
