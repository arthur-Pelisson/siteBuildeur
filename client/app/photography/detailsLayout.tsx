'use client'
import { useLanguage } from "@/contextProvider/languageProvider";
import useTranslation from "@/hooks/translation/useTranslation";

export default function PhotoDetailsLayout({ item, children }) {
    const { language } = useLanguage();
    const {getTranslation} = useTranslation();
    if (!item) return (<></>);
    const tradMetadata = {
        title: {
            fr: getTranslation(item.translations, "title", language),
            en: getTranslation(item.translations, "title", language)
        },
        description: {
            fr: "Details des photo : " + getTranslation(item.translations, "title", language),
            en: "Photo details of : " + getTranslation(item.translations, "title", language),
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