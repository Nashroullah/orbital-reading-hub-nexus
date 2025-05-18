
import React, { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { useLibrary } from "@/contexts/LibraryContext";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/sonner";
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Book } from "@/contexts/LibraryContext";

const ManageBooksPage: React.FC = () => {
  const { user } = useAuth();
  const { books, addBook, updateBook, deleteBook } = useLibrary();
  const [booksList, setBooksList] = useState(books);
  
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [selectedBook, setSelectedBook] = useState<Book | null>(null);
  
  const [newBook, setNewBook] = useState<Partial<Book>>({
    title: "",
    author: "",
    genre: "",
    description: "",
    isbn: "",
    publicationYear: new Date().getFullYear(),
    totalCopies: 1,
    availableCopies: 1,
  });

  if (user?.role !== 'admin' && user?.role !== 'faculty') {
    return (
      <div className="p-6">
        <p>You do not have permission to access this page.</p>
      </div>
    );
  }

  const handleAddBook = () => {
    try {
      addBook(newBook);
      setBooksList(books);
      setIsAddDialogOpen(false);
      toast.success("Book added successfully");
      setNewBook({
        title: "",
        author: "",
        genre: "",
        description: "",
        isbn: "",
        publicationYear: new Date().getFullYear(),
        totalCopies: 1,
        availableCopies: 1,
      });
    } catch (error) {
      toast.error("Error adding book");
    }
  };

  const handleUpdateBook = () => {
    if (!selectedBook) return;
    
    try {
      updateBook(selectedBook.id, selectedBook);
      setBooksList(books);
      setIsEditDialogOpen(false);
      toast.success("Book updated successfully");
      setSelectedBook(null);
    } catch (error) {
      toast.error("Error updating book");
    }
  };

  const handleDeleteBook = (bookId: string) => {
    try {
      deleteBook(bookId);
      setBooksList(books);
      toast.success("Book deleted successfully");
    } catch (error) {
      toast.error("Error deleting book");
    }
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto px-4">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-serif font-bold mb-2">Manage Books</h1>
          <p className="text-gray-600 dark:text-gray-400">
            Add, edit, and remove books from the library
          </p>
        </div>
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button>Add New Book</Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>Add New Book</DialogTitle>
              <DialogDescription>
                Enter book details to add it to the library.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="title">Title</Label>
                <Input
                  id="title"
                  value={newBook.title}
                  onChange={(e) => setNewBook({...newBook, title: e.target.value})}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="author">Author</Label>
                <Input
                  id="author"
                  value={newBook.author}
                  onChange={(e) => setNewBook({...newBook, author: e.target.value})}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="genre">Genre</Label>
                <Input
                  id="genre"
                  value={newBook.genre}
                  onChange={(e) => setNewBook({...newBook, genre: e.target.value})}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  value={newBook.description}
                  onChange={(e) => setNewBook({...newBook, description: e.target.value})}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="isbn">ISBN</Label>
                <Input
                  id="isbn"
                  value={newBook.isbn}
                  onChange={(e) => setNewBook({...newBook, isbn: e.target.value})}
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="year">Publication Year</Label>
                  <Input
                    id="year"
                    type="number"
                    value={newBook.publicationYear}
                    onChange={(e) => setNewBook({...newBook, publicationYear: Number(e.target.value)})}
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="copies">Total Copies</Label>
                  <Input
                    id="copies"
                    type="number"
                    value={newBook.totalCopies}
                    onChange={(e) => {
                      const totalCopies = Number(e.target.value);
                      setNewBook({
                        ...newBook, 
                        totalCopies, 
                        availableCopies: totalCopies
                      });
                    }}
                  />
                </div>
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>Cancel</Button>
              <Button onClick={handleAddBook}>Add Book</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>Edit Book</DialogTitle>
              <DialogDescription>
                Update the book details.
              </DialogDescription>
            </DialogHeader>
            {selectedBook && (
              <div className="grid gap-4 py-4">
                <div className="grid gap-2">
                  <Label htmlFor="edit-title">Title</Label>
                  <Input
                    id="edit-title"
                    value={selectedBook.title}
                    onChange={(e) => setSelectedBook({...selectedBook, title: e.target.value})}
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="edit-author">Author</Label>
                  <Input
                    id="edit-author"
                    value={selectedBook.author}
                    onChange={(e) => setSelectedBook({...selectedBook, author: e.target.value})}
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="edit-genre">Genre</Label>
                  <Input
                    id="edit-genre"
                    value={selectedBook.genre}
                    onChange={(e) => setSelectedBook({...selectedBook, genre: e.target.value})}
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="edit-description">Description</Label>
                  <Textarea
                    id="edit-description"
                    value={selectedBook.description}
                    onChange={(e) => setSelectedBook({...selectedBook, description: e.target.value})}
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="edit-year">Publication Year</Label>
                    <Input
                      id="edit-year"
                      type="number"
                      value={selectedBook.publicationYear}
                      onChange={(e) => setSelectedBook({...selectedBook, publicationYear: Number(e.target.value)})}
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="edit-copies">Total Copies</Label>
                    <Input
                      id="edit-copies"
                      type="number"
                      value={selectedBook.totalCopies}
                      onChange={(e) => setSelectedBook({...selectedBook, totalCopies: Number(e.target.value)})}
                    />
                  </div>
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="edit-available">Available Copies</Label>
                  <Input
                    id="edit-available"
                    type="number"
                    value={selectedBook.availableCopies}
                    onChange={(e) => setSelectedBook({...selectedBook, availableCopies: Number(e.target.value)})}
                  />
                </div>
              </div>
            )}
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsEditDialogOpen(false)}>Cancel</Button>
              <Button onClick={handleUpdateBook}>Update Book</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <Card>
        <CardHeader>
          <h2 className="text-xl font-medium">Library Collection</h2>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Title</TableHead>
                <TableHead>Author</TableHead>
                <TableHead>Genre</TableHead>
                <TableHead>Available / Total</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {booksList.map(book => (
                <TableRow key={book.id}>
                  <TableCell>{book.title}</TableCell>
                  <TableCell>{book.author}</TableCell>
                  <TableCell>{book.genre}</TableCell>
                  <TableCell>{book.availableCopies} / {book.totalCopies}</TableCell>
                  <TableCell>
                    <div className="flex space-x-2">
                      <Button 
                        size="sm" 
                        variant="outline"
                        onClick={() => {
                          setSelectedBook(book);
                          setIsEditDialogOpen(true);
                        }}
                      >
                        Edit
                      </Button>
                      <Button 
                        size="sm" 
                        variant="destructive"
                        onClick={() => handleDeleteBook(book.id)}
                      >
                        Delete
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default ManageBooksPage;
