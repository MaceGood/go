import { useUser } from "@auth0/nextjs-auth0";
import { Key } from "react";
import { useSelector } from "react-redux";
import Post from "./Post";

export const Posts: React.FC = () => {
  const { user, error, isLoading } = useUser();
  const userDb = useSelector((user: any) => user);
  const connections = useSelector((connections: any) => connections);
  const usersAccepting = useSelector((usersAccepting: any) => usersAccepting);
  const usersAcceptingShort = usersAccepting?.userInfo?.usersAccepting;

  const connectionsInfo: any = (userAccepting: any) => {
    for (let connection of connections?.connections?.connections) {
      if (userAccepting?.email === connection?.email) {
        return true;
      }
    }
  };

  return (
    <div className="overflow-y-scroll no-scrollbar max-h-screen">
      <h1 className="text-2xl font-semibold">Discover</h1>
      {usersAcceptingShort?.map(
        (userAccepting: {
          _id: Key | null | undefined;
          name: string;
          bio: string;
          location: string;
          avalibility: string;
          picture: string;
          email: string;
          connected: any;
        }) => (
          <Post
            key={userAccepting?._id}
            name={userAccepting?.name}
            bio={userAccepting?.bio}
            location={userAccepting?.location}
            avalibility={userAccepting?.avalibility}
            picture={userAccepting?.picture}
            email={userAccepting?.email}
            connected={connectionsInfo(userAccepting)}
          />
        )
      )}
    </div>
  );
};
