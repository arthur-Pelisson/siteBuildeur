"use client";
import PathWrapper from "@/components/pageWrapper/pathWrapper";
import { useLanguage } from "@/contextProvider/languageProvider";

const tradMetadata = {
    title: {
        fr: "S'enregistrer",
        en: "Register",
    },
    description: {
        fr: "Page  pour s'enregistrer",
        en: "Register page for site",
    },
};

export default function RegisterLayout({ children }: { children: React.ReactNode }) {
    const { language } = useLanguage();
    return (
        <>
            <title>{tradMetadata.title[language]}</title>
            <meta name="description" content={tradMetadata.description[language]} />
            {children}
        </>
    );
}
