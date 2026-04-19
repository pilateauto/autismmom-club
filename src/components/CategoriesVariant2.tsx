import { BentoGrid, type BentoItem } from "@/components/ui/bento-grid";
import { Apple, Clock, Headphones, MessageSquare, Star, BookOpen } from "lucide-react";

const items: BentoItem[] = [
  {
    title: "Food & Recipes",
    meta: "24 Recipes",
    description: "Texture guides, safe foods lists, and sensory-friendly meals that won't cause meltdowns.",
    icon: Apple,
    status: "Popular",
    tags: ["ARFID", "Snacks"],
    colSpan: 2,
    hasPersistentHover: true,
    cta: "Explore Food →"
  },
  {
    title: "Routines",
    meta: "12 Guides",
    description: "Visual schedules for mornings, transitions, and bedtime.",
    icon: Clock,
    status: "New",
    tags: ["Visual", "Mornings"],
    cta: "View Routines →"
  },
  {
    title: "Sensory Strategies",
    meta: "38 Tools",
    description: "Deep pressure, regulation tools, and creating safe spaces for decompression.",
    icon: Headphones,
    tags: ["Proprioceptive", "Calm"],
    colSpan: 2,
    cta: "Discover Sensory →"
  },
  {
    title: "Communication",
    meta: "Scripts",
    description: "AAC resources, scripts, and understanding shutdown vs. meltdown.",
    icon: MessageSquare,
    status: "Trending",
    tags: ["AAC", "Non-Verbal"],
    cta: "Learn More →"
  },
  {
    title: "Honest Reviews",
    description: "Non-affiliate parent reviews of sensory swings, chewelry, and tools.",
    icon: Star,
    tags: ["Tools", "Gear"],
    cta: "Read Reviews →"
  },
  {
    title: "School & IEPs",
    description: "Templates and strategies for IEP meetings, accommodations, and provider navigation.",
    icon: BookOpen,
    colSpan: 2,
    tags: ["Advocacy", "Insurance"],
    cta: "School Guides →"
  }
];

export default function CategoriesVariant2() {
  return (
    <section className="py-24 bg-surface px-6 w-full border-t border-border/50">
      <div className="max-w-6xl mx-auto mb-16 text-center">
        <h2 className="text-3xl md:text-4xl font-serif text-foreground mb-4">Explore the Toolkit (Bento Grid)</h2>
        <p className="font-body text-foreground/70 max-w-2xl mx-auto">
          A dynamic bento grid layout with persistent hovering on key elements and clean internal styling.
        </p>
      </div>
      <BentoGrid items={items} />
    </section>
  );
}
