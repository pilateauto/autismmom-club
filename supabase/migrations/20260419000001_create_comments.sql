CREATE TABLE IF NOT EXISTS public.comments (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    resource_slug TEXT NOT NULL,
    author TEXT NOT NULL DEFAULT 'Anonymous Mom',
    text TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Turn on RLS
ALTER TABLE public.comments ENABLE ROW LEVEL SECURITY;

-- Allow anyone to insert a comment
CREATE POLICY "Allow public insert comments" ON public.comments
    FOR INSERT TO public
    WITH CHECK (true);

-- Allow anyone to read all comments
CREATE POLICY "Allow public read comments" ON public.comments
    FOR SELECT TO public
    USING (true);
