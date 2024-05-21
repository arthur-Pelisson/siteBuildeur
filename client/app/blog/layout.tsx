'use client'
import { useLanguage } from "@/contextProvider/languageProvider";

const tradMetadata = {
    title: {
        fr: "Blog",
        en: "Blog",
    },
    description: {
        fr: "Page blog",
        en: "Blog page",
    },
};

export default function BlogLayout({ children }: { children: React.ReactNode }) {
    const { language } = useLanguage();
    return (
        <>
            <title>{tradMetadata.title[language]}</title>
            <meta name="description" content={tradMetadata.description[language]} />
            {children}
        </>
    );
}
