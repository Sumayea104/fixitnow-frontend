'use client';

import { useParams } from 'next/navigation';
import Link from 'next/link';
import { Star, MapPin, Briefcase, Clock, CheckCircle, XCircle } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Skeleton } from '@/components/ui/skeleton';
import { useTechnicianProfile } from '@/features/technicians/hooks/useTechnicianProfile';

const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

export default function TechnicianProfilePage() {
  const params = useParams();
  const id = params?.id as string;

  const { data, isLoading, error } = useTechnicianProfile(id);

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="grid gap-8 md:grid-cols-3">
          <div className="md:col-span-2 space-y-6">
            <Skeleton className="h-12 w-48" />
            <Skeleton className="h-32 w-full" />
            <Skeleton className="h-48 w-full" />
          </div>
          <div className="space-y-6">
            <Skeleton className="h-64 w-full" />
            <Skeleton className="h-32 w-full" />
          </div>
        </div>
      </div>
    );
  }

  if (error || !data) {
    return (
      <div className="container mx-auto px-4 py-8 text-center">
        <h1 className="text-2xl font-bold text-red-500">Technician not found</h1>
        <p className="text-muted-foreground mt-2">The technician you&apos;re looking for doesn&apos;t exist.</p>
        <Link href="/technicians">
          <Button className="mt-4">Browse Technicians</Button>
        </Link>
      </div>
    );
  }

  const technician = data;

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid gap-8 md:grid-cols-3">
        {/* Main Content */}
        <div className="md:col-span-2 space-y-6">
          {/* Header */}
          <div className="flex items-start gap-4">
            <Avatar className="h-20 w-20">
              <AvatarImage src={technician.user?.profileImage} />
              <AvatarFallback className="text-2xl">
                {technician.user?.name?.charAt(0) || 'T'}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <h1 className="text-3xl font-bold">{technician.user?.name}</h1>
              <div className="flex items-center gap-3 mt-1">
                <div className="flex items-center gap-1">
                  <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                  <span className="font-semibold">{technician.averageRating?.toFixed(1) ?? 'New'}</span>
                  <span className="text-muted-foreground">({technician.totalReviews ?? 0} reviews)</span>
                </div>
                {technician.isVerified && (
                  <Badge variant="success" className="flex items-center gap-1">
                    <CheckCircle className="h-3 w-3" /> Verified
                  </Badge>
                )}
                <Badge variant={technician.isAvailable ? 'success' : 'secondary'}>
                  {technician.isAvailable ? 'Available' : 'Busy'}
                </Badge>
              </div>
              <div className="flex flex-wrap items-center gap-3 mt-2 text-sm text-muted-foreground">
                {technician.location && (
                  <span className="flex items-center gap-1">
                    <MapPin className="h-4 w-4" /> {technician.location}
                  </span>
                )}
                {technician.experience !== undefined && technician.experience !== null && (
                  <span className="flex items-center gap-1">
                    <Briefcase className="h-4 w-4" /> {technician.experience} years experience
                  </span>
                )}
                {technician.hourlyRate && (
                  <span className="flex items-center gap-1">
                    <Clock className="h-4 w-4" /> ${technician.hourlyRate}/hr
                  </span>
                )}
                <span>{technician.completedJobs || 0} jobs completed</span>
              </div>
            </div>
          </div>

          {/* Bio */}
          {technician.bio && (
            <Card>
              <CardContent className="p-4">
                <p className="text-sm leading-relaxed">{technician.bio}</p>
              </CardContent>
            </Card>
          )}

          {/* Skills */}
          {technician.skills && technician.skills.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Skills</CardTitle>
              </CardHeader>
              <CardContent className="pt-0">
                <div className="flex flex-wrap gap-2">
                  {technician.skills.map((skill) => (
                    <Badge key={skill} variant="secondary" className="text-sm">
                      {skill}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

          {/* Services */}
          {technician.services && technician.services.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Services</CardTitle>
              </CardHeader>
              <CardContent className="pt-0 space-y-3">
                {technician.services.map((service) => (
                  <div
                    key={service.id}
                    className="flex items-center justify-between p-3 border rounded-lg hover:bg-muted/50 transition-colors"
                  >
                    <div>
                      <p className="font-medium">{service.title}</p>
                      <p className="text-sm text-muted-foreground">{service.category?.name}</p>
                      {service.durationMinutes && (
                        <p className="text-xs text-muted-foreground">
                          {service.durationMinutes} minutes
                        </p>
                      )}
                    </div>
                    <div className="text-right">
                      <p className="text-lg font-bold">${service.price}</p>
                      {service.discountedPrice && (
                        <p className="text-xs text-muted-foreground line-through">
                          ${service.price}
                        </p>
                      )}
                      <Link href={`/services/${service.id}`}>
                        <Button size="sm" className="mt-1">Book</Button>
                      </Link>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          )}

          {/* Reviews */}
          {technician.reviews && technician.reviews.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Reviews</CardTitle>
              </CardHeader>
              <CardContent className="pt-0 space-y-4">
                {technician.reviews.slice(0, 5).map((review) => (
                  <div key={review.id} className="border-b last:border-0 pb-4 last:pb-0">
                    <div className="flex items-center gap-2">
                      <Avatar className="h-8 w-8">
                        <AvatarImage src={review.customer?.profileImage} />
                        <AvatarFallback>
                          {review.customer?.name?.charAt(0) || 'U'}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-medium text-sm">{review.customer?.name}</p>
                        <div className="flex items-center gap-2">
                          <div className="flex items-center gap-0.5">
                            {Array.from({ length: 5 }, (_, i) => (
                              <Star
                                key={i}
                                className={`h-3 w-3 ${
                                  i < review.rating
                                    ? 'fill-yellow-400 text-yellow-400'
                                    : 'text-gray-300'
                                }`}
                              />
                            ))}
                          </div>
                          <span className="text-xs text-muted-foreground">
                            {new Date(review.createdAt).toLocaleDateString()}
                          </span>
                        </div>
                      </div>
                    </div>
                    {review.comment && (
                      <p className="text-sm mt-1 ml-10">{review.comment}</p>
                    )}
                  </div>
                ))}
              </CardContent>
            </Card>
          )}
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Book Now Card */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Book This Technician</CardTitle>
            </CardHeader>
            <CardContent className="pt-0 space-y-4">
              {technician.isAvailable ? (
                <>
                  <div className="flex items-center gap-2 text-green-600">
                    <CheckCircle className="h-4 w-4" />
                    <span className="text-sm font-medium">Available Now</span>
                  </div>
                  <Link href={`/services?technician=${technician.id}`}>
                    <Button className="w-full">Book Now</Button>
                  </Link>
                </>
              ) : (
                <div className="flex items-center gap-2 text-red-500">
                  <XCircle className="h-4 w-4" />
                  <span className="text-sm font-medium">Currently Unavailable</span>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Availability Card */}
          {technician.availabilitySlots && technician.availabilitySlots.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Availability</CardTitle>
              </CardHeader>
              <CardContent className="pt-0 space-y-2">
                {technician.availabilitySlots.slice(0, 5).map((slot) => (
                  <div key={slot.id} className="flex items-center justify-between text-sm">
                    <span className="font-medium">{days[slot.dayOfWeek]}</span>
                    <span className="text-muted-foreground">
                      {slot.startTime} - {slot.endTime}
                    </span>
                  </div>
                ))}
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}