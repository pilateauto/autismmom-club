import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

// Use the curated 500-emoji catalog in the public folder
const EMOJI_DB_PATH = path.join(process.cwd(), "public", "emojis", "emojis-meta.json");

export async function GET(request: Request) {
  const url = new URL(request.url);
  const query = url.searchParams.get("q")?.toLowerCase();

  if (!query) {
    return NextResponse.json({ items: [] });
  }

  try {
    const rawData = fs.readFileSync(EMOJI_DB_PATH, "utf-8");
    const db = JSON.parse(rawData);
    
    // Filter the curated 500 list down to max 20 matches
    const matches = db.items
      .filter((item: any) => 
        item.title.toLowerCase().includes(query) || 
        item.tags.some((t: string) => t.toLowerCase().includes(query))
      )
      .slice(0, 20);

    return NextResponse.json({ items: matches });
  } catch (error) {
    console.error("Failed to read emoji DB:", error);
    return NextResponse.json({ error: "Failed to read database" }, { status: 500 });
  }
}
