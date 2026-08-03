import { cn } from '@/lib/utils';

interface SectionProps {
  children: React.ReactNode;
  className?: string;
  title?: string;
  description?: string;
}

export function Section({ children, className, title, description }: SectionProps) {
  return (
    <section className={cn('py-8 md:py-12', className)}>
      {(title || description) && (
        <div className="mb-6">
          {title && <h2 className="text-2xl font-bold tracking-tight">{title}</h2>}
          {description && (
            <p className="text-muted-foreground mt-1">{description}</p>
          )}
        </div>
      )}
      {children}
    </section>
  );
}