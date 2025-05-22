
// Library Types
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

export interface LibraryContextType {
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
  // Admin functionality
  addBook: (book: Partial<Book>) => void;
  updateBook: (bookId: string, updatedBook: Partial<Book>) => void;
  deleteBook: (bookId: string) => void;
  clearFine: (borrowId: string) => void;
}
