
'use client';
import { useLanguage } from "@/contextProvider/languageProvider";
import PathWrapper from "@/components/pageWrapper/pathWrapper";
const tradMetadata = {
    title: {
        fr: "Profile",
        en: "Profile",
    },
    description: {
        fr: "Page de profile personnel",
        en: "Personal profile page",
    },
};

const profilePage = ({ children }) => {
    const { language } = useLanguage();

    return (
        <>
            <title>{tradMetadata.title[language]}</title>
            <meta name="description" content={tradMetadata.description[language]} />
                {children}
        </>
    );
};
export default profilePage;