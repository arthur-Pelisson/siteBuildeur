'use client'
import React, { useState } from 'react';
import {useLanguage, Language} from '@/contextProvider/languageProvider';
import  ("/node_modules/flag-icons/css/flag-icons.min.css" as string);

const LanguageNavbar = ({leftPixel = 0}) => {
    const allLanguages: Language[] = ['fr', 'en'];
    const { language, setLanguage } = useLanguage();
    const [dropDown, setDropDown] = useState(false);

    const changelang = (lg: Language) => {
        setLanguage(lg);
        setDropDown(false);
    }

    const toggleDropDown = () => {
        setDropDown(!dropDown);
    }
    

    const getFlag = (lg: string) => {
        switch (lg) {
            case 'fr':
                return 'fr';
            case 'en':
                return 'gb';
            case 'gb':
                return 'gb';
        }
    }

    return (
        <div className='relative text-center w-[3rem]'>
            <span
                onClick={toggleDropDown}
                className={`fi fi-${getFlag(language)}  !w-8 h-10 cursor-pointer`}
            ></span>

            {dropDown && (
                <div className='ml-[0rem] lg:ml-[0.2rem]'>
                    <div className={`absolute p-[0.3rem]  bg-gray-300 border rounded-md shadow-md overflow-hidden`}>
                        <ul >
                            {allLanguages.map((lang, index) => (
                                lang !== language && (
                                    <li
                                        key={index}
                                        onClick={() => changelang(lang)}
                                        className={`fi fi-${getFlag(lang)}   p-2 !w-8 cursor-pointer `}
                                    ></li>
                                )
                            ))}
                        </ul>
                    </div>
                </div>
            )}
        </div>
    );
};

export default LanguageNavbar;
