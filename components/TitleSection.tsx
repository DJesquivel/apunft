import Image from "next/image";
import React from "react";
import Header from "./Header";

export default function TitleSection() {
  return (
    <div>
      <div className="relative">
        <div className="absolute right-3 top-3 z-10">
          <Header />
        </div>
        <Image
          src={"/images/titlebg.png"}
          alt=""
          width={1000}
          height={300}
          className="!w-full"
        />
        <Image
          src={"/images/logo.png"}
          alt=""
          width={700}
          height={300}
          className="max-w-[700] absolute top-[20%] left-1/2 -translate-x-1/2 max-xl:w-[400px] max-sm:w-[200px]"
        />
      </div>
    </div>
  );
}
