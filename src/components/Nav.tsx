import Link from 'next/link';
import styles from '@/components/ui/glitch-nav.module.css';

export default function Nav() {
  return (
    <nav className="shrink-0 sticky top-0 z-50 h-20 bg-background/90 backdrop-blur-md border-b border-border w-full flex items-center shadow-sm">
      <div className="w-full mx-auto px-6 flex items-center justify-between">
        {/* Left: Logo */}
        <div className="flex-shrink-0 mr-8">
          <Link href="/" className="font-sans text-xl md:text-2xl font-bold text-gradient whitespace-nowrap">
            Autism Moms Club
          </Link>
        </div>
        
        {/* Middle: Glitch Links (Hidden on small screens, flex on large) */}
        <div className="hidden xl:flex items-center justify-center gap-6 lg:gap-8 flex-1 overflow-x-auto hide-scrollbar">
          <GlitchLink href="/toolkit/food" text="Recipes" />
          <GlitchLink href="/toolkit/routines" text="Routines" />
          <GlitchLink href="/toolkit/sensory" text="Sensory" />
          <GlitchLink href="/toolkit/communication" text="Communication" />
          <GlitchLink href="/toolkit/reviews" text="Reviews" />
          <GlitchLink href="/toolkit/school" text="School" />
          <GlitchLink href="/wall" text="Wall" />
        </div>
        
        {/* Right: Button */}
        <div className="flex-shrink-0 ml-8">
          <Link href="/submit" className="inline-flex items-center justify-center bg-gradient-accent text-white font-body text-sm rounded-full px-6 py-2.5 hover:opacity-90 transition-opacity hover:scale-[1.02] active:scale-[0.98] shadow-md whitespace-nowrap font-bold">
            Share a Win
          </Link>
        </div>
      </div>
    </nav>
  );
}

function GlitchLink({ href, text }: { href: string; text: string }) {
  return (
    <Link href={href} className={styles.glitchBtn} data-text={text}>
      {text}
      <span className={styles.hoverBg}></span>
    </Link>
  );
}
