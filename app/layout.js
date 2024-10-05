import { Inter, Poppins } from "next/font/google";
import "./globals.css";
import Header from "@/components/shared/Header/Header";
import Footer from "@/components/shared/Footer/Footer";
import { Toaster } from "@/components/ui/toaster";

const inter = Inter({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  variable: "--font-inter",
  display: "optional",
  adjustFontFallback: false,
});

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-poppins",
});

export const metadata = {
  title: "Anambas Islands",
  description: "Anambas Islands tourism and cultures",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${inter.variable} ${poppins.variable} bg-white text-black overflow-x-hidden`}
      >
        {children}
        <Toaster />
      </body>
    </html>
  );
}
