import "../styles/globals.css";
import { ReactNode } from "react";
import { NextPage } from "next";
import type { AppProps } from "next/app";
import { Navbar } from "../components/Navbar";
import { store } from "../store";
import { Provider } from "react-redux";
type NextPageWithLayout = NextPage & {
  getLayout?: () => ReactNode;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

function MyApp({ Component, pageProps }: AppPropsWithLayout) {
  const getLayout = Component.getLayout ?? ((page: any) => page);
  return (
    <Provider store={store}>
      <div className="h-screen mainBackground flex justify-center justify-items-center">
        <Navbar />
        {getLayout(<Component className="" {...pageProps} />)}
      </div>
    </Provider>
  );
}

export default MyApp;
