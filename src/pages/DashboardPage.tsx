
import React from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useLibrary } from '@/contexts/LibraryContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { BookCopy, Clock, Calendar, FileMinus, BookOpen, User, Star, Settings, FileText, MessageSquare, CreditCard } from 'lucide-react';
import { Link } from 'react-router-dom';
import { AspectRatio } from '@/components/ui/aspect-ratio';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { NavigationMenu, NavigationMenuContent, NavigationMenuItem, NavigationMenuLink, NavigationMenuList, NavigationMenuTrigger, navigationMenuTriggerStyle } from '@/components/ui/navigation-menu';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { format, parseISO } from 'date-fns';
import { toast } from '@/components/ui/sonner';

const DashboardPage: React.FC = () => {
  const { user } = useAuth();
  const { getPopularBooks, getUserBorrowedBooks, getFineAmount, getUserActivities, getBook, clearFine } = useLibrary();

  if (!user) {
    return null; // Should be handled by the Layout component
  }

  const isAdmin = user.role === 'admin';
  const isFaculty = user.role === 'faculty' || isAdmin;
  const books = getPopularBooks();
  const borrowedBooks = getUserBorrowedBooks();
  const currentlyBorrowed = borrowedBooks.filter(b => !b.returnDate);
  
  // Calculate total fines and get books with fines
  const booksWithFines = borrowedBooks.filter(book => {
    const fine = getFineAmount(book.id);
    return fine > 0;
  });
  
  const totalFines = booksWithFines.reduce((sum, book) => {
    return sum + getFineAmount(book.id);
  }, 0);

  // Get user's reading time
  const userActivities = getUserActivities();
  const totalMinutes = userActivities.reduce((total, activity) => total + activity.timeSpent, 0);
  const hours = Math.floor(totalMinutes / 60);
  const minutes = totalMinutes % 60;
  const formattedTime = `${hours}h ${minutes}m`;

  // Helper function to get a professional cover based on the book title/author/genre
  const getBookCoverByMetadata = (book) => {
    // Mapping genres to appropriate cover styles
    if (book.title.toLowerCase().includes('javascript') || 
        book.genre.toLowerCase().includes('programming')) {
      return "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3";
    } else if (book.title.toLowerCase().includes('design') ||
              book.genre.toLowerCase().includes('design')) {
      return "https://images.unsplash.com/photo-1523726491678-bf852e717f6a?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3";
    } else if (book.genre.toLowerCase().includes('science fiction') ||
              book.title.toLowerCase().includes('future')) {
      return "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3";
    } else if (book.genre.toLowerCase().includes('business')) {
      return "https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3";
    } else if (book.genre.toLowerCase().includes('philosophy') ||
              book.title.toLowerCase().includes('think')) {
      return "https://images.unsplash.com/photo-1532012197267-da84d127e765?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3";
    } else if (book.genre.toLowerCase().includes('romance')) {
      return "https://images.unsplash.com/photo-1474552226712-ac0f0961a954?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3";
    } else if (book.genre.toLowerCase().includes('mystery')) {
      return "https://images.unsplash.com/photo-1587876931567-564ce588bfbd?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3";
    } else if (book.genre.toLowerCase().includes('fantasy')) {
      return "https://images.unsplash.com/photo-1500673922987-e212871fec22?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3";
    } else if (book.title.toLowerCase().includes('data') ||
              book.genre.toLowerCase().includes('technology')) {
      return "https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3";
    } else if (book.genre.toLowerCase().includes('history')) {
      return "https://images.unsplash.com/photo-1461360370896-922624d12aa1?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3";
    } else if (book.genre.toLowerCase().includes('adventure')) {
      return "https://images.unsplash.com/photo-1501854140801-50d01698950b?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3";
    } else if (book.genre.toLowerCase().includes('self-help')) {
      return "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3";
    } else if (book.title.toLowerCase().includes('art') ||
              book.genre.toLowerCase().includes('art')) {
      return "https://images.unsplash.com/photo-1513364776144-60967b0f800f?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3";
    } else {
      // Default cover for other genres
      return "https://images.unsplash.com/photo-1495446815901-a7297e633e8d?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3";
    }
  };

  const handlePayFine = (borrowId: string) => {
    // Simulate payment process
    toast.success("Fine payment successful! Thank you.");
    clearFine(borrowId);
  };

  return (
    <div className="space-y-8 max-w-7xl mx-auto px-4">
      <div>
        <h1 className="text-3xl font-serif font-bold mb-2">Welcome, {user.name}!</h1>
        <p className="text-gray-600 dark:text-gray-400">
          {new Date().toLocaleDateString('en-US', { 
            weekday: 'long', 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric' 
          })}
        </p>
      </div>
      
      {/* Quick Navigation Menu */}
      <div className="mb-6">
        <h2 className="text-xl font-serif font-semibold mb-3">Quick Access</h2>
        <NavigationMenu>
          <NavigationMenuList className="flex flex-wrap gap-2">
            <NavigationMenuItem>
              <Link to="/my-books" className={navigationMenuTriggerStyle()}>
                <BookCopy className="h-4 w-4 mr-2" />
                My Books
              </Link>
            </NavigationMenuItem>
            
            <NavigationMenuItem>
              <Link to="/profile" className={navigationMenuTriggerStyle()}>
                <User className="h-4 w-4 mr-2" />
                Profile
              </Link>
            </NavigationMenuItem>
            
            <NavigationMenuItem>
              <Link to="/activity" className={navigationMenuTriggerStyle()}>
                <Clock className="h-4 w-4 mr-2" />
                Reading Activity
              </Link>
            </NavigationMenuItem>
            
            <NavigationMenuItem>
              <Link to="/feedback" className={navigationMenuTriggerStyle()}>
                <Star className="h-4 w-4 mr-2" />
                Ratings & Feedback
              </Link>
            </NavigationMenuItem>
            
            {isFaculty && (
              <NavigationMenuItem>
                <NavigationMenuTrigger>
                  <Settings className="h-4 w-4 mr-2" />
                  Management
                </NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
                    {isAdmin && (
                      <>
                        <li className="row-span-1">
                          <NavigationMenuLink asChild>
                            <Link to="/admin/dashboard" className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground">
                              <div className="text-sm font-medium leading-none">Admin Dashboard</div>
                              <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">View library statistics and system overview.</p>
                            </Link>
                          </NavigationMenuLink>
                        </li>
                        <li className="row-span-1">
                          <NavigationMenuLink asChild>
                            <Link to="/admin/users" className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground">
                              <div className="text-sm font-medium leading-none">Manage Users</div>
                              <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">Add, update or remove user accounts.</p>
                            </Link>
                          </NavigationMenuLink>
                        </li>
                        <li className="row-span-1">
                          <NavigationMenuLink asChild>
                            <Link to="/admin/fines" className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground">
                              <div className="text-sm font-medium leading-none">Manage Fines</div>
                              <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">Review and process outstanding fines.</p>
                            </Link>
                          </NavigationMenuLink>
                        </li>
                      </>
                    )}
                    <li className="row-span-1">
                      <NavigationMenuLink asChild>
                        <Link to="/books/manage" className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground">
                          <div className="text-sm font-medium leading-none">Manage Books</div>
                          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">Add, update or remove books from the library.</p>
                        </Link>
                      </NavigationMenuLink>
                    </li>
                    <li className="row-span-1">
                      <NavigationMenuLink asChild>
                        <Link to="/reports" className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground">
                          <div className="text-sm font-medium leading-none">Reports</div>
                          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">Generate and view library reports.</p>
                        </Link>
                      </NavigationMenuLink>
                    </li>
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>
            )}
          </NavigationMenuList>
        </NavigationMenu>
      </div>
      
      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-gray-500 dark:text-gray-400">
              Books Borrowed
            </CardTitle>
            <BookCopy className="h-5 w-5 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{currentlyBorrowed.length}</div>
            <p className="text-xs text-gray-500 dark:text-gray-400">
              {borrowedBooks.length} total checkouts
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-gray-500 dark:text-gray-400">
              Due This Week
            </CardTitle>
            <Calendar className="h-5 w-5 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">0</div>
            <p className="text-xs text-gray-500 dark:text-gray-400">
              No books due soon
            </p>
          </CardContent>
        </Card>
        
        <div className="relative group">
          <Link to="/activity" className="absolute inset-0 z-10 cursor-pointer" aria-label="View activity details"></Link>
          <Card className="hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-gray-500 dark:text-gray-400">
                Total Reading Time
              </CardTitle>
              <Clock className="h-5 w-5 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{formattedTime}</div>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                View detailed activity →
              </p>
            </CardContent>
          </Card>
        </div>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-gray-500 dark:text-gray-400">
              Outstanding Fines
            </CardTitle>
            <FileMinus className="h-5 w-5 text-red-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">₹{totalFines.toFixed(2)}</div>
            <p className="text-xs text-gray-500 dark:text-gray-400">
              {totalFines > 0 ? 'Payment required' : 'No outstanding fines'}
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Fine Payment Section */}
      {booksWithFines.length > 0 && (
        <Card className="border-red-200 bg-red-50 dark:bg-red-900/10 dark:border-red-800">
          <CardHeader>
            <CardTitle className="text-red-700 dark:text-red-400 flex items-center">
              <CreditCard className="h-5 w-5 mr-2" />
              Outstanding Fines - Payment Required
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <p className="text-sm text-red-600 dark:text-red-400 mb-4">
                You have outstanding fines for late book returns. Fine is ₹2 per day after a 5-day grace period.
              </p>
              
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Book Title</TableHead>
                    <TableHead>Due Date</TableHead>
                    <TableHead>Days Overdue</TableHead>
                    <TableHead>Fine Amount</TableHead>
                    <TableHead>Action</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {booksWithFines.map((borrowedBook) => {
                    const book = getBook(borrowedBook.bookId);
                    const fine = getFineAmount(borrowedBook.id);
                    const dueDate = parseISO(borrowedBook.dueDate);
                    const today = new Date();
                    const daysOverdue = Math.floor((today.getTime() - dueDate.getTime()) / (1000 * 60 * 60 * 24));
                    
                    if (!book || fine === 0) return null;
                    
                    return (
                      <TableRow key={borrowedBook.id}>
                        <TableCell className="font-medium">{book.title}</TableCell>
                        <TableCell>{format(dueDate, 'MMM d, yyyy')}</TableCell>
                        <TableCell>{daysOverdue} days</TableCell>
                        <TableCell className="font-bold text-red-600">₹{fine.toFixed(2)}</TableCell>
                        <TableCell>
                          <Button 
                            size="sm" 
                            onClick={() => handlePayFine(borrowedBook.id)}
                            className="bg-green-600 hover:bg-green-700 text-white"
                          >
                            Pay Fine
                          </Button>
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
              
              <div className="flex justify-between items-center pt-4 border-t">
                <div className="text-lg font-semibold">
                  Total Amount Due: <span className="text-red-600">₹{totalFines.toFixed(2)}</span>
                </div>
                <Button 
                  onClick={() => {
                    booksWithFines.forEach(book => handlePayFine(book.id));
                  }}
                  className="bg-green-600 hover:bg-green-700 text-white"
                >
                  Pay All Fines
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Book Recommendations */}
      <div>
        <h2 className="text-2xl font-serif font-semibold mb-4">Recommended Books</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
          {books.map((book) => (
            <Card key={book.id} className="overflow-hidden flex flex-col h-full">
              <AspectRatio ratio={2/3} className="bg-muted">
                <img 
                  src={book.coverImage || getBookCoverByMetadata(book)} 
                  alt={book.title} 
                  className="w-full h-full object-cover transition-transform hover:scale-105"
                />
              </AspectRatio>
              <CardContent className="p-4 flex flex-col flex-grow">
                <h3 className="font-medium mb-1 line-clamp-2 min-h-[2.5rem]">{book.title}</h3>
                <p className="text-sm text-gray-500 mb-auto">{book.author}</p>
                <Button asChild className="w-full mt-4" size="sm">
                  <Link to={`/books/${book.id}`}>View Details</Link>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
        <div className="flex justify-center mt-4">
          <Button variant="outline" asChild>
            <Link to="/books">Browse All Books</Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
