"use client";

import { useState } from "react";
import { addReply } from "../actions";
import { Send } from "lucide-react";

export default function ReplyForm({ threadSlug }: { threadSlug: string }) {
  const [text, setText] = useState("");
  const [author, setAuthor] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showNameField, setShowNameField] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!text.trim()) return;

    setIsSubmitting(true);
    const formData = new FormData(e.currentTarget);
    formData.set("thread_slug", threadSlug);
    formData.set("author", author.trim() || "Anonymous Mom");

    try {
      await addReply(formData);
      setText("");
      setAuthor("");
      setShowNameField(false);
    } catch (err) {
      console.error("Failed to post reply:", err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <input type="hidden" name="thread_slug" value={threadSlug} />

      {showNameField && (
        <div>
          <input
            name="author"
            type="text"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            placeholder="Your name (or leave blank for Anonymous Mom)"
            className="w-full rounded-2xl border border-border/50 bg-surface/50 px-4 py-3 text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 font-body text-sm shadow-inner"
          />
        </div>
      )}

      <div className="flex gap-3">
        <textarea
          name="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Share your thoughts…"
          rows={2}
          className="flex-1 rounded-2xl border border-border/50 bg-surface/50 px-5 py-4 text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 font-body text-sm shadow-inner resize-none w-full min-h-[50px]"
          onFocus={() => setShowNameField(true)}
        />
        <button
          type="submit"
          disabled={!text.trim() || isSubmitting}
          className="bg-gradient-accent text-white rounded-2xl px-6 py-4 shadow-md hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed hover:scale-[1.02] active:scale-[0.98] shrink-0 self-end"
        >
          <Send className="w-5 h-5" />
        </button>
      </div>
    </form>
  );
}