import { ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface ChartCardProps {
  title: string;
  description?: string;
  children: ReactNode;
  className?: string;
}

export const ChartCard = ({ title, description, children, className }: ChartCardProps) => {
  return (
    <div className={cn("glass-panel rounded-xl p-6 glass-hover", className)}>
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-foreground">{title}</h3>
        {description && (
          <p className="text-sm text-muted-foreground mt-1">{description}</p>
        )}
      </div>
      <div className="h-64">
        {children}
      </div>
    </div>
  );
};
