import { GetStaticProps, NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import { Frame, Margins } from "../../components/Base";
import { supabase } from "../../utils/supabaseClient";
import { motion } from "framer-motion";

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
    <motion.main
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
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
        >
          <Frame
            css={{
              height: "300px",
              width: "250px",
              display: "flex",
              alignItems: "center",
              "& *": {
                flexGrow: 1,
              },
              backgroundColor: "$sand3",
              "&:hover": {
                backgroundColor: "$sand4",
                transition: "backgroundColor 300ms ease",
                "& img": {
                  transition: "transform 300ms ease",
                  transform: "translateY(-5px)",
                },
              },
            }}
          >
            <Frame
              css={{
                position: "relative",
                height: "207px",
                "& span": {
                  overflow: "visible !important",
                },
                "& img": {
                  boxShadow: "$medium",
                  minWidth: "0px !important",
                  width: "auto !important",
                  transition: "transform 300ms ease",
                },
              }}
            >
              <Image
                src={`https://rfcwposhqmpsheypfwaq.supabase.co/storage/v1/object/public/book-covers/${book.cover_url}`}
                alt={`${book.title} Book Cover`}
                objectFit="contain"
                layout="fill"
              />
            </Frame>
          </Frame>
        </Margins>
      </Frame>
    </motion.main>
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
