"use client";

import React, { useState, useRef, useEffect, MouseEvent as ReactMouseEvent } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { initialAffirmations, Affirmation, AffirmationColor } from "@/data/affirmations";
import { Plus, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { addStickyNote } from "@/app/wall/actions";
import { useDrag, useWheel } from "@use-gesture/react";
import { useSpring } from "framer-motion";
import { useMotionValue, useSpring as useFramerSpring } from "framer-motion";

const colors: Record<AffirmationColor, string> = {
  yellow: "bg-[#fef08a] text-amber-900 border-amber-200 shadow-[#fef08a]/20",
  pink: "bg-[#fbcfe8] text-pink-900 border-pink-200 shadow-[#fbcfe8]/20",
  blue: "bg-[#bfdbfe] text-blue-900 border-blue-200 shadow-[#bfdbfe]/20",
  green: "bg-[#bbf7d0] text-green-900 border-green-200 shadow-[#bbf7d0]/20",
  purple: "bg-[#e9d5ff] text-purple-900 border-purple-200 shadow-[#e9d5ff]/20",
};

const colorOptions: { id: AffirmationColor; class: string }[] = [
  { id: "yellow", class: "bg-[#fef08a]" },
  { id: "pink", class: "bg-[#fbcfe8]" },
  { id: "blue", class: "bg-[#bfdbfe]" },
  { id: "green", class: "bg-[#bbf7d0]" },
  { id: "purple", class: "bg-[#e9d5ff]" },
];

export default function StickyBoard({ initialNotes = initialAffirmations }: { initialNotes?: any[] }) {
  const [notes, setNotes] = useState<Affirmation[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newText, setNewText] = useState("");
  const [newAuthor, setNewAuthor] = useState("");
  const [selectedColor, setSelectedColor] = useState<AffirmationColor>("yellow");
  
  // Placement & Panning State
  const [placingNote, setPlacingNote] = useState<Affirmation | null>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isPanning, setIsPanning] = useState(false);
  
  const containerRef = useRef<HTMLDivElement>(null);
  const boardRef = useRef<HTMLDivElement>(null);

  const x = useMotionValue(-5000 + (typeof window !== "undefined" ? window.innerWidth / 2 : 500));
  const y = useMotionValue(-5000 + (typeof window !== "undefined" ? window.innerHeight / 2 : 500));
  const smoothX = useFramerSpring(x, { damping: 50, stiffness: 400 });
  const smoothY = useFramerSpring(y, { damping: 50, stiffness: 400 });

  // Set up react-use-gesture for dragging the background
  const bindDrag = useDrag(({ down, movement: [mx, my], offset: [ox, oy], event, tap }) => {
    // If we're clicking a button or typing, don't drag the background
    if ((event.target as HTMLElement).closest('button, input, textarea, .sticky-note')) return;
    
    setIsPanning(down);
    
    if (!placingNote) {
      x.set(ox);
      y.set(oy);
    }
  }, { 
    from: () => [x.get(), y.get()],
    filterTaps: true,
    bounds: { left: -10000 + (typeof window !== "undefined" ? window.innerWidth : 1000), right: 0, top: -10000 + (typeof window !== "undefined" ? window.innerHeight : 1000), bottom: 0 }
  });

  // Trackpad / Scroll Wheel Panning
  const bindWheel = useWheel(({ delta: [dx, dy], event }) => {
    if ((event.target as HTMLElement).closest('button, input, textarea, .sticky-note')) return;
    
    if (!placingNote) {
      // Subtract the delta from current x/y to pan in the direction of the scroll
      let newX = x.get() - dx;
      let newY = y.get() - dy;

      // Enforce bounds
      const minX = -10000 + (typeof window !== "undefined" ? window.innerWidth : 1000);
      const minY = -10000 + (typeof window !== "undefined" ? window.innerHeight : 1000);

      newX = Math.max(Math.min(newX, 0), minX);
      newY = Math.max(Math.min(newY, 0), minY);

      x.set(newX);
      y.set(newY);
    }
  }, {
    eventOptions: { passive: false }
  });

  // Initialize data and scroll position
  useEffect(() => {
    setNotes(initialNotes);
  }, [initialNotes]);

  const handleAddNote = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newText.trim()) return;

    const randomRotation = Math.floor(Math.random() * 14) - 7; // -7 to 7 degrees

    const newNote: Affirmation = {
      id: Date.now().toString(),
      text: newText,
      author: newAuthor || "Anonymous Mom",
      color: selectedColor,
      rotation: randomRotation,
      x: 0,
      y: 0,
    };

    setPlacingNote(newNote);
    setIsModalOpen(false);
    setNewText("");
    setNewAuthor("");
  };

  const handleMouseMove = (e: ReactMouseEvent) => {
    if (placingNote && boardRef.current) {
      const rect = boardRef.current.getBoundingClientRect();
      setMousePos({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      });
    } else if (isPanning && containerRef.current) {
      // Panning logic like Figma/Miro
      containerRef.current.scrollLeft -= e.movementX;
      containerRef.current.scrollTop -= e.movementY;
    }
  };

  const handleBoardClick = async (e: ReactMouseEvent) => {
    if (isPanning) return;
    
    if (placingNote && boardRef.current) {
      const rect = boardRef.current.getBoundingClientRect();
      const clickX = e.clientX - rect.left;
      const clickY = e.clientY - rect.top;

      const xPercent = (clickX / rect.width) * 100;
      const yPercent = (clickY / rect.height) * 100;

      const finalizedNote = { ...placingNote, x: xPercent, y: yPercent };
      
      // Optimistic update
      setNotes(prev => [...prev, finalizedNote]);
      setPlacingNote(null);

      // Async cloud push
      try {
        const fd = new FormData();
        fd.append("text", finalizedNote.text);
        fd.append("author", finalizedNote.author || "");
        fd.append("color", finalizedNote.color);
        fd.append("x", xPercent.toString());
        fd.append("y", yPercent.toString());
        fd.append("rotation", finalizedNote.rotation.toString());
        await addStickyNote(fd);
      } catch(err) {
        console.error("Failed to save note to cloud", err);
      }
    }
  };

  return (
    <>
      <div 
        className={cn(
          "fixed inset-0 w-full h-full overflow-hidden bg-[#FEFCF7] select-none touch-none",
          placingNote ? "cursor-crosshair" : (isPanning ? "cursor-grabbing" : "cursor-grab")
        )}
        {...(!placingNote ? { ...bindDrag(), ...bindWheel() } : {})}
        onMouseMove={handleMouseMove}
        onClick={handleBoardClick}
      >
        <motion.div 
          ref={boardRef}
          className="w-[10000px] h-[10000px] absolute will-change-transform"
          style={{
            x: smoothX, y: smoothY,
            backgroundImage: 'radial-gradient(circle, #000000 1px, transparent 1px)',
            backgroundSize: '48px 48px',
            backgroundPosition: '0 0',
          }}
        >
          <div className="absolute inset-0 opacity-5" />

          {/* Locked Notes */}
          <AnimatePresence>
            {notes.map((note) => (
              <motion.div
                key={note.id}
                initial={{ scale: 0 }}
                animate={{ scale: 1, rotate: note.rotation }}
                className={cn(
                  "sticky-note",
                  "w-64 min-h-[256px] p-6 shadow-md border rounded-sm flex flex-col justify-between absolute z-10",
                  colors[note.color]
                )}
                style={{
                  left: `${note.x}%`,
                  top: `${note.y}%`,
                  // Translating -50% ensures the cursor was exactly in the middle when clicked
                  transform: `translate(-50%, -50%) rotate(${note.rotation}deg)` 
                }}
              >
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-16 h-6 bg-white/40 backdrop-blur-sm shadow-sm rotate-2" />
                <p className="font-serif text-xl leading-snug drop-shadow-sm mt-4 text-left">{note.text}</p>
                {note.author && (
                  <p className="font-body text-sm font-medium mt-6 text-right opacity-80">- {note.author}</p>
                )}
              </motion.div>
            ))}
          </AnimatePresence>

          {/* The Phantom Placing Note */}
          {placingNote && (
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 0.9 }}
              className={cn(
                "w-64 min-h-[256px] p-6 shadow-2xl border rounded-sm flex flex-col justify-between absolute z-50 pointer-events-none",
                colors[placingNote.color]
              )}
              style={{
                left: mousePos.x,
                top: mousePos.y,
                transform: `translate(-50%, -50%) rotate(${placingNote.rotation}deg)` 
              }}
            >
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-16 h-6 bg-white/40 backdrop-blur-sm shadow-sm rotate-2" />
              <p className="font-serif text-xl leading-snug drop-shadow-sm mt-4 text-left">{placingNote.text}</p>
              {placingNote.author && (
                <p className="font-body text-sm font-medium mt-6 text-right opacity-80">- {placingNote.author}</p>
              )}
            </motion.div>
          )}
        </motion.div>
      </div>

      {/* Floating Instructions & Add Button */}
      <div className="fixed bottom-12 right-12 z-40 flex flex-col items-end gap-4 pointer-events-none">
        {placingNote ? (
          <div className="bg-background/90 backdrop-blur text-foreground px-6 py-3 rounded-full shadow-lg border border-border animate-pulse font-body text-sm pointer-events-auto">
            Move mouse to choose a spot, click to pin!
          </div>
        ) : (
          <button 
            onClick={() => setIsModalOpen(true)}
            className="h-16 w-16 bg-gradient-accent text-white rounded-full shadow-2xl flex items-center justify-center hover:scale-110 active:scale-95 transition-transform pointer-events-auto"
          >
            <Plus className="w-8 h-8" />
          </button>
        )}
      </div>

      {/* Add Note Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          >
            <motion.div 
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              className="bg-white rounded-[32px] overflow-hidden max-w-md w-full shadow-2xl border border-border/50 relative"
            >
              {/* Modal Header */}
              <div className="bg-surface px-8 py-6 border-b border-border/50 flex justify-between items-center">
                <h3 className="text-2xl font-serif text-foreground">Write your Note</h3>
                <button 
                  onClick={() => setIsModalOpen(false)}
                  className="text-foreground/50 hover:text-foreground transition-colors bg-white rounded-full p-2 shadow-sm border border-border/50 hover:bg-surface"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              
              <form onSubmit={handleAddNote} className="p-8 space-y-6">
                
                {/* Textarea */}
                <div>
                  <label className="block text-sm font-medium text-foreground/70 mb-2">Your message (max 150 chars)</label>
                  <textarea 
                    value={newText}
                    onChange={(e) => setNewText(e.target.value)}
                    maxLength={150}
                    rows={4}
                    className="w-full rounded-2xl border border-border/50 bg-surface/50 px-5 py-4 text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 resize-none font-serif text-lg leading-relaxed shadow-inner"
                    placeholder="You are doing great..."
                    required
                  />
                  <div className="text-right text-xs text-foreground/40 mt-1 font-mono">
                    {newText.length}/150
                  </div>
                </div>

                <div className="flex gap-4">
                  {/* Name Input */}
                  <div className="flex-1">
                    <label className="block text-sm font-medium text-foreground/70 mb-2">Sign your note</label>
                    <input 
                      type="text"
                      value={newAuthor}
                      onChange={(e) => setNewAuthor(e.target.value)}
                      className="w-full rounded-xl border border-border/50 bg-surface/50 px-4 py-3 text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 font-body shadow-inner"
                      placeholder="Anonymous Mom"
                      maxLength={30}
                    />
                  </div>

                  {/* Color Picker */}
                  <div>
                    <label className="block text-sm font-medium text-foreground/70 mb-2">Color</label>
                    <div className="flex items-center gap-2 bg-surface/50 p-2.5 rounded-xl border border-border/50 shadow-inner">
                      {colorOptions.map((option) => (
                        <button
                          key={option.id}
                          type="button"
                          onClick={() => setSelectedColor(option.id)}
                          className={cn(
                            "w-8 h-8 rounded-full border-2 transition-transform",
                            option.class,
                            selectedColor === option.id ? "border-foreground scale-110 shadow-md" : "border-transparent hover:scale-105"
                          )}
                          aria-label={`Select ${option.id} color`}
                        />
                      ))}
                    </div>
                  </div>
                </div>

                <div className="pt-4">
                  <button 
                    type="submit"
                    disabled={!newText.trim()}
                    className="w-full bg-gradient-accent text-white rounded-2xl py-4 font-bold text-lg shadow-lg hover:shadow-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed hover:scale-[1.02] active:scale-[0.98]"
                  >
                    Pick a spot
                  </button>
                </div>

              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
