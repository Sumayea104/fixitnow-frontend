import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

export type BookingStatus =
  | 'REQUESTED'
  | 'ACCEPTED'
  | 'DECLINED'
  | 'PAID'
  | 'IN_PROGRESS'
  | 'COMPLETED'
  | 'CANCELLED'
  | string;

interface StatusBadgeProps {
  status: BookingStatus;
  className?: string;
}

const statusStyles: Record<string, string> = {
  REQUESTED: 'bg-amber-100 text-amber-800 hover:bg-amber-100 border-amber-200',
  ACCEPTED: 'bg-blue-100 text-blue-800 hover:bg-blue-100 border-blue-200',
  DECLINED: 'bg-rose-100 text-rose-800 hover:bg-rose-100 border-rose-200',
  PAID: 'bg-indigo-100 text-indigo-800 hover:bg-indigo-100 border-indigo-200',
  IN_PROGRESS: 'bg-purple-100 text-purple-800 hover:bg-purple-100 border-purple-200',
  COMPLETED: 'bg-emerald-100 text-emerald-800 hover:bg-emerald-100 border-emerald-200',
  CANCELLED: 'bg-gray-100 text-gray-800 hover:bg-gray-100 border-gray-200',
};

export function StatusBadge({ status, className }: StatusBadgeProps) {
  const normalizedStatus = status.toUpperCase();
  const style = statusStyles[normalizedStatus] || 'bg-gray-100 text-gray-800';

  return (
    <Badge
      variant="outline"
      className={cn('font-medium capitalize px-2.5 py-0.5 text-xs', style, className)}
    >
      {normalizedStatus.replace('_', ' ').toLowerCase()}
    </Badge>
  );
}