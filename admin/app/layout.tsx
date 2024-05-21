'use client'
import { Inter } from "next/font/google";
import "./globals.css";
import PathWrapper from "@/components/pageWrapper/pathWrapper";
import { TokenProvider } from "@/contextProvider/tokenProvider";
import Dashboard from "@/components/dashboard/dashboard";
const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {


  return (
    <html lang="fr">
        <meta charSet="UTF-8" />
      <body className={inter.className}>
        <TokenProvider>
          <PathWrapper>
            <Dashboard>
              {children}
            </Dashboard>
          </PathWrapper>
        </TokenProvider>
        </body>
    </html>
  );
}
