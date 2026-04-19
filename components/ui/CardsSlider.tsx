"use client";

import { useEffect, useRef, useState } from "react";

type ShowcaseCard = {
  id: string;
  title: string;
  eyebrow: string;
  description: string;
  image: string;
  stat: string;
  accent: string;
  tags: string[];
};

const SHOWCASE_CARDS: ShowcaseCard[] = [
  {
    id: "launch-core",
    eyebrow: "Launch Core",
    title: "Pre-configured school infrastructure",
    description:
      "Mac Mini, secure network, and the administrative stack arrive provisioned before the founder ever opens the box.",
    image: "/images-test/001-abstract-3d-smooth-fluid-waves-and-soft-.png",
    stat: "Deployment-ready on arrival",
    accent: "#F59E0B",
    tags: ["Hardware", "Operations", "Provisioned"],
  },
  {
    id: "enrollment-flow",
    eyebrow: "Enrollment Flow",
    title: "A calmer route from inquiry to enrollment",
    description:
      "The front-end funnel, communication logic, and follow-up sequences are designed as one surface rather than stitched tools.",
    image: "/images-test/001-soft-abstract-gradient-background-with-3.png",
    stat: "~500 monthly prospect capacity",
    accent: "#06B6D4",
    tags: ["CRM", "Automation", "Growth"],
  },
  {
    id: "family-experience",
    eyebrow: "Family Experience",
    title: "Parent-facing communication that feels gentle",
    description:
      "Reports, reminders, and scheduling touchpoints stay consistent so the school feels trustworthy from the first week.",
    image: "/images-test/001-soft-translucent-watercolor-texture-on-a.png",
    stat: "Low-friction family touchpoints",
    accent: "#FB7185",
    tags: ["Parent updates", "Scheduling", "Trust"],
  },
  {
    id: "curriculum-layer",
    eyebrow: "Curriculum Layer",
    title: "Adaptive learning wrapped in a usable system",
    description:
      "The learning layer is presented as an operating environment for teachers, not a loose stack of disconnected tools.",
    image: "/images-test/001-gentle-sweeping-watercolor-wash-backgrou.png",
    stat: "Harvard-backed learning pathways",
    accent: "#22C55E",
    tags: ["AEIOS", "Adaptive", "Multi-age"],
  },
  {
    id: "school-footprint",
    eyebrow: "Microschool Footprint",
    title: "A school model small enough to start, complete enough to last",
    description:
      "The box reduces the distance between a founder's vision and a functioning microschool with durable systems underneath.",
    image: "/images-test/001-abstract-minimalist-line-art-depicting-a.png",
    stat: "Built for independent educators",
    accent: "#94A3B8",
    tags: ["Microschool", "Compliance", "Durability"],
  },
  {
    id: "teacher-relief",
    eyebrow: "Teacher Relief",
    title: "More educator energy reserved for students",
    description:
      "Administrative drag is deliberately shifted away from the teacher so attention stays where the product actually earns trust.",
    image: "/images-test/001-minimalist-continuous-single-line-art-dr.png",
    stat: "Admin work moves off the founder",
    accent: "#EAB308",
    tags: ["Teacher time", "Support", "Retention"],
  },
];

const INSIGHT_STRIPS = [
  {
    label: "What This Replaces",
    value: "A single static mock",
    description: "The product is shown as a system of surfaces rather than one decorative image.",
  },
  {
    label: "What It Signals",
    value: "Pre-configured confidence",
    description: "Every card reinforces that the box ships assembled, not as a consulting engagement.",
  },
  {
    label: "What It Supports",
    value: "Founder stamina",
    description: "The story lands on reduced administrative burden instead of vague AI futurism.",
  },
];

function ArrowButton({
  direction,
  disabled,
  onClick,
}: {
  direction: "left" | "right";
  disabled: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      aria-label={direction === "left" ? "Scroll showcase left" : "Scroll showcase right"}
      style={{
        width: 44,
        height: 44,
        borderRadius: 999,
        border: `1px solid ${disabled ? "rgba(255,255,255,0.06)" : "rgba(255,255,255,0.12)"}`,
        background: disabled ? "rgba(255,255,255,0.02)" : "rgba(255,255,255,0.05)",
        color: disabled ? "rgba(255,255,255,0.18)" : "rgba(255,255,255,0.66)",
        display: "grid",
        placeItems: "center",
        cursor: disabled ? "not-allowed" : "pointer",
        transition: "all 0.2s ease",
        boxShadow: disabled ? "none" : "0 12px 28px rgba(0,0,0,0.18)",
      }}
    >
      <span style={{ fontSize: 16, lineHeight: 1 }}>{direction === "left" ? "\u2190" : "\u2192"}</span>
    </button>
  );
}

export function CardsSlider() {
  const trackRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) {
      return;
    }

    const updateScrollState = () => {
      setCanScrollLeft(track.scrollLeft > 12);
      setCanScrollRight(track.scrollLeft < track.scrollWidth - track.clientWidth - 12);
    };

    updateScrollState();
    track.addEventListener("scroll", updateScrollState, { passive: true });
    window.addEventListener("resize", updateScrollState);

    return () => {
      track.removeEventListener("scroll", updateScrollState);
      window.removeEventListener("resize", updateScrollState);
    };
  }, []);

  const scrollByCard = (direction: "left" | "right") => {
    const track = trackRef.current;
    if (!track) {
      return;
    }

    const amount = Math.min(track.clientWidth * 0.86, 380);
    track.scrollBy({
      left: direction === "left" ? -amount : amount,
      behavior: "smooth",
    });
  };

  return (
    <section
      style={{
        position: "relative",
        borderRadius: 28,
        padding: "32px 24px 24px",
        background:
          "linear-gradient(180deg, rgba(255,255,255,0.045) 0%, rgba(255,255,255,0.018) 100%)",
        border: "1px solid rgba(255,255,255,0.07)",
        boxShadow: "0 32px 80px rgba(0,0,0,0.28)",
        overflow: "hidden",
      }}
    >
      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "radial-gradient(circle at top left, rgba(245,158,11,0.12), transparent 36%), radial-gradient(circle at bottom right, rgba(6,182,212,0.1), transparent 34%)",
          pointerEvents: "none",
        }}
      />

      <div
        style={{
          position: "relative",
          zIndex: 1,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-end",
          gap: 20,
          flexWrap: "wrap",
          marginBottom: 24,
        }}
      >
        <div style={{ maxWidth: 660 }}>
          <div
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: 10,
              letterSpacing: "0.28em",
              color: "rgba(245,158,11,0.8)",
              marginBottom: 10,
            }}
          >
            INSIDE THE BOX
          </div>
          <h3
            style={{
              fontSize: "clamp(28px, 4vw, 42px)",
              lineHeight: 1.05,
              fontWeight: 800,
              letterSpacing: "-0.04em",
              color: "#F8FAFC",
              marginBottom: 12,
            }}
          >
            The product now reads like a complete operating surface, not a lone visual placeholder.
          </h3>
          <p
            style={{
              fontSize: 14,
              lineHeight: 1.75,
              color: "rgba(255,255,255,0.52)",
              maxWidth: 620,
            }}
          >
            Each frame emphasizes a different piece of the WozEd Box story: pre-configured launch,
            enrollment flow, family experience, adaptive learning, microschool durability, and
            teacher relief.
          </p>
        </div>

        <div style={{ display: "flex", gap: 10 }}>
          <ArrowButton
            direction="left"
            disabled={!canScrollLeft}
            onClick={() => scrollByCard("left")}
          />
          <ArrowButton
            direction="right"
            disabled={!canScrollRight}
            onClick={() => scrollByCard("right")}
          />
        </div>
      </div>

      <div
        style={{
          position: "relative",
          zIndex: 1,
          display: "flex",
          gap: 10,
          flexWrap: "wrap",
          marginBottom: 22,
        }}
      >
        {["Plug-and-play hardware", "Admin + curriculum layers", "Designed for microschool reality"].map(
          (item) => (
            <span
              key={item}
              style={{
                padding: "8px 12px",
                borderRadius: 999,
                fontFamily: "var(--font-mono)",
                fontSize: 10,
                letterSpacing: "0.08em",
                color: "rgba(255,255,255,0.6)",
                background: "rgba(255,255,255,0.04)",
                border: "1px solid rgba(255,255,255,0.06)",
              }}
            >
              {item}
            </span>
          ),
        )}
      </div>

      <div
        ref={trackRef}
        className="cards-slider-track"
        style={{
          position: "relative",
          zIndex: 1,
          display: "grid",
          gridAutoFlow: "column",
          gridAutoColumns: "minmax(280px, 360px)",
          gap: 18,
          overflowX: "auto",
          paddingBottom: 10,
          scrollSnapType: "x mandatory",
          scrollbarWidth: "none",
        }}
      >
        {SHOWCASE_CARDS.map((card, index) => (
          <article
            key={card.id}
            style={{
              scrollSnapAlign: "start",
              display: "flex",
              flexDirection: "column",
              minHeight: 470,
              borderRadius: 24,
              overflow: "hidden",
              background: "rgba(10,10,18,0.9)",
              border: "1px solid rgba(255,255,255,0.06)",
              boxShadow: "0 18px 50px rgba(0,0,0,0.22)",
            }}
          >
            <div style={{ position: "relative", aspectRatio: "1 / 1", overflow: "hidden" }}>
              <img
                src={card.image}
                alt={card.title}
                style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
              />
              <div
                style={{
                  position: "absolute",
                  inset: 0,
                  background:
                    "linear-gradient(180deg, rgba(6,6,10,0.02) 0%, rgba(6,6,10,0.2) 56%, rgba(6,6,10,0.88) 100%)",
                }}
              />
              <div
                style={{
                  position: "absolute",
                  top: 16,
                  left: 16,
                  padding: "8px 10px",
                  borderRadius: 999,
                  background: "rgba(6,6,10,0.58)",
                  border: "1px solid rgba(255,255,255,0.12)",
                  fontFamily: "var(--font-mono)",
                  fontSize: 9,
                  letterSpacing: "0.12em",
                  color: card.accent,
                }}
              >
                {card.eyebrow.toUpperCase()}
              </div>
              <div
                style={{
                  position: "absolute",
                  right: 16,
                  bottom: 16,
                  width: 42,
                  height: 42,
                  borderRadius: 999,
                  border: `1px solid ${card.accent}55`,
                  background: "rgba(6,6,10,0.56)",
                  boxShadow: `0 0 0 8px ${card.accent}08`,
                  display: "grid",
                  placeItems: "center",
                  fontFamily: "var(--font-mono)",
                  fontSize: 12,
                  color: "#F8FAFC",
                }}
              >
                {String(index + 1).padStart(2, "0")}
              </div>
            </div>

            <div
              style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                gap: 18,
                padding: 22,
                flex: 1,
              }}
            >
              <div>
                <div
                  style={{
                    fontFamily: "var(--font-mono)",
                    fontSize: 10,
                    letterSpacing: "0.08em",
                    color: card.accent,
                    marginBottom: 10,
                  }}
                >
                  {card.stat}
                </div>
                <h4
                  style={{
                    fontSize: 22,
                    lineHeight: 1.12,
                    letterSpacing: "-0.03em",
                    color: "#F8FAFC",
                    fontWeight: 700,
                    marginBottom: 10,
                  }}
                >
                  {card.title}
                </h4>
                <p
                  style={{
                    fontSize: 13,
                    lineHeight: 1.7,
                    color: "rgba(255,255,255,0.5)",
                  }}
                >
                  {card.description}
                </p>
              </div>

              <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                {card.tags.map((tag) => (
                  <span
                    key={tag}
                    style={{
                      padding: "7px 10px",
                      borderRadius: 999,
                      background: "rgba(255,255,255,0.035)",
                      border: "1px solid rgba(255,255,255,0.06)",
                      fontFamily: "var(--font-mono)",
                      fontSize: 10,
                      color: "rgba(255,255,255,0.58)",
                    }}
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </article>
        ))}
      </div>

      <div
        style={{
          position: "relative",
          zIndex: 1,
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
          gap: 12,
          marginTop: 24,
        }}
      >
        {INSIGHT_STRIPS.map((item) => (
          <div
            key={item.label}
            style={{
              padding: "16px 18px",
              borderRadius: 18,
              background: "rgba(255,255,255,0.03)",
              border: "1px solid rgba(255,255,255,0.06)",
            }}
          >
            <div
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: 9,
                letterSpacing: "0.14em",
                color: "rgba(255,255,255,0.34)",
                marginBottom: 8,
              }}
            >
              {item.label.toUpperCase()}
            </div>
            <div
              style={{
                fontSize: 18,
                lineHeight: 1.2,
                letterSpacing: "-0.03em",
                color: "#F8FAFC",
                fontWeight: 700,
                marginBottom: 6,
              }}
            >
              {item.value}
            </div>
            <p style={{ fontSize: 12, lineHeight: 1.6, color: "rgba(255,255,255,0.46)" }}>
              {item.description}
            </p>
          </div>
        ))}
      </div>

      <style jsx>{`
        .cards-slider-track::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </section>
  );
}
