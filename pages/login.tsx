import { NextPage } from "next";
// import Image from "next/image";
import React from "react";
// import { KeyIcon, UserIcon } from "@heroicons/react/outline";
import Head from "next/head";
import { useRouter } from "next/dist/client/router";

export const Login: NextPage = () => {
  const router = useRouter();
  return (
    <div className="flex flex-col text-center justify-center max-w-md min-h-screen mx-auto text-gray-800 p-5 font-semibold select-none">
      <Head>
        <title>GO</title>
        <meta name="login" content="GO" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <h1 className="text-6xl text-gray-900 cursor-default">GO</h1>

      <div className="flex items-center text-lg py-2 px-4 mt-5 bg-gray-100 rounded-lg border border-gray-400 h-14 max-w-md cursor-pointer hover:opacity-80">
        <a href="/api/auth/login" className="w-full">
          Login
        </a>
      </div>

      {/* <div className="flex items-center py-2 px-4 mt-8 bg-gray-100 rounded-lg border border-gray-400 h-14 max-w-md hover:opacity-80">
        <UserIcon className="h-8 w-8" />
        <input
          type="email"
          placeholder="Email"
          className="bg-transparent ml-4 w-full outline-none font-medium text-lg placeholder-gray-400"
        />
      </div>

      <div className="flex items-center py-2 px-4 mt-5 bg-gray-100 rounded-lg border border-gray-400 h-14 max-w-md hover:opacity-80">
        <KeyIcon className="h-8 w-8" />
        <input
          type="password"
          placeholder="Password"
          className="bg-transparent ml-4 w-full outline-none font-medium text-lg placeholder-gray-400"
        />
      </div>

      <div className="flex items-center justify-between mt-4">
        <p className="cursor-pointer hover:underline">Forgot Password?</p>

        <div className="flex items-center justify-center h-12 w-28 rounded-lg bg-gray-100 border border-gray-400 cursor-pointer hover:opacity-80">
          <p>Sign In</p>
        </div>
      </div>

      <p className="font-medium text-lg cursor-default my-4">or</p>

      <div className="flex items-center text-lg py-2 px-4 mt-5 bg-gray-100 rounded-lg border border-gray-400 h-14 max-w-md cursor-pointer hover:opacity-80">
        <Image src="/google.svg" alt="Google Icon" width="32" height="32" />
        <p className="w-full">Sign In with Google</p>
      </div>

      <div className="flex items-center text-lg py-2 px-4 mt-5 bg-gray-100 rounded-lg border border-gray-400 h-14 max-w-md cursor-pointer hover:opacity-80">
        <Image src="/facebook.svg" alt="Google Icon" width="32" height="32" />
        <p className="w-full">Sign In with Facebook</p>
      </div>

      <p className="font-medium mt-8 cursor-default">
        Don’t have an account?{" "}
        <span className="font-semibold cursor-pointer hover:underline">
          Sign Up!
        </span>
      </p> */}
    </div>
  );
};
