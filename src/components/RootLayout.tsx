import React, { ReactElement } from "react";
import Header from "./header/Header";
import BottomHeader from "./header/BottomHeader";
import Footer from "./Footer";
import Head from "next/head";
import CookieSettings from "./Cookiesettings";

interface Props {
  children: ReactElement;
}

const RootLayout = ({ children }: Props) => {
  const meta = {
    title: "Orion Home",
    description: "Vind jouw perfecte koopjes, slechts een klik verwijderd!",
    viewport: "width=device-width, initial-scale=1",
    keywords: "Orion, home, koopjes, perfecte koopjes",
  };

  return (
    <>
      <Head>
        <title>{meta.title}</title>
        <meta charSet="utf-8" />
        <meta name="robots" content="index, follow" />

        <meta name="title" content={meta.title} />
        <meta property="og:title" content={meta.title} />
        <meta property="twitter:title" content={meta.title} />

        <meta property="og:type" content="website" />

        <meta name="description" content={meta.description} />
        <meta name="viewport" content={meta.viewport} />
        <meta name="keywords" content={meta.keywords} />
      </Head>
      <Header />
      <BottomHeader />
      {children}
      <Footer />
      <CookieSettings />
    </>
  );
};

export default RootLayout;
