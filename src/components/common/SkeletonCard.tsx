import { Skeleton } from '@/components/ui/skeleton';
import { Card, CardContent, CardHeader } from '@/components/ui/card';

export function SkeletonCard() {
  return (
    <Card>
      <CardHeader>
        <Skeleton className="h-4 w-1/2" />
        <Skeleton className="h-3 w-3/4" />
      </CardHeader>
      <CardContent className="space-y-2">
        <Skeleton className="h-20 w-full" />
        <div className="flex gap-2">
          <Skeleton className="h-8 w-16" />
          <Skeleton className="h-8 w-16" />
        </div>
      </CardContent>
    </Card>
  );
}