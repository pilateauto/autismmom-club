import * as React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

export interface TeamMember {
  name: string;
  role: string;
  imageSrc: string;
  themeColor: string;
}

export interface TeamShowcaseProps extends React.HTMLAttributes<HTMLDivElement> {
  title?: string;
  description?: string;
  buttonText?: string;
  members: TeamMember[];
}

const TeamShowcase = React.forwardRef<HTMLDivElement, TeamShowcaseProps>(
  (
    {
      title = "THE MAGIC DEVS YOU'VE BEEN SEARCHING FOR",
      description = "Why wasting time on so many different platforms for searching, interviewing and find out that it’s not a good fit? We do all of these for you. No more back and forth. Get matched today.",
      buttonText = "FIND YOUR DEVELOPER",
      members,
      className,
      ...props
    },
    ref
  ) => {
    const containerVariants = {
      hidden: { opacity: 0 },
      visible: {
        opacity: 1,
        transition: {
          staggerChildren: 0.2,
        },
      },
    };

    const cardVariants = {
      hidden: { y: 20, opacity: 0 },
      visible: {
        y: 0,
        opacity: 1,
        transition: {
          type: "spring" as const,
          stiffness: 100,
          damping: 10,
        },
      },
    };

    return (
      <div ref={ref} className={cn("w-full py-16", className)} {...props}>
        <div className="max-w-7xl mx-auto flex flex-col items-center text-center">
          <div className="max-w-xl mb-12">
            <h1 className="text-3xl md:text-4xl font-serif text-foreground mb-4">
              {title}
            </h1>
            <p className="text-foreground/70 font-body mb-8">{description}</p>
            <button className="bg-gradient-accent text-white font-body rounded-full px-8 py-3 text-sm hover:opacity-90 transition-all hover:scale-[1.02] active:scale-[0.98]">
              {buttonText}
            </button>
          </div>

          <motion.div
            className="w-full flex justify-center items-end -space-x-8 md:-space-x-4 px-4 pt-12"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <AnimatePresence>
              {members.map((member, index) => (
                <motion.div
                  key={member.name}
                  className="w-full max-w-[200px] md:max-w-[250px] group relative"
                  variants={cardVariants}
                  whileHover={{ y: -20, scale: 1.05, zIndex: 40 }}
                  style={{ zIndex: members.length - index }}
                >
                  <div
                    className={cn(
                      "relative pt-8 pb-4 px-4 rounded-t-[100px] h-[320px] md:h-[350px] flex flex-col items-center justify-between text-center overflow-hidden border border-white/20 shadow-xl",
                      member.themeColor
                    )}
                  >
                    <div className="text-black/80 z-10">
                      <h3 className="font-bold text-sm md:text-base">{member.name}</h3>
                      <p className="text-xs md:text-sm font-semibold opacity-60 uppercase tracking-widest mt-1">{member.role}</p>
                    </div>
                    <img
                      src={member.imageSrc}
                      alt={member.name}
                      className="absolute bottom-0 left-0 w-full h-auto object-cover object-bottom drop-shadow-2xl transition-transform duration-500 group-hover:scale-110"
                      style={{ maxHeight: "85%" }}
                    />
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        </div>
      </div>
    );
  }
);

TeamShowcase.displayName = "TeamShowcase";

export { TeamShowcase };
