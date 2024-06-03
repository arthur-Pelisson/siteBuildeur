"use client";
import { useLayoutEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { useLanguage } from "../contextProvider/languageProvider";


const MainLayout = ({ children }: { children: React.ReactNode }) => {
    
        const sectionRef = useRef<HTMLElement>(null);
        const [heightSection, setHeightSection] = useState<number>(0);
        const pathname = usePathname();
        const {language} = useLanguage();

        useLayoutEffect(() => {
            console.log("pathname", pathname);
            adjustSectionHeight();
    
            window.addEventListener("resize", adjustSectionHeight);
            return () => {
                window.removeEventListener("resize", adjustSectionHeight);
            }
        }, [pathname, sectionRef.current, language]);
    
        const adjustSectionHeight = () => {
            const screenW = window.innerWidth;
            if (sectionRef.current) {
                const height = window.innerHeight - sectionRef.current.offsetTop;
                const getElementFooter = document.querySelector("footer");
                if (getElementFooter) {
                    const heightFooter = getElementFooter.clientHeight;
                    if (height > 1.5* screenW) {
                        setHeightSection(screenW * 2);
                        return;
                    }
                    sectionRef.current.style.minHeight = `${height - heightFooter}px`;
                    setHeightSection(height - heightFooter);
                }
            }
        }

        return (
            <main ref={sectionRef} style={{ minHeight: `${heightSection}px`}}>
                {children}
            </main>
        )
}

export default MainLayout;