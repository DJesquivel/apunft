import { ethers } from "ethers";
import { CONTRACTS } from "../constant/constant";
import ERC20_ABI from "../../contract/ERC20ABI.json";
type TokenKeys = keyof typeof CONTRACTS;

export async function checkWalletHoldings(walletAddress: string) {
  const providerUrl = `https://ethereum-rpc.publicnode.com`;
  console.log(walletAddress, "walletAddress");
  const provider = new ethers.providers.JsonRpcProvider(providerUrl);
  const holdings: { [key: string]: { balance: string; hasTokens: boolean } } = {
    Bitcoin: { balance: "0", hasTokens: false },
    SPX6900: { balance: "0", hasTokens: false },
    Bobo: { balance: "0", hasTokens: false },
    MiladyNFT: { balance: "0", hasTokens: false },
    LofiPepeNFT: { balance: "0", hasTokens: false },
  };

  try {
    for (const token of [
      "Bitcoin",
      "SPX6900",
      "Bobo",
      "MiladyNFT",
      "LofiPepeNFT",
    ] as TokenKeys[]) {
      const contract = new ethers.Contract(
        CONTRACTS[token],
        ERC20_ABI,
        provider
      );
      const balance: ethers.BigNumber = await contract.balanceOf(walletAddress);
      const balanceFormatted = ethers.utils.formatUnits(balance, 18); // Assuming the tokens have 18 decimals
      holdings[token].balance = balanceFormatted;
      holdings[token].hasTokens = !balance.isZero(); // Set to true if balance is above zero
    }

    return holdings;
  } catch (error) {
    console.error("Error checking wallet holdings:", error);
    return null;
  }
}
