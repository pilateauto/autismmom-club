import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import Categories from "@/components/Categories";
import FeaturedWin from "@/components/FeaturedWin";
import CommunityCTA from "@/components/CommunityCTA";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col">
      <Nav />
      <Hero />
      <Categories />
      <FeaturedWin />
      <CommunityCTA />
      <Footer />
    </main>
  );
}
