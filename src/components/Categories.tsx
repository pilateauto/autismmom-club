import { Apple, Clock, Headphones, MessageSquare, Star, BookOpen } from 'lucide-react';

const CATEGORIES = [
  {
    title: "Food",
    description: "Texture, safe foods, and sensory-friendly recipes.",
    icon: Apple
  },
  {
    title: "Routines",
    description: "Mornings, transitions, bedtime, and meltdowns.",
    icon: Clock
  },
  {
    title: "Sensory",
    description: "Tools, spaces, and regulation strategies.",
    icon: Headphones
  },
  {
    title: "Communication",
    description: "AAC, scripts, and shutdown vs. meltdown.",
    icon: MessageSquare
  },
  {
    title: "Reviews",
    description: "Honest, non-affiliate product reviews from parents.",
    icon: Star
  },
  {
    title: "School",
    description: "IEPs, providers, and insurance navigation.",
    icon: BookOpen
  }
];

export default function Categories() {
  return (
    <section className="py-24 px-6 md:px-12 max-w-6xl mx-auto">
      <h2 className="text-3xl font-sans text-foreground mb-12">Explore the Toolkit</h2>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {CATEGORIES.map((cat, i) => (
          <div key={i} className="bg-white rounded-2xl border border-border p-6 hover:shadow-md transition-shadow cursor-pointer group">
            <div className="w-12 h-12 bg-surface rounded-full flex items-center justify-center mb-6 text-foreground group-hover:scale-110 transition-transform">
              <cat.icon size={24} strokeWidth={1.5} />
            </div>
            <h3 className="text-xl font-sans text-foreground mb-2">{cat.title}</h3>
            <p className="text-base font-serif text-foreground/80 leading-relaxed">
              {cat.description}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
