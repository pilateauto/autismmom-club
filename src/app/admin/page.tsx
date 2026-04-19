import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import { createClient } from "@/utils/supabase/server";
import AdminApprovalForm from "@/components/AdminApprovalForm";

export default async function AdminPage() {
  const supabase = await createClient();

  // Fetch all pending_review items directly from Postgres
  const { data: pendingItems, error } = await supabase
    .from("resources")
    .select("*")
    .eq("status", "pending_review")
    .order("created_at", { ascending: true });

  if (error) {
    console.error("Error fetching pending items:", error);
  }

  const items = pendingItems || [];

  return (
    <main className="min-h-screen flex flex-col bg-surface/30">
      <Nav />
      <div className="pt-32 pb-16 px-6 md:px-12 max-w-5xl mx-auto w-full flex-1">
        
        <div className="flex items-center justify-between mb-8 border-b border-border/50 pb-6">
          <div>
            <h1 className="text-3xl font-serif text-foreground mb-2">Admin Dashboard</h1>
            <p className="text-sm font-body text-foreground/70">Review and approve community submissions.</p>
          </div>
          <div className="bg-primary/10 text-primary px-4 py-2 rounded-full font-bold text-sm">
            {items.length} Pending Reviews
          </div>
        </div>

        {items.length === 0 ? (
          <div className="bg-white rounded-3xl p-16 text-center border border-border/50 shadow-sm">
            <h2 className="text-2xl font-serif mb-2 text-foreground">Inbox Zero!</h2>
            <p className="text-foreground/70 font-body">There are no pending submissions to review right now.</p>
          </div>
        ) : (
          <div className="space-y-6">
            {items.map(sub => (
              <div key={sub.id} className="bg-white rounded-3xl p-8 border border-border/50 shadow-sm flex flex-col md:flex-row gap-8">
                <div className="flex-1">
                  <div className="flex gap-2 mb-3">
                    <span className="bg-surface px-2 py-1 rounded text-xs font-mono uppercase text-foreground/70">{sub.category}</span>
                    <span className="bg-yellow-100 text-yellow-800 px-2 py-1 rounded text-xs font-mono uppercase">Pending</span>
                  </div>
                  <h3 className="text-2xl font-serif mb-2">{sub.title}</h3>
                  <p className="text-sm text-foreground/60 mb-4">By {sub.author} • {sub.description}</p>
                  <div className="prose prose-sm text-foreground/80 bg-surface/50 p-4 rounded-xl border border-border/50 whitespace-pre-wrap">
                    {sub.content}
                  </div>
                </div>

                <AdminApprovalForm sub={sub} />
              </div>
            ))}
          </div>
        )}

      </div>
      <Footer />
    </main>
  );
}
