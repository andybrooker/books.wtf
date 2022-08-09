import { GetStaticProps, NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import { Frame, Margins, Text } from "../../components/Base";
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

const fadeInUp = {
  initial: {
    opacity: 0,
  },
  animate: {
    opacity: 1,
    transition: {
      duration: 2,
    },
  },
};

const Book: NextPage<Props> = ({ book }) => {
  return (
    <main style={{ height: "100%" }}>
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
          height: "100%",
        }}
      >
        <Margins
          display={{
            "@initial": "desktop",
            "@mobile": "mobile",
          }}
          css={{ height: "100%" }}
        >
          <Frame
            css={{
              display: "flex",
              flexWrap: "wrap",
              alignItems: "center",
              justifyContent: "center",
              gap: "100px",
              height: "100%",
            }}
          >
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0, transition: { duration: 0.75 } }}
            >
              <Frame
                css={{
                  height: "450px",
                  width: "375px",
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
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{
                    opacity: 1,
                    transition: { delay: 0.2, transition: 0.5 },
                  }}
                >
                  <Frame
                    css={{
                      position: "relative",
                      height: "300px",
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
                </motion.div>
              </Frame>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{
                y: 0,
                opacity: 1,
                transition: { delay: 0.3, duration: 0.75 },
              }}
            >
              <Frame
                css={{
                  width: "400px",
                }}
              >
                <Text size="3">{book.title}</Text>
                <Text size="2" color="secondary">
                  {book.author.name}
                </Text>
              </Frame>
            </motion.div>
          </Frame>
        </Margins>
      </Frame>
    </main>
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
