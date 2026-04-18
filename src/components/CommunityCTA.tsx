import { HeartHandshake } from 'lucide-react';

export default function CommunityCTA() {
  return (
    <section className="py-24 px-6 max-w-3xl mx-auto text-center">
      <div className="flex justify-center mb-8 text-foreground">
        <HeartHandshake size={48} strokeWidth={1} />
      </div>
      
      <h2 className="text-3xl font-sans text-foreground mb-4">
        What worked for you?
      </h2>
      
      <p className="text-base font-serif text-foreground/80 mb-8 leading-relaxed">
        No cure claims. No judgment. Just practical strategies from one mom to another. Submit a recipe, routine, or review via our Typeform.
      </p>
      
      <button className="bg-gradient-accent text-white font-body rounded-full px-8 py-3 text-lg hover:opacity-90 transition-all hover:scale-[1.02] active:scale-[0.98]">
        Submit a Resource
      </button>
    </section>
  );
}
