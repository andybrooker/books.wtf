import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import { FunctionComponent, useState } from "react";
import { styled } from "../stitches.config";
import {
  Frame,
  LinkStyle,
  Margins,
  Select,
  SelectContent,
  SelectItem,
  SelectItemText,
  SelectTrigger,
  SelectValue,
  SelectViewport,
  StyledButton,
  Text,
} from "../components/Base";
import { GetStaticProps } from "next";
import { motion } from "framer-motion";
import { getInitialBooks } from "../utils/getInitialBooks";
import fetcher from "../utils/fetcher";
import useSWR, { SWRConfig, useSWRConfig } from "swr";
import useSWRInfinite from "swr/infinite";

type Props = {
  fallback: {
    data: Book[];
  };
};

type Book = {
  title: string;
  cover_url: string;
  year: number;
  url: string;
  name: string;
};

const Home: NextPage<Props> = ({ fallback }) => {
  return (
    <motion.main
      initial={{ opacity: 0, y: 5 }}
      animate={{
        opacity: 1,
        y: 0,
        transition: { duration: 0.75 },
      }}
    >
      <Head>
        <title>BOOKS</title>
        <meta
          name="description"
          content="A collection of past classics and a prediction of future classics."
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
          <SWRConfig value={{ fallback }}>
            <BookListings />
          </SWRConfig>
        </Margins>
      </Frame>
    </motion.main>
  );
};

export default Home;

const BookListings: FunctionComponent = () => {
  type Sorting = {
    "0": string;
    "1": string;
    "2": string;
    "3": string;
  };

  const sorting: Sorting = {
    "0": "Author Ascending",
    "1": "Author Descending",
    "2": "Year Ascending",
    "3": "Year Descending",
  };

  const [value, setValue] = useState("2");
  const PAGE_SIZE = 20;

  const { fallback } = useSWRConfig();

  const { data, size, setSize } = useSWRInfinite<Book[]>(
    (index) => `/api/books?start=${index}&page_size=20&sort=${value}`,
    fetcher,
    { fallbackData: [fallback["/api/books?start=0&page_size=20"]] }
  );

  const isEmpty = data?.[0]?.length === 0;
  const isReachingEnd =
    isEmpty || (data && data[data.length - 1]?.length < PAGE_SIZE);

  const sort_values = ["0", "1", "2", "3"];

  return (
    <>
      <Frame
        css={{
          marginBottom: "28px",
          width: "100%",
          display: "flex",
          gap: "14px",
          justifyContent: "flex-end",
          alignItems: "center",
        }}
      >
        <Text size="1" color="secondary" css={{ fontWeight: 400 }}>
          Sort
        </Text>
        <Select value={value} onValueChange={setValue}>
          <SelectTrigger aria-label="Sort By">
            <SelectValue>{sorting[value as keyof Sorting]}</SelectValue>
          </SelectTrigger>
          <SelectContent>
            <SelectViewport>
              {sort_values.map((number, index) => {
                return (
                  <SelectItem key={index} value={number}>
                    <SelectItemText>
                      {sorting[number as keyof Sorting]}
                    </SelectItemText>
                  </SelectItem>
                );
              })}
            </SelectViewport>
          </SelectContent>
        </Select>
      </Frame>
      <Grid>
        {data?.map((array, index) => {
          return array?.map((book, index) => (
            <BookListing
              url={book.url}
              title={book.title}
              year={book.year}
              cover_url={book.cover_url}
              name={book.name}
              key={index}
            />
          ));
        })}
      </Grid>
      <Frame
        css={{
          width: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          marginTop: "32px",
        }}
      >
        {!isReachingEnd && (
          <StyledButton onClick={() => setSize(size + 1)}>
            Load More
          </StyledButton>
        )}
      </Frame>
    </>
  );
};

const Grid = styled("div", {
  display: "grid",
  gap: "28px",
  gridTemplateColumns: "repeat(auto-fit, minmax(210px, 1fr));",
});

export const BookListing: FunctionComponent<Book> = ({
  title,
  cover_url,
  name,
  url,
}) => {
  const [boxShadow, setBoxShadow] = useState(false);

  return (
    <Frame>
      <Frame
        css={{
          height: "300px",
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
              boxShadow: boxShadow ? "$medium" : "",
              minWidth: "0px !important",
              width: "auto !important",
              transition: "transform 300ms ease",
            },
          }}
        >
          <Image
            src={`https://rfcwposhqmpsheypfwaq.supabase.co/storage/v1/object/public/book-covers/${cover_url}`}
            alt={`${title} Book Cover`}
            objectFit="contain"
            layout="fill"
            onLoadingComplete={() => setBoxShadow(true)}
          />
        </Frame>
      </Frame>
      <Frame css={{ marginTop: "8px" }}>
        <LinkStyle target="_blank" rel="noreferrer" href={url}>
          {title}
        </LinkStyle>
      </Frame>
      <Frame>
        <Text
          size="1"
          color="secondary"
          css={{
            margin: 0,
            fontWeight: 400,
          }}
        >
          {name}
        </Text>
      </Frame>
    </Frame>
  );
};

export const getStaticProps: GetStaticProps = async (context) => {
  let { data, error } = await getInitialBooks();

  return {
    props: {
      fallback: {
        "/api/books?start=0&page_size=20": data,
      },
    },
    revalidate: 300,
  };
};
