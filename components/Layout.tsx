import { Navbar } from "./Navbar";
import { Footer } from "./Footer";
import { Body, Frame } from "./Base";

type Props = {
  children: any;
};

export const Layout = (props: Props) => {
  return (
    <Body>
      <Frame
        css={{
          flex: "1 0 auto",
        }}
      >
        <Navbar />
        <main>{props.children}</main>
      </Frame>
      <Footer />
    </Body>
  );
};
