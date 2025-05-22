
import { Book, BookReview, BorrowedBook, UserActivity, Feedback } from '../types/library';

// Mock data - Books
export const generateMockBooks = (): Book[] => [
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
export const generateMockReviews = (): BookReview[] => [
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
export const generateMockBorrowedBooks = (): BorrowedBook[] => [
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
export const generateMockUserActivities = (): UserActivity[] => [
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
export const generateMockFeedback = (): Feedback[] => [
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
