import { GetServerSideProps, NextPage } from "next";
import Navbar from "../../components/Navbar/Navbar";
import Head from "next/head";
import connectDb from "../../utils/mongodb";
import { getSession, useUser } from "@auth0/nextjs-auth0";
import { useDispatch } from "react-redux";
import connectionInfo from "../../utils/connectionInfo";
import { setConnections } from "../../actions/connections/connections";
import { useEffect, useState } from "react";
import Loading from "../../components/Loading";
import { Login } from "./../login";
import { useRouter } from "next/router";
import Chat from "../../components/Connections/Chat/Chat";
import Bar from "../../components/Connections/Bar";
import Image from "next/image";

interface Props {
  connections: any;
  userDb: any;
}

const Inbox = ({ connections, userDb }: Props) => {
  const { user, error, isLoading } = useUser();
  const dispatch = useDispatch();

  const [connectionsResults, setConnectionsResults] = useState<any>([]);

  useEffect(() => {
    setConnectionsResults(connectionInfo(connections, userDb[0]));

    dispatch(setConnections(connectionsResults));
  }, [dispatch, connectionsResults, connections, userDb]);

  if (isLoading) return <Loading />;
  if (!user) return <Login />;

  return (
    <div className="max-w-screen-2xl w-full min-h-screen mx-auto font-semibold">
      <Head>
        <title>Connections - GO</title>
      </Head>

      <Navbar />

      <div className="flex flex-col px-6">
        <h1 className="text-2xl font-semibold mb-3 cursor-default">
          Connections
        </h1>

        <div className="flex">
          <Bar connectionsResults={connectionsResults} />

          <div className="w-full items-center text-center">
            <Image
              src="/start_chating.svg"
              alt="start chatting"
              width="500"
              height="500"
              className="object-contain"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Inbox;

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { db } = await connectDb();
  const user: any = await getSession(context.req, context.res)!?.user;

  const userData = await db
    .collection("users")
    .find({ email: user?.email })
    .toArray();
  const userDb = JSON.parse(JSON.stringify(userData));

  const data = await db
    .collection("connections")
    .find({ $or: [{ email: user?.email }, { post_email: user?.email }] })
    .toArray();
  const connections = JSON.parse(JSON.stringify(data));

  return {
    props: {
      userDb: userDb,
      connections: connections,
    },
  };
};
