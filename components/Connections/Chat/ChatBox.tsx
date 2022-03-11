import Image from "next/image";

interface Props {
  img: string;
  name: string;
  message: string;
  time: string;
  sender: boolean;
}

function classNames(...classes: any[]) {
  return classes.filter(Boolean).join(" ");
}

const ChatBox: React.FC<Props> = ({ img, name, time, message }) => {
  let sender = false;

  return (
    <div className={classNames(sender && "flex-col", "flex w-full mt-3")}>
      {!sender && (
        <div className="text-center flex-none">
          <Image
            src={img}
            alt={name}
            width={45}
            height={45}
            className="rounded-full"
          />
          <p className="font-medium text-gray-700 text-sm">{time}</p>
        </div>
      )}

      <div
        className={classNames(
          sender
            ? "bg-blue-500 text-gray-50 rounded-tr-none items-end"
            : "bg-gray-200 text-gray-800 rounded-tl-none",
          "ml-2 p-3 rounded-lg flex-1"
        )}
      >
        <p>{message}</p>
      </div>
      {sender && (
        <p className="font-medium text-gray-700 text-sm text-right">{time}</p>
      )}
    </div>
  );
};

export default ChatBox;
