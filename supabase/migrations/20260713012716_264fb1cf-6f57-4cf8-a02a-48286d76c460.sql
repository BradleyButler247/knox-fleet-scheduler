
-- Jobs (truck schedule entries)
CREATE TABLE public.jobs (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  truck_id TEXT NOT NULL,
  work TEXT NOT NULL,
  bay TEXT NOT NULL,
  employee TEXT NOT NULL DEFAULT '',
  date DATE NOT NULL,
  shift TEXT NOT NULL DEFAULT 'ALL_DAY',
  completed BOOLEAN NOT NULL DEFAULT false,
  company TEXT,
  color TEXT,
  priority INTEGER,
  created_at_ms BIGINT NOT NULL DEFAULT (extract(epoch from now()) * 1000)::bigint,
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
CREATE INDEX jobs_date_idx ON public.jobs(date);
CREATE INDEX jobs_truck_idx ON public.jobs(truck_id);
GRANT SELECT, INSERT, UPDATE, DELETE ON public.jobs TO anon, authenticated;
GRANT ALL ON public.jobs TO service_role;
ALTER TABLE public.jobs ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public read jobs"   ON public.jobs FOR SELECT TO anon, authenticated USING (true);
CREATE POLICY "Public insert jobs" ON public.jobs FOR INSERT TO anon, authenticated WITH CHECK (true);
CREATE POLICY "Public update jobs" ON public.jobs FOR UPDATE TO anon, authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Public delete jobs" ON public.jobs FOR DELETE TO anon, authenticated USING (true);

-- Job notes (multiple notes per job)
CREATE TABLE public.job_notes (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  job_id UUID NOT NULL REFERENCES public.jobs(id) ON DELETE CASCADE,
  text TEXT NOT NULL DEFAULT '',
  created_at_ms BIGINT NOT NULL DEFAULT (extract(epoch from now()) * 1000)::bigint
);
CREATE INDEX job_notes_job_idx ON public.job_notes(job_id);
GRANT SELECT, INSERT, UPDATE, DELETE ON public.job_notes TO anon, authenticated;
GRANT ALL ON public.job_notes TO service_role;
ALTER TABLE public.job_notes ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public read job_notes"   ON public.job_notes FOR SELECT TO anon, authenticated USING (true);
CREATE POLICY "Public insert job_notes" ON public.job_notes FOR INSERT TO anon, authenticated WITH CHECK (true);
CREATE POLICY "Public update job_notes" ON public.job_notes FOR UPDATE TO anon, authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Public delete job_notes" ON public.job_notes FOR DELETE TO anon, authenticated USING (true);

-- Per-truck free-form note (one row per truck)
CREATE TABLE public.truck_notes (
  truck_id TEXT NOT NULL PRIMARY KEY,
  note TEXT NOT NULL DEFAULT '',
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
GRANT SELECT, INSERT, UPDATE, DELETE ON public.truck_notes TO anon, authenticated;
GRANT ALL ON public.truck_notes TO service_role;
ALTER TABLE public.truck_notes ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public read truck_notes"   ON public.truck_notes FOR SELECT TO anon, authenticated USING (true);
CREATE POLICY "Public insert truck_notes" ON public.truck_notes FOR INSERT TO anon, authenticated WITH CHECK (true);
CREATE POLICY "Public update truck_notes" ON public.truck_notes FOR UPDATE TO anon, authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Public delete truck_notes" ON public.truck_notes FOR DELETE TO anon, authenticated USING (true);

-- Per-truck completion/invoice status
CREATE TABLE public.truck_status (
  truck_id TEXT NOT NULL PRIMARY KEY,
  completed BOOLEAN NOT NULL DEFAULT false,
  invoiced BOOLEAN NOT NULL DEFAULT false,
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
GRANT SELECT, INSERT, UPDATE, DELETE ON public.truck_status TO anon, authenticated;
GRANT ALL ON public.truck_status TO service_role;
ALTER TABLE public.truck_status ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public read truck_status"   ON public.truck_status FOR SELECT TO anon, authenticated USING (true);
CREATE POLICY "Public insert truck_status" ON public.truck_status FOR INSERT TO anon, authenticated WITH CHECK (true);
CREATE POLICY "Public update truck_status" ON public.truck_status FOR UPDATE TO anon, authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Public delete truck_status" ON public.truck_status FOR DELETE TO anon, authenticated USING (true);

-- Per-truck attached files (data URLs inline)
CREATE TABLE public.truck_files (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  truck_id TEXT NOT NULL,
  name TEXT NOT NULL,
  type TEXT NOT NULL DEFAULT 'application/octet-stream',
  size BIGINT NOT NULL DEFAULT 0,
  data_url TEXT NOT NULL,
  uploaded_at_ms BIGINT NOT NULL DEFAULT (extract(epoch from now()) * 1000)::bigint
);
CREATE INDEX truck_files_truck_idx ON public.truck_files(truck_id);
GRANT SELECT, INSERT, UPDATE, DELETE ON public.truck_files TO anon, authenticated;
GRANT ALL ON public.truck_files TO service_role;
ALTER TABLE public.truck_files ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public read truck_files"   ON public.truck_files FOR SELECT TO anon, authenticated USING (true);
CREATE POLICY "Public insert truck_files" ON public.truck_files FOR INSERT TO anon, authenticated WITH CHECK (true);
CREATE POLICY "Public update truck_files" ON public.truck_files FOR UPDATE TO anon, authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Public delete truck_files" ON public.truck_files FOR DELETE TO anon, authenticated USING (true);

-- Per-day, per-bay notes shown in the bay grid
CREATE TABLE public.bay_notes (
  date DATE NOT NULL,
  bay TEXT NOT NULL,
  note TEXT NOT NULL DEFAULT '',
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  PRIMARY KEY (date, bay)
);
GRANT SELECT, INSERT, UPDATE, DELETE ON public.bay_notes TO anon, authenticated;
GRANT ALL ON public.bay_notes TO service_role;
ALTER TABLE public.bay_notes ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public read bay_notes"   ON public.bay_notes FOR SELECT TO anon, authenticated USING (true);
CREATE POLICY "Public insert bay_notes" ON public.bay_notes FOR INSERT TO anon, authenticated WITH CHECK (true);
CREATE POLICY "Public update bay_notes" ON public.bay_notes FOR UPDATE TO anon, authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Public delete bay_notes" ON public.bay_notes FOR DELETE TO anon, authenticated USING (true);

-- Shared counters (paint-booth alternator, etc.)
CREATE TABLE public.counters (
  key TEXT NOT NULL PRIMARY KEY,
  value BIGINT NOT NULL DEFAULT 0,
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
GRANT SELECT, INSERT, UPDATE, DELETE ON public.counters TO anon, authenticated;
GRANT ALL ON public.counters TO service_role;
ALTER TABLE public.counters ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public read counters"   ON public.counters FOR SELECT TO anon, authenticated USING (true);
CREATE POLICY "Public insert counters" ON public.counters FOR INSERT TO anon, authenticated WITH CHECK (true);
CREATE POLICY "Public update counters" ON public.counters FOR UPDATE TO anon, authenticated USING (true) WITH CHECK (true);

-- Atomic increment for the paint-booth alternator
CREATE OR REPLACE FUNCTION public.bump_counter(_key TEXT)
RETURNS BIGINT
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  v BIGINT;
BEGIN
  INSERT INTO public.counters(key, value) VALUES (_key, 0)
  ON CONFLICT (key) DO NOTHING;
  UPDATE public.counters SET value = value + 1, updated_at = now()
    WHERE key = _key
    RETURNING value INTO v;
  RETURN v;
END;
$$;
GRANT EXECUTE ON FUNCTION public.bump_counter(TEXT) TO anon, authenticated;

-- Enable realtime for collaborative editing
ALTER PUBLICATION supabase_realtime ADD TABLE public.jobs;
ALTER PUBLICATION supabase_realtime ADD TABLE public.job_notes;
ALTER PUBLICATION supabase_realtime ADD TABLE public.truck_notes;
ALTER PUBLICATION supabase_realtime ADD TABLE public.truck_status;
ALTER PUBLICATION supabase_realtime ADD TABLE public.truck_files;
ALTER PUBLICATION supabase_realtime ADD TABLE public.bay_notes;
