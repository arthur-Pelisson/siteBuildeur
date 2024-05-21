
'use client';
import type { Metadata } from "next";
import { useLanguage } from "@/contextProvider/languageProvider";
import PathWrapper from "@/components/pageWrapper/pathWrapper";
const tradMetadata = {
    title: {
        fr: "Activation",
        en: "Activation",
    },
    description: {
        fr: "Page d'activation",
        en: "Activation page",
    },
};

const ActivationLayout = ({ children }) => {
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
};
export default ActivationLayout;