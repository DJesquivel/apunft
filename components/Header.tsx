import { useWeb3Modal, useWeb3ModalAccount } from "@web3modal/ethers5/react";
import React from "react";

export default function Header() {
  const { open } = useWeb3Modal();
  const { address, isConnected } = useWeb3ModalAccount();
  return (
    <div className="flex py-4 px-6">
      {/* <button
        onClick={() => open({ view: "Connect" })}
        className="bg-[linear-gradient(45deg,rgba(40,113,250,1)40%,rgba(103,23,205,1)71%)] text-white px-6 py-4 rounded-2xl single-day-regular text-[40px] max-sm:text-lg shadow-custom-blue"
      >
        {isConnected ? "Connected" : "Connect Wallet"}
      </button> */}
    </div>
  );
}
