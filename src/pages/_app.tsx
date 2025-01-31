import type { AppProps } from "next/app";
import Head from "next/head";
import "tailwindcss/tailwind.css";
export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width,initial-scale=1" />
        <title>Prerana Service</title>
        <meta name="description" content="Best PWA app in the world!" />
        <link rel="shortcut icon" href="/favicon.ico" />
        <link rel="manifest" href="/manifest.json" />
        <link href="/Prerana.png" rel="icon" type="image/png" sizes="192x192" />
      </Head>
      <Component {...pageProps} />
    </>
  );
}
