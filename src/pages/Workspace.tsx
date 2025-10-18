import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { DashboardLayout } from '@/components/DashboardLayout';
import { Button } from '@/components/ui/button';
import { Plus, Settings2 } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import type { Session } from '@supabase/supabase-js';

interface SessionData {
  id: number;
  name: string;
}

export default function Workspace() {
  const { sessionId } = useParams<{ sessionId: string }>();
  const [session, setSession] = useState<SessionData | null>(null);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<Session | null>(null);
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session);
      if (!session) {
        navigate('/auth');
      } else {
        fetchSession();
      }
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_, session) => {
      setUser(session);
      if (!session) {
        navigate('/auth');
      }
    });

    return () => subscription.unsubscribe();
  }, [navigate, sessionId]);

  const fetchSession = async () => {
    if (!sessionId) return;

    try {
      const { data, error } = await supabase
        .from('sessions')
        .select('*')
        .eq('id', parseInt(sessionId))
        .single();

      if (error) throw error;
      setSession(data);
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to load session',
        variant: 'destructive',
      });
      navigate('/sessions');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <DashboardLayout>
        <div className="flex items-center justify-center h-full">
          <div className="text-muted-foreground">Loading workspace...</div>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground text-glow">{session?.name}</h1>
            <p className="text-sm text-muted-foreground mt-1">Design and arrange your visualizations</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="icon">
              <Settings2 className="w-4 h-4" />
            </Button>
            <Button className="indigo-glow">
              <Plus className="w-4 h-4 mr-2" />
              Add Visualization
            </Button>
          </div>
        </div>

        <div className="glass-panel rounded-xl p-8 min-h-[600px]">
          <div className="flex items-center justify-center h-full">
            <div className="text-center space-y-4">
              <div className="w-16 h-16 rounded-full bg-primary/10 border border-primary/20 mx-auto flex items-center justify-center">
                <Plus className="w-8 h-8 text-primary" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-foreground mb-2">No visualizations yet</h3>
                <p className="text-sm text-muted-foreground max-w-md">
                  Start by adding your first visualization. Ask questions in natural language and watch them transform into interactive charts.
                </p>
              </div>
              <Button className="indigo-glow mt-4">
                <Plus className="w-4 h-4 mr-2" />
                Create First Visualization
              </Button>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
