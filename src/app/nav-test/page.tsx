import Nav1 from "@/components/nav-variants/Nav1";
import Nav2 from "@/components/nav-variants/Nav2";
import Nav3 from "@/components/nav-variants/Nav3";
import Nav6 from "@/components/nav-variants/Nav6";
import Nav7 from "@/components/nav-variants/Nav7";
import Nav8 from "@/components/nav-variants/Nav8";
import GlitchNav from "@/components/ui/glitch-nav";

export default function NavTestPage() {
  return (
    <main className="min-h-screen bg-surface p-8 space-y-12">
      <h1 className="text-3xl font-serif mb-8">Navbar Variants Test</h1>
      
      <section className="bg-white p-8 rounded-3xl border border-border">
        <h2 className="text-xl mb-4 font-bold">Variant 9: Glitch Outline Fill (Custom)</h2>
        <div className="relative border rounded-xl overflow-hidden bg-white/50 flex items-center justify-center p-12">
          <GlitchNav />
        </div>
      </section>

      <section className="bg-white p-8 rounded-3xl border border-border">
        <h2 className="text-xl mb-4 font-bold">Variant 1: 3D Icon Tabs (andrewlu0)</h2>
        <div className="relative h-32 border rounded-xl overflow-hidden bg-slate-50"><Nav1 /></div>
      </section>

      <section className="bg-white p-8 rounded-3xl border border-border">
        <h2 className="text-xl mb-4 font-bold">Variant 2: Hover Gradient Nav (ruixenui)</h2>
        <div className="relative h-32 border rounded-xl overflow-hidden bg-slate-50"><Nav2 /></div>
      </section>

      <section className="bg-white p-8 rounded-3xl border border-border">
        <h2 className="text-xl mb-4 font-bold">Variant 3: Animated Tabs (ln-dev7)</h2>
        <div className="relative h-32 border rounded-xl overflow-hidden bg-slate-50 flex items-center justify-center"><Nav3 /></div>
      </section>

      <section className="bg-white p-8 rounded-3xl border border-border">
        <h2 className="text-xl mb-4 font-bold">Variant 6: Gradient Menu (thanh)</h2>
        <div className="relative h-32 border rounded-xl overflow-hidden bg-slate-50"><Nav6 /></div>
      </section>

      <section className="bg-white p-8 rounded-3xl border border-border">
        <h2 className="text-xl mb-4 font-bold">Variant 7: Radial Social (beratberkay)</h2>
        <div className="relative h-[300px] border rounded-xl overflow-hidden bg-slate-50"><Nav7 /></div>
      </section>

      <section className="bg-white p-8 rounded-3xl border border-border">
        <h2 className="text-xl mb-4 font-bold">Variant 8: Scroll Nav (spaceboydavey)</h2>
        <div className="relative h-32 border rounded-xl overflow-hidden bg-slate-50 flex items-center justify-center"><Nav8 /></div>
      </section>

    </main>
  );
}
