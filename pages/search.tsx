import Navbar from "../components/Navbar/Navbar";
import Head from "next/head";
import { useSelector } from "react-redux";
import { Post } from "../components/Posts/Post";
import { useUser } from "@auth0/nextjs-auth0";
import Loading from "../components/Loading";
import { Login } from "./login";

interface Props {}

const Search: React.FC<Props> = () => {
  const { user, error, isLoading } = useUser();
  const search = useSelector((results: any) => results);

  if (isLoading) return <Loading />;
  if (!user) return <Login />;

  return (
    <div className="max-w-screen-2xl w-full min-h-screen mx-auto font-semibold ">
      {" "}
      <Head>
        <title>GO</title>
        <meta name="home" content="GO" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Navbar />
      {search?.search?.value.length > 0 && (
        <div className="px-5">
          <p className="font-normal">
            Results for{" "}
            <span className="font-bold">{search?.search?.value}</span>
          </p>

          <div className="flex flex-wrap py-5 w-full justify-start ">
            {search?.search?.results.length <= 0 && (
              <p className="font-bold text-2xl">Ups!... no results found</p>
            )}

            {search?.search?.results?.map((result: any) => (
              <Post
                key={result?._id}
                name={result?.name}
                bio={result?.bio}
                location={result?.location}
                avalibility={result?.avalibility}
                picture={result?.picture}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Search;
