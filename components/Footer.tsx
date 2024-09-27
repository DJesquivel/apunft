import Image from "next/image";
import React from "react";
import Faq from "./Faq";
import { FaTelegramPlane } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import Link from "next/link";

export default function Footer() {
  return (
    <div className="flex flex-col relative">
      {/* <div className='absolute left-1/2 -translate-x-1/2'>
        <Faq />
      </div> */}
      <Image
        src={"/images/Layer34.png"}
        alt=""
        width={420}
        height={456}
        className="absolute right-[0%] bottom-[30%]"
      />
      <div className=" flex flex-col justify-center items-center gap-6 sm:gap-16 absolute w-full top-[15%]">
        <p
          className="text-3xl text-white sm:text-8xl text-center"
          // style={{
          //   textShadow:
          //     "0 0 5px #ffffff, 0 0 10px #ffffff, 0 0 20px #3D71FA, 0 0 30px #3D71FA, 0 0 40px #3D71FA, 0 0 50px #3D71FA, 0 0 60px #3D71FA",
          // }}
        >
          So, what are you waiting for?
        </p>
        <div className="flex flex-wrap gap-8 item-center justify-center">
          <Link
            className="sm:text-5xl text-xl bg-transparent hover:bg-[#3D71FA] py-2 px-4 sm:py-4 sm:px-8 rounded-xl flex flex-row gap-4 border-2 sm:border-4 text-white"
            href="https://t.me/apuclub"
            target="_blank"
          >
            Join Us
            <FaTelegramPlane />
          </Link>
          <Link
            className="sm:text-5xl text-xl bg-transparent hover:bg-[#3D71FA] py-2 px-4 sm:py-4 sm:px-8 rounded-xl border-2 sm:border-4 flex flex-row gap-4 text-white"
            href="https://twitter.com/apuscoin"
            target="_blank"
          >
            Join Us
            <FaXTwitter />
          </Link>
        </div>
      </div>
      <p className="text-white text-4xl absolute bottom-[1%] left-1/2 -translate-x-1/2 max-sm:text-base single-day-regular w-full text-center">
        <span className="font-sans">©</span> 2024 by $APU. All rights reserved!
      </p>
      <Image
        src={"/images/footerImage.webp"}
        alt=""
        width={1000}
        height={300}
        unoptimized
        className="!w-full !full"
      />
    </div>
  );
}
