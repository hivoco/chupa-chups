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
    <>
      <Head>
        <meta property="og:type" content="website" />

        <meta property="og:url" content="https://games.chupachups.in/" />

        <meta property="og:title" content="Forever Fun with Chupa Chups" />

        <meta
          property="og:description"
          content="Discover the fun, cool, and stylish world of Chupa Chups. Explore the world that will brighten your day and earn the sweet rewards!"
        />

        <meta
          name="description"
          content="Discover the fun, cool, and stylish world of Chupa Chups. Explore the world that will brighten your day and earn the sweet rewards!"
        />

        <meta
          name="keywords"
          content="Chupa Chups, Chupa Chups candy,Chupa Chups lollipops, Forever Fun, Sweet rewards"
        />

        <meta property="og:image" content="/images/Chupa-Chups.png" />

        <title>Legends Face Off</title>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no"
        />
      </Head>

      <main className={inter.className}>
        <Component {...pageProps} />
        <audio id="click-sound" src="/audio/click.mp3" />
      </main>
      <GoogleAnalytics gaId="G-HBN5S9YF1S" />
    </>
  );
}
