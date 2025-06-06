
import React, { useState, useEffect } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { useLibrary } from "@/contexts/LibraryContext";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/sonner";
import { UserRole } from "@/types/auth";
import { Loader2, Eye, EyeOff } from "lucide-react";
import { format } from "date-fns";
import { 
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";

const ManageUsersPage: React.FC = () => {
  const { user, getAllUsers, updateUserRole } = useAuth();
  const { books, borrowedBooks, clearFine, getFineAmount } = useLibrary();
  const [users, setUsers] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [expandedUsers, setExpandedUsers] = useState<Set<string>>(new Set());

  useEffect(() => {
    if (user?.role === 'admin') {
      setUsers(getAllUsers());
      setIsLoading(false);
    }
  }, [user, getAllUsers]);

  if (user?.role !== 'admin') {
    return (
      <div className="p-6">
        <p>You do not have permission to access this page.</p>
      </div>
    );
  }

  const handleRoleUpdate = (userId: string, newRole: UserRole) => {
    updateUserRole(userId, newRole);
    setUsers(getAllUsers());
    toast.success("User role updated successfully");
  };

  const handleClearFine = (borrowId: string) => {
    clearFine(borrowId);
    toast.success("Fine cleared successfully");
  };

  const toggleUserExpansion = (userId: string) => {
    const newExpanded = new Set(expandedUsers);
    if (newExpanded.has(userId)) {
      newExpanded.delete(userId);
    } else {
      newExpanded.add(userId);
    }
    setExpandedUsers(newExpanded);
  };

  const getUserBorrowedBooks = (userId: string) => {
    return borrowedBooks.filter(borrowed => borrowed.userId === userId);
  };

  const getBookTitle = (bookId: string) => {
    const book = books.find(b => b.id === bookId);
    return book ? book.title : 'Unknown Book';
  };

  const getRoleBadgeColor = (role: string) => {
    switch (role) {
      case 'admin':
        return 'bg-red-500';
      case 'faculty':
        return 'bg-blue-500';
      case 'student':
        return 'bg-green-500';
      default:
        return 'bg-gray-500';
    }
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto px-4">
      <div>
        <h1 className="text-3xl font-serif font-bold mb-2">Manage Users</h1>
        <p className="text-gray-600 dark:text-gray-400">
          View and manage user accounts and their borrowing activity
        </p>
      </div>

      <Card>
        <CardHeader>
          <h2 className="text-xl font-medium">Users ({users.length})</h2>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="flex justify-center items-center py-8">
              <Loader2 className="h-8 w-8 animate-spin text-primary" />
              <span className="ml-2">Loading users...</span>
            </div>
          ) : users.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              No registered users found.
            </div>
          ) : (
            <div className="space-y-4">
              {users.map(currentUser => {
                const userBorrowedBooks = getUserBorrowedBooks(currentUser.id);
                const isExpanded = expandedUsers.has(currentUser.id);
                
                return (
                  <Collapsible key={currentUser.id}>
                    <Card className="border">
                      <CardContent className="p-4">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-4">
                            <div>
                              <h3 className="font-medium">{currentUser.name}</h3>
                              <p className="text-sm text-gray-500">{currentUser.email}</p>
                            </div>
                            <Badge className={getRoleBadgeColor(currentUser.role)}>
                              {currentUser.role}
                            </Badge>
                          </div>
                          
                          <div className="flex items-center space-x-2">
                            <span className="text-sm text-gray-500">
                              {userBorrowedBooks.length} book(s) borrowed
                            </span>
                            
                            <CollapsibleTrigger asChild>
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => toggleUserExpansion(currentUser.id)}
                              >
                                {isExpanded ? (
                                  <EyeOff className="h-4 w-4" />
                                ) : (
                                  <Eye className="h-4 w-4" />
                                )}
                                {isExpanded ? 'Hide' : 'View'} Books
                              </Button>
                            </CollapsibleTrigger>
                          </div>
                        </div>
                        
                        <div className="mt-4 flex space-x-2">
                          {currentUser.role !== 'admin' && (
                            <Button size="sm" onClick={() => handleRoleUpdate(currentUser.id, 'admin')}>
                              Make Admin
                            </Button>
                          )}
                          {currentUser.role !== 'faculty' && (
                            <Button size="sm" onClick={() => handleRoleUpdate(currentUser.id, 'faculty')}>
                              Make Faculty
                            </Button>
                          )}
                          {currentUser.role !== 'student' && (
                            <Button size="sm" onClick={() => handleRoleUpdate(currentUser.id, 'student')}>
                              Make Student
                            </Button>
                          )}
                        </div>
                      </CardContent>
                      
                      <CollapsibleContent>
                        <CardContent className="pt-0">
                          <div className="border-t pt-4">
                            <h4 className="font-medium mb-3">Borrowed Books</h4>
                            {userBorrowedBooks.length === 0 ? (
                              <p className="text-gray-500 text-sm">No books currently borrowed</p>
                            ) : (
                              <Table>
                                <TableHeader>
                                  <TableRow>
                                    <TableHead>Book Title</TableHead>
                                    <TableHead>Borrow Date</TableHead>
                                    <TableHead>Due Date</TableHead>
                                    <TableHead>Return Date</TableHead>
                                    <TableHead>Fine</TableHead>
                                    <TableHead>Actions</TableHead>
                                  </TableRow>
                                </TableHeader>
                                <TableBody>
                                  {userBorrowedBooks.map(borrowed => {
                                    const fine = getFineAmount(borrowed.id);
                                    return (
                                      <TableRow key={borrowed.id}>
                                        <TableCell>{getBookTitle(borrowed.bookId)}</TableCell>
                                        <TableCell>
                                          {format(new Date(borrowed.borrowDate), 'PPP')}
                                        </TableCell>
                                        <TableCell>
                                          {format(new Date(borrowed.dueDate), 'PPP')}
                                        </TableCell>
                                        <TableCell>
                                          {borrowed.returnDate ? (
                                            format(new Date(borrowed.returnDate), 'PPP')
                                          ) : (
                                            <Badge variant="outline">Not Returned</Badge>
                                          )}
                                        </TableCell>
                                        <TableCell>
                                          {fine > 0 ? (
                                            <Badge variant="destructive">Rs{fine}</Badge>
                                          ) : (
                                            <Badge variant="outline">No Fine</Badge>
                                          )}
                                        </TableCell>
                                        <TableCell>
                                          {fine > 0 && (
                                            <Button
                                              size="sm"
                                              variant="outline"
                                              onClick={() => handleClearFine(borrowed.id)}
                                            >
                                              Clear Fine
                                            </Button>
                                          )}
                                        </TableCell>
                                      </TableRow>
                                    );
                                  })}
                                </TableBody>
                              </Table>
                            )}
                          </div>
                        </CardContent>
                      </CollapsibleContent>
                    </Card>
                  </Collapsible>
                );
              })}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default ManageUsersPage;
