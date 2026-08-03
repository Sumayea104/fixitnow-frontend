'use client';

import { useQuery } from '@tanstack/react-query';
import { useParams } from 'next/navigation';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Star, Loader2, User } from 'lucide-react';
import { useAuth } from '@/features/auth/hooks/useAuth';
import { api } from '@/lib/api';

interface TechnicianDetail {
  id: string;
  bio?: string;
  hourlyRate?: number;
  experienceYears?: number;
  rating?: number;
  user: {
    name: string;
    email: string;
  };
  category?: {
    name: string;
  };
}

interface ApiResponse {
  data: TechnicianDetail;
}

export default function TechnicianDetailPage() {
  const params = useParams();
  const id = params?.id as string;
  const { isAuthenticated } = useAuth();

  const { data, isLoading } = useQuery({
    queryKey: ['technician-detail', id],
    queryFn: async () => {
      const res = (await api.get(`/technicians/${id}`)) as { data: ApiResponse };
      return res.data;
    },
    enabled: isAuthenticated && Boolean(id),
  });

  const technician = data?.data;

  if (isLoading) {
    return (
      <div className="flex h-96 items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (!technician) {
    return (
      <div className="text-center py-12">
        <p className="text-muted-foreground">Technician not found.</p>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <Card>
        <CardHeader className="flex flex-row items-center gap-4 space-y-0">
          <div className="p-3 bg-muted rounded-full">
            <User className="h-10 w-10 text-muted-foreground" />
          </div>
          <div>
            <CardTitle className="text-2xl">{technician.user.name}</CardTitle>
            <p className="text-sm text-muted-foreground">{technician.category?.name || 'Technician'}</p>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center gap-4">
            <div className="flex items-center text-yellow-500">
              <Star className="h-5 w-5 fill-current" />
              <span className="ml-1 font-semibold">{technician.rating || 'N/A'}</span>
            </div>
            <Badge variant="outline">${technician.hourlyRate || 0}/hr</Badge>
            <Badge variant="secondary">{technician.experienceYears || 0} Years Exp.</Badge>
          </div>

          <div>
            <h3 className="font-semibold text-lg">About</h3>
            <p className="text-muted-foreground mt-1">
              {technician.bio || 'No bio available for this technician.'}
            </p>
          </div>

          <Button className="w-full mt-4">Book Now</Button>
        </CardContent>
      </Card>
    </div>
  );
}