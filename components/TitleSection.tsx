import Image from "next/image";
import React from "react";
import Header from "./Header";

export default function TitleSection() {
  return (
    <div className="pb-20 sm:pb-0">
      <div className="relative">
        <div className="absolute right-3 top-3 z-10">
          <Header />
        </div>
        <Image
          src={"/images/titlebg.png"}
          alt=""
          width={1000}
          height={300}
          unoptimized
          priority
          className="!w-full"
        />

        <div className="absolute top-[20%] sm:left-1/2 sm:-translate-x-1/2 text-center">
          <Image
            src={"/images/apunfttransparent.webp"}
            alt=""
            width={700}
            height={300}
            unoptimized
            priority
            className="max-w-[80%] sm:max-w-[80%] brightness-85 mx-auto"
          />
          {/* Start Coming soon - needs to be removed */}
          <div className="py-2 px-4 sm:p-4 rounded-lg sm:rounded-2xl absolute bg-[#e74c3c] top-full left-1/2 -translate-x-1/2 text-xl  sm:text-4xl xl:text-6xl text-white shadow-xl whitespace-nowrap">
            Coming soon!
          </div>
          
          {/* End Coming soon - needs to be removed */}
        </div>
      </div>
    </div>
  );
}
