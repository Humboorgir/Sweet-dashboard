import "@/styles/globals.css";

import type { AppProps } from "next/app";
import type { NextPage } from "next";
import { Roboto } from "next/font/google";
import { SessionProvider } from "next-auth/react";

export type PageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: React.ReactElement) => React.ReactNode;
};

type AppPropsWithLayout = AppProps & {
  Component: PageWithLayout;
};

const roboto = Roboto({ subsets: ["latin"], weight: ["300", "400", "500", "700"] });

export default function App({ Component, pageProps }: AppPropsWithLayout) {
  const getLayout = Component.getLayout || ((page) => page);

  return (
    <SessionProvider>
      <main className={roboto.className}>{getLayout(<Component {...pageProps} />)}</main>
    </SessionProvider>
  );
}
