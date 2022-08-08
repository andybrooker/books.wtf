import { GetStaticProps, NextPage } from "next";
import Head from "next/head";
import { Frame, Margins } from "../../components/Base";
import { supabase } from "../../utils/supabaseClient";

interface Props {
  book: {
    title: string;
    year: number;
    cover_url: string;
    url: string;
    author: {
      name: string;
    };
  };
}

const Book: NextPage<Props> = ({ book }) => {
  return (
    <div>
      <Head>
        <title>{book?.title}</title>
        <meta
          name="description"
          content={`${book.title} by ${book.author.name}.`}
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Frame
        css={{
          width: "100vw",
        }}
      >
        <Margins
          display={{
            "@initial": "desktop",
            "@mobile": "mobile",
          }}
        ></Margins>
      </Frame>
    </div>
  );
};

export async function getStaticPaths() {
  let { data: books, error } = await supabase.from("books").select(`
  url`);

  const paths = books?.map((book) => ({
    params: { id: book.url.toString() },
  }));

  return { paths, fallback: false };
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const { data: book, error } = await supabase
    .from("books")
    .select(
      `
  title,
  year,
  cover_url, 
  url,
  author(name)`
    )
    .eq("url", `${params?.id}`)
    .limit(1)
    .single();

  // Pass post data to the page via props
  return { props: { book } };
};

export default Book;
