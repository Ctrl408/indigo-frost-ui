import { Bell, Settings, Search, Activity } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';

export const TopBar = () => {
  return (
    <header className="h-16 glass-panel border-b border-border/50 flex items-center justify-between px-6 sticky top-0 z-50">
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2">
          <Activity className="w-6 h-6 text-primary animate-glow-pulse" />
          <h1 className="text-xl font-semibold text-glow">Nexus Analytics</h1>
        </div>
      </div>

      <div className="flex-1 max-w-md mx-8">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input 
            placeholder="Search dashboards..." 
            className="pl-10 glass-panel border-border/50 focus:border-primary/50"
          />
        </div>
      </div>

      <div className="flex items-center gap-2">
        <Button variant="ghost" size="icon" className="glass-hover rounded-full">
          <Bell className="w-4 h-4" />
        </Button>
        <Button variant="ghost" size="icon" className="glass-hover rounded-full">
          <Settings className="w-4 h-4" />
        </Button>
        <div className="w-8 h-8 rounded-full bg-primary/20 border border-primary/30 flex items-center justify-center text-xs font-medium indigo-glow">
          JD
        </div>
      </div>
    </header>
  );
};
