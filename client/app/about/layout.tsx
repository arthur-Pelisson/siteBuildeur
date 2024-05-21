'use client'
import { useLanguage } from "@/contextProvider/languageProvider";

const tradMetadata = {
    title: {
        fr: "A propos",
        en: "About",
    },
    description: {
        fr: "Page a propos ",
        en: "Page about",
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
