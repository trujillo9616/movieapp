import React from "react";
import Head from "next/head";

interface MyHeadProps {
  title: string;
}

const MyHead: React.FC<MyHeadProps> = ({ title }) => {
  return (
    <Head>
      <title>{title}</title>
      <meta
        name="description"
        content="Web app with useful information about movies"
      />
      <link rel="icon" href="/favicon.ico" />
    </Head>
  );
};

export default MyHead;
