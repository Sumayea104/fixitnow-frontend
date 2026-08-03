'use client';

import Link from 'next/link';
import { Star, MapPin, Briefcase, CheckCircle, XCircle } from 'lucide-react';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import type { Technician } from '@/features/technicians/hooks/useTechnicians';

interface TechnicianCardProps {
  technician: Technician;
}

export function TechnicianCard({ technician }: TechnicianCardProps) {
  return (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow">
      <CardHeader className="p-4 pb-0">
        <div className="flex items-start gap-4">
          <Avatar className="h-14 w-14">
            <AvatarImage src={technician.user?.profileImage} />
            <AvatarFallback>
              {technician.user?.name?.charAt(0) || 'T'}
            </AvatarFallback>
          </Avatar>
          <div className="flex-1 min-w-0">
            <Link href={`/technicians/${technician.id}`}>
              <h3 className="font-semibold hover:underline truncate">
                {technician.user?.name || 'Technician'}
              </h3>
            </Link>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <span>{technician.skills?.slice(0, 2).join(', ')}</span>
              {technician.skills && technician.skills.length > 2 && (
                <span>+{technician.skills.length - 2}</span>
              )}
            </div>
          </div>
          <div className="shrink-0">
            {technician.isVerified ? (
              <Badge variant="success" className="flex items-center gap-1">
                <CheckCircle className="h-3 w-3" /> Verified
              </Badge>
            ) : (
              <Badge variant="secondary" className="flex items-center gap-1">
                <XCircle className="h-3 w-3" /> Unverified
              </Badge>
            )}
          </div>
        </div>
      </CardHeader>
      <CardContent className="p-4">
        <p className="text-sm line-clamp-2">
          {technician.bio || 'Experienced professional'}
        </p>
        <div className="mt-3 flex flex-wrap items-center gap-4 text-sm">
          <div className="flex items-center gap-1">
            <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
            <span className="font-medium">
              {technician.averageRating?.toFixed(1) ?? 'New'}
            </span>
            <span className="text-muted-foreground">
              ({technician.totalReviews ?? 0})
            </span>
          </div>
          {technician.location && (
            <div className="flex items-center gap-1 text-muted-foreground">
              <MapPin className="h-4 w-4" />
              <span className="truncate max-w-30">
                {technician.location}
              </span>
            </div>
          )}
          {technician.experience !== undefined && (
            <div className="flex items-center gap-1 text-muted-foreground">
              <Briefcase className="h-4 w-4" />
              <span>{technician.experience} years</span>
            </div>
          )}
          <Badge variant={technician.isAvailable ? 'success' : 'secondary'}>
            {technician.isAvailable ? 'Available' : 'Busy'}
          </Badge>
        </div>
        {technician.services && technician.services.length > 0 && (
          <div className="mt-3 flex flex-wrap gap-1">
            {technician.services.slice(0, 3).map((service) => (
              <Badge key={service.id} variant="outline" className="text-xs">
                {service.title} (${service.price})
              </Badge>
            ))}
          </div>
        )}
        <div className="mt-3 text-sm text-muted-foreground">
          <span>Completed: {technician.completedJobs || 0} jobs</span>
          {technician.hourlyRate && (
            <span className="ml-4">${technician.hourlyRate}/hr</span>
          )}
        </div>
      </CardContent>
      <CardFooter className="p-4 pt-0">
        <Link href={`/technicians/${technician.id}`} className="w-full">
          <Button variant="outline" className="w-full">
            View Profile
          </Button>
        </Link>
      </CardFooter>
    </Card>
  );
}