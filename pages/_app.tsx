import "@/styles/globals.css";

import type { AppProps } from "next/app";
import type { NextPage } from "next";

import { Roboto } from "next/font/google";
import { SessionProvider } from "next-auth/react";
import { Provider as ReduxProvider } from "@/redux/provider";

import Alert from "@/components/shared/alert";
import NextNProgress from "nextjs-progressbar";

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
      <ReduxProvider>
        <Alert />
        <NextNProgress color="#7C72FF" options={{ showSpinner: false }} />
        <main className={roboto.className}>{getLayout(<Component {...pageProps} />)}</main>
      </ReduxProvider>
    </SessionProvider>
  );
}
