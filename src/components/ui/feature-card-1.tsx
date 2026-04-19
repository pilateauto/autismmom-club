import * as React from "react";
import { motion, HTMLMotionProps } from "framer-motion";
import { cn } from "@/lib/utils";

interface AnimatedFeatureCardProps extends Omit<HTMLMotionProps<"div">, "color"> {
  index: string;
  tag: string;
  title: string;
  imageSrc: string; 
  color: "orange" | "purple" | "blue" | "green";
}

const colorVariants = {
  orange: {
    bg: "bg-orange-50 dark:bg-orange-950/50",
    text: "text-orange-500 dark:text-orange-400",
    gradient: "from-orange-50/80 dark:from-orange-900/20"
  },
  purple: {
    bg: "bg-purple-50 dark:bg-purple-950/50",
    text: "text-purple-500 dark:text-purple-400",
    gradient: "from-purple-50/80 dark:from-purple-900/20"
  },
  blue: {
    bg: "bg-blue-50 dark:bg-blue-950/50",
    text: "text-blue-500 dark:text-blue-400",
    gradient: "from-blue-50/80 dark:from-blue-900/20"
  },
  green: {
    bg: "bg-green-50 dark:bg-green-950/50",
    text: "text-green-500 dark:text-green-400",
    gradient: "from-green-50/80 dark:from-green-900/20"
  },
};

const AnimatedFeatureCard = React.forwardRef<
  HTMLDivElement,
  AnimatedFeatureCardProps
>(({ className, index, tag, title, imageSrc, color, ...props }, ref) => {
  const variant = colorVariants[color] || colorVariants.orange;

  return (
    <motion.div
      ref={ref}
      className={cn(
        "relative flex h-[380px] w-full max-w-sm flex-col justify-end overflow-hidden rounded-[32px] bg-white dark:bg-neutral-950 p-6 shadow-sm border border-neutral-100 dark:border-neutral-900",
        className
      )}
      whileHover="hover"
      initial="initial"
      variants={{
        initial: { y: 0 },
        hover: { y: -5, boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)" },
      }}
      transition={{ type: "spring", stiffness: 200, damping: 15 }}
      {...props}
    >
      {/* Background Gradient */}
      <div
        className={cn("absolute inset-0 z-0 bg-gradient-to-b to-transparent", variant.gradient)}
      />
      
      {/* Index Number */}
      <div className="absolute top-8 left-8 font-mono text-xl font-bold text-neutral-400/50">
        {index}
      </div>

      {/* Main Emoji Image */}
      <motion.div 
        className="absolute inset-0 z-10 flex items-center justify-center drop-shadow-2xl"
        variants={{
            initial: { scale: 1, y: 0 },
            hover: { scale: 1.15, y: -15 },
        }}
        transition={{ type: "spring", stiffness: 200, damping: 15 }}
      >
        <img src={imageSrc} alt={tag} className="w-[160px] h-[160px] object-contain drop-shadow-xl" />
      </motion.div>
      
      {/* Content */}
      <div className="relative z-20 rounded-[24px] border border-neutral-100 dark:border-neutral-800 bg-white/90 dark:bg-neutral-950/90 p-5 backdrop-blur-md shadow-[0_-5px_20px_-10px_rgba(0,0,0,0.05)]">
        <span
          className={cn("mb-3 inline-block rounded-full px-3 py-1 text-xs font-bold uppercase tracking-wider", variant.bg, variant.text)}
        >
          {tag}
        </span>
        <p className="text-base font-medium text-neutral-800 dark:text-neutral-200 leading-relaxed">{title}</p>
      </div>
    </motion.div>
  );
});
AnimatedFeatureCard.displayName = "AnimatedFeatureCard";

export { AnimatedFeatureCard };
