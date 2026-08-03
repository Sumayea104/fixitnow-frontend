'use client';

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Loader2 } from 'lucide-react';
import { toast } from 'sonner';
import { useAuth } from '@/features/auth/hooks/useAuth';
import { api } from '@/lib/api';

interface ProfileData {
  bio?: string;
  hourlyRate?: number;
  experienceYears?: number;
}

export default function TechnicianProfilePage() {
  const { isAuthenticated } = useAuth();
  const queryClient = useQueryClient();

  // Fetch technician profile
  const { data, isLoading } = useQuery({
    queryKey: ['technician-profile'],
    queryFn: async () => {
      const res = (await api.get('/technician/profile')) as { data: { data: ProfileData } };
      return res.data;
    },
    enabled: isAuthenticated,
  });

  const profile = data?.data;

  // Local state for form edits (overrides fetched profile)
  const [formData, setFormData] = useState<Partial<ProfileData>>({});

  // Update profile mutation
  const updateProfileMutation = useMutation({
    mutationFn: async (updatedData: ProfileData) => {
      const res = (await api.patch('/technician/profile', updatedData)) as { data: unknown };
      return res.data;
    },
    onSuccess: () => {
      toast.success('Profile updated successfully!');
      queryClient.invalidateQueries({ queryKey: ['technician-profile'] });
      setFormData({}); // Reset local overrides after save
    },
    onError: (error: unknown) => {
      const err = error as { response?: { data?: { message?: string } }; message?: string };
      toast.error(err.response?.data?.message || err.message || 'Failed to update profile');
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateProfileMutation.mutate({
      bio: formData.bio ?? profile?.bio ?? '',
      hourlyRate: formData.hourlyRate ?? profile?.hourlyRate ?? 0,
      experienceYears: formData.experienceYears ?? profile?.experienceYears ?? 0,
    });
  };

  if (!isAuthenticated) {
    return <div>Please login to view profile settings</div>;
  }

  if (isLoading) {
    return (
      <div className="flex h-96 items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Technician Profile</h1>
        <p className="text-muted-foreground">Manage your bio, hourly rates, and experience</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Profile Details</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="bio">Bio / About You</Label>
              <Input
                id="bio"
                value={formData.bio ?? profile?.bio ?? ''}
                onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                placeholder="Brief description of your expertise"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="hourlyRate">Hourly Rate ($)</Label>
                <Input
                  id="hourlyRate"
                  type="number"
                  value={formData.hourlyRate ?? profile?.hourlyRate ?? 0}
                  onChange={(e) => setFormData({ ...formData, hourlyRate: Number(e.target.value) })}
                  placeholder="25"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="experienceYears">Experience (Years)</Label>
                <Input
                  id="experienceYears"
                  type="number"
                  value={formData.experienceYears ?? profile?.experienceYears ?? 0}
                  onChange={(e) => setFormData({ ...formData, experienceYears: Number(e.target.value) })}
                  placeholder="3"
                />
              </div>
            </div>

            <Button type="submit" className="w-full" disabled={updateProfileMutation.isPending}>
              {updateProfileMutation.isPending ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Saving...
                </>
              ) : (
                'Save Changes'
              )}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}