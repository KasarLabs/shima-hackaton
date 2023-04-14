import type { NextPage } from "next";
import Head from "next/head";
import Main from "../components/home";

const Home: NextPage = () => {
  return (
    <div className="bg-black text-white">
      <Head>
        <title>Shima</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <Main />
      </main>
    </div>
  );
};

export default Home;
