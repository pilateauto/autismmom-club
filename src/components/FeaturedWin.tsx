import Image from 'next/image';

export default function FeaturedWin() {
  return (
    <section className="py-24 bg-surface w-full">
      <div className="max-w-5xl mx-auto px-6">
        <div className="flex flex-col md:flex-row items-center gap-12">
          {/* Image */}
          <div className="w-full md:w-5/12 aspect-square md:aspect-[4/5] bg-border rounded-2xl overflow-hidden relative group">
             <Image 
               src="/featured-win.png" 
               alt="A candid photo of a mom and her son looking at a visual schedule"
               fill
               className="object-cover transition-transform duration-700 group-hover:scale-105"
             />
          </div>

          <div className="w-full md:w-7/12 flex flex-col justify-center">
            <blockquote className="font-serif text-2xl md:text-3xl italic leading-relaxed text-foreground mb-8">
              "Switching to a visual schedule for mornings cut our meltdowns by 90%. I want every mom to know this."
            </blockquote>
            
            <div className="flex flex-col">
              <span className="font-sans text-sm font-bold uppercase tracking-wider text-foreground">
                Sarah
              </span>
              <span className="font-body text-sm text-foreground/60 mt-1">
                Mom to Leo (Age 6, Level 2)
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
