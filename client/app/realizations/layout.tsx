'use client'
import { useLanguage } from "@/contextProvider/languageProvider";

const tradMetadata = {
    title: {
        fr: "Realisations",
        en: "Realizations",
    },
    description: {
        fr: "Page des réalisations",
        en: "Realizations page",
    },
};

export default function RealizationLayout({ children }: { children: React.ReactNode }) {
    const { language } = useLanguage();
    return (
        <>
            <title>{tradMetadata.title[language]}</title>
            <meta name="description" content={tradMetadata.description[language]} />
            {children}
        </>
    );
}
