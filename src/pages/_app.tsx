import { AppProps } from 'next/app';
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import NextNProgress from "nextjs-progressbar";
import Head from "next/head";

import { GlobalStyle } from "../styles/global";

import { MenuProvider } from "../providers/MenuProvider";
import { AuthProvider } from "../providers/AuthProvider";

const MyApp = ({ Component, pageProps }: AppProps) => {
  return (
    <>
      <GlobalStyle />
      <MenuProvider>
          <AuthProvider>
            <Head>
              <meta charSet="utf-8" />
              <meta name="viewport" content="initial-scale=1.0, width=device-width" />
              <link rel="icon" href="icon/icon.svg" />
              <title>Minhas Despesas</title>
            </Head>
            <NextNProgress
              color="#FFDF00"
              startPosition={0.3}
              stopDelayMs={100}
              height={4.5}
              options={ { showSpinner : false } }
            />
            <Component {...pageProps} />
          </AuthProvider>
          <ToastContainer />
      </MenuProvider>
    </>
  );
};

export default MyApp;