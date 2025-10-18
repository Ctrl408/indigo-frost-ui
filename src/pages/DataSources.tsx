import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { DashboardLayout } from '@/components/DashboardLayout';
import { Database, Table2 } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import type { Session } from '@supabase/supabase-js';

export default function DataSources() {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<Session | null>(null);
  const [tables, setTables] = useState<string[]>([]);
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session);
      if (!session) {
        navigate('/auth');
      } else {
        fetchTables();
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

  const fetchTables = async () => {
    try {
      // Get available tables from the database
      const tables = ['sessions', 'visualizations', 'filters'];
      setTables(tables);
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to load data sources',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <DashboardLayout>
        <div className="flex items-center justify-center h-full">
          <div className="text-muted-foreground">Loading data sources...</div>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="max-w-5xl mx-auto space-y-8">
        <div>
          <h1 className="text-4xl font-bold text-foreground mb-2 text-glow">Data Sources</h1>
          <p className="text-muted-foreground">View and explore your database tables</p>
        </div>

        <div className="grid gap-4">
          {tables.map((tableName) => (
            <div key={tableName} className="glass-panel rounded-xl p-6 glass-hover">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center flex-shrink-0">
                  <Table2 className="w-6 h-6 text-primary" />
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-foreground mb-1">{tableName}</h3>
                  <p className="text-sm text-muted-foreground">Database table</p>
                </div>
                <div className="flex items-center gap-2">
                  <div className="px-3 py-1 rounded-full bg-primary/10 border border-primary/20">
                    <span className="text-xs text-primary font-medium">Active</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="glass-panel rounded-xl p-8 text-center">
          <div className="w-16 h-16 rounded-full bg-muted/20 border border-border mx-auto flex items-center justify-center mb-4">
            <Database className="w-8 h-8 text-muted-foreground" />
          </div>
          <h3 className="text-lg font-semibold text-foreground mb-2">Connect More Data Sources</h3>
          <p className="text-sm text-muted-foreground max-w-md mx-auto">
            Future updates will allow you to connect external databases, APIs, and file uploads.
          </p>
        </div>
      </div>
    </DashboardLayout>
  );
}
