'use client';

import { Badge } from '@/components/ui/badge';

const statusMap = {
  REQUESTED: { label: 'Requested', variant: 'warning' as const },
  ACCEPTED: { label: 'Accepted', variant: 'info' as const },
  PAID: { label: 'Paid', variant: 'default' as const },
  IN_PROGRESS: { label: 'In Progress', variant: 'success' as const },
  COMPLETED: { label: 'Completed', variant: 'secondary' as const },
  DECLINED: { label: 'Declined', variant: 'destructive' as const },
  CANCELLED: { label: 'Cancelled', variant: 'destructive' as const },
} as const;

type BookingStatus = keyof typeof statusMap;

interface StatusBadgeProps {
  status: BookingStatus;
  className?: string;
}

export function StatusBadge({ status, className }: StatusBadgeProps) {
  const config = statusMap[status];

  return (
    <Badge variant={config.variant} className={className}>
      {config.label}
    </Badge>
  );
}