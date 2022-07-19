import "../styles/globals.css";
import { ReactNode } from "react";
import { NextPage } from "next";
import type { AppProps } from "next/app";
import { Navbar } from "../components/Navbar";

type NextPageWithLayout = NextPage & {
  getLayout?: () => ReactNode;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

function MyApp({ Component, pageProps }: AppPropsWithLayout) {
  const getLayout = Component.getLayout ?? ((page: any) => page);
  return (
    <div className="h-screen mainBackground flex justify-center justify-items-center">
      <Navbar />
      {getLayout(<Component className="" {...pageProps} />)}
    </div>
  );
}

export default MyApp;
