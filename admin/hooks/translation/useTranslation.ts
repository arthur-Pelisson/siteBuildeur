const useTranslation = () => {
    const getTranslation = (translation, target, language) => {
        let trans = "";
        for (const t of translation) {
            if (t.language === language) {
                trans = t[target];
            }
        }
        return trans;
    };

    return { getTranslation };
};
export default useTranslation;
