'use client'
import { useLanguage } from "@/contextProvider/languageProvider";

const tradMetadata = {
    title: {
        fr: "Accueil",
        en: "Home",
    },
    description: {
        fr: "Page d'accueil",
        en: "Home page",
    },
};

export default function HomeLayout({ children }: { children: React.ReactNode }) {
    const { language } = useLanguage();
    
    return (
        <>
            <title>{tradMetadata.title[language]}</title>
            <meta name="description" content={tradMetadata.description[language]} />
            {children}
        </>
    );
}
