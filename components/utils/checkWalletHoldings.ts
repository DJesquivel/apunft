import { ethers } from "ethers";
import { CONTRACTS } from "../constant/constant";
import ERC20_ABI from "../../contract/ERC20ABI.json";
import ERC721_ABI from "../../contract/ERC721ABI.json";

type TokenKeys = keyof typeof CONTRACTS;

export async function checkWalletHoldings(walletAddress: string) {
  const providerUrl = `https://ethereum-rpc.publicnode.com`;
  // console.log(walletAddress, "walletAddress");
  const provider = new ethers.providers.JsonRpcProvider(providerUrl);

  // Define the initial holdings state
  const holdings: { [key: string]: { balance: string; hasTokens: boolean } } = {
    Bitcoin: { balance: "0", hasTokens: false },
    SPX6900: { balance: "0", hasTokens: false },
    Bobo: { balance: "0", hasTokens: false },
    MiladyNFT: { balance: "0", hasTokens: false },
    LofiPepeNFT: { balance: "0", hasTokens: false },
    APU: { balance: "0", hasTokens: false }, // APU is ERC721
  };

  try {
    // Loop over the tokens
    for (const token of [
      "Bitcoin",
      "SPX6900",
      "Bobo",
      "MiladyNFT",
      "LofiPepeNFT",
      "APU",
    ] as TokenKeys[]) {
      let balance: ethers.BigNumber;
      let contract;

      // For ERC20 tokens
      if (token !== "APU" || "MiladyNFT" || "LofiPepeNFT") {
        contract = new ethers.Contract(CONTRACTS[token], ERC20_ABI, provider);
        balance = await contract.balanceOf(walletAddress);
        const balanceFormatted = ethers.utils.formatUnits(balance, 18); // Assuming the tokens have 18 decimals
        holdings[token].balance = balanceFormatted;
        holdings[token].hasTokens = !balance.isZero(); // Set to true if balance is above zero
      }

      // For the APU token (ERC721)
      else {
        contract = new ethers.Contract(CONTRACTS[token], ERC721_ABI, provider);
        const balanceOf = await contract.balanceOf(walletAddress); // ERC721 uses balanceOf to check how many NFTs
        holdings[token].balance = balanceOf.toString(); // ERC721 balance (how many NFTs they hold)
        holdings[token].hasTokens = !balanceOf.isZero(); // Set to true if the user has at least 1 NFT
      }
    }

    return holdings;
  } catch (error) {
    console.error("Error checking wallet holdings:", error);
    return null;
  }
}
