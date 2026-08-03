'use client';

import { useQuery } from '@tanstack/react-query';
import { Card, CardContent } from '@/components/ui/card';
import { Star, Loader2 } from 'lucide-react';
import { useAuth } from '@/features/auth/hooks/useAuth';
import { api } from '@/lib/api';

interface Review {
  id: string;
  rating: number;
  comment: string;
  createdAt: string;
  technician?: {
    user?: {
      name: string;
    };
  };
}

// API Response interface
interface ReviewsApiResponse {
  data: Review[];
}

export default function CustomerReviewsPage() { 
  const { isAuthenticated } = useAuth();

  const { data, isLoading } = useQuery({
    queryKey: ['customer-reviews'],
    queryFn: async () => {
      // 👈 as { data: ReviewsApiResponse } যুক্ত করে res.data টাইপ-সেফ করা হলো
      const res = (await api.get('/reviews')) as { data: ReviewsApiResponse };
      return res.data;
    },
    enabled: isAuthenticated,
  });

  const reviews: Review[] = data?.data || [];

  if (!isAuthenticated) {
    return <div>Please login to view reviews</div>;
  }

  if (isLoading) {
    return (
      <div className="flex h-96 items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">My Reviews</h1>
        <p className="text-muted-foreground">Reviews you&apos;ve written</p>
      </div>

      {reviews.length === 0 ? (
        <Card>
          <CardContent className="text-center py-12 text-muted-foreground">
            No reviews yet
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-4">
          {reviews.map((review) => (
            <Card key={review.id}>
              <CardContent className="p-6">
                <div className="flex items-center gap-4">
                  <div className="flex-1">
                    <p className="font-semibold">
                      {review.technician?.user?.name || 'Technician'}
                    </p>
                    <div className="flex items-center gap-1 mt-1">
                      {Array.from({ length: 5 }, (_, i) => (
                        <Star
                          key={i}
                          className={`h-4 w-4 ${
                            i < review.rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'
                          }`}
                        />
                      ))}
                    </div>
                    {review.comment && <p className="text-sm mt-2">{review.comment}</p>}
                    <p className="text-xs text-muted-foreground mt-2">
                      {new Date(review.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}