"use client";

import Link from "next/link";
import styles from "./glitch-nav.module.css";

export default function GlitchNav() {
  return (
    <nav className="flex items-center justify-center gap-8 flex-wrap py-8 w-full flex-wrap">
      <GlitchLink href="/toolkit/food" text="Recipes" />
      <GlitchLink href="/toolkit/routines" text="Routines" />
      <GlitchLink href="/toolkit/sensory" text="Sensory" />
      <GlitchLink href="/toolkit/communication" text="Communication" />
      <GlitchLink href="/toolkit/reviews" text="Reviews" />
      <GlitchLink href="/toolkit/school" text="School" />
      <GlitchLink href="/wall" text="Wall" />
    </nav>
  );
}

function GlitchLink({ href, text }: { href: string; text: string }) {
  return (
    <Link href={href} className={styles.glitchBtn} data-text={text}>
      {text}
      <span className={styles.hoverText} data-text={text}>
        {text}
      </span>
    </Link>
  );
}
