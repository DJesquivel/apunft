import { useWeb3Modal, useWeb3ModalAccount } from "@web3modal/ethers5/react";
import React from "react";

export default function Header() {
  const { open } = useWeb3Modal();
  const { address, isConnected } = useWeb3ModalAccount();
  return (
    <div className="flex py-1 px-1 sm:py-4 sm:px-6">
      {/* <button
        onClick={() => open({ view: "Connect" })}
        className="bg-[linear-gradient(45deg,rgba(40,113,250,1)40%,rgba(103,23,205,1)71%)] text-white px-3 py-2 sm:px-6 sm:py-4 rounded-xl sm:rounded-2xl single-day-regular text-[40px] max-sm:text-lg shadow-custom-blue"
      >
        {isConnected ? "Connected" : "Connect Wallet"}
      </button> */}

      {/* Start Dummy button */}
      <div className=" text-white pointer-events-none w-auto whitespace-nowrap relative">
        <div className="bg-[linear-gradient(45deg,rgba(40,113,250,1)40%,rgba(103,23,205,1)71%)]  text-[40px] max-sm:text-lg shadow-custom-blue text-white rounded-xl sm:rounded-2xl px-3 py-2 sm:px-6 sm:py-4">
          Connect Wallet
        </div>
        <div className="p-[0.1rem] px-[0.15rem] sm:p-1 rounded-md bg-red absolute bg-[#e74c3c] -rotate-45 top-[0.2rem] left-[0.55rem] sm:top-[0.25rem] sm:left-[1.25rem] origin-center -translate-x-1/2 text-[0.75rem] sm:text-lg shadow-sm">
          Coming soon!
        </div>
      </div>
      {/* End Dummy button */}
    </div>
  );
}
