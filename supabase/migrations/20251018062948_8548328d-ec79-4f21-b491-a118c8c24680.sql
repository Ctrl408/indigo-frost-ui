-- Create sessions table
CREATE TABLE public.sessions (
  id BIGSERIAL PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  name TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL
);

-- Create visualizations table
CREATE TABLE public.visualizations (
  id BIGSERIAL PRIMARY KEY,
  session_id BIGINT REFERENCES public.sessions(id) ON DELETE CASCADE NOT NULL,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  chart_type TEXT NOT NULL,
  nl_question TEXT,
  generated_sql TEXT,
  pos_x INTEGER DEFAULT 0 NOT NULL,
  pos_y INTEGER DEFAULT 0 NOT NULL,
  width INTEGER DEFAULT 6 NOT NULL,
  height INTEGER DEFAULT 5 NOT NULL,
  refresh_interval INTEGER DEFAULT 30 NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL
);

-- Create filters table
CREATE TABLE public.filters (
  id BIGSERIAL PRIMARY KEY,
  session_id BIGINT REFERENCES public.sessions(id) ON DELETE CASCADE NOT NULL,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  filter_type TEXT NOT NULL,
  label TEXT NOT NULL,
  column_to_filter TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL
);

-- Enable RLS
ALTER TABLE public.sessions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.visualizations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.filters ENABLE ROW LEVEL SECURITY;

-- RLS Policies for sessions
CREATE POLICY "Users can view their own sessions"
  ON public.sessions FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own sessions"
  ON public.sessions FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own sessions"
  ON public.sessions FOR UPDATE
  USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own sessions"
  ON public.sessions FOR DELETE
  USING (auth.uid() = user_id);

-- RLS Policies for visualizations
CREATE POLICY "Users can view their own visualizations"
  ON public.visualizations FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own visualizations"
  ON public.visualizations FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own visualizations"
  ON public.visualizations FOR UPDATE
  USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own visualizations"
  ON public.visualizations FOR DELETE
  USING (auth.uid() = user_id);

-- RLS Policies for filters
CREATE POLICY "Users can view their own filters"
  ON public.filters FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own filters"
  ON public.filters FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete their own filters"
  ON public.filters FOR DELETE
  USING (auth.uid() = user_id);

-- Triggers for updated_at
CREATE OR REPLACE FUNCTION public.handle_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER sessions_updated_at
  BEFORE UPDATE ON public.sessions
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_updated_at();

CREATE TRIGGER visualizations_updated_at
  BEFORE UPDATE ON public.visualizations
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_updated_at();