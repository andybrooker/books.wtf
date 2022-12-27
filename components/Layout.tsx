import { Navbar } from "./Navbar";
import { Footer } from "./Footer";
import { Body, Frame } from "./Base";
import { useUser } from "@supabase/auth-helpers-react";

type Props = {
  children: any;
};

export const Layout = (props: Props) => {
  return (
    <Body>
      <Frame
        css={{
          flex: "1 0 auto",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Navbar />
        {props.children}
      </Frame>
      <Footer />
    </Body>
  );
};
