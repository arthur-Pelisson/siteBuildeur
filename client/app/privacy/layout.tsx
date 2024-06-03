'use client'
import { useLanguage } from "@/contextProvider/languageProvider";

const tradMetadata = {
    title: {
        fr: "Confidentialité",
        en: "Privacy",
    },
    description: {
        fr: "Page de confidentialité pour le site de Margaux PELISSON, photographie de portrait, mariage, événement, etc...",
        en: "Privacy page for Margaux PELISSON's site, portrait, wedding, event photography, etc...",
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
