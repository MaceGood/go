import Navbar from "../components/Navbar/Navbar";
import Head from "next/head";
import { GetServerSideProps } from "next";
import axios from "axios";
import { useRouter } from "next/router";
import connectDb from "../utils/mongodb";
import { getSession } from "@auth0/nextjs-auth0";

interface Props {
  results: any;
}

const Search: React.FC<Props> = ({ results }) => {
  const router = useRouter();

  console.log(results);

  return (
    <div>
      <Head>
        <title>GO</title>
        <meta name="home" content="GO" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Navbar />

      <h1>Search results for </h1>
    </div>
  );
};

export default Search;

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { db } = await connectDb();

  db.collection("users").createIndex({
    name: "text",
    bio: "text",
    location: "text",
  });

  const data = await db
    .collection("users")
    .find({
      $text: { $search: "Kavadarci" },
    })
    .toArray();
  console.log("data", data);
  const results = JSON.parse(JSON.stringify(data));

  return {
    props: {
      results: results,
    },
  };
};
