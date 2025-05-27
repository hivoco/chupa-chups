import "@/styles/globals.css";
import { Inter } from "next/font/google";
import Head from "next/head";
import { GoogleAnalytics } from "@next/third-parties/google";
import { useRouter } from "next/router";
import * as gtag from "@/utlis/analytics"
import { useEffect } from "react";

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "600", "700"],
});

export default function App({ Component, pageProps }) {
  const router = useRouter();

  useEffect(() => {
    const handleRouteChange = (url) => {
      gtag.pageview(url);
    };
    router.events.on("routeChangeComplete", handleRouteChange);
    return () => {
      router.events.off("routeChangeComplete", handleRouteChange);
    };
  }, [router.events]);
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
        <title>Forever Fun with Chupa Chups</title>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no"
        />
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/apple-touch-icon.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicon-16x16.png"
        />
        <link rel="manifest" href="/site.webmanifest" />
      </Head>

      <main className={inter.className}>
        <Component {...pageProps} />
        <audio id="click-sound" src="/audio/click.mp3" />
      </main>
      <GoogleAnalytics gaId="G-HBN5S9YF1S" />
    </>
  );
}
