
import React, { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useLibrary } from '@/contexts/LibraryContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Star, Edit, Trash2 } from 'lucide-react';
import { toast } from "@/components/ui/sonner";
import { format } from 'date-fns';

const FeedbackPage: React.FC = () => {
  const { user } = useAuth();
  const { addFeedback, getFeedback, updateFeedback, deleteFeedback } = useLibrary();
  const [rating, setRating] = useState<number>(5);
  const [comment, setComment] = useState<string>("");
  const [editingId, setEditingId] = useState<string | null>(null);
  
  const feedback = getFeedback();
  const userFeedback = feedback.filter(f => f.userId === user?.id);
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!comment.trim()) {
      toast.error("Please enter a comment");
      return;
    }
    
    if (editingId) {
      updateFeedback(editingId, rating, comment);
      setEditingId(null);
    } else {
      addFeedback(rating, comment);
    }
    
    setRating(5);
    setComment("");
    toast.success(editingId ? "Feedback updated" : "Feedback submitted");
  };
  
  const handleEdit = (id: string, currentRating: number, currentComment: string) => {
    setEditingId(id);
    setRating(currentRating);
    setComment(currentComment);
  };
  
  const handleDelete = (id: string) => {
    deleteFeedback(id);
    
    if (editingId === id) {
      setEditingId(null);
      setRating(5);
      setComment("");
    }
    
    toast.success("Feedback deleted");
  };
  
  const cancelEdit = () => {
    setEditingId(null);
    setRating(5);
    setComment("");
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-serif font-bold mb-2">Rating & Feedback</h1>
        <p className="text-gray-600 dark:text-gray-400">
          Share your experience with our library service
        </p>
      </div>
      
      {/* Submit Feedback Form */}
      <Card>
        <CardHeader>
          <CardTitle>{editingId ? "Edit Your Feedback" : "Submit Feedback"}</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <div className="mb-2">Rating</div>
              <div className="flex items-center space-x-1">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star
                    key={star}
                    className={`h-6 w-6 cursor-pointer ${rating >= star ? "text-yellow-500 fill-yellow-500" : "text-gray-300"}`}
                    onClick={() => setRating(star)}
                  />
                ))}
              </div>
            </div>
            
            <div>
              <label htmlFor="comment" className="block mb-2">Your Comments</label>
              <Textarea
                id="comment"
                placeholder="Tell us what you think about our library services..."
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                rows={4}
                className="w-full"
              />
            </div>
            
            <div className="flex space-x-2">
              <Button type="submit">
                {editingId ? "Update Feedback" : "Submit Feedback"}
              </Button>
              
              {editingId && (
                <Button type="button" variant="outline" onClick={cancelEdit}>
                  Cancel
                </Button>
              )}
            </div>
          </form>
        </CardContent>
      </Card>
      
      {/* Your Feedback */}
      {userFeedback.length > 0 && (
        <div>
          <h2 className="text-2xl font-serif font-semibold mb-4">Your Previous Feedback</h2>
          <div className="space-y-4">
            {userFeedback.map((item) => (
              <Card key={item.id}>
                <CardContent className="pt-6">
                  <div className="flex justify-between items-start">
                    <div>
                      <div className="flex items-center mb-2">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <Star
                            key={star}
                            className={`h-5 w-5 ${item.rating >= star ? "text-yellow-500 fill-yellow-500" : "text-gray-300"}`}
                          />
                        ))}
                        <span className="ml-2 text-sm text-gray-500">
                          {format(new Date(item.date), 'PPP')}
                        </span>
                      </div>
                      <p className="text-gray-700">{item.comment}</p>
                    </div>
                    
                    <div className="flex space-x-1">
                      <Button
                        size="icon"
                        variant="ghost"
                        onClick={() => handleEdit(item.id, item.rating, item.comment)}
                      >
                        <Edit className="h-4 w-4" />
                        <span className="sr-only">Edit</span>
                      </Button>
                      
                      <Button
                        size="icon"
                        variant="ghost"
                        onClick={() => handleDelete(item.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                        <span className="sr-only">Delete</span>
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}
      
      {/* All Feedback */}
      <div>
        <h2 className="text-2xl font-serif font-semibold mb-4">Community Feedback</h2>
        {feedback.filter(f => f.userId !== user?.id).length > 0 ? (
          <div className="space-y-4">
            {feedback.filter(f => f.userId !== user?.id).map((item) => (
              <Card key={item.id}>
                <CardContent className="pt-6">
                  <div className="flex items-center mb-2">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star
                        key={star}
                        className={`h-5 w-5 ${item.rating >= star ? "text-yellow-500 fill-yellow-500" : "text-gray-300"}`}
                      />
                    ))}
                    <span className="ml-2 text-sm font-medium">{item.userName}</span>
                    <span className="ml-2 text-xs text-gray-500">
                      {format(new Date(item.date), 'PPP')}
                    </span>
                  </div>
                  <p className="text-gray-700">{item.comment}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <Card>
            <CardContent className="py-6 text-center text-gray-500">
              No community feedback yet. Be the first to share your thoughts!
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default FeedbackPage;
