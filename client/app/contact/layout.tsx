'use client'
import { useLanguage } from "@/contextProvider/languageProvider";

const tradMetadata = {
    title: {
        fr: "Contact",
        en: "Contact",
    },
    description: {
        fr: "Page de contact",
        en: "Contact page",
    },
};

export default function ContactLayout({ children }: { children: React.ReactNode }) {
    const { language } = useLanguage();
    return (
        <>
            <title>{tradMetadata.title[language]}</title>
            <meta name="description" content={tradMetadata.description[language]} />
            <section className="min-height-section relative">{children}</section>
        </>
    );
}
