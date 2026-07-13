
CREATE TABLE public.job_hours (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  job_id UUID NOT NULL REFERENCES public.jobs(id) ON DELETE CASCADE,
  person TEXT NOT NULL DEFAULT '',
  date DATE NOT NULL,
  start_time TIME,
  stop_time TIME,
  created_at_ms BIGINT NOT NULL DEFAULT (EXTRACT(EPOCH FROM now()) * 1000)::BIGINT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

GRANT SELECT, INSERT, UPDATE, DELETE ON public.job_hours TO anon, authenticated;
GRANT ALL ON public.job_hours TO service_role;

ALTER TABLE public.job_hours ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public read job_hours" ON public.job_hours FOR SELECT USING (true);
CREATE POLICY "Public insert job_hours" ON public.job_hours FOR INSERT WITH CHECK (true);
CREATE POLICY "Public update job_hours" ON public.job_hours FOR UPDATE USING (true) WITH CHECK (true);
CREATE POLICY "Public delete job_hours" ON public.job_hours FOR DELETE USING (true);

ALTER PUBLICATION supabase_realtime ADD TABLE public.job_hours;
