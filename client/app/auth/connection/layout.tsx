'use client'
import PathWrapper from "@/components/pageWrapper/pathWrapper";
import { useLanguage } from "@/contextProvider/languageProvider";

const tradMetadata = {
    title: {
        fr: "Connexion",
        en: "Login",
    },
    description: {
        fr: "Page de connexion",
        en: "Login page",
    },
};

export default function ConnectionLayout({ children }: { children: React.ReactNode }) {
    const { language } = useLanguage();
    
    return (
        <>
            <title>{tradMetadata.title[language]}</title>
            <meta name="description" content={tradMetadata.description[language]} />
            {children}
        </>
    );
}
