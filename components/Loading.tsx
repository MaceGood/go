import React from "react";
import Image from "next/image";

const Loading: React.FC = () => {
  return (
    <div className="w-full h-screen flex justify-center items-center object-contain">
      <Image src="/loading.gif" alt="loading" width="50" height="50" />
    </div>
  );
};

export default Loading;
