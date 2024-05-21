'use client'
import { useLanguage } from "@/contextProvider/languageProvider";

const tradMetadata = {
    title: {
        fr: "Photographie",
        en: "Photography",
    },
    description: {
        fr: "Page de photographie",
        en: "Photography page",
    },
};

export default function PhotographyLayout({ children }: { children: React.ReactNode }) {
    const { language } = useLanguage();
    return (
        <>
            <title>{tradMetadata.title[language]}</title>
            <meta name="description" content={tradMetadata.description[language]} />
            {children}
        </>
    );
}
