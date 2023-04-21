import { supabase } from "./supabaseClient";

type Ascending = {
  ascending?: boolean;
  foreignTable?: string;
};

export async function getBooks(
  start: number = 0,
  limit: number = 19,
  sort: number
) {
  switch (sort) {
    case 0:
      return await getBooksBySort(start, limit, "name", { ascending: true });
    case 1:
      return await getBooksBySort(start, limit, "name", { ascending: false });
    case 2:
      return await getBooksBySort(start, limit, "year", { ascending: true });
    case 3:
      return await getBooksBySort(start, limit, "year", { ascending: false });
    default:
      return await getBooksBySort(start, limit, "year", { ascending: true });
  }
}

async function getBooksBySort(
  start: number,
  limit: number,
  sort_category: string,
  asc_or_desc: Ascending
) {
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
    .order(sort_category, asc_or_desc)
    .range(start, limit);
}
