CREATE TABLE IF NOT EXISTS public.notes (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    text TEXT NOT NULL,
    author TEXT NOT NULL DEFAULT 'Anonymous',
    color TEXT NOT NULL DEFAULT 'yellow',
    x FLOAT NOT NULL DEFAULT 50,
    y FLOAT NOT NULL DEFAULT 50,
    rotation FLOAT NOT NULL DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Turn on RLS
ALTER TABLE public.notes ENABLE ROW LEVEL SECURITY;

-- Allow anyone to insert a note
CREATE POLICY "Allow public insert notes" ON public.notes
    FOR INSERT TO public
    WITH CHECK (true);

-- Allow anyone to read all notes
CREATE POLICY "Allow public read notes" ON public.notes
    FOR SELECT TO public
    USING (true);

-- Allow admin to delete
CREATE POLICY "Allow admin delete notes" ON public.notes
    FOR DELETE TO public
    USING (true);
