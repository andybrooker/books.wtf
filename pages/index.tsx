import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import { FunctionComponent, useMemo, useState } from "react";
import { styled } from "../stitches.config";
import {
  Frame,
  Margins,
  Select,
  SelectContent,
  SelectItem,
  SelectItemText,
  SelectTrigger,
  SelectValue,
  SelectViewport,
  Text,
} from "../components/Base";
import { GetStaticProps } from "next";
import { supabase } from "../utils/supabaseClient";

type Props = {
  books: Book[];
};

type Book = {
  title: string;
  cover_url: string;
  year: number;
  author: {
    name: string;
  };
};

const Home: NextPage<Props> = ({ books }) => {
  return (
    <div>
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
          <BookListings books={books} />
        </Margins>
      </Frame>
    </div>
  );
};

export default Home;

const BookListings: FunctionComponent<Props> = (props) => {
  type Sorting = {
    "0": string;
    "1": string;
    "2": string;
    "3": string;
    "4": string;
  };

  const sorting: Sorting = {
    "0": "Author Ascending",
    "1": "Author Descending",
    "2": "Year Ascending",
    "3": "Year Descending",
    "4": "Shuffle",
  };

  const [value, setValue] = useState("2");
  const [books, setBooks] = useState(props.books);

  const sortNamesAtoZ = (a: Book, b: Book) => {
    const nameA = a.author.name.toUpperCase();
    const nameB = b.author.name.toUpperCase();

    if (nameA < nameB) {
      return -1;
    }
    if (nameA > nameB) {
      return 1;
    }

    return 0;
  };

  const shuffleArray = (array: Book[]) => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }

    return array;
  };

  useMemo(() => {
    switch (value) {
      case "0":
        const sortedAtoZ = [...books].sort(sortNamesAtoZ);
        setBooks(sortedAtoZ);
        break;
      case "1":
        const sortedZtoA = [...books].sort((a, b) =>
          b.author.name.toLowerCase()[0] > a.author.name.toLowerCase()[0]
            ? 1
            : a.author.name.toLowerCase()[0] > b.author.name.toLowerCase()[0]
            ? -1
            : 0
        );
        setBooks(sortedZtoA);
        break;
      case "2":
        const sortedAsc = [...books].sort((a, b) => a.year - b.year);
        setBooks(sortedAsc);
        break;
      case "3":
        const sortedDesc = [...books].sort((a, b) => b.year - a.year);
        setBooks(sortedDesc);
        break;
      case "4":
        const arrayToShuffle = [...books];
        const shuffled = shuffleArray(arrayToShuffle);
        setBooks(shuffled);
        break;
    }
  }, [value]);

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
        <Text size="1" color="secondary">
          Sort
        </Text>
        <Select value={value} onValueChange={setValue}>
          <SelectTrigger aria-label="Sort By">
            <SelectValue>{sorting[value as keyof Sorting]}</SelectValue>
          </SelectTrigger>
          <SelectContent>
            <SelectViewport>
              <SelectItem value="0">
                <SelectItemText>{sorting["0"]}</SelectItemText>
              </SelectItem>
              <SelectItem value="1">
                <SelectItemText>{sorting["1"]}</SelectItemText>
              </SelectItem>
              <SelectItem value="2">
                <SelectItemText>{sorting["2"]}</SelectItemText>
              </SelectItem>
              <SelectItem value="3">
                <SelectItemText>{sorting["3"]}</SelectItemText>
              </SelectItem>
              <SelectItem value="4">
                <SelectItemText>{sorting["4"]}</SelectItemText>
              </SelectItem>
            </SelectViewport>
          </SelectContent>
        </Select>
      </Frame>
      <Grid>
        {books.map((book, index) => (
          <BookListing
            title={book.title}
            year={book.year}
            cover_url={book.cover_url}
            author={book.author}
            key={index}
          />
        ))}
      </Grid>
    </>
  );
};

const Grid = styled("div", {
  display: "grid",
  gap: "28px",
  gridTemplateColumns: "repeat(auto-fit, minmax(210px, 1fr));",
});

const BookListing: FunctionComponent<Book> = ({ title, cover_url, author }) => {
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
      <Frame>
        <Text
          size="2"
          css={{
            marginBottom: 0,
          }}
        >
          {title}
        </Text>
      </Frame>
      <Frame>
        <Text
          size="1"
          color="secondary"
          css={{
            margin: 0,
            fontWeight: 300,
          }}
        >
          {author.name}
        </Text>
      </Frame>
    </Frame>
  );
};

export const getStaticProps: GetStaticProps = async (context) => {
  let { data: books, error } = await supabase.from("books").select(`
  title,
  year,
  cover_url, 
  author(name)`);

  books?.sort((a, b) => a.year - b.year);

  return {
    props: {
      books,
    },
    revalidate: 300,
  };
};
