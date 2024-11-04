'use client';

import { useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import api from '@/lib/api';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import StarRating from '@/components/products/star-rating';

interface ReviewFormProps {
  productId: string;
}

export default function ReviewForm({ productId }: ReviewFormProps) {
  const queryClient = useQueryClient();
  const [rating, setRating] = useState(0);
  const [title, setTitle] = useState('');
  const [comment, setComment] = useState('');

  const mutation = useMutation({
    mutationFn: async () => {
      return api.post(`/products/${productId}/reviews`, { rating, title, comment });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['reviews', productId] });
      setRating(0);
      setTitle('');
      setComment('');
    },
  });

  return (
    <form onSubmit={(e) => { e.preventDefault(); mutation.mutate(); }} className="space-y-4 bg-gray-50 rounded-lg p-6">
      <h3 className="font-bold text-lg">Write a Review</h3>
      <div>
        <Label>Rating</Label>
        <StarRating value={rating} onChange={setRating} size="lg" />
      </div>
      <div>
        <Label>Title (optional)</Label>
        <Input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Summary of your review" />
      </div>
      <div>
        <Label>Review (optional)</Label>
        <Textarea value={comment} onChange={(e) => setComment(e.target.value)} placeholder="Share your experience..." rows={4} />
      </div>
      <Button type="submit" disabled={rating === 0 || mutation.isPending}>
        {mutation.isPending ? 'Submitting...' : 'Submit Review'}
      </Button>
    </form>
  );
}
