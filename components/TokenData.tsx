import React, { useEffect, useState } from "react";
import { checkWalletHoldings } from "./utils/checkWalletHoldings";
import { useWeb3ModalAccount } from "@web3modal/ethers5/react";

const TokenTable = () => {
  const { address: connectedAddress, isConnected } = useWeb3ModalAccount();
  const [address, setAddress] = useState<string>(connectedAddress || ""); // State for the wallet address input
  const [holdings, setHoldings] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(false); // Loading state

  const fetchHoldings = async (walletAddress: string) => {
    setLoading(true); // Start loading
    try {
      const holding = await checkWalletHoldings(walletAddress);

      const holdingsArray = Object.entries(holding as object).map(
        ([tokenName, details]) => ({
          tokenName,
          ...details,
        })
      );

      setHoldings(holdingsArray);
      console.log(holdingsArray, "Holdings Array");
    } catch (error) {
      console.error("Failed to fetch holdings:", error);
      setHoldings([]); // Clear holdings if an error occurs
    } finally {
      setLoading(false); // Stop loading
    }
  };

  useEffect(() => {
    if (connectedAddress && isConnected) {
      fetchHoldings(connectedAddress); // Fetch holdings for connected address
    }
  }, [connectedAddress, isConnected]);

  // Handle form submission to fetch data for the entered address
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (address) {
      fetchHoldings(address);
    }
  };

  return (
    <div className="flex flex-col justify-center items-center p-6 min-h-screen space-y-4">
      {/* Input Form */}
      <form className="flex space-x-4" onSubmit={handleSubmit}>
        <input
          type="text"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          placeholder="Enter wallet address"
          className="p-2 border rounded-md w-80 text-black"
        />
        <button
          type="submit"
          className="px-4 py-2 bg-blue-600 text-white rounded-md"
        >
          Check Holdings
        </button>
      </form>

      {/* Table */}
      <div className="overflow-x-auto w-full max-w-4xl">
        <table className="table-auto w-full shadow-md rounded-xl">
          <thead>
            <tr className="bg-[#091450] text-white">
              <th className="p-3 text-left rounded-tl-xl text-xl">
                Token Name
              </th>
              <th className="p-3 text-left text-xl">Balance</th>
              <th className="p-3 text-left rounded-tr-xl text-xl">
                Has Tokens
              </th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td
                  colSpan={3}
                  className="p-3 text-center text-white border-2 border-white"
                >
                  Loading...
                </td>
              </tr>
            ) : holdings?.length > 0 ? (
              holdings?.map((item, index) => (
                <tr key={index} className="border-2 border-white rounded-xl">
                  <td className="p-3 text-white">{item.tokenName}</td>
                  <td className="p-3 text-white">{item.balance}</td>
                  <td className="p-3 text-white">
                    {item.hasTokens ? "Yes" : "No"}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan={3}
                  className="p-3 border-2 border-white rounded-xl text-center"
                >
                  No holdings found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TokenTable;
