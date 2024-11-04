'use client';

import { useQuery } from '@tanstack/react-query';
import api from '@/lib/api';
import { Review } from '@/types';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import StarRating from '@/components/products/star-rating';

interface ReviewListProps {
  productId: string;
}

export default function ReviewList({ productId }: ReviewListProps) {
  const { data, isLoading } = useQuery({
    queryKey: ['reviews', productId],
    queryFn: async () => {
      const { data } = await api.get(`/products/${productId}/reviews`);
      return data;
    },
  });

  const reviews: Review[] = data?.data || [];

  if (isLoading) return <div className="space-y-4">{[...Array(3)].map((_, i) => <div key={i} className="h-24 bg-gray-100 rounded-lg animate-pulse" />)}</div>;

  if (reviews.length === 0) return <p className="text-gray-500 text-center py-8">No reviews yet. Be the first to review!</p>;

  return (
    <div className="space-y-6">
      {reviews.map((review) => (
        <div key={review.id} className="border-b pb-6 last:border-0">
          <div className="flex items-start gap-3">
            <Avatar className="h-10 w-10">
              <AvatarImage src={review.user.avatar || undefined} />
              <AvatarFallback>{review.user.firstName[0]}{review.user.lastName[0]}</AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <div className="flex items-center gap-2">
                <span className="font-medium">{review.user.firstName} {review.user.lastName}</span>
                {review.isVerifiedPurchase && <Badge variant="secondary" className="text-xs">Verified Purchase</Badge>}
              </div>
              <div className="flex items-center gap-2 mt-1">
                <StarRating value={review.rating} readonly size="sm" />
                <span className="text-xs text-gray-500">{new Date(review.createdAt).toLocaleDateString()}</span>
              </div>
              {review.title && <p className="font-medium mt-2">{review.title}</p>}
              {review.comment && <p className="text-gray-600 text-sm mt-1">{review.comment}</p>}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
