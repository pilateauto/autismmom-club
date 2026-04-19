import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

const EMOJI_DIR = "/Users/claudemonet/Desktop/size-1024/images";

export async function GET(request: Request) {
  const url = new URL(request.url);
  const file = url.searchParams.get("file");

  if (!file) {
    return new NextResponse("File required", { status: 400 });
  }

  // Prevent directory traversal attacks
  const safeFile = path.basename(file);
  const fullPath = path.join(EMOJI_DIR, safeFile);

  try {
    const buffer = fs.readFileSync(fullPath);
    return new NextResponse(buffer, {
      headers: {
        "Content-Type": "image/png",
        "Cache-Control": "public, max-age=31536000, immutable",
      },
    });
  } catch (error) {
    return new NextResponse("Image not found", { status: 404 });
  }
}
