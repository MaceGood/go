import { ChatAlt2Icon } from "@heroicons/react/solid";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import Person from "./Person";

const Connections: React.FC = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const connections = useSelector((connections: any) => connections);
  const userDb = useSelector((user: any) => user);

  return (
    <div className="flex flex-col border py-4 px-4 my-2 mx-6 max-w-xs bg-gray-100  border-gray-400 text-gray-800 rounded-lg">
      <div
        className="flex items-center justify-between cursor-pointer"
        onClick={() => router.push("/connections")}
      >
        <h1 className="text-2xl font-semibold">Connections</h1>
        <ChatAlt2Icon className="h-8 w-8" />
      </div>

      {connections?.connections?.connections?.map((connection: any) => (
        <Person
          key={connection._id}
          picture={connection.picture}
          name={connection.name}
        />
      ))}
    </div>
  );
};

export default Connections;
