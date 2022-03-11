import { NextPage } from "next";
import { useRouter } from "next/router";
import Head from "next/head";

const NotFound: NextPage = () => {
  const router = useRouter();

  return (
    <div className="max-w-screen-2xl w-full p-1 min-h-screen mx-auto grid place-content-center text-center">
      <Head>
        <title>GO - Not Found</title>
      </Head>

      <h1 className="font-semibold  text-gray-900 text-2xl sm:text-4xl lg:text-5xl">
        Oops! We couldn’t find that page.
      </h1>
      <h2 className="font-medium text-gray-800 mt-5 text-lg sm:text-xl md:text-2xl">
        Maybe you can find what you need here?
      </h2>

      <div className="flex items-center justify-evenly mt-5">
        <div
          className="flex w-28 sm:w-40 h-12 items-center justify-center rounded-lg bg-blue-600 text-white cursor-pointer hover:opacity-80"
          onClick={() => router.push("/")}
        >
          <p>Home</p>
        </div>
        <div
          className="flex w-28 sm:w-40 h-12 items-center justify-center rounded-lg bg-green-600 text-white cursor-pointer hover:opacity-80"
          onClick={() => router.push("/connections/inbox")}
        >
          <p>Connections</p>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
