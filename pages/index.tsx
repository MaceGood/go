import type { GetServerSideProps } from "next";
import Head from "next/head";
import { getSession, useUser } from "@auth0/nextjs-auth0";
import { Login } from "./login";
import Navbar from "../components/Navbar/Navbar";
import connectDb from "../utils/mongodb";
import About from "../components/About";
import { useRouter } from "next/router";
import { useDispatch } from "react-redux";
import { setUser, setUsersAccepting } from "../actions/user";
import { Posts } from "../components/Posts/Posts";
import { useEffect, useState } from "react";
import Connections from "../components/Connections/Connections";
import Loading from "../components/Loading";
import connectionInfo from "../utils/connectionInfo";
import { setConnections } from "../actions/connections/connections";

interface Props {
  userDb: any;
  usersAccepting: any;
  connections: any;
}

/* planovi za app
  - profile private i publuc
  - ako e public koga ke stisne connect nema da prave request za connectot da se prifane
  - ako e private koga ke se stisne connect se prave request i ako e accept togas se prifaka inaku se brise requestot
  - podobar ui/ux
  - CMS
  - setup da se srede avalibility
*/

const Home = ({ userDb, usersAccepting, connections }: Props) => {
  const { user, error, isLoading } = useUser();
  const router = useRouter();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setUsersAccepting(usersAccepting));
  }, [dispatch, usersAccepting]);

  useEffect(() => {
    const connectionsInfo = connectionInfo(connections, userDb[0]);

    dispatch(setConnections(connectionsInfo));
  }, [dispatch, connections, userDb]);

  if (isLoading) return <Loading />;

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

      <div className="flex">
        <div className="flex-1">
          <About />
        </div>

        <div className="flex-1">
          <Posts />
        </div>

        <div className="flex-1">
          <Connections />
        </div>
      </div>
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

  let usersAccepting;
  if (user) {
    const availabilityData = await db
      .collection("users")
      .find({
        avalibility: "Accepting guests",
        email: { $not: { $regex: user?.email! } },
      })
      .toArray();
    usersAccepting = JSON.parse(JSON.stringify(availabilityData));
  } else {
    const availabilityData = await db
      .collection("users")
      .find({
        avalibility: "Accepting guests",
      })
      .toArray();
    usersAccepting = JSON.parse(JSON.stringify(availabilityData));
  }

  const connetionsData = await db
    .collection("connections")
    .find({ $or: [{ email: user?.email }, { post_email: user?.email }] })
    .toArray();
  const connections = JSON.parse(JSON.stringify(connetionsData));

  return {
    props: {
      userDb: userDb,
      usersAccepting: usersAccepting,
      connections: connections,
    },
  };
};
