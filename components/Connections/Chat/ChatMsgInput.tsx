import React from "react";
import { EmojiHappyIcon, PaperAirplaneIcon } from "@heroicons/react/outline";

interface Props {}

const ChatMsgInput: React.FC<Props> = ({}) => {
  return (
    <div className="p-3 flex items-start w-full justify-center">
      <EmojiHappyIcon className="h-8 w-8 mr-2 text-gray-700 cursor-pointer" />
      <form className="flex items-center px-3 py-2 rounded-xl bg-gray-200 border border-gray-400 w-96">
        <textarea
          // value={searchValue}
          placeholder="Type a message"
          className="border-0 outline-none ml-2 text-gray-900 text-lg bg-transparent w-full resize-none "
          // onChange={(e) => {
          //   setSearchValue(e.target.value);
          // }}
        />
        <button
          type="submit"
          className="hidden"
          // onClick={search}
        >
          submit
        </button>
      </form>
      <button className="bg-green-500 rounded-full p-3 ml-2 items-center">
        <PaperAirplaneIcon className="h-8 w-8 text-gray-50" />
      </button>
    </div>
  );
};

export default ChatMsgInput;
