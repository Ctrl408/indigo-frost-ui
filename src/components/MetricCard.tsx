import { LucideIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

interface MetricCardProps {
  title: string;
  value: string;
  change?: string;
  changeType?: 'positive' | 'negative' | 'neutral';
  icon: LucideIcon;
  className?: string;
}

export const MetricCard = ({ 
  title, 
  value, 
  change, 
  changeType = 'neutral',
  icon: Icon,
  className 
}: MetricCardProps) => {
  return (
    <div className={cn(
      "glass-panel rounded-xl p-6 glass-hover group",
      className
    )}>
      <div className="flex items-start justify-between mb-4">
        <div className="p-2 rounded-lg bg-primary/10 border border-primary/20 group-hover:indigo-glow transition-all duration-200">
          <Icon className="w-5 h-5 text-primary" />
        </div>
        {change && (
          <span className={cn(
            "text-xs font-medium px-2 py-1 rounded-full",
            changeType === 'positive' && "bg-emerald-500/10 text-emerald-400",
            changeType === 'negative' && "bg-red-500/10 text-red-400",
            changeType === 'neutral' && "bg-primary/10 text-primary"
          )}>
            {change}
          </span>
        )}
      </div>
      <div>
        <p className="text-sm text-muted-foreground mb-1">{title}</p>
        <p className="text-2xl font-semibold text-foreground">{value}</p>
      </div>
    </div>
  );
};
