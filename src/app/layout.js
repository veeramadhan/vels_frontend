import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "../components/Navbar"; // ✅ Import your Navbar component

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Vels Promoter",
  description: "Real estate web app by Veeramanikandan",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Navbar /> {/* ✅ This makes your Navbar appear on every page */}
        <main className="pt-16">{children}</main> {/* padding-top to avoid navbar overlap */}
      </body>
    </html>
  );
}
