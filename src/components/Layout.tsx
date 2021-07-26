import React from "react";
import Head from "next/head";
import Header from "./Header";

export default function Layout(props: any) {
  return (
    <>
      <Head>
        <title>OAuth2 Demo</title>
      </Head>

      <Header />
      
      <main>
        <div>{props.children}</div>
      </main>
    </>
  );
}
