import Link from 'next/link';

export default function Nav() {
  return (
    <nav className="sticky top-0 z-50 h-20 bg-background/80 backdrop-blur border-b border-border flex items-center justify-between px-6 md:px-12">
      <div className="flex items-center">
        <Link href="/" className="font-sans text-xl font-bold text-gradient">
          Autism Mom Club
        </Link>
      </div>
      
      <div className="hidden md:flex items-center space-x-8">
        <Link href="#" className="text-sm font-body text-foreground hover:opacity-70 transition-opacity">Recipes</Link>
        <Link href="#" className="text-sm font-body text-foreground hover:opacity-70 transition-opacity">Routines</Link>
        <Link href="#" className="text-sm font-body text-foreground hover:opacity-70 transition-opacity">Sensory</Link>
        <Link href="#" className="text-sm font-body text-foreground hover:opacity-70 transition-opacity">Communication</Link>
      </div>
      
      <div>
        <button className="bg-gradient-accent text-white font-body text-sm rounded-full px-6 py-2 hover:opacity-90 transition-opacity hover:scale-[1.02] active:scale-[0.98]">
          Share a Win
        </button>
      </div>
    </nav>
  );
}
