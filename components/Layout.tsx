import { Navbar } from "./Navbar";
import { Footer } from "./Footer";
import { Body, Frame } from "./Base";
import { AnimatePresence } from "framer-motion";

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
        <AnimatePresence exitBeforeEnter>{props.children}</AnimatePresence>
      </Frame>
      <Footer />
    </Body>
  );
};
