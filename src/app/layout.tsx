import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "./components/Navbar";
import { ClerkProvider } from "@clerk/nextjs";
import { Toaster } from "react-hot-toast";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Babbl",
  description: "Social media app built with Next.js",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html
        lang="en"
        className="scrollbar-hide bg-black"
      >
        <head>
          <link
            rel="icon"
            href="/mainicon.ico"
          />
        </head>
        <body className={inter.className}>
          <div className="w-full bg-gray-950 px-4 md:px-8 lg:px-16 xl:px-32 2xl:px-64 fixed z-50 select-none">
            <Navbar />
          </div>
          <div className=" bg-black px-4 select-none">
            <br />
            <br />
            <br />
            <br />
            <div id="portal-root" />
            {children}
            <Toaster
              position="bottom-center"
              toastOptions={{
                className:
                  "bg-gray-900 text-white border border-gray-600 rounded-md px-4 py-2",
              }}
            />
          </div>
        </body>
      </html>
    </ClerkProvider>
  );
}
