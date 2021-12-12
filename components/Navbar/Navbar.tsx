import { NextComponentType } from "next";
import { useRouter } from "next/dist/client/router";
import { SearchIcon } from "@heroicons/react/solid";
import { useUser } from "@auth0/nextjs-auth0";
import MenuNavbar from "./Menu";

const Navbar: NextComponentType = () => {
  const router = useRouter();
  const { user, error, isLoading } = useUser();

  return (
    <div className="flex w-full py-4 px-6 justify-between items-center z-50 bg-white">
      <h1
        onClick={() => router.push("/")}
        className="text-5xl cursor-pointer text-gray-900 font-semibold"
      >
        GO
      </h1>

      {router.pathname === "/" && (
        <div className="md:flex hidden items-center px-3 py-2 rounded-xl bg-gray-100 border border-gray-400 max-w-md w-1/2">
          <SearchIcon className="h-7 w-7 text-gray-900" />
          <input
            placeholder="Search"
            type="text"
            className="border-0 outline-none ml-2 text-gray-900 text-lg bg-transparent w-full"
          />
        </div>
      )}

      <div className="flex items-center">
        <MenuNavbar />
      </div>
    </div>
  );
};

export default Navbar;
