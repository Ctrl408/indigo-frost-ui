import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Plus, Trash2, ChevronRight } from 'lucide-react';
import { DashboardLayout } from '@/components/DashboardLayout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import type { Session } from '@supabase/supabase-js';

interface SessionData {
  id: number;
  name: string;
  created_at: string;
  updated_at: string;
}

export default function Sessions() {
  const [sessions, setSessions] = useState<SessionData[]>([]);
  const [newSessionName, setNewSessionName] = useState('');
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
        fetchSessions();
      }
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_, session) => {
      setUser(session);
      if (!session) {
        navigate('/auth');
      }
    });

    return () => subscription.unsubscribe();
  }, [navigate]);

  const fetchSessions = async () => {
    try {
      const { data, error } = await supabase
        .from('sessions')
        .select('*')
        .order('updated_at', { ascending: false });

      if (error) throw error;
      setSessions(data || []);
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to load sessions',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  const createSession = async () => {
    if (!newSessionName.trim() || !user) return;

    try {
      const { data, error } = await supabase
        .from('sessions')
        .insert([{ name: newSessionName, user_id: user.user.id }])
        .select()
        .single();

      if (error) throw error;

      toast({ title: 'Session created successfully' });
      setNewSessionName('');
      fetchSessions();
      navigate(`/workspace/${data.id}`);
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to create session',
        variant: 'destructive',
      });
    }
  };

  const deleteSession = async (id: number) => {
    try {
      const { error } = await supabase.from('sessions').delete().eq('id', id);
      if (error) throw error;

      toast({ title: 'Session deleted' });
      fetchSessions();
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to delete session',
        variant: 'destructive',
      });
    }
  };

  if (loading) {
    return (
      <DashboardLayout>
        <div className="flex items-center justify-center h-full">
          <div className="text-muted-foreground">Loading...</div>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="max-w-5xl mx-auto space-y-8">
        <div>
          <h1 className="text-4xl font-bold text-foreground mb-2 text-glow">Sessions</h1>
          <p className="text-muted-foreground">Create and manage your analysis sessions</p>
        </div>

        <div className="glass-panel rounded-xl p-6">
          <h2 className="text-lg font-semibold mb-4">Create New Session</h2>
          <div className="flex gap-3">
            <Input
              placeholder="Session name (e.g., Q4 Sales Analysis)"
              value={newSessionName}
              onChange={(e) => setNewSessionName(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && createSession()}
              className="flex-1 bg-background/50 border-border"
            />
            <Button onClick={createSession} className="indigo-glow">
              <Plus className="w-4 h-4 mr-2" />
              Create
            </Button>
          </div>
        </div>

        <div className="grid gap-4">
          {sessions.length === 0 ? (
            <div className="glass-panel rounded-xl p-12 text-center">
              <p className="text-muted-foreground mb-4">No sessions yet</p>
              <p className="text-sm text-muted-foreground">Create your first session to get started</p>
            </div>
          ) : (
            sessions.map((session) => (
              <div
                key={session.id}
                className="glass-panel rounded-xl p-6 glass-hover cursor-pointer group"
                onClick={() => navigate(`/workspace/${session.id}`)}
              >
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-foreground group-hover:text-primary transition-colors">
                      {session.name}
                    </h3>
                    <p className="text-sm text-muted-foreground mt-1">
                      Updated {new Date(session.updated_at).toLocaleDateString()}
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={(e) => {
                        e.stopPropagation();
                        deleteSession(session.id);
                      }}
                      className="opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <Trash2 className="w-4 h-4 text-destructive" />
                    </Button>
                    <ChevronRight className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors" />
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </DashboardLayout>
  );
}
