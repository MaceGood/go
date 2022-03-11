import { SearchIcon } from "@heroicons/react/solid";
import React, { useRef, useState } from "react";
import Person from "./Person";

type Props = {
  connectionsResults: any;
};

const Bar: React.FC<Props> = ({ connectionsResults }) => {
  const [searchValue, setSearchValue] = useState<string>("");
  const searchRef = useRef<any>(null);

  return (
    <div className="w-1/4 mb-2">
      <form
        className="flex items-center px-3 py-2 rounded-xl bg-gray-100 border border-gray-400 w-full mb-3"
        // onClick={redirect}
      >
        <SearchIcon className="h-7 w-7 text-gray-900" />
        <input
          ref={searchRef}
          value={searchValue}
          type="text"
          placeholder="Search"
          className="border-0 outline-none ml-2 text-gray-900 text-lg bg-transparent w-full"
          onChange={(e) => {
            setSearchValue(e.target.value);
          }}
        />
        <button
          type="submit"
          className="hidden"
          // onClick={search}
        >
          submit
        </button>
      </form>

      <div className="border border-gray-400 bg-gray-100 p-2 rounded-lg">
        {connectionsResults?.map((connection: any) => (
          <Person
            key={connection?._id}
            id={connection?._id}
            picture={connection?.picture}
            name={connection?.name}
            // date={connection?.date}
            // message={connection?.message}
          />
        ))}
      </div>
    </div>
  );
};

export default Bar;
