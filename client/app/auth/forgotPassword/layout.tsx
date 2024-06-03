'use client'
import { useLanguage } from "@/contextProvider/languageProvider";

const tradMetadata = {
    title: {
        fr: "mots de passe oublié",
        en: "Forgot password",
    },
    description: {
        fr: "Page de mots de passe oublié",
        en: "Forgot password page",
    },
};

export default function ForgotPasswordLayout({ children }: { children: React.ReactNode }) {
    const { language } = useLanguage();
    
    return (
        <>
            <title>{tradMetadata.title[language]}</title>
            <meta name="description" content={tradMetadata.description[language]} />
            {children}
        </>
    );
}
