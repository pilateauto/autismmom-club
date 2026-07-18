CREATE TABLE IF NOT EXISTS public.discussion_threads (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    slug TEXT UNIQUE NOT NULL,
    category TEXT NOT NULL CHECK (category IN ('general', 'food', 'routines', 'sensory', 'communication', 'reviews', 'school')),
    title TEXT NOT NULL,
    content TEXT NOT NULL,
    author TEXT NOT NULL DEFAULT 'Anonymous Mom',
    reply_count INTEGER NOT NULL DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS public.discussion_replies (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    thread_slug TEXT NOT NULL REFERENCES discussion_threads(slug) ON DELETE CASCADE,
    author TEXT NOT NULL DEFAULT 'Anonymous Mom',
    text TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Auto-increment reply_count when a reply is inserted
CREATE OR REPLACE FUNCTION public.increment_thread_reply_count()
RETURNS TRIGGER AS $$
BEGIN
    UPDATE public.discussion_threads
    SET reply_count = reply_count + 1
    WHERE slug = NEW.thread_slug;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE OR REPLACE FUNCTION public.decrement_thread_reply_count()
RETURNS TRIGGER AS $$
BEGIN
    UPDATE public.discussion_threads
    SET reply_count = GREATEST(reply_count - 1, 0)
    WHERE slug = OLD.thread_slug;
    RETURN OLD;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS on_reply_insert ON public.discussion_replies;
CREATE TRIGGER on_reply_insert
    AFTER INSERT ON public.discussion_replies
    FOR EACH ROW
    EXECUTE FUNCTION public.increment_thread_reply_count();

DROP TRIGGER IF EXISTS on_reply_delete ON public.discussion_replies;
CREATE TRIGGER on_reply_delete
    AFTER DELETE ON public.discussion_replies
    FOR EACH ROW
    EXECUTE FUNCTION public.decrement_thread_reply_count();

-- RLS
ALTER TABLE public.discussion_threads ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.discussion_replies ENABLE ROW LEVEL SECURITY;

-- Discussion threads policies
CREATE POLICY "Allow public insert threads" ON public.discussion_threads
    FOR INSERT TO public
    WITH CHECK (true);

CREATE POLICY "Allow public read threads" ON public.discussion_threads
    FOR SELECT TO public
    USING (true);

CREATE POLICY "Allow public delete threads" ON public.discussion_threads
    FOR DELETE TO public
    USING (true);

-- Discussion replies policies
CREATE POLICY "Allow public insert replies" ON public.discussion_replies
    FOR INSERT TO public
    WITH CHECK (true);

CREATE POLICY "Allow public read replies" ON public.discussion_replies
    FOR SELECT TO public
    USING (true);

CREATE POLICY "Allow public delete replies" ON public.discussion_replies
    FOR DELETE TO public
    USING (true);
