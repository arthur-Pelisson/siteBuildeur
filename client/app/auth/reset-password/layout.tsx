'use client'
import { useLanguage } from "@/contextProvider/languageProvider";

const tradMetadata = {
    title: {
        fr: "Réinitialiser le mot de passe",
        en: "Reset password",
    },
    description: {
        fr: "Page de réinitialisation du mot de passe",
        en: "Reset password page",
    },
};

export default function ResetPasswordLayout({ children }: { children: React.ReactNode }) {
    const { language } = useLanguage();
    
    return (
        <>
            <title>{tradMetadata.title[language]}</title>
            <meta name="description" content={tradMetadata.description[language]} />
            {children}
        </>
    );
}
