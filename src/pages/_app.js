import "@/styles/globals.css";
import { Inter } from "next/font/google";
import Head from "next/head";
// import { useEffect, useRef } from "react";
import { GoogleAnalytics } from "@next/third-parties/google";


const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "600", "700"],
});


export default function App({ Component, pageProps }) {
  return (
    <main className={inter.className}>
      <Head>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no"
        />
      </Head>

      <Component {...pageProps} />
      <audio id="click-sound" src="/audio/click.mp3"  />
      <GoogleAnalytics gaId="G-7B50G65ENZ" />
    </main>
  );
}
