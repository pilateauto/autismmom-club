"use server";

import { createClient } from "@/utils/supabase/server";
import { revalidatePath } from "next/cache";

export async function approveResource(formData: FormData) {
  const supabase = await createClient();
  const id = formData.get("id") as string;
  const emoji = formData.get("emoji") as string;
  const category = formData.get("category") as string;

  if (!id) throw new Error("Missing ID");

  const { error } = await supabase
    .from("resources")
    .update({ 
      status: "published",
      emoji: emoji || "https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Smilies/Star.png" 
    })
    .eq("id", id);

  if (error) {
    console.error("Failed to approve:", error);
    throw new Error(error.message);
  }

  // Revalidate the toolkit page to show the new content immediately
  revalidatePath(`/toolkit/${category}`);
  revalidatePath("/admin");
}

export async function rejectResource(formData: FormData) {
  const supabase = await createClient();
  const id = formData.get("id") as string;

  if (!id) throw new Error("Missing ID");

  const { error } = await supabase
    .from("resources")
    .update({ status: "rejected" })
    .eq("id", id);

  if (error) {
    console.error("Failed to reject:", error);
    throw new Error(error.message);
  }

  revalidatePath("/admin");
}
