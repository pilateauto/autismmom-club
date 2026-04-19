"use client";

import { useState } from "react";
import { approveResource, rejectResource } from "@/app/admin/actions";
import { Search, X } from "lucide-react";

export default function AdminApprovalForm({ sub }: { sub: any }) {
  const [search, setSearch] = useState("");
  const [results, setResults] = useState<any[]>([]);
  const [selectedEmoji, setSelectedEmoji] = useState("");

  const handleSearch = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const q = e.target.value;
    setSearch(q);

    if (q.length < 2) {
      setResults([]);
      return;
    }

    try {
      const res = await fetch(`/admin/api/search-emojis?q=${encodeURIComponent(q)}`);
      const data = await res.json();
      setResults(data.items || []);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="w-full md:w-80 flex flex-col gap-4 border-t md:border-t-0 md:border-l border-border/50 pt-6 md:pt-0 md:pl-8 h-full">
      <form action={approveResource} className="flex flex-col gap-4 h-full">
        <input type="hidden" name="id" value={sub.id} />
        <input type="hidden" name="category" value={sub.category} />
        <input type="hidden" name="emoji" value={selectedEmoji} />
        
        <div>
          <label className="block text-xs font-bold text-foreground/70 mb-2">Search Curated Emojis</label>
          
          <div className="relative">
            <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none text-foreground/40">
              <Search className="w-4 h-4" />
            </div>
            <input 
              type="text" 
              value={search}
              onChange={handleSearch}
              placeholder="e.g. food, house, ball" 
              className="w-full text-sm rounded-xl border border-border/50 bg-surface/50 pl-10 pr-3 py-3 text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 shadow-inner" 
            />
          </div>

          {results.length > 0 && !selectedEmoji && (
            <div className="mt-4 max-h-64 overflow-y-auto bg-white border border-border/50 rounded-xl shadow-lg grid grid-cols-4 gap-2 p-3">
              {results.map((item) => (
                <button
                  key={item.slug}
                  type="button"
                  onClick={() => {
                    setSelectedEmoji(`/emojis/${item.file_name}`);
                    setSearch(item.title);
                    setResults([]);
                  }}
                  className="relative group aspect-square rounded-xl border border-transparent hover:border-primary/50 bg-surface/30 flex items-center justify-center p-2 transition-all hover:scale-105"
                  title={item.title}
                >
                  <img src={`/emojis/${item.file_name}`} alt={item.title} className="w-full h-full object-contain" loading="lazy" />
                </button>
              ))}
            </div>
          )}

          {selectedEmoji && (
            <div className="mt-4 flex flex-col items-center justify-center p-6 bg-surface/30 border border-border/50 rounded-3xl relative group">
              <img src={selectedEmoji} alt="Selected emoji" className="w-24 h-24 object-contain drop-shadow-xl" />
              <button 
                type="button" 
                onClick={() => {
                  setSelectedEmoji("");
                  setSearch("");
                }}
                className="absolute top-2 right-2 text-foreground/50 hover:text-red-500 bg-white rounded-full p-1.5 shadow-sm border border-border/50 transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>

        <div className="flex flex-col gap-2 mt-auto pt-6">
          <button 
            type="submit" 
            disabled={!selectedEmoji}
            className="w-full bg-green-500 hover:bg-green-600 text-white rounded-xl py-3 text-sm font-bold transition-colors shadow-sm disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Approve & Publish
          </button>
        </div>
      </form>

      <form action={rejectResource}>
        <input type="hidden" name="id" value={sub.id} />
        <button type="submit" className="w-full bg-surface hover:bg-red-50 text-foreground hover:text-red-600 rounded-xl py-3 text-sm font-bold transition-colors border border-border/50">
          Reject / Delete
        </button>
      </form>
    </div>
  );
}
