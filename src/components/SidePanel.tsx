import { BarChart3, Database, Filter, Layers, TrendingUp } from 'lucide-react';
import { Button } from './ui/button';
import { cn } from '@/lib/utils';
import { useState } from 'react';

const navItems = [
  { icon: Layers, label: 'Overview', active: true },
  { icon: BarChart3, label: 'Analytics', active: false },
  { icon: TrendingUp, label: 'Trends', active: false },
  { icon: Database, label: 'Data Sources', active: false },
];

const filterOptions = [
  'Last 24 Hours',
  'Last 7 Days',
  'Last 30 Days',
  'Custom Range'
];

export const SidePanel = () => {
  const [activeFilter, setActiveFilter] = useState('Last 24 Hours');

  return (
    <aside className="w-64 glass-panel border-r border-border/50 p-4 flex flex-col gap-6">
      {/* Sessions */}
      <div className="space-y-2">
        <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
          Sessions
        </h3>
        <div className="space-y-1">
          {navItems.map((item) => (
            <Button
              key={item.label}
              variant="ghost"
              className={cn(
                "w-full justify-start gap-3 glass-hover",
                item.active && "bg-primary/10 text-primary border border-primary/20 indigo-glow"
              )}
            >
              <item.icon className="w-4 h-4" />
              <span className="text-sm">{item.label}</span>
            </Button>
          ))}
        </div>
      </div>

      {/* Filters */}
      <div className="space-y-2">
        <div className="flex items-center gap-2">
          <Filter className="w-3 h-3 text-muted-foreground" />
          <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
            Time Range
          </h3>
        </div>
        <div className="flex flex-wrap gap-2">
          {filterOptions.map((filter) => (
            <button
              key={filter}
              onClick={() => setActiveFilter(filter)}
              className={cn(
                "px-3 py-1.5 rounded-full text-xs font-medium transition-all duration-200",
                "glass-panel border",
                activeFilter === filter
                  ? "bg-primary/20 border-primary/40 text-primary indigo-glow"
                  : "border-border/30 text-muted-foreground hover:border-primary/20"
              )}
            >
              {filter}
            </button>
          ))}
        </div>
      </div>

      {/* Quick Stats */}
      <div className="mt-auto space-y-2">
        <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
          Quick Stats
        </h3>
        <div className="glass-panel p-3 rounded-lg space-y-2">
          <div className="flex justify-between items-center">
            <span className="text-xs text-muted-foreground">Active Users</span>
            <span className="text-sm font-semibold text-primary">1,248</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-xs text-muted-foreground">Data Points</span>
            <span className="text-sm font-semibold text-primary">45.2K</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-xs text-muted-foreground">Uptime</span>
            <span className="text-sm font-semibold text-emerald-400">99.9%</span>
          </div>
        </div>
      </div>
    </aside>
  );
};
