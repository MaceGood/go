import { EmojiHappyIcon, PaperAirplaneIcon } from "@heroicons/react/outline";
import { DotsVerticalIcon } from "@heroicons/react/solid";
import Image from "next/image";
import ChatBox from "./ChatBox";
import ChatMsgInput from "./ChatMsgInput";

interface Props {}

function classNames(...classes: any[]) {
  return classes.filter(Boolean).join(" ");
}

const Chat: React.FC<Props> = () => {
  let sender = false;

  return (
    <div className="border w-3/4 ml-6 mb-2 bg-gray-100 border-gray-400 rounded-lg max-h-70">
      <div className="border-b-2 p-3 border-gray-400 flex items-center w-full justify-between">
        <div className="flex items-center">
          <Image
            src={
              "https://s.gravatar.com/avatar/08ba903851a56142c4b7273c7579566f?s=480&r=pg&d=https%3A%2F%2Fcdn.auth0.com%2Favatars%2Fma.png"
            }
            alt={"mace"}
            width={50}
            height={50}
            className="rounded-full"
          />{" "}
          <h1 className="ml-2 text-lg font-semibold text-gray-900">
            Mace Testing
          </h1>
        </div>
        <DotsVerticalIcon className="h-6 w-6 cursor-pointer" />
      </div>

      <div
        className={classNames(
          sender && "float-right",
          "p-3 w-2/3 max-h-40 overflow-y-scroll"
        )}
      >
        <ChatBox
          img={
            "https://s.gravatar.com/avatar/08ba903851a56142c4b7273c7579566f?s=480&r=pg&d=https%3A%2F%2Fcdn.auth0.com%2Favatars%2Fma.png"
          }
          name={""}
          message={""}
          time={""}
          sender={false}
        />
      </div>

      <div>
        <ChatMsgInput />
      </div>
    </div>
  );
};

export default Chat;
