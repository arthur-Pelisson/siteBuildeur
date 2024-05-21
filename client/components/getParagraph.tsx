'use client'
import { getPostBySlug } from '@/app/request/requestPost';
import useTranslation from "@/hooks/translation/useTranslation";
import Loading from "@/components/loading";
import { useLanguage } from "@/contextProvider/languageProvider";
import { useToken } from '@/contextProvider/tokenProvider';
import Link from 'next/link';
import { use, useEffect } from 'react';
import { Tooltip } from '@mui/material';

const getParagraph = (name: string) => {
    const { response: responseText, Error: erroText, Loading: loadingText, Success: successText } = getPostBySlug(name, "text");
    const { getTranslation } = useTranslation();
    const { language } = useLanguage();
    const { admin } = useToken();

    useEffect(() => {
        console.log("responseText : ", responseText);
    }, [responseText, erroText, loadingText, successText]);

    if (loadingText) {
        return (
            <div className="w-full h-full flex items-center justify-center">
                {/* <Loading display={true} /> */}
            </div>
        );
    }

    if (erroText) {
        console.log("erroText : ", erroText);
        return <div></div>;
    }

    if (successText && admin) {
        return (
            <Tooltip title="Edit" arrow>
                <Link className='m-5 min-h-2' target='blank' href={`${process.env.NEXT_PUBLIC_ADMIN_HOST}/paragraph/edit/?slug=${(responseText as any).slug}`}>
                    <div className='border-2 border-transparent hover: hover:border-sky-500 p-2 m-2 min-h-5' dangerouslySetInnerHTML={{ __html: getTranslation((responseText as any).translations, "content", language)}} />
                </Link> 
            </Tooltip>
        )
    }

    if (successText) {
        return <div dangerouslySetInnerHTML={{ __html: getTranslation((responseText as any).translations, "content", language)}} />
    }
};
export default getParagraph;