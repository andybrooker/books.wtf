import "../styles/globals.css";
import type { AppProps } from "next/app";
import { globalCss } from "@stitches/react";
import { Layout } from "../components/Layout";
import Transition from "../components/Transition";

import { createBrowserSupabaseClient } from "@supabase/auth-helpers-nextjs";
import { SessionContextProvider } from "@supabase/auth-helpers-react";
import React from "react";
import { Toaster } from "react-hot-toast";

const globalStyles = globalCss({
  "@font-face": {
    fontFamily: "Manrope",
    src: 'url("/fonts/Manrope.woff2") format("woff2")',
    fontWeight: "100 700",
  },
});

function MyApp({ Component, pageProps }: AppProps) {
  const [supabaseClient] = React.useState(() => createBrowserSupabaseClient());
  globalStyles();

  return (
    <SessionContextProvider
      supabaseClient={supabaseClient}
      initialSession={pageProps.initialSession}
    >
      <Layout>
        <Transition>
          <Toaster
            toastOptions={{
              style: {
                fontFamily: "Manrope",
                minWidth: "200px",
              },
            }}
          />
          <Component {...pageProps} />
        </Transition>
      </Layout>
    </SessionContextProvider>
  );
}

export default MyApp;
