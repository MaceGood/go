import { GetServerSideProps, NextPage } from "next";
import Navbar from "../components/Navbar/Navbar";
import Head from "next/head";
import connectDb from "../utils/mongodb";
import { getSession } from "@auth0/nextjs-auth0";
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "../actions/user";
import connectionInfo from "../utils/connectionInfo";
import { setConnections } from "../actions/connections/connections";
import { useEffect } from "react";

interface Props {
  connections: any;
  userDb: any;
}

const Connections = ({ connections, userDb }: Props) => {
  const dispatch = useDispatch();
  const user = useSelector((user: any) => user);
  // const connectionsFromHome = useSelector((connections: any) => connections);
  // const connectionsFromHomeShort =
  //   connectionsFromHome?.connections?.connections;

  const connectionsResults = connectionInfo(connections, userDb[0]);

  useEffect(() => {
    // if (connectionsFromHomeShort?.length > 0) return;
    dispatch(setConnections(connectionsResults));
  }, [dispatch, connectionsResults]);

  // if (user?.userInfo?.user === null) {
  //   dispatch(setUser(userDb));
  // }

  return (
    <div className="max-w-screen-2xl w-full min-h-screen mx-auto font-semibold">
      <Head>
        <title>GO</title>
      </Head>

      <Navbar />

      {/* {(connectionsFromHomeShort || connectionsResults).map( */}
      {connectionsResults?.map((connection: any) => (
        <div className="border" key={connection?._id}>
          <p>{connection?.name}</p>
          <p>{connection?.email}</p>
          <img src={connection?.picture} alt="" />
        </div>
      ))}
    </div>
  );
};

export default Connections;

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
