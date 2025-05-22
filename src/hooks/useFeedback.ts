
import { useState, useEffect } from "react";
import { Feedback } from "../types/library";
import { generateMockFeedback } from "../data/mockLibraryData";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "@/components/ui/sonner";

export const useFeedback = () => {
  const { user } = useAuth();
  const [feedback, setFeedback] = useState<Feedback[]>([]);

  useEffect(() => {
    // Load feedback from localStorage if available
    const storedFeedback = localStorage.getItem('feedback');
    setFeedback(storedFeedback ? JSON.parse(storedFeedback) : generateMockFeedback());
  }, []);

  // Save feedback to localStorage when it changes
  useEffect(() => {
    localStorage.setItem('feedback', JSON.stringify(feedback));
  }, [feedback]);

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

  return {
    feedback,
    addFeedback,
    updateFeedback,
    deleteFeedback,
    getFeedback
  };
};
