'use client'
import KeyboardReturnIcon from '@mui/icons-material/KeyboardReturn';
import { useLanguage } from '@/contextProvider/languageProvider';
import Link from 'next/link';
import { ReactNode } from 'react';
import React from 'react';
import { useRouter } from 'next/navigation'
import { Button } from '@mui/material';


const translate = {
    back: {
        fr: "Retour",
        en: "Back",
    },
};

type TBackBtn = {
    url: string;
    Icon?: ReactNode;
    style?: string;
    color?: string;
    text?: typeof translate.back;
};


const BackBtn = ({url, Icon = <KeyboardReturnIcon />, style, color, text=translate.back} :TBackBtn) => {
    const {language} = useLanguage();
    const router = useRouter();
    const handleRoute = () => {
        console.log("url", url);
        if (url === "") {
            return router.back();
        }
        router.push(url);
    };

    return (
        <div className={style}>
            <button type="button"  onClick={handleRoute} className={`text-${color}`}>
                {text[language]} <IconButtonBack Icon={Icon} color={color} />
            </button>
        </div>
    )
};

const IconButtonBack = ({ Icon, color }) => {
    const iconStyle = {
        fill: color, // Utilisation de la couleur spécifiée dans la prop color
    };

    return (
        <>
            {React.cloneElement(Icon, { style: iconStyle })}
        </>
    );
};



export default BackBtn;