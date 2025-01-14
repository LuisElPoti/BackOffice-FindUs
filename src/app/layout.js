import { Inter } from "next/font/google";
import "./globals.css";
import Sidebar from "./components/sidebar";


const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Find Us",
  description: "Ayudanos a encontrarlos",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        {children}
        {/* <div className="flex">
        <Sidebar></Sidebar>
        <div className= "flex-1">

        </div>
        </div> */}
      </body>
    </html>
  );
}
