import { useLanguage } from "@/contextProvider/languageProvider";
import useTranslation from "@/hooks/translation/useTranslation";
import Button from '@mui/material/Button';
import { use, useEffect, useLayoutEffect, useRef, useState } from "react";
import useDebounce from "../debounceTime";
const Filter = ({ setFilter, filters }) => {
    const { getTranslation } = useTranslation();
    const buttonsRef = useRef<(HTMLButtonElement | null)[]>([]);
    const { language } = useLanguage();

    // console.log("filters", filters);
    const translation = {
        selectLabel: {
            fr: "Filtrer par:",
            en: "Filter by:",
        },
        all: {
            fr: "Tous",
            en: "All",
        },
    };
    

    const handleFilter = (e, value) => {
        buttonsRef.current.forEach((element) => {
            if (element !== null) {
                let ids = element.id;
                if (ids.includes("btn-filter-active")) {
                    element.id = element.id.replace("btn-filter-active", "");
                }
            }
        });
        e.target.id = "btn-filter-active";
        // console.log("filter valueee value", value);
        setFilter(value);
    };

    const debounceHandleFilter = useDebounce(handleFilter, 400);


    return (
        <div className="filter">
            <div className="overflow-y-auto  text-center">
                <Button ref={(element) => buttonsRef.current[0] = element} className="btn-filter !border-eggs !text-eggs" id="btn-filter-active"  disabled={false} variant="outlined" onClick={(e) => debounceHandleFilter(e, "all")}>
                    {translation.all[language]}
                </Button>
                {filters.map((tag, index) => (
                    <Button ref={(element) => buttonsRef.current[index + 1] = element} className="btn-filter !border-eggs !text-eggs"  disabled={false} variant="outlined" key={tag.id} onClick={(e) => debounceHandleFilter(e, tag)} value={tag.id}>
                        {getTranslation(tag.tag_translate, "name", language)}
                    </Button>
                ))}
            </div>
        </div>
    );
};

export default Filter;
