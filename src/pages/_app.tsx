import 'styles/globals.css';

import type { AppProps } from 'next/app';
import NextNProgress from 'nextjs-progressbar';

import { SessionProvider } from 'next-auth/react';

import '@fontsource/poppins/400.css';
import '@fontsource/poppins/500.css';
import '@fontsource/poppins/600.css';
import '@fontsource/poppins/700.css';
import '@fontsource/poppins/800.css';

import '@fontsource/ubuntu-mono/400.css';
import '@fontsource/ubuntu-mono/700.css';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <NextNProgress color={'#3b82f6'} height={2} options={{ showSpinner: false }} />
      <SessionProvider session={pageProps.session}>
        <Component {...pageProps} />
      </SessionProvider>
    </>
  );
}

export default MyApp;
