import type { Metadata } from "next";
import { ClerkProvider } from "@clerk/nextjs";

import { Nunito } from "next/font/google";
import "./globals.css";
import Sidebar from "./components/sidebars/Sidebar";
import GlobalStylesProvider from "./providers/GlobalStylesProvider";
import ContextProvider from "./providers/ContextProvider";
import { auth } from "@clerk/nextjs/server";
import { ToastBar, Toaster } from "react-hot-toast";
import NextTopLoader from "nextjs-toploader";

const inter = Nunito({ subsets: ["latin"] ,weight:["400","500","600","700","800"]});

export const metadata: Metadata = {
  title: "U-Manager",
  description: "A Task Management Website",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { userId } = auth();

  return (
    <ClerkProvider>
      <html lang="en">
        <head>
          <link
            rel="stylesheet"
            href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.6.0/css/all.min.css"
            integrity="sha512-Kc323vGBEqzTmouAECnVceyQqyqdsSiqLQISBL29aUW4U/M7pSPA/gEUZQqv1cwx4OnYxTxve5UMg5GT6L4JJg=="
            crossOrigin="anonymous"
            referrerPolicy="no-referrer"
          />
        </head>
        <body className={inter.className}>
          <NextTopLoader height={2} color="red" easing="cubic-bezier(.53,0.32,0,1)"/>
          <ContextProvider>
            <GlobalStylesProvider>
              {userId && <Sidebar />} <div className="w-full">{children}</div>
              <Toaster />
            </GlobalStylesProvider>
          </ContextProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
