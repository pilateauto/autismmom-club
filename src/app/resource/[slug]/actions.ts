"use server";
import { createClient } from "@/utils/supabase/server";
import { revalidatePath } from "next/cache";

export async function addComment(formData: FormData) {
  const resource_slug = formData.get("slug") as string;
  const text = formData.get("text") as string;

  if (!text || !text.trim() || !resource_slug) {
    throw new Error("Missing required fields");
  }

  const supabase = await createClient();

  const { error } = await supabase
    .from("comments")
    .insert([{
      resource_slug,
      text: text.trim(),
      author: "Anonymous Mom"
    }]);

  if (error) {
    console.error("Failed to add comment:", error);
    throw new Error("Failed to add comment");
  }

  revalidatePath(`/resource/${resource_slug}`);
}
