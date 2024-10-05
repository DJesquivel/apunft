import Image from "next/image";
import React, { useEffect, useState } from "react";
import Header from "./Header";
import {
  useWeb3ModalAccount,
  useWeb3ModalProvider,
} from "@web3modal/ethers5/react";
import Link from "next/link";
import { ethers } from "ethers";
// import NFT_ABI from "../contract/ABI.json";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Autoplay } from "swiper/modules";

import Slide1 from "@/public/images/1.png";
import Slide2 from "@/public/images/19.png";
import Slide3 from "@/public/images/21.png";
import Slide4 from "@/public/images/26.png";
import Slide5 from "@/public/images/27.png";
import Slide6 from "@/public/images/3.png";
import Slide7 from "@/public/images/30.png";
import Slide8 from "@/public/images/31.png";
import Slide9 from "@/public/images/5.png";
import Slide10 from "@/public/images/56.png";
import Slide11 from "@/public/images/6.png";
import Slide12 from "@/public/images/62.png";
import Slide13 from "@/public/images/7.png";

export default function MintingSection() {
  const { address } = useWeb3ModalAccount();
  const { walletProvider } = useWeb3ModalProvider();
  const [quantity, setQuantity] = useState<string>("1");
  const [tokenId, setTokenId] = useState<string>("");
  const [currentSup, setCurrentSupp] = useState<string>("");
  const [totalSup, setTotalSupp] = useState<string>("");
  const [isMinting, setIsMinting] = useState<boolean>(false);

  //   const contractAddress = "";
  const contractAddress = "";
  const collUrl = ``;

  // const mintFunc = async () => {
  //   setIsMinting(true);
  //   try {
  //     if (walletProvider) {
  //       const provider = new ethers.providers.Web3Provider(walletProvider);
  //       const signer = provider.getSigner();
  //       const contract = new ethers.Contract(contractAddress, NFT_ABI, signer);
  //       // Define the amount to send (in ethers)
  //       const amountToSend = ethers.utils.parseEther("0");
  //       const tx = await contract.batchMintNFT(address, quantity, {
  //         value: amountToSend, // Include the value for the transaction
  //       });
  //       const result = await tx.wait();
  //       console.log(result, "Result");
  //       setTokenId(result?.transactionHash);
  //       supply();
  //     }
  //   } catch (error) {
  //     console.log(error);
  //   } finally {
  //     setIsMinting(false);
  //   }
  // };

  // const supply = async () => {
  //   try {
  //     if (walletProvider) {
  //       const provider = new ethers.providers.Web3Provider(walletProvider);
  //       const signer = provider.getSigner();
  //       const contract = new ethers.Contract(contractAddress, NFT_ABI, signer);
  //       const current = await contract.currentSupply();
  //       setCurrentSupp(Number(current).toString());
  //       const total = await contract.TOTAL_SUPPLY();
  //       setTotalSupp(Number(total).toString());
  //     }
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  // useEffect(() => {
  //   supply();
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [address]);

  const slides = [
    Slide1,
    Slide2,
    Slide3,
    Slide4,
    Slide5,
    Slide6,
    Slide7,
    Slide8,
    Slide9,
    Slide10,
    // Slide11,
    Slide12,
    Slide13,
  ];

  return (
    <div className="relative overflow-hidden">
      <Image
        src={"/images/Layer38.png"}
        alt=""
        width={584}
        height={532}
        className="absolute left-[1%] top-[30%]"
      />
      <Image
        src={"/images/Layer39.png"}
        alt=""
        width={540}
        height={840}
        className="absolute right-[1%] top-[10%]"
      />
      <div className="container mx-auto mt-20 max-md:mt-10 max-w-[900px] min-w-[900px] relative max-lg:max-w-full max-lg:min-w-full px-4">
        <div className="flex justify-between gap-4 relative z-10 max-sm:flex-col text-center sm:text-left">
          <div className="">
            <p className="uppercase single-day-regular text-[48px] text-white max-sm:text-center">
              Early Access Mint
            </p>
            <div className="flex gap-4 max-sm:flex-col">
              <div className="max-sm:items-center max-sm:flex max-sm:flex-col">
                <p className="text-[30px] single-day-regular text-white">
                  Date: Saturday 10/05
                </p>
                <p className="text-[30px] single-day-regular text-white">
                  Time: 12:00 PM EST
                </p>
                <p className="text-[30px] single-day-regular text-white">
                  Price: .05e (ETH gas fees apply)
                </p>
                <p className="text-[30px] single-day-regular text-white">
                  Max per mint: 10
                </p>
                <p className="text-[30px] single-day-regular text-white">
                  No max per wallet
                </p>
                <p className="text-[30px] single-day-regular text-white">
                  Duration: 33 Hours
                </p>
              </div>
              {/* <div className="max-w-[200px] max-sm:items-center max-sm:flex max-sm:flex-col max-sm:max-w-full">
                <p className="text-[30px] single-day-regular text-white">
                  . All $APU holders will receive early access, Snapshot: 8/29 @
                  12pm est
                </p>
              </div> */}
            </div>
          </div>

          <div className="w-[1px] bg-white shadow-lg max-sm:hidden"></div>

          <div className="max-sm:items-center max-sm:flex max-sm:flex-col">
            <p className="uppercase single-day-regular text-[48px] text-white">
              Public Mint
            </p>
            <div>
              <div className="max-sm:items-center max-sm:flex max-sm:flex-col">
                <p className="text-[30px] single-day-regular text-white">
                  Date: Sunday 10/06
                </p>
                <p className="text-[30px] single-day-regular text-white">
                  Time: 9:00 PM EST
                </p>
                <p className="text-[30px] single-day-regular text-white">
                  Price: .10e (ETH gas fees apply)
                </p>
                <p className="text-[30px] single-day-regular text-white">
                  Max per mint: 10
                </p>
                <p className="text-[30px] single-day-regular text-white">
                  No max per wallet
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="h-[1px] bg-white w-full mt-10 mb-6"></div>

        <div className="flex justify-center items-center relative z-10 max-md:flex-col gap-8 px-4">
          <div className="flex flex-col justify-center items-center my-6 gap-4">
            <p className="text-white single-day-regular text-4xl">
              {currentSup ? currentSup : "0"} / {totalSup ? totalSup : "7777"}
            </p>
            <Swiper
              slidesPerView={1}
              spaceBetween={30}
              autoplay={{
                delay: 3000,
                disableOnInteraction: false,
              }}
              modules={[Autoplay]}
              className="mySwiper max-w-[400px] max-lg:max-w-[300px] shadow-custom-blue rounded-xl"
            >
              {slides.map((slide, index) => (
                <SwiperSlide key={index}>
                  <Image
                    src={slide}
                    alt={`Slide ${index + 1}`}
                    width={400}
                    height={400}
                    className="max-w-[700] max-md:max-w-[300px]"
                  />
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
          <div className="flex flex-col justify-center items-center">
            <p className="text-4xl text-white single-day-regular">
              1 APU costs .10 eth
            </p>
            <p className="text-xl text-white single-day-regular mt-2">
              (ETH gas fees apply)
            </p>
            <Header />
            {/* {address && (
              <p className="bg-[#050923] text-[#00d8ff] text-xl shadow-custom-blue single-day-regular px-4 py-2 border border-[#5dccff] rounded-lg">
                {address ? address : ""}
              </p>
            )}
            <div className="my-4">
              <div className="relative">
                <select
                  id="dropdown"
                  onChange={(e) => setQuantity(e.target.value)}
                  className="block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 text-2xl text-black"
                >
                  <option value="1">1</option>
                  <option value="2">2</option>
                  <option value="3">3</option>
                  <option value="4">4</option>
                  <option value="5">5</option>
                  <option value="6">6</option>
                  <option value="7">7</option>
                  <option value="8">8</option>
                  <option value="9">9</option>
                  <option value="10">10</option>
                </select>
              </div>
            </div>
            {tokenId ? (
              <button className="text-3xl bg-[#2771f9] text-white single-day-regular px-8 py-4 rounded-xl">
                <Link href={collUrl} target="_blank">
                  View on Opensea!
                </Link>
              </button>
            ) : (
              <button
                className={`text-white shadow-custom-blue single-day-regular bg-[#00d8ff] rounded-xl py-3 px-10 text-2xl ${
                  isMinting ? "opacity-50 cursor-not-allowed" : ""
                }`}
                onClick={mintFunc}
                disabled={isMinting}
              >
                {isMinting ? "Minting..." : "Mint"}
              </button>
            )}  */}

          </div>
        </div>
        <div className="h-[1px] bg-white w-full my-6"></div>
      </div>
    </div>
  );
}
