"use client";
import "./globals.css";
import { Open_Sans } from "next/font/google";
import { Toaster } from "react-hot-toast";
import React, { useEffect } from "react";
import Navbar from "@/components/common/Navbar";
import Footer from "@/components/common/Footer";

const openSans = Open_Sans({
  subsets: ["latin"],
  weight: ["400", "600", "700"],
  display: "swap",
});

export default function RootLayout({ children }) {

  return (
    <html lang="en">
      <body className={openSans.className}>
        <Navbar />
        <Toaster />
        {children}
        <Footer />
      </body>
    </html>
  );
}
