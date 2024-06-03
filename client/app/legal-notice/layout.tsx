'use client'
import { useLanguage } from "@/contextProvider/languageProvider";

const tradMetadata = {
    title: {
        fr: "Mentions légales",
        en: "Legal notice",
    },
    description: {
        fr: "Page de mentions légales pour le site de Margaux PELISSON, photographie de portrait, mariage, événement, etc...",
        en: "Legal notice page for Margaux PELISSON's site, portrait, wedding, event photography, etc...",
    },
};

export default function AboutLayout({ children }: { children: React.ReactNode }) {
    const { language } = useLanguage();
    return (
        <>
            <title>{tradMetadata.title[language]}</title>
            <meta name="description" content={tradMetadata.description[language]} />
            {children}
        </>
    );
}
