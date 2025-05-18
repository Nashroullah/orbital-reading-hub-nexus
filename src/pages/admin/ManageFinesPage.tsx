
import React, { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { useLibrary } from "@/contexts/LibraryContext";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/sonner";
import { format } from "date-fns";

const ManageFinesPage: React.FC = () => {
  const { user } = useAuth();
  const { borrowedBooks, getBook, clearFine } = useLibrary();
  const [finesList, setFinesList] = useState(borrowedBooks.filter(book => book.fine > 0));

  if (user?.role !== 'admin') {
    return (
      <div className="p-6">
        <p>You do not have permission to access this page.</p>
      </div>
    );
  }

  const handleClearFine = (borrowId: string) => {
    clearFine(borrowId);
    setFinesList(borrowedBooks.filter(book => book.fine > 0));
    toast.success("Fine cleared successfully");
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto px-4">
      <div>
        <h1 className="text-3xl font-serif font-bold mb-2">Manage Fines</h1>
        <p className="text-gray-600 dark:text-gray-400">
          View and manage user fines
        </p>
      </div>

      <Card>
        <CardHeader>
          <h2 className="text-xl font-medium">Outstanding Fines</h2>
        </CardHeader>
        <CardContent>
          {finesList.length === 0 ? (
            <p className="text-center py-4">No outstanding fines</p>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Book</TableHead>
                  <TableHead>User</TableHead>
                  <TableHead>Due Date</TableHead>
                  <TableHead>Return Date</TableHead>
                  <TableHead>Fine Amount</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {finesList.map(borrowed => {
                  const book = getBook(borrowed.bookId);
                  return (
                    <TableRow key={borrowed.id}>
                      <TableCell>{book?.title}</TableCell>
                      <TableCell>{borrowed.userId}</TableCell>
                      <TableCell>{format(new Date(borrowed.dueDate), 'PP')}</TableCell>
                      <TableCell>
                        {borrowed.returnDate 
                          ? format(new Date(borrowed.returnDate), 'PP')
                          : 'Not returned'
                        }
                      </TableCell>
                      <TableCell>₹{borrowed.fine.toFixed(2)}</TableCell>
                      <TableCell>
                        <Button size="sm" onClick={() => handleClearFine(borrowed.id)}>
                          Clear Fine
                        </Button>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default ManageFinesPage;
