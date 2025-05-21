
import React, { useState } from "react";
import { useLibrary } from "@/contexts/LibraryContext";
import { useAuth } from "@/contexts/AuthContext";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar } from "@/components/ui/calendar";
import { format, parseISO, isSameDay } from "date-fns";
import { Badge } from "@/components/ui/badge";
import { BookOpen, Calendar as CalendarIcon, Clock } from "lucide-react";

const CalendarPage: React.FC = () => {
  const { getUserActivities, getUserBorrowedBooks } = useLibrary();
  const { user } = useAuth();
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  
  if (!user) return null;
  
  const userActivities = getUserActivities();
  const borrowedBooks = getUserBorrowedBooks();
  
  // Format activities for highlighted dates
  const activityDates = userActivities.map(activity => parseISO(activity.date));
  
  // Format borrowed/due dates for highlighting
  const borrowedDates = borrowedBooks.map(book => {
    return {
      date: parseISO(book.borrowDate),
      type: 'borrow'
    };
  });
  
  const dueDates = borrowedBooks
    .filter(book => book.dueDate)
    .map(book => {
      return {
        date: parseISO(book.dueDate!),
        type: 'due'
      };
    });
  
  // Find selected day's events
  const selectedDayActivity = userActivities.find(activity => 
    selectedDate && isSameDay(parseISO(activity.date), selectedDate)
  );
  
  const selectedDayBorrowed = borrowedBooks.filter(book => 
    selectedDate && isSameDay(parseISO(book.borrowDate), selectedDate)
  );
  
  const selectedDayDue = borrowedBooks.filter(book => 
    selectedDate && book.dueDate && isSameDay(parseISO(book.dueDate), selectedDate)
  );

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-serif font-bold mb-2">Library Calendar</h1>
        <p className="text-gray-600 dark:text-gray-400">
          Track your library activities and important dates
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="md:col-span-1">
          <CardHeader>
            <CardTitle className="flex items-center">
              <CalendarIcon className="mr-2 h-5 w-5" />
              Library Calendar
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Calendar
              mode="single"
              selected={selectedDate}
              onSelect={setSelectedDate}
              className="rounded-md border pointer-events-auto"
              modifiers={{
                highlighted: activityDates,
              }}
              modifiersClassNames={{
                highlighted: "bg-primary/20 text-primary-foreground font-medium",
              }}
            />
            
            <div className="mt-4 space-y-3">
              <div className="flex justify-center space-x-4">
                <div className="flex items-center">
                  <div className="h-3 w-3 rounded-full bg-primary mr-1"></div>
                  <span className="text-xs">Reading Activity</span>
                </div>
                <div className="flex items-center">
                  <div className="h-3 w-3 rounded-full bg-green-500 mr-1"></div>
                  <span className="text-xs">Borrowed</span>
                </div>
                <div className="flex items-center">
                  <div className="h-3 w-3 rounded-full bg-red-500 mr-1"></div>
                  <span className="text-xs">Due Date</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle>
              {selectedDate ? format(selectedDate, "PPPP") : "Select a Date"}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {!selectedDayActivity && selectedDayBorrowed.length === 0 && selectedDayDue.length === 0 && (
              <p className="text-sm text-gray-500">No activities scheduled for this date.</p>
            )}
            
            {selectedDayActivity && (
              <div className="border-l-4 border-primary pl-4 py-2">
                <div className="flex items-center">
                  <Clock className="h-4 w-4 text-primary mr-2" />
                  <h3 className="font-medium">Reading Activity</h3>
                </div>
                <p className="text-sm mt-1">
                  You spent {Math.floor(selectedDayActivity.timeSpent / 60)}h {selectedDayActivity.timeSpent % 60}m reading.
                </p>
              </div>
            )}
            
            {selectedDayBorrowed.length > 0 && (
              <div className="border-l-4 border-green-500 pl-4 py-2">
                <div className="flex items-center">
                  <BookOpen className="h-4 w-4 text-green-500 mr-2" />
                  <h3 className="font-medium">Books Borrowed</h3>
                </div>
                <ul className="mt-1 space-y-1">
                  {selectedDayBorrowed.map((book, idx) => (
                    <li key={`borrowed-${idx}`} className="text-sm">
                      {book.title} by {book.author}
                    </li>
                  ))}
                </ul>
              </div>
            )}
            
            {selectedDayDue.length > 0 && (
              <div className="border-l-4 border-red-500 pl-4 py-2">
                <div className="flex items-center">
                  <CalendarIcon className="h-4 w-4 text-red-500 mr-2" />
                  <h3 className="font-medium">Books Due</h3>
                </div>
                <ul className="mt-1 space-y-1">
                  {selectedDayDue.map((book, idx) => (
                    <li key={`due-${idx}`} className="text-sm">
                      {book.title} by {book.author}
                      <Badge className="ml-2 bg-red-500">Due Today</Badge>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default CalendarPage;
