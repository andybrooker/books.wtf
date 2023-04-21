import Logo from "@/components/Logo";
import db from "@/lib/supabase/supabase";
import { PostgrestFilterBuilder } from "@supabase/postgrest-js";

type HomeSearchParams = {
  searchParams: { [key: string]: string | string[] | undefined };
};

export default async function Home({ searchParams }: HomeSearchParams) {
  const { data: books } = await getBooks({ searchParams });

  if (!books) {
    return <div>No Books!</div>;
  }

  return (
    <>
      <header className="px-24 py-6">
        <nav className="">
          <Logo />
        </nav>
      </header>
      <main className="flex min-h-screen flex-col items-center justify-between px-24">
        <table className="w-full">
          <tbody className="tracking-tight">
            <tr className="text-sand-1100 text-xs">
              <th className="text-left font-medium py-1">Title</th>
              <th className="text-left font-medium py-1">Author</th>
              <th className="text-left font-medium py-1">Era</th>
              <th className="text-right font-medium py-1">Year</th>
            </tr>

            {books.map((book) => (
              <tr className="text-sm font-[450]" key={book.title}>
                <td className="text-left py-2">{book.title}</td>
                <td className="text-left py-2">{book.name}</td>
                <td className="text-left py-2">{getEra(book.year)}</td>
                <td className="text-right py-2">{formatYear(book.year)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </main>
    </>
  );
}

function formatYear(year: number) {
  return year < 0 ? `${-year} BCE` : `${year} CE`;
}

function getEra(year: number) {
  let era = "";
  if (year < -1200) {
    era = "Ancient";
  }
  if (year >= -1200 && year < 455) {
    era = "Classical";
  }
  if (year >= 455 && year < 1485) {
    era = "Medieval";
  }
  if (year >= 1485 && year < 1790) {
    era = "Early Modern";
  }
  if (year >= 1790 && year < 1945) {
    era = "Late Modern";
  }
  if (year >= 1945) {
    era = "Contemporary";
  }
  return era;
}

async function getBooks({ searchParams }: HomeSearchParams) {
  const { sort, year, yearFilterType } = searchParams;
  const sortValue = sort && (sort === "asc" || sort === "desc") ? sort : "asc";
  const ascending = sortValue === "asc";

  let query = db
    .from("book_list")
    .select("title,year,cover_url,url,name")
    .order("year", { ascending });

  if (yearFilterType && typeof yearFilterType === "string" && year) {
    query = addYearFiltersToQuery(yearFilterType, year, query);
  }

  return await query;
}

function addYearFiltersToQuery(
  yearFilterType: string | string[] | undefined,
  year: string | string[] | undefined,
  query: PostgrestFilterBuilder<
    any,
    any,
    {
      title: any;
      year: any;
      cover_url: any;
      url: any;
      name: any;
    }[]
  >
) {
  switch (yearFilterType) {
    case "eq":
      if (typeof year === "string") {
        query = query.eq("year", year);
      }
      break;
    case "lt":
      if (typeof year === "string") {
        query = query.lt("year", Number(year));
      }
      break;
    case "gt":
      if (typeof year === "string") {
        query = query.gte("year", Number(year));
      }
      break;
    case "between":
      if (Array.isArray(year)) {
        query = query
          .gte("year", year.sort((a, b) => Number(a) - Number(b))[0])
          .lte("year", year.sort((a, b) => Number(a) - Number(b))[1]);
      }
      break;
    case "outside":
      if (Array.isArray(year)) {
        query = query
          .lte("year", year.sort((a, b) => Number(a) - Number(b))[0])
          .or(`year.gte.${year.sort((a, b) => Number(a) - Number(b))[1]}`);
      }
    default:
      break;
  }
  return query;
}
