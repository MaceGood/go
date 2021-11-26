import type { GetServerSideProps, NextPage } from "next";
import Head from "next/head";
import { getSession, useUser } from "@auth0/nextjs-auth0";
import { Login } from "./login";
import Navbar from "../components/Navbar";
import Setup from "./setup";
import connectDb from "../utils/mongodb";
import About from "../components/About";
import { useRouter } from "next/router";
import { useDispatch } from "react-redux";
import { setUser } from "../actions/user";
interface Props {
  userDb: any;
}

// sekoj moze do /setup, ako user.setup === false redirect do /

const Home = ({ userDb }: Props) => {
  const { user, error, isLoading } = useUser();
  const router = useRouter();
  const dispatch = useDispatch();

  if (isLoading) return <p>Loading...</p>;
  if (!user) return <Login />;
  if (userDb[0]?.setup === false) {
    router.push("/setup");
  }

  dispatch(setUser(userDb));

  return (
    <div className="max-w-screen-2xl w-full min-h-screen mx-auto font-semibold">
      <Head>
        <title>GO</title>
        <meta name="home" content="GO" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Navbar />
      <About />
    </div>
  );
};

export default Home;

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { db } = await connectDb();
  const user: any = await getSession(context.req, context.res)!?.user;

  const data = await db
    .collection("users")
    .find({ email: user?.email })
    .toArray();

  const userDb = JSON.parse(JSON.stringify(data));

  return { props: { userDb: userDb } };
};
