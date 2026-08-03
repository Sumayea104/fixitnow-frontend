'use client';

import { useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Star, Loader2 } from 'lucide-react';
import { toast } from 'sonner';

import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Textarea } from '@/components/ui/textarea';
import { api } from '@/lib/api';

const reviewSchema = z.object({
  rating: z.number().min(1, 'Please select a rating').max(5),
  comment: z.string().max(500, 'Comment cannot exceed 500 characters').optional(),
});

type ReviewFormValues = z.infer<typeof reviewSchema>;

interface ReviewFormProps {
  bookingId: string;
  onSuccess?: () => void;
}

export function ReviewForm({ bookingId, onSuccess }: ReviewFormProps) {
  const queryClient = useQueryClient();
  const [selectedRating, setSelectedRating] = useState(0);
  const [hoveredRating, setHoveredRating] = useState(0);

  const form = useForm<ReviewFormValues>({
    resolver: zodResolver(reviewSchema),
    defaultValues: {
      rating: 0,
      comment: '',
    },
  });
const createReview = useMutation({
    mutationFn: async (data: ReviewFormValues) => {
      
      const response = (await api.post('/reviews', {
        bookingId,
        rating: data.rating,
        comment: data.comment,
      })) as { data:unknown };
      
      return response.data;
    },
    onSuccess: () => {
      toast.success('Review submitted successfully!');
      queryClient.invalidateQueries({ queryKey: ['reviews'] });
      queryClient.invalidateQueries({ queryKey: ['bookings'] });
      onSuccess?.();
      form.reset();
      setSelectedRating(0);
    },
    onError: (error: unknown) => {
      const err = error as { response?: { data?: { message?: string } }; message?: string };
      const errorMessage =
        err.response?.data?.message || err.message || 'Failed to submit review';
      toast.error(errorMessage);
    },
  });

  const onSubmit = (data: ReviewFormValues) => {
    createReview.mutate(data);
  };

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => {
      const starIndex = i + 1;
      const isFilled = starIndex <= (hoveredRating || selectedRating || rating);
      return (
        <Star
          key={i}
          className={`h-8 w-8 cursor-pointer transition-colors ${
            isFilled ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'
          }`}
          onMouseEnter={() => setHoveredRating(starIndex)}
          onMouseLeave={() => setHoveredRating(0)}
          onClick={() => {
            setSelectedRating(starIndex);
            form.setValue('rating', starIndex);
          }}
        />
      );
    });
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="rating"
          render={() => (
            <FormItem>
              <FormLabel>Rating</FormLabel>
              <FormControl>
                <div className="flex items-center gap-1">
                  {renderStars(0)}
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="comment"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Review</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Share your experience..."
                  className="min-h-25"
                  {...field}
                  disabled={createReview.isPending}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button
          type="submit"
          disabled={createReview.isPending || !selectedRating}
        >
          {createReview.isPending ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Submitting...
            </>
          ) : (
            'Submit Review'
          )}
        </Button>
      </form>
    </Form>
  );
}