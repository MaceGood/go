import { NextComponentType } from "next";
import Image from "next/image";
import { useUser } from "@auth0/nextjs-auth0";
import { LocationMarkerIcon } from "@heroicons/react/solid";
import { PencilIcon } from "@heroicons/react/outline";
import { useState } from "react";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";

interface Props {}

const About = ({}: Props) => {
  const router = useRouter();
  let { user, error, isLoading } = useUser();
  const userDb = useSelector((user: any) => user);
  const userShort = userDb?.user?.user[0];
  const [userInfo, setUserInfo] = useState({
    name: "",
    location: "",
    bio: "",
    avalibility: "",
  });
  const [isSetup, setIsSetup] = useState<boolean>(false);

  return (
    <div className="flex flex-col border py-4 px-4 my-2 mx-6 max-w-xs bg-gray-100  border-gray-400 text-gray-800 rounded-lg">
      {userShort?.email_verified === false && (
        <div className="flex items-center mb-2 py-2 px-4 bg-red-100 rounded-lg border border-red-400 border-l-8 h-14 hover:opacity-80">
          <p>Please verify your email</p>
        </div>
      )}

      <div
        className="flex justify-end"
        onClick={() => {
          setIsSetup(true);
          router.push("/setup");
        }}
      >
        <PencilIcon className="h-6 w-6 cursor-pointer hover:opacity-80" />
      </div>
      <div className="text-center">
        <Image
          src={user!?.picture!}
          className="rounded-full"
          alt={userDb!?.name}
          width={100}
          height={100}
        />
        <p className="text-xl font-semibold text-gray-900">
          {userShort?.name || user?.name}
        </p>
      </div>

      {isSetup === false &&
      (userShort?.location && userShort?.bio && userShort?.avalibility) ===
        undefined ? (
        <>
          <p className="text-base mt-4">
            There is nothing to display, set up your account
          </p>

          <div
            className="flex items-center justify-center h-12 w-full mt-2 rounded-lg bg-gray-100 border border-gray-400 cursor-pointer hover:opacity-80"
            onClick={() => {
              setIsSetup(true);
              router.push("/setup");
            }}
          >
            <p>Set up</p>
          </div>
        </>
      ) : (
        <>
          <div className="flex items-center my-3">
            <LocationMarkerIcon className="h-7 w-7" />
            <p className="font-medium text-lg">{userShort?.location}</p>
          </div>

          <div>
            <p className="font-medium text-lg">Bio</p>
            <p className="font-normal text-base">{userShort?.bio}</p>
          </div>

          <fieldset className="mt-3">
            <div>
              <legend className="text-lg font-medium">Avalibility</legend>
            </div>
            <div className="mt-2 space-y-3">
              <div className="flex items-center">
                <input
                  id="push-accepting"
                  name="push-avalibility"
                  value="Accepting guests"
                  checked={userShort?.avalibility === "Accepting guests"}
                  onChange={(e) =>
                    setUserInfo({ ...userInfo, avalibility: e.target.value })
                  }
                  type="radio"
                  className="h-5 w-5 border-gray-400 cursor-pointer"
                />
                <label
                  htmlFor="push-accepting"
                  className="ml-3 block text-base font-normal cursor-pointer"
                >
                  Accepting guests{" "}
                </label>
              </div>
              <div className="flex items-center">
                <input
                  value="Maybe Accepting guests"
                  checked={userShort?.avalibility === "Maybe Accepting guests"}
                  onChange={(e) =>
                    setUserInfo({ ...userInfo, avalibility: e.target.value })
                  }
                  id="push-maybe-accepting"
                  name="push-avalibility"
                  type="radio"
                  className="h-5 w-5 border-gray-400 cursor-pointer"
                />
                <label
                  htmlFor="push-maybe-accepting"
                  className="ml-3 block text-base font-normal cursor-pointer"
                >
                  Maybe Accepting guests{" "}
                </label>
              </div>
              <div className="flex items-center">
                <input
                  value="Not Accepting guests"
                  checked={userShort?.avalibility === "Not Accepting guests"}
                  onChange={(e) =>
                    setUserInfo({ ...userInfo, avalibility: e.target.value })
                  }
                  id="push-not-accepting"
                  name="push-avalibility"
                  type="radio"
                  className="h-5 w-5 border-gray-400 cursor-pointer"
                />
                <label
                  htmlFor="push-not-accepting"
                  className="ml-3 block text-base font-normal cursor-pointer"
                >
                  Not Accepting guests{" "}
                </label>
              </div>
            </div>
          </fieldset>
        </>
      )}
    </div>
  );
};

export default About;
