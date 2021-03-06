import { getSession, useUser } from "@auth0/nextjs-auth0";
import { LocationMarkerIcon } from "@heroicons/react/solid";
import { UserCircleIcon } from "@heroicons/react/outline";
import Head from "next/head";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import axios from "axios";
import connectDb from "../utils/mongodb";
import { GetServerSideProps } from "next";

interface Props {
  userDb: any;
}

const Setup = ({ userDb }: Props) => {
  const { user, error, isLoading } = useUser();
  const router = useRouter();
  const [userInfo, setUserInfo] = useState<{
    name: string;
    location: string;
    bio: string;
    avalibility: string;
    picture: string | null | undefined;
  }>({
    name: userDb?.userInfo?.user[0]?.name || user?.name || "",
    location: userDb?.userInfo?.user[0]?.location || "",
    bio: userDb?.userInfo?.user[0]?.bio || "",
    avalibility: userDb?.userInfo?.user[0]?.avalibility || "",
    picture: user?.picture,
  });

  useEffect(() => {
    if (!user) {
      router.push("/");
    }
  }, [router, user]);

  if (isLoading) {
    return <p>Loading...</p>;
  }

  const userInfoCheck =
    userInfo.name && userInfo.location && userInfo.bio && userInfo.avalibility;

  const finish = async (): Promise<void> => {
    if (userInfoCheck === "") return;

    if (userInfo.bio.length < 50) return;

    await axios.put("http://localhost:3000/api/user", userInfo);
    router.push("/");
  };

  return (
    <div className='flex flex-col max-w-screen-2xl min-h-screen mx-auto text-gray-800 p-5 font-semibold select-none"'>
      <Head>
        <title>GO</title>
      </Head>

      <h1
        className="text-6xl text-gray-900 cursor-pointer mt-12"
        onClick={() => router.push("/")}
      >
        GO
      </h1>
      <h3 className='text-3xl text-gray-800 mt-2 font-medium cursor-default"'>
        Set up your account
      </h3>

      {userInfoCheck === "" && (
        <div className="flex items-center py-2 px-4 mt-5 mr-5 bg-red-100 rounded-lg border border-red-400 border-l-8 h-14 max-w-md hover:opacity-80">
          <p>Please fill in all fields below</p>
        </div>
      )}

      {userInfo.bio.length < 50 && (
        <div className="flex items-center py-2 px-4 mt-5 mr-5 bg-red-100 rounded-lg border border-red-400 border-l-8 h-14 max-w-md hover:opacity-80">
          <p>Bio needs to be at least 50 characters long</p>
        </div>
      )}

      <div className="block md:flex items-center text-gray-800 font-medium">
        <div className="flex items-center py-2 px-4 mt-5 mr-5 bg-gray-100 rounded-lg border border-gray-400 h-14 max-w-md hover:opacity-80">
          <UserCircleIcon className="h-8 w-8" />
          <input
            type="name"
            placeholder="Name"
            value={userInfo.name}
            onChange={(e) => setUserInfo({ ...userInfo, name: e.target.value })}
            className="bg-transparent ml-4 w-full outline-none font-medium text-lg placeholder-gray-400"
          />
        </div>

        <div className="flex items-center py-2 px-4 mt-5 bg-gray-100 rounded-lg border border-gray-400 h-14 max-w-md hover:opacity-80">
          <LocationMarkerIcon className="h-8 w-8" />
          <input
            type="text"
            placeholder="Where are you from?"
            value={userInfo.location}
            onChange={(e) =>
              setUserInfo({ ...userInfo, location: e.target.value })
            }
            className="bg-transparent ml-4 w-full outline-none font-medium text-lg placeholder-gray-400"
          />
        </div>
      </div>

      <div className="block md:flex text-gray-800 font-medium mt-5">
        <div className="max-w-md mr-5">
          <textarea
            placeholder="Bio"
            minLength={50}
            maxLength={300}
            value={userInfo.bio}
            onChange={(e) => setUserInfo({ ...userInfo, bio: e.target.value })}
            className="bg-gray-100 py-2 px-4 rounded-lg border border-gray-400 w-full outline-none font-medium text-lg placeholder-gray-400 h-48 resize-none hover:opacity-80"
          />
          <p className="text-sm">
            Tell us about yourself (from 50 to 300 characters)
          </p>
        </div>

        <fieldset className="md:mt-0 mt-5">
          <div>
            <legend className="text-xl">Availability</legend>
          </div>
          <div className="mt-4 space-y-3">
            <div className="flex items-center">
              <input
                id="push-accepting"
                name="push-avalibility"
                value="Accepting guests"
                onChange={(e) =>
                  setUserInfo({
                    ...userInfo,
                    avalibility: e.target.value,
                  })
                }
                type="radio"
                className="h-5 w-5 border-gray-400 cursor-pointer"
              />
              <label
                htmlFor="push-accepting"
                className="ml-3 block text-lg font-normal cursor-pointer"
              >
                Accepting guests{" "}
              </label>
            </div>
            <div className="flex items-center">
              <input
                value="Maybe Accepting guests"
                onChange={(e) =>
                  setUserInfo({
                    ...userInfo,
                    avalibility: e.target.value,
                  })
                }
                id="push-maybe-accepting"
                name="push-avalibility"
                type="radio"
                className="h-5 w-5 border-gray-400 cursor-pointer"
              />
              <label
                htmlFor="push-maybe-accepting"
                className="ml-3 block text-lg font-normal cursor-pointer"
              >
                Maybe Accepting guests{" "}
              </label>
            </div>
            <div className="flex items-center">
              <input
                value="Not Accepting guests"
                onChange={(e) =>
                  setUserInfo({
                    ...userInfo,
                    avalibility: e.target.value,
                  })
                }
                id="push-not-accepting"
                name="push-avalibility"
                type="radio"
                className="h-5 w-5 border-gray-400 cursor-pointer"
              />
              <label
                htmlFor="push-not-accepting"
                className="ml-3 block text-lg font-normal cursor-pointer"
              >
                Not Accepting guests{" "}
              </label>
            </div>
          </div>
        </fieldset>
      </div>

      <div
        onClick={finish}
        className="flex items-center justify-center h-12 w-28 mt-4 rounded-lg bg-gray-100 border border-gray-400 cursor-pointer hover:opacity-80 font-semibold"
      >
        <p>Finish</p>
      </div>
    </div>
  );
};

export default Setup;

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { db } = await connectDb();
  const user: any = await getSession(context.req, context.res)!?.user;

  const data = await db
    .collection("users")
    .find({ email: user?.email })
    .toArray();
  const userDb = JSON.parse(JSON.stringify(data));

  return {
    props: {
      userDb: userDb,
    },
  };
};
