
import React from "react";
import { useAuth } from "@/contexts/AuthContext";
import { useLibrary } from "@/contexts/LibraryContext";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ChartContainer, ChartLegend, ChartTooltip } from "@/components/ui/chart";
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";

const AdminDashboardPage: React.FC = () => {
  const { user } = useAuth();
  const { books, borrowedBooks, getUserActivities, reviews, feedback } = useLibrary();
  
  if (user?.role !== 'admin') {
    return (
      <div className="p-6">
        <p>You do not have permission to access this page.</p>
      </div>
    );
  }

  // Calculate statistics
  const totalBooks = books.length;
  const totalBorrowedBooks = borrowedBooks.filter(b => !b.returnDate).length;
  const totalReturnedBooks = borrowedBooks.filter(b => b.returnDate).length;
  const totalFines = borrowedBooks.reduce((total, book) => total + book.fine, 0);
  const totalReviews = reviews.length;
  
  // Get top genres
  const genreCounts: Record<string, number> = {};
  books.forEach(book => {
    genreCounts[book.genre] = (genreCounts[book.genre] || 0) + 1;
  });
  
  const genreData = Object.entries(genreCounts)
    .map(([name, value]) => ({ name, value }))
    .sort((a, b) => b.value - a.value)
    .slice(0, 5);
  
  // Calculate user activity
  const userActivities = getUserActivities();
  const totalReadingTime = userActivities.reduce((total, activity) => total + activity.timeSpent, 0);
  
  // Book status data for pie chart
  const bookStatusData = [
    { name: "Available", value: books.reduce((total, book) => total + book.availableCopies, 0) },
    { name: "Borrowed", value: totalBorrowedBooks }
  ];
  
  const colors = ["#8b5cf6", "#ec4899", "#10b981", "#3b82f6", "#ef4444", "#f97316", "#a855f7"];

  return (
    <div className="space-y-6 max-w-7xl mx-auto px-4">
      <div>
        <h1 className="text-3xl font-serif font-bold mb-2">Admin Dashboard</h1>
        <p className="text-gray-600 dark:text-gray-400">
          Overview of library statistics and activities
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-500 dark:text-gray-400">
              Total Books
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalBooks}</div>
            <p className="text-xs text-gray-500 dark:text-gray-400">
              {books.reduce((total, book) => total + book.totalCopies, 0)} copies in total
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-500 dark:text-gray-400">
              Books Currently Borrowed
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalBorrowedBooks}</div>
            <p className="text-xs text-gray-500 dark:text-gray-400">
              {totalReturnedBooks} returned overall
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-500 dark:text-gray-400">
              Total Fines Collected
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">₹{totalFines.toFixed(2)}</div>
            <p className="text-xs text-gray-500 dark:text-gray-400">
              From {borrowedBooks.filter(b => b.fine > 0).length} overdue books
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="col-span-1">
          <CardHeader>
            <CardTitle>Top Genres</CardTitle>
          </CardHeader>
          <CardContent className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={genreData}>
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="value" fill="#8b5cf6" name="Books" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
        
        <Card className="col-span-1">
          <CardHeader>
            <CardTitle>Book Status</CardTitle>
          </CardHeader>
          <CardContent className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={bookStatusData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                  label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                >
                  {bookStatusData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Total Reading Time</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-lg">Users have spent a total of {Math.floor(totalReadingTime / 60)} hours and {totalReadingTime % 60} minutes reading.</p>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminDashboardPage;
