"use client";
// import { Inter } from "next/font/google";
import "./globals.css";
import { LanguageProvider } from "../contextProvider/languageProvider";
import NavBar from "@/components/navbar/navbar";
import Maintenance from "@/components/maintenanceComp";
import Footer from "@/components/footer";
import { TokenProvider } from "../contextProvider/tokenProvider";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import PathWrapper from "@/components/pageWrapper/pathWrapper";
import MainLayout from "@/components/adjusteSectionHeight";
// const inter = Inter({ subsets: ["latin"] });


export default function RootLayout({ children }: { children: React.ReactNode }) {

    return (
        <html lang="fr">
            <head>
                <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png"/>
                <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png"/>
                <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png"/>
                <link rel="manifest" href="/site.webmanifest"/>
                <link rel="preconnect" href="https://fonts.googleapis.com"/>
                <link rel="preconnect" href="https://fonts.gstatic.com" />
                <link href="https://fonts.googleapis.com/css2?family=Dancing+Script:wght@400..700&display=swap" rel="stylesheet"/>
                <link href="https://fonts.googleapis.com/css2?family=Dancing+Script:wght@400..700&family=Zilla+Slab:ital,wght@0,300;0,400;0,500;0,600;0,700;1,300;1,400;1,500;1,600;1,700&display=swap" rel="stylesheet"></link>
                <link href="https://fonts.googleapis.com/css2?family=Dancing+Script:wght@400..700&family=Inconsolata:wght@200..900&family=Zilla+Slab:ital,wght@0,300;0,400;0,500;0,600;0,700;1,300;1,400;1,500;1,600;1,700&display=swap" rel="stylesheet"></link>
                <link href="https://fonts.googleapis.com/css2?family=Dancing+Script:wght@400..700&family=Inconsolata:wght@200..900&family=Josefin+Sans:ital,wght@0,100..700;1,100..700&family=Zilla+Slab:ital,wght@0,300;0,400;0,500;0,600;0,700;1,300;1,400;1,500;1,600;1,700&display=swap" rel="stylesheet"></link>
            </head>
            <body>
                <TokenProvider>
                    <LanguageProvider>
                        <PathWrapper>
                            <Maintenance>
                                <NavBar />
                                <MainLayout>
                                    {children}
                                </MainLayout>
                                <Footer/>
                            </Maintenance>
                        </PathWrapper>
                    </LanguageProvider>
                </TokenProvider>
            </body>
        </html>
    );
}
