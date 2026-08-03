'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Star, Clock, MapPin } from 'lucide-react';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import type { Service } from '../hooks/useServices';

interface ServiceCardProps {
  service: Service;
}

export function ServiceCard({ service }: ServiceCardProps) {
  const price = service.discountedPrice || service.price;

  return (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow">
      <CardHeader className="p-0">
        {service.images && service.images.length > 0 ? (
          <div className="relative h-48 w-full bg-muted">
            <Image
              src={service.images[0]}
              alt={service.title}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          </div>
        ) : (
          <div className="flex h-48 items-center justify-center bg-muted text-muted-foreground">
            No image
          </div>
        )}
        {service.isFeatured && (
          <Badge className="absolute top-3 right-3" variant="success">
            Featured
          </Badge>
        )}
      </CardHeader>

      <CardContent className="p-4">
        <div className="flex items-start justify-between">
          <div>
            <Link href={`/services/${service.id}`}>
              <h3 className="font-semibold hover:underline line-clamp-1">
                {service.title}
              </h3>
            </Link>
            <p className="text-sm text-muted-foreground line-clamp-2 mt-1">
              {service.description}
            </p>
          </div>
          <Badge variant="outline" className="ml-2 shrink-0">
            {service.category?.name}
          </Badge>
        </div>

        <div className="mt-3 flex flex-wrap items-center gap-3 text-sm text-muted-foreground">
          <div className="flex items-center gap-1">
            <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
            <span>{service.averageRating?.toFixed(1) || 'New'}</span>
            <span>({service.totalReviews || 0})</span>
          </div>

          {service.technician?.location && (
            <div className="flex items-center gap-1">
              <MapPin className="h-4 w-4" />
              <span className="line-clamp-1">{service.technician.location}</span>
            </div>
          )}

          {service.durationMinutes && (
            <div className="flex items-center gap-1">
              <Clock className="h-4 w-4" />
              <span>{service.durationMinutes} min</span>
            </div>
          )}
        </div>

        <div className="mt-3 flex flex-wrap gap-1">
          {service.tags?.slice(0, 3).map((tag) => (
            <Badge key={tag} variant="secondary" className="text-xs">
              {tag}
            </Badge>
          ))}
        </div>
      </CardContent>

      <CardFooter className="flex items-center justify-between p-4 pt-0">
        <div>
          {service.discountedPrice ? (
            <div>
              <span className="text-2xl font-bold">${price}</span>
              <span className="ml-2 text-sm text-muted-foreground line-through">
                ${service.price}
              </span>
            </div>
          ) : (
            <span className="text-2xl font-bold">${price}</span>
          )}
          <p className="text-xs text-muted-foreground">per service</p>
        </div>

        <Link href={`/services/${service.id}`}>
          <Button size="sm">Book Now</Button>
        </Link>
      </CardFooter>
    </Card>
  );
}