import { Inter } from "next/font/google";
import Header from "@/components/shared/Header/Header";
import Footer from "@/components/shared/Footer/Footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Anambas Islands",
  description: "Anambas Islands tourism and cultures",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        {/* Header */}
        <Header />

        {children}

        {/* Footer */}
        <Footer />
      </body>
    </html>
  );
}
