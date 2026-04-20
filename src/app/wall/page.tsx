import Nav from "@/components/Nav";
import StickyBoard from "@/components/StickyBoard";
import { createClient } from "@/utils/supabase/server";
import { initialAffirmations } from "@/data/affirmations";

export const metadata = {
  title: "Community Bulletin Board - Autism Mom Club",
  description: "Words of encouragement, quick tips, and affirmations from other moms.",
};

export default async function WallPage() {
  const supabase = await createClient();
  const { data } = await supabase.from("notes").select("*");
  const globalNotes = data || [];
  
  // Combine local mock data with global cloud data
  const combinedNotes = [...initialAffirmations, ...globalNotes];
  return (
    <main className="h-screen flex flex-col overflow-hidden bg-amber-50/30">
      <Nav />
      
      {/* Header Overlay (Floating so it doesn't interrupt the canvas) */}
      <div className="absolute top-28 left-1/2 -translate-x-1/2 z-20 pointer-events-none text-center bg-background/80 backdrop-blur-md px-8 py-4 rounded-3xl shadow-sm border border-border/50">
        <h1 className="text-2xl md:text-3xl font-serif text-foreground mb-1">Community Bulletin Board</h1>
        <p className="text-sm font-body text-foreground/70">
          Drag the board to pan around. Click '+' to write a note, then pin it anywhere!
        </p>
      </div>

      {/* Endless Interactive Board Area */}
      <div className="flex-1 w-full relative">
        <StickyBoard initialNotes={combinedNotes} />
      </div>
    </main>
  );
}
