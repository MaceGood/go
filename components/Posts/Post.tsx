import { useUser } from "@auth0/nextjs-auth0";
import { LocationMarkerIcon } from "@heroicons/react/solid";
import Image from "next/image";
import axios from "axios";
import { useRouter } from "next/router";
import Report from "./Report/Report";

interface Props {
  name: string;
  bio: string;
  location: string;
  avalibility: string;
  picture: string;
  email?: string;
  connected?: any;
}

function classNames(...classes: any[]) {
  return classes.filter(Boolean).join(" ");
}

export const Post: React.FC<Props> = ({
  name,
  location,
  bio,
  avalibility,
  picture,
  email,
  connected,
}) => {
  const { user, error, isLoading } = useUser();
  const router = useRouter();

  const options: {
    name: string;
    picture: string;
  } = {
    name: name,
    picture: picture,
  };

  const handleConnect = async (): Promise<void> => {
    await axios.post(
      `http://localhost:3000/api/connections/connect?q=${email}`,
      options
    );

    router.push("/");
  };

  const handleUnconnect = async (): Promise<void> => {
    await axios.delete(
      `http://localhost:3000/api/connections/unconnect?q=${email}`
    );

    router.push("/");
  };

  return (
    <div
      className={
        router.pathname === "/search"
          ? "flex border max-w-xs bg-gray-100 mt-2 mb-2 pb-2 border-gray-400 rounded-lg  mx-auto"
          : "flex border max-w-md bg-gray-100 mt-2 mb-4 border-gray-400 rounded-lg pb-3"
      }
    >
      <div>
        <Image
          src={picture}
          className="rounded-tl-lg"
          alt={name}
          width={150}
          height={150}
        />

        <div className="flex items-center my-1 ml-1">
          <LocationMarkerIcon className="h-5 w-5" />
          <p className="font-semibold text-sm  text-gray-900">{location}</p>
        </div>

        <p className="font-semibold text-sm ml-1 text-gray-900">
          {avalibility}
        </p>
      </div>

      <div className="w-full px-2 flex flex-col">
        <div className="flex justify-between items-center">
          <h1 className="text-xl font-bold text-gray-900">{name}</h1>
          <Report
            name={name}
            email={email}
            bio={bio}
            location={location}
            avalibility={avalibility}
            picture={picture}
          />
        </div>
        <p className="text-sm font-normal text-gray-800">{bio}</p>

        {router.pathname === "/" && (
          <div className="flex justify-center">
            <div
              onClick={connected ? handleUnconnect : handleConnect}
              className={classNames(
                connected
                  ? "bg-gray-800 text-white hover:opacity-80"
                  : " hover:bg-gray-800 hover:text-white text-gray-800",
                "flex text-center items-center justify-center h-10 w-40 mt-3 rounded-lg bg-transparent border border-gray-800 cursor-pointer transition duration-200"
              )}
            >
              <p className="font-semibold text-xl tracking-widest">
                {connected ? "CONNECTED" : "CONNECT"}
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Post;
