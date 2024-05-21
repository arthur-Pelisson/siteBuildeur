"use client";
import { getPostBySlug } from "@/app/request/requestPost";
import Loading from "@/components/loading";
import useTranslation from "@/hooks/translation/useTranslation";
import { useLanguage } from "@/contextProvider/languageProvider";
import { useEffect, useState } from "react";
import PhotoDetailsLayout from "./detailsLayout";
import formateDate from "@/utils/formateDate";
import { notFound } from "next/navigation";
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";
import PhotoAlbum, { DivElementAttributes } from "react-photo-album";
import useInfinitScroll from "@/components/useInfiniScroll";
import centerGrid from "@/components/layoutComp/centerGrid";
import BackBtn from "@/components/backBtn";
import BtnTopPage from "@/components/btnTopPage";

type blog = {
    id: number;
    Photography_post: {
        image: string;
        thumbnails: string;
    };
    translations: [
        {
            title: string;
            content: string;
            language: string;
        }
    ];
};

const Blog = ({ slug }) => {
    const { language } = useLanguage();
    const [index, setIndex] = useState(-1);
    const [loading, setLoading] = useState(true);
    const [ready, setReady] = useState<boolean[]>([]);
    

    useEffect(() => {
        // Scroll to the top of the page when the component mounts
        window.scrollTo(0, 0);
    }, []);


    useEffect(() => {
        checkLoading();
    }, [ready]);

    const checkLoading = () => {
        for (let i = 0; i < ready.length; i++) {
            if (!ready[i] || ready[i] === undefined) {
              console.log("ready in check loading : ", ready);
                setLoading(true);
                return;
            }
        }
        setLoading(false);
    };

    const { getTranslation } = useTranslation();
    const {
        response: detailsResponse,
        Error: detailsError,
        Loading: detailsLoading,
        Success: detailsSuccess,
    } = getPostBySlug(slug.replace(/-/g, " "), "blog");

    useEffect(() => {
        if (detailsSuccess) {
            console.log("detailsResponse", detailsResponse);
        }
    }, [detailsResponse]);

    if (detailsError) {
        return notFound();
    }

    if (detailsLoading || detailsResponse === null) {
        return <Loading display={true} />;
    }
    console.log("ready", ready);
    return (
        <PhotoDetailsLayout item={detailsResponse}>
             <BtnTopPage color={"white"} />
            <div className="flex flex-col mt-5 justify-center flex-wrap w-[100%]">
                <div className="w-[90%] p-5 mb-10  md:w-[82%] text-center m-auto">
                    <h1 className="text-2xl text-eggs mb-5 font-bold text-center underline">
                        {getTranslation((detailsResponse  as blog).translations, "title", language)}
                    </h1>
                    <p
                        className="!text-eggs !bg-black"
                        dangerouslySetInnerHTML={{
                            __html: getTranslation((detailsResponse  as blog).translations, "content", language),
                        }}
                    ></p>
                     <BackBtn url={"/blog"} style={"float-right"} color={"white"}/>
                </div>
            </div>
        </PhotoDetailsLayout>
    );
};

export default Blog;
