import KeyboardReturnIcon from '@mui/icons-material/KeyboardReturn';
import { useLanguage } from '@/contextProvider/languageProvider';
import Link from 'next/link';
import { ReactNode } from 'react';
import React from 'react';

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

    return (
        <div className={style}>
            <Link href={url} className={`text-${color}`}>
                {text[language]} <IconButtonBack Icon={Icon} color={color} />
            </Link>
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