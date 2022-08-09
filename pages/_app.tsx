import "../styles/globals.css";
import type { AppProps } from "next/app";
import { globalCss } from "@stitches/react";
import { Layout } from "../components/Layout";
import Transition from "../components/Transition";

const globalStyles = globalCss({
  "@font-face": {
    fontFamily: "Ranade",
    src: 'url("/fonts/Ranade-Variable.woff2") format("woff2")',
    fontWeight: "100 700",
  },
});

function MyApp({ Component, pageProps }: AppProps) {
  globalStyles();

  return (
    <Layout>
      <Transition>
        <Component {...pageProps} />
      </Transition>
    </Layout>
  );
}

export default MyApp;
