import { NextComponentType } from "next";
import { useRouter } from "next/dist/client/router";
import { SearchIcon } from "@heroicons/react/solid";
import { useUser } from "@auth0/nextjs-auth0";
import MenuNavbar from "./Menu";
import { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { SEARCH_VALUE } from "../../types";

const Navbar: NextComponentType = () => {
  const router = useRouter();
  let [searchValue, setSearchValue] = useState("");
  const searchRef = useRef<any>(null);
  const { user, error, isLoading } = useUser();
  const dispatch = useDispatch();

  useEffect(() => {
    router.pathname === "/search" && searchRef.current.focus();
  }, [router.pathname, searchRef]);

  useEffect(() => {
    dispatch({ type: SEARCH_VALUE, payload: searchValue });
  }, [dispatch, searchValue]);

  return (
    <div className="flex w-full py-4 px-6 justify-between items-center z-50 bg-white">
      <h1
        onClick={() => router.push("/")}
        className="text-5xl cursor-pointer text-gray-900 font-semibold"
      >
        GO
      </h1>

      {(router.pathname === "/" || router.pathname === "/search") && (
        <div
          className="md:flex hidden items-center px-3 py-2 rounded-xl bg-gray-100 border border-gray-400 max-w-md w-1/2"
          onClick={() =>
            router.pathname !== "/search" && router.push(`/search`)
          }
        >
          <SearchIcon className="h-7 w-7 text-gray-900" />
          <input
            ref={searchRef}
            value={searchValue}
            type="text"
            placeholder="Search"
            className="border-0 outline-none ml-2 text-gray-900 text-lg bg-transparent w-full"
            onChange={async (e) => {
              setSearchValue(e.target.value);
              // router.pathname !== "/search"
              //   ? await router.push("/search")
              //   : null;
            }}
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
