"use server";
import { createClient } from "@/utils/supabase/server";

export async function addStickyNote(formData: FormData) {
  const text = formData.get("text") as string;
  const author = formData.get("author") as string;
  const color = formData.get("color") as string;
  const x = formData.get("x") as string;
  const y = formData.get("y") as string;
  const rotation = formData.get("rotation") as string;

  if (!text) {
    throw new Error("Missing text");
  }

  const supabase = await createClient();

  const { error } = await supabase
    .from("notes")
    .insert([{
      text,
      author: author || "Anonymous",
      color,
      x: parseFloat(x),
      y: parseFloat(y),
      rotation: parseFloat(rotation)
    }]);

  if (error) {
    console.error("Failed to insert note:", error);
    throw new Error("Failed to insert note");
  }
}
