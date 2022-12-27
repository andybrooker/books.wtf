import { styled } from "@stitches/react";
import { withPageAuth } from "@supabase/auth-helpers-nextjs";
import { useSessionContext } from "@supabase/auth-helpers-react";
import { useRouter } from "next/router";
import Image from "next/image";
import React, { useEffect } from "react";
import { Frame, Margins, Text } from "../components/Base";
import * as SeparatorPrimitive from "@radix-ui/react-separator";
import { gray } from "@radix-ui/colors";
import useSWR from "swr";
import fetcher from "../utils/fetcher";
import { BookFrame } from ".";

export const Separator = styled(SeparatorPrimitive.Root, {
  backgroundColor: "$sand7",
  "&[data-orientation=horizontal]": { height: 1, width: "100%" },
  "&[data-orientation=vertical]": { height: "100%", width: 1 },
});

export default function Profile(props) {
  const { user } = props?.initialSession;
  const { supabaseClient } = useSessionContext();
  const router = useRouter();

  return (
    <Frame
      css={{
        width: "100vw",
        fontFamily: "$sans",
      }}
    >
      <Margins
        display={{
          "@initial": "desktop",
          "@mobile": "mobile",
        }}
        css={{ marginTop: "48px" }}
      >
        <Frame
          css={{
            display: "flex",
            gap: "24px",
            width: "100%",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <H2>Profile</H2> <Greeting />
        </Frame>
        <Separator
          decorative
          orientation="horizontal"
          css={{ margin: "16px 0" }}
        />
        <Status />
      </Margins>
    </Frame>
  );
}

const Status = () => {
  const { data: book, error } = useSWR("api/book", fetcher);

  return (
    <Frame>
      <Frame
        css={{
          display: "grid",
          gridTemplateColumns: "120px 1fr",
        }}
      >
        <Frame
          css={{
            height: "150px",
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
          <BookFrame
            title={book?.title}
            cover_url={book?.cover_url}
            height={100}
          />
        </Frame>

        <Frame
          css={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            width: "300px",
            backgroundColor: "$sand3",
            padding: "10px",
          }}
        >
          <Text
            css={{
              margin: 0,
              marginBottom: "16px",
              fontSize: "$2",
              fontWeight: 500,
              color: "$sand11",
            }}
          >
            Currently Reading
          </Text>
          <Frame>
            <Text css={{ fontWeight: 500, margin: 0 }}>{book?.title}</Text>
            <Text css={{ margin: 0 }}>{book?.name}</Text>
          </Frame>
          {/* <button
          onClick={async () => {
            await supabaseClient.auth.signOut();
            router.push("/");
          }}
        >
          Logout
        </button> */}
        </Frame>
      </Frame>
      <Text css={{ fontSize: "20px", fontWeight: 400 }}>Latest Comments</Text>
    </Frame>
  );
};

const Greeting = () => {
  const [greeting, setGreeting] = React.useState(getGreeting());

  useEffect(() => {
    const timerId = setInterval(refreshGreeting, 1000 * 60);
    return function cleanup() {
      clearInterval(timerId);
    };
  }, []);

  function refreshGreeting() {
    setGreeting(getGreeting());
  }

  function getGreeting() {
    let timeOfDay;
    const hour = new Date().getHours();
    if (hour < 12 && hour >= 5) {
      timeOfDay = "Morning";
    } else if (hour < 18) {
      timeOfDay = "Afternoon";
    } else if (hour < 21) {
      timeOfDay = "Evening";
    } else {
      timeOfDay = "Night";
    }
    return timeOfDay;
  }

  return <GreetingSpan>Good {greeting}, Andy</GreetingSpan>;
};

type BookFrameProps = {
  title: string;
  cover_url: string;
};

const GreetingSpan = styled("span", {
  marginTop: 0,
  marginBottom: 0,
  fontSize: "20px",
  display: "block",
  color: "$sand12",
});

const H2 = styled("h2", {
  margin: 0,
  color: "$sand12",
});

export const getServerSideProps = withPageAuth({ redirectTo: "/signin" });
