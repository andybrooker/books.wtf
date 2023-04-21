import { supabase } from "./supabaseClient";

export async function getInitialBooks(start: number = 0, limit: number = 19) {
  return await supabase
    .from("book_list")
    .select(
      `
  title,
  year,
  cover_url,
  url, 
  name`
    )
    .order("year", { ascending: true })
    .range(start, limit);
}
