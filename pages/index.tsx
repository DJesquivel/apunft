import { Inter } from "next/font/google";
import TitleSection from "@/components/TitleSection";
import MintingSection from "@/components/MintingSection";
import Faq from "@/components/Faq";
import Footer from "@/components/Footer";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <div className="h-full bg-[#060314]">
      <TitleSection />
      <MintingSection />
      <Faq />
      <Footer />
    </div>
  );
}
