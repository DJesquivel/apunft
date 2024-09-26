import { AppKit } from "@/components/Web3Instance";
import "@/styles/globals.css";
import type { AppProps } from "next/app";

export const metadata = {
  title: "AppKit",
  description: "AppKit Example",
};

export default function App({ Component, pageProps }: AppProps) {
  return (
    <AppKit>
      <Component {...pageProps} />
    </AppKit>
  );
}
