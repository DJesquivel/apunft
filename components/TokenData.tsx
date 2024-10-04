import React, { useEffect, useState } from "react";
import { checkWalletHoldings } from "./utils/checkWalletHoldings";
import { useWeb3ModalAccount } from "@web3modal/ethers5/react";
import { uploadNFT } from "./utils/Arweave";
import { walletKey } from "./utils/walletkey";
import { Button } from "antd";
import TransactionNotification from "./utils/TransactionNotification";
import Loader from "./utils/Loader";

const TokenTable = () => {
  const { address: connectedAddress, isConnected } = useWeb3ModalAccount();
  const [address, setAddress] = useState<string>(connectedAddress || ""); // State for the wallet address input
  const [holdings, setHoldings] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(false); // Loading state
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [loading2, setLoading2] = useState(false);
  const [metadata, setMetadata] = useState({
    name: "My NFT",
    description: "This is my first NFT!",
  });

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

  // Handle image file selection
  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      setImageFile(event.target.files[0]);
    }
  };

  const handleUpload = async () => {
    if (!imageFile) {
      console.log("No image file selected");
      return;
    }

    // Read image file as Buffer
    const imageBuffer = await imageFile.arrayBuffer();

    try {
      const metadataTransactionId = await uploadNFT(
        Buffer.from(imageBuffer),
        metadata,
        walletKey
      );
      console.log(
        "NFT uploaded successfully! Metadata transaction ID:",
        metadataTransactionId
      );
    } catch (error) {
      console.error("Error uploading NFT:", error);
    }
  };

  const handleTransactionProcessing = () => {
    setLoading2(true);

    setTimeout(() => {
      setLoading2(false);
      notifyTransactionSuccess();
    }, 2000);
  };

  const {
    notifyTransactionSubmitted,
    notifyTransactionProcessing,
    notifyTransactionSuccess,
    notifyTransactionFailed,
  } = TransactionNotification();

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
        {/* <div>
          <h1>Upload NFT</h1>
          <input type="file" accept="image/*" onChange={handleImageChange} />
          <button onClick={handleUpload}>Upload NFT</button>
        </div> */}
        <div className=" mt-10 flex justify-between item-center p-4">
          <Button type="primary" onClick={notifyTransactionSubmitted}>
            Transaction Submitted Successfully
          </Button>
          <Button
            type="default"
            onClick={handleTransactionProcessing}
            disabled={loading} // Disable button while loading
            className="p-3"
          >
            {loading2 ? (
              <Loader loading={loading2} size="default" />
            ) : (
              "Transaction Processing"
            )}
          </Button>

          <Button type="dashed" onClick={notifyTransactionSuccess}>
            Transaction Success
          </Button>
          <Button type="default" onClick={notifyTransactionFailed}>
            Transaction Failed
          </Button>
        </div>
      </div>
    </div>
  );
};

export default TokenTable;
