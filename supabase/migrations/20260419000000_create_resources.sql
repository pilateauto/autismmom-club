CREATE TABLE IF NOT EXISTS public.resources (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    slug TEXT UNIQUE NOT NULL,
    category TEXT NOT NULL CHECK (category IN ('food', 'routines', 'sensory', 'communication', 'reviews', 'school')),
    title TEXT NOT NULL,
    description TEXT NOT NULL,
    content TEXT NOT NULL,
    author TEXT NOT NULL,
    emoji TEXT,
    tags TEXT[] DEFAULT '{}',
    readTime TEXT DEFAULT '3 min',
    status TEXT NOT NULL DEFAULT 'pending_review' CHECK (status IN ('pending_review', 'published', 'rejected')),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Turn on RLS
ALTER TABLE public.resources ENABLE ROW LEVEL SECURITY;

-- Allow anyone to insert (moms submitting forms)
CREATE POLICY "Allow public insert" ON public.resources
    FOR INSERT TO public
    WITH CHECK (true);

-- Allow public to read only published resources
CREATE POLICY "Allow public read published" ON public.resources
    FOR SELECT TO public
    USING (status = 'published');

-- Allow anon key to read pending_review (for admin dashboard, since we don't have true auth yet)
-- Note: In a real production app with auth, this should only be FOR SELECT TO authenticated
CREATE POLICY "Allow anon read all" ON public.resources
    FOR SELECT TO public
    USING (true);

-- Allow anon to update (for admin dashboard approval)
CREATE POLICY "Allow anon update" ON public.resources
    FOR UPDATE TO public
    USING (true);
