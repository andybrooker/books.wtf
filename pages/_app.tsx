import "../styles/globals.css";
import type { AppProps } from "next/app";
import { globalCss } from "@stitches/react";
import { Layout } from "../components/layout";

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
      <Component {...pageProps} />
    </Layout>
  );
}

export default MyApp;
