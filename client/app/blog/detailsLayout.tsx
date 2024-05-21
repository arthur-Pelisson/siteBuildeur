'use client'
import { useLanguage } from "@/contextProvider/languageProvider";
import useTranslation from "@/hooks/translation/useTranslation";

export default function BlogDetailsLayout({ item, children }) {
    const { language } = useLanguage();
    const {getTranslation} = useTranslation();
    if (!item) return (<></>);
    const tradMetadata = {
        title: {
            fr: getTranslation(item.translations, "title", language),
            en: getTranslation(item.translations, "title", language)
        },
        description: {
            fr: "Details d'un blog de Magaux pelisson : " + getTranslation(item.translations, "title", language) + " sur le site de PELISSON Margaux",
            en: "Details of Margaux PELISSON blog : " + getTranslation(item.translations, "title", language) + " on the site of PELISSON Margaux",
        },
    };
    return (    
        <>
            <title>{tradMetadata.title[language]}</title>
            <meta name="description" content={tradMetadata.description[language]} />
            {children}
        </>
    );
}
