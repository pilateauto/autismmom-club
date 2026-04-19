import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import Categories from "@/components/Categories";
import Footer from "@/components/Footer";
import ToolkitAndCTA from "@/components/ToolkitAndCTA";

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col">
      <Nav />
      <Hero />
      <Categories />
      <ToolkitAndCTA />
      <Footer />
    </main>
  );
}
