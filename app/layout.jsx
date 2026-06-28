import { Inter } from "next/font/google";
import "./globals.css";
import { HarvestProvider } from "@/context/HarvestContext";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "KoinX Tax Loss Harvesting",
  description: "Calculate and harvest your cryptocurrency short-term and long-term capital losses to save on taxes.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-slate-50 text-slate-900 transition-colors duration-300 dark:bg-[#0B0E11] dark:text-slate-100 antialiased`}>
        <HarvestProvider>
          {children}
        </HarvestProvider>
      </body>
    </html>
  );
}
