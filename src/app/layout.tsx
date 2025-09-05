import "./globals.css";
import { Inter, DM_Sans } from "next/font/google";
import MainNav from "@/components/nav/MainNav";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const dm = DM_Sans({ subsets: ["latin"], variable: "--font-dm-sans" });

export const metadata = {
  title: "LaPurity Water Tech",
  description: "Engineered water treatment for every home.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${dm.variable}`}>
      <body className="bg-[#F6F7F9] text-gray-900">
        <MainNav />
        <main>{children}</main>
      </body>
    </html>
  );
}
