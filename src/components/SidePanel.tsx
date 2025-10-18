import { LayoutDashboard, Database, LogOut } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Button } from './ui/button';
import { cn } from '@/lib/utils';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

export const SidePanel = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { toast } = useToast();

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    toast({ title: 'Signed out successfully' });
    navigate('/auth');
  };

  const navItems = [
    { icon: LayoutDashboard, label: 'Sessions', path: '/sessions' },
    { icon: Database, label: 'Data Sources', path: '/data-sources' },
  ];

  return (
    <aside className="w-64 glass-panel border-r border-border/50 p-4 flex flex-col gap-6">
      {/* Navigation */}
      <div className="space-y-2">
        <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
          Navigation
        </h3>
        <div className="space-y-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;
            return (
              <Button
                key={item.path}
                variant="ghost"
                onClick={() => navigate(item.path)}
                className={cn(
                  "w-full justify-start gap-3 glass-hover",
                  isActive && "bg-primary/10 text-primary border border-primary/20 indigo-glow"
                )}
              >
                <Icon className="w-4 h-4" />
                <span className="text-sm">{item.label}</span>
              </Button>
            );
          })}
        </div>
      </div>

      {/* Sign Out */}
      <div className="mt-auto">
        <Button 
          variant="ghost"
          onClick={handleSignOut}
          className="w-full justify-start gap-3 text-muted-foreground hover:text-destructive glass-hover"
        >
          <LogOut className="w-4 h-4" />
          <span className="text-sm">Sign Out</span>
        </Button>
      </div>
    </aside>
  );
};
