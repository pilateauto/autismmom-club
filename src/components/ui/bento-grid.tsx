import { cn } from "@/lib/utils";
import { LucideIcon } from "lucide-react";
import React from "react";

export interface BentoItem {
  title: string;
  description: string;
  icon: LucideIcon;
  status?: string;
  tags?: string[];
  meta?: string;
  cta?: string;
  colSpan?: number;
  hasPersistentHover?: boolean;
}

interface BentoGridProps {
  items: BentoItem[];
}

export function BentoGrid({ items }: BentoGridProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-4 max-w-6xl mx-auto">
      {items.map((item, index) => (
        <div
          key={index}
          className={cn(
            "group relative p-6 rounded-3xl overflow-hidden transition-all duration-300",
            "border border-border/50 bg-white shadow-sm",
            "hover:shadow-xl hover:-translate-y-1 will-change-transform",
            item.colSpan === 2 ? "md:col-span-2" : "col-span-1",
            {
              "shadow-md -translate-y-0.5": item.hasPersistentHover,
            }
          )}
        >
          {/* Dot pattern background on hover */}
          <div
            className={cn(
              "absolute inset-0 transition-opacity duration-500",
              item.hasPersistentHover ? "opacity-100" : "opacity-0 group-hover:opacity-100"
            )}
          >
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,0,0,0.03)_1px,transparent_1px)] bg-[length:12px_12px]" />
            <div className="absolute inset-0 bg-gradient-to-br from-transparent via-white/50 to-white/80" />
          </div>

          <div className="relative flex flex-col h-full space-y-4">
            <div className="flex items-center justify-between">
              <div className="w-12 h-12 rounded-2xl flex items-center justify-center bg-surface group-hover:scale-110 group-hover:bg-primary/5 transition-all duration-500 text-foreground">
                <item.icon size={24} strokeWidth={1.5} />
              </div>
              {item.status && (
                <span
                  className={cn(
                    "text-[10px] uppercase tracking-widest font-semibold px-3 py-1 rounded-full backdrop-blur-sm border border-border/50",
                    "bg-surface text-foreground/70",
                    "transition-colors duration-300 group-hover:bg-primary/10 group-hover:text-primary group-hover:border-primary/20"
                  )}
                >
                  {item.status}
                </span>
              )}
            </div>

            <div className="space-y-3 flex-grow pt-4">
              <h3 className="font-sans text-xl text-foreground tracking-tight flex items-center">
                {item.title}
                {item.meta && (
                  <span className="ml-3 text-xs font-mono text-muted-foreground font-normal px-2 py-1 bg-surface rounded-md">
                    {item.meta}
                  </span>
                )}
              </h3>
              <p className="text-base font-serif text-foreground/70 leading-relaxed">
                {item.description}
              </p>
            </div>

            <div className="flex items-center justify-between mt-auto pt-6 border-t border-border/50">
              <div className="flex items-center space-x-2 text-[10px] uppercase tracking-wider font-semibold text-foreground/50">
                {item.tags?.map((tag, i) => (
                  <span
                    key={i}
                    className="px-2.5 py-1 rounded-md bg-surface transition-colors duration-300 group-hover:bg-primary/5 group-hover:text-primary"
                  >
                    {tag}
                  </span>
                ))}
              </div>
              {item.cta && (
                <span className="text-xs font-semibold text-primary opacity-0 -translate-x-2 group-hover:translate-x-0 group-hover:opacity-100 transition-all duration-300 flex items-center">
                  {item.cta}
                </span>
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
