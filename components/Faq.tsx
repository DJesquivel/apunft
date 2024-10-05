import Image from "next/image";
import React, { useState } from "react";

export default function Faq() {
  const [isOpen, setIsOpen] = useState<any>({});

  const toggleAnswer = (id: any) => {
    setIsOpen((prevState: any) => ({
      ...prevState,
      [id]: !prevState[id],
    }));
  };

  const faqData = [
    {
      question: "What is this NFT collection about?",
      answer:
        "This collection consists of 7,777 unique Apu NFTs, stored on the Ethereum blockchain. Each NFT has been meticulously crafted and holds special traits and features, making each piece distinct. This NFT Collection fits hand in hand with the Apu Apustaja token. Being a community takeover, this collection gives a way for the community to support the project while getting something in return.",
    },
    {
      question: "How many NFTs are available?",
      answer:
        "There are a total of 7,777 NFTs available in this collection. Once all are minted, no additional NFTs will be created.",
    },
    {
      question: "How can I mint an NFT?",
      answer:
        "You can mint an NFT directly from this page. Ensure your digital wallet is connected and funded with the required cryptocurrency (Ethereum). Follow the minting process by clicking the `Mint` button.",
    },
    {
      question: "What will the minting price be?",
      answer:
        "The minting price will be .10 ETH per NFT (.05 for those on the Whitelist). Please note that gas fees, which are network transaction fees, will also apply.",
    },
    {
      question: "How do I qualify for the Early Access Mint?",
      answer:
        "Hold at least 1 $APU token to get early access",
    },
    {
      question: "When will the minting start?",
      answer:
        "Early Access for Whitelisted Wallets will begin Saturday 10/05 at 12:00 PM EST and will last 33 hours. Public Mint will begin Sunday 10/06 at 9:00 PM EST.",
    },

    {
      question: "Will there be any benefits for holding these NFTs?",
      answer:
        "Holders of these NFTs may receive special perks, including exclusive access to future drops, community events, and more. Stay tuned for more details.",
    },
    {
      question: "What happens after minting closes?",
      answer:
        "After the minting process is completed, the NFTs will be available for secondary sales on Opensea. You can buy, sell, or trade your NFTs on the platform.",
    },
    {
      question: "How do I view my NFTs?",
      answer:
        "Once you’ve minted your NFTs, you can view them in your connected digital wallet and on Opensea. Just ensure that your wallet is connected to Opensea to see your collection.",
    },
    {
      question: "What is Opensea?",
      answer:
        "Opensea is one of the largest and most popular secondary marketplaces for NFTs. It allows users to buy, sell, and trade NFTs securely. After the minting process, our collection will be listed on Opensea for secondary sales.",
    },
    {
      question: "What if I encounter an issue during minting?",
      answer: (
        <>
          If you experience any issues during the minting process, please
          contact our support team at
          <a
            href="https://x.com/apuscoin"
            target="_blank"
            rel="noopener noreferrer"
          >
            {" "}
            @apuscoin on X
          </a>
          , or join our community on
          <a
            href="https://t.me/apuclub"
            target="_blank"
            rel="noopener noreferrer"
          >
            {" "}
            Telegram https://t.me/apuclub
          </a>
          .
        </>
      ),
    },
  ];

  return (
    <div className="relative">
      <Image
        src={"/images/Layer40.png"}
        alt=""
        width={760}
        height={758}
        className="absolute right-0 top-[10%]"
      />
      <div className="container mx-auto mt-20 max-md:mt-10 max-w-[900px] min-w-[900px] relative max-lg:max-w-full max-lg:min-w-full px-4 pb-4">
        <Image
          src={"/images/Layer35.png"}
          alt=""
          width={789}
          height={443}
          className="absolute left-1/2 -translate-x-1/2 top-[-40%]"
        />
        <h1 className="text-4xl font-bold text-center mb-10 single-day-regular text-white">
          FAQ
        </h1>
        <div className="grid grid-cols-1 gap-4 relative z-20">
          {faqData.map((item, index) => (
            <div
              key={index}
              className={`rounded-xl shadow-md cursor-pointer bg-[#091450]`}
              onClick={() => toggleAnswer(`answer-${index + 1}`)}
            >
              <div
                className={`flex justify-between items-center p-4 rounded-xl ${
                  isOpen[`answer-${index + 1}`]
                    ? "bg-[linear-gradient(45deg,rgba(40,113,250,1)40%,rgba(103,23,205,1)71%)] shadow-custom-blue"
                    : "bg-[#091450] "
                }`}
              >
                <h2 className="text-2xl font-medium single-day-regular text-white">
                  {item.question}
                </h2>
                <Image
                  src={"/images/arrowbutton.png"}
                  alt=""
                  width={85}
                  height={85}
                  className={`flex-shrink-0 h-[40px] sm:h-[60px] w-[50px] sm:w-[85px] transition-transform duration-300 ease-in-out ${
                    isOpen[`answer-${index + 1}`] ? "rotate-180" : ""
                  }`}
                />
                {/* <svg
                xmlns="http://www.w3.org/2000/svg"
                className={`h-6 w-6 transition-transform duration-300 ease-in-out ${
                  isOpen[`answer-${index + 1}`] ? "rotate-180" : ""
                }`}
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M19 9l-7 7-7-7"
                />
              </svg> */}
              </div>
              {isOpen[`answer-${index + 1}`] && (
                <div className="mt-4 px-4 pb-4" id={`answer-${index + 1}`}>
                  <p className="single-day-regular text-white text-xl">
                    {item.answer}
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
