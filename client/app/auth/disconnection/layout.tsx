'use client'
import PathWrapper from "@/components/pageWrapper/pathWrapper";
import { useLanguage } from "@/contextProvider/languageProvider";

const tradMetadata = {
    title: {
        fr: "Déconnexion",
        en: "Disconnect",
    },
    description: {
        fr: "Page de déconnexion",
        en: "Disconnect page",
    },
};

export default function DeconnectionLayout({ children }: { children: React.ReactNode }) {
    const { language } = useLanguage();
    
    return (
        <>
            <title>{tradMetadata.title[language]}</title>
            <meta name="description" content={tradMetadata.description[language]} />
            <section className="min-height-section">
                    {children}
            </section>
        </>
    );
}
