import Image from "next/image";
import React from "react";
import Header from "./Header";
import Countdown from 'react-countdown';
import { useEffect, useState } from "react";

export default function TitleSection() {
  const launchDate = '2024-10-05T16:00:00Z';
  const whiteListDuration = 33 * 60 * 60 * 1000;
  const [countdownDate, setCountdownDate] = useState(0);
  const [showSecondaryCountdown, setShowSecondaryCountdown] = useState(false);
  const [showPublic, setShowPublic] = useState(false);

  useEffect(() => {
    const whiteListStartDateUTC = new Date(launchDate).getTime(); // Whitelist start date in UTC
    const whiteListEndDateUTC = whiteListStartDateUTC + whiteListDuration; // 33 hours later

    const currentDateUTC = Date.now();

    if (currentDateUTC < whiteListStartDateUTC) {
      // Before the whitelist starts: primary countdown
      setCountdownDate(whiteListStartDateUTC);
      setShowSecondaryCountdown(false); // Hide secondary countdown
    } else if (currentDateUTC < whiteListEndDateUTC) {
      // During the whitelist period: show the secondary countdown
      setCountdownDate(whiteListEndDateUTC);
      setShowSecondaryCountdown(true); // Show secondary countdown
    } else {
      // After the whitelist period ends: No countdown or handle as needed
      setShowSecondaryCountdown(false);
      setShowPublic(true)
    }
  }, []);

  const handleCompleteOne = () => {
    const whiteListStartDateUTC = new Date(launchDate).getTime(); // Whitelist start date in UTC
    const whiteListEndDateUTC = whiteListStartDateUTC + whiteListDuration; // 33 hours later
    setShowSecondaryCountdown(true);
    setCountdownDate(whiteListEndDateUTC);
  };
  const handleCompleteTwo = () => {
    setShowSecondaryCountdown(false);
    setShowPublic(true)
  };

  return (
    <div className="pb-[6.5rem] sm:pb-0">
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
          {/* Start Countdown Area */}
          <div className="fontSimpleSingleDay text-white text-4xl text-center">
            {/* First Countdown */}
            {!showPublic && !showSecondaryCountdown && countdownDate > Date.now() ? (
              <div className="flex flex-col items-center justify-center w-auto text-center relative font-bold">
                <div className="py-2 px-4 rounded-lg sm:rounded-2xl bg-[#e74c3c] text-2xl sm:text-4xl xl:text-4xl 3xl:text-6xl text-white shadow-xl whitespace-nowrap fontSingleDay my-1">
                  <div className="fontSingleDay uppercase">NFTs coming soon:</div>
                  <div className="shareTechMono font-black">
                    <Countdown daysInHours date={countdownDate} onComplete={handleCompleteOne} />
                  </div>
                </div>
              </div>
            ) : null}

            {/* Second Countdown */}
            {!showPublic && showSecondaryCountdown && (
              <div className="flex flex-col items-center justify-center w-auto text-center relative font-bold">
                <div className="py-2 px-4 rounded-lg sm:rounded-2xl bg-[#e74c3c] text-2xl sm:text-4xl xl:text-4xl 3xl:text-6xl text-white shadow-xl whitespace-nowrap fontSingleDay my-1">
                  <div className="fontSingleDay uppercase">Whitelist Ends In:</div>
                  <div className="shareTechMono font-black">
                    <Countdown daysInHours date={countdownDate} onComplete={handleCompleteTwo} />
                  </div>
                </div>
              </div>
            )}
            {/* Public Mint */}
            {showPublic && (
              <div className="flex flex-col items-center justify-center w-auto text-center relative font-bold">
                <div className="py-2 px-4 rounded-lg sm:rounded-2xl bg-[#e74c3c] text-2xl sm:text-4xl xl:text-4xl 3xl:text-6xl text-white shadow-xl whitespace-nowrap fontSingleDay my-1">
                  <div className="fontSingleDay uppercase">Public Mint is live!</div>
                </div>
              </div>
            )}
          </div>

          {/* End Countdown Area */}
        </div>
      </div>
    </div>
  );
}
