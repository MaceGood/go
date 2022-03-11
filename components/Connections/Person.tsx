import Image from "next/image";
import { useRouter } from "next/router";

interface Props {
  picture: string;
  name: string;
  id: string;
  message?: any;
  date?: any;
}

const Person: React.FC<Props> = ({ name, picture, id, date, message }) => {
  const router = useRouter();
  const pathname = router.pathname.includes("/connections");

  return (
    <div
      className="flex items-center text-gray-800 font-semibold rounded-lg w-full my-1 px-3 py-1 hover:bg-gray-200 cursor-pointer"
      key={id}
      onClick={() => router.push(`/connections/t/${id}`)}
    >
      <Image
        src={picture}
        alt={name}
        width={pathname ? 60 : 40}
        height={pathname ? 60 : 40}
        className="rounded-full"
      />

      {pathname ? (
        <div className="ml-2 w-full">
          <div className="flex justify-between items-center">
            <p className="text-lg text-gray-900">{name}</p>
            <p className="text-gray-700">{date}</p>
          </div>

          <p className="text-gray-700">{message}</p>
        </div>
      ) : (
        <p className="ml-2 text-lg">{name}</p>
      )}
    </div>
  );
};

export default Person;
