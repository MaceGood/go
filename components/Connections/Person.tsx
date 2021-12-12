import Image from "next/image";

interface Props {
  picture: string;
  name: string;
}

const Person: React.FC<Props> = ({ name, picture }) => {
  return (
    <div className="flex items-center text-gray-800 font-semibold rounded-lg w-full my-1 px-3 py-1 hover:bg-gray-200 cursor-pointer">
      <Image
        src={picture}
        alt={name}
        width={40}
        height={40}
        className="rounded-full"
      />
      <p className="ml-2 text-lg">{name}</p>
    </div>
  );
};

export default Person;
