
import { useState, useEffect } from "react";
import { BookReview, Book } from "../types/library";
import { generateMockReviews } from "../data/mockLibraryData";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "@/components/ui/sonner";

export const useReviews = (books: Book[], updateBooks: (updatedBooks: Book[]) => void) => {
  const { user } = useAuth();
  const [reviews, setReviews] = useState<BookReview[]>([]);

  useEffect(() => {
    // Load reviews from localStorage if available
    const storedReviews = localStorage.getItem('reviews');
    setReviews(storedReviews ? JSON.parse(storedReviews) : generateMockReviews());
  }, []);

  // Save reviews to localStorage when they change
  useEffect(() => {
    localStorage.setItem('reviews', JSON.stringify(reviews));
  }, [reviews]);

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
    updateBooks(updatedBooks);
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
    updateBooks(updatedBooks);
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
    updateBooks(updatedBooks);
    toast.success("Review deleted successfully");
  };

  return {
    reviews,
    addReview,
    updateReview,
    deleteReview
  };
};
