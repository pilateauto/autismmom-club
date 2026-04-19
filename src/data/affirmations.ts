export type AffirmationColor = "yellow" | "pink" | "blue" | "green" | "purple";

export interface Affirmation {
  id: string;
  text: string;
  author?: string;
  color: AffirmationColor;
  rotation: number;
  x: number;
  y: number;
}

export const initialAffirmations: Affirmation[] = [
  {
    id: "1",
    text: "You are exactly the mother your child needs. Don't let anyone tell you otherwise.",
    author: "Sarah M.",
    color: "yellow",
    rotation: -3,
    x: 48,
    y: 45,
  },
  {
    id: "2",
    text: "A meltdown is just a hard time, not a bad kid. Deep breaths. You got this.",
    author: "Elena",
    color: "pink",
    rotation: 4,
    x: 52,
    y: 48,
  },
  {
    id: "3",
    text: "Celebrate the inchstones! Today we wore socks for 10 whole minutes! 🎉",
    color: "blue",
    rotation: -5,
    x: 46,
    y: 52,
  },
  {
    id: "4",
    text: "Fed is best. Even if it's Goldfish and applesauce for the 4th day in a row.",
    author: "TiredMom99",
    color: "green",
    rotation: 2,
    x: 55,
    y: 44,
  },
  {
    id: "5",
    text: "It's okay to grieve the parenting experience you thought you'd have. It doesn't mean you love them any less.",
    color: "purple",
    rotation: -2,
    x: 49,
    y: 55,
  },
  {
    id: "6",
    text: "You are fiercely advocating for a world that wasn't built for them. I see you.",
    author: "Coach J",
    color: "yellow",
    rotation: 5,
    x: 44,
    y: 49,
  },
  {
    id: "7",
    text: "Remember to drink water and unclench your jaw. You need care too.",
    color: "pink",
    rotation: -4,
    x: 54,
    y: 53,
  },
  {
    id: "8",
    text: "If you survived the grocery store trip today, you deserve a medal. 🥇",
    author: "Mama Bear",
    color: "blue",
    rotation: 3,
    x: 51,
    y: 42,
  }
];
