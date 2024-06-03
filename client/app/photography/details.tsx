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
import BackBtn from "@/components/backBtn";
import BtnTopPage from "@/components/btnTopPage";

type photography = {
    id: number;
    imagesPost: any[];
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

const photography = ({ slug }) => {
    const { language } = useLanguage();
    const [index, setIndex] = useState(-1);
    const [photos, setPhotos] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [stopPage, setStopPage] = useState(false);
    const { loadMoreRef, page, setPage } = useInfinitScroll({ initPage: 1, treshold: 1, rootMargin: "0px", stopPage: stopPage });
    const [ready, setReady] = useState<boolean[]>([]);
    const { getTranslation } = useTranslation();
    const {
        response: detailsResponse,
        Error: detailsError,
        Loading: detailsLoading,
        Success: detailsSuccess,
    } = getPostBySlug(slug.replace(/-/g, " "), "photography");

    const loadImages = async (urls: any) => {
        console.log("urls", urls);
        console.log("page", page);
        let i = 0;
        console.log((page - 1) * 10);
        console.log(page * 10);
        let imageToLoad = urls.slice((page - 1) * 10, page * 10);
        console.log("imageToLoad", imageToLoad);
        const loadedPhotos: any[] = await Promise.all(
            imageToLoad.map(async (image: any) => {
                console.log("image", image);
                i++;
                let width = 1500;
                let height = 1500;
                if (i % 3 == 0) {
                    width = 1000;
                    height = 1500;
                } else if (i % 2 == 0) {
                    width = 1500;
                    height = 1000;
                }
                const img = new Image();
                let fakeImg = `https://picsum.photos/${width}/${height}/?random=${i}&cacheBust=${Date.now()}`;
                // img.src = image.image;
                img.src = fakeImg;
                await img.decode();
                return { src: img.src, width: img.width, height: img.height };
            })
        );
        console.log("loadedPhotos", loadedPhotos);
        setStopPage(false);
        setPhotos((prev) => [...prev, ...loadedPhotos]);
    };

    useEffect(() => {
        // Scroll to the top of the page when the component mounts
        window.scrollTo(0, 0);
    }, []);

    useEffect(() => {
        if (page === 1) return;
        setStopPage(true);
        loadImages((detailsResponse as unknown as photography).imagesPost);
    }, [page]);

    useEffect(() => {
        checkLoading();
    }, [ready]);

    useEffect(() => {
        if (detailsSuccess) {
            console.log("detailsResponse", detailsResponse);
            loadImages((detailsResponse as unknown as photography).imagesPost);
        }
    }, [detailsResponse]);
    
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


    if (detailsError) {
        return notFound();
    }

    if (detailsLoading || detailsResponse === null) {
        return <Loading display={true} />;
    }
    console.log(photos);
    console.log("stop page : ", stopPage);
    console.log("ready", ready);
    return (
        <PhotoDetailsLayout item={detailsResponse}>
            <BtnTopPage color={"white"} />
            <div className="flex flex-col mt-5 justify-center flex-wrap w-[100%]">
                <div className="w-[90%] p-5 mb-10  md:w-[82%] text-center m-auto">
                    <h1 className="text-2xl text-eggs mb-5 font-bold text-center underline">
                        {getTranslation((detailsResponse as unknown as photography).translations, "title", language)}
                    </h1>
                    <p
                    className="!text-eggs !bg-black"
                        dangerouslySetInnerHTML={{
                            __html: getTranslation((detailsResponse as unknown as photography).translations, "content", language),
                        }}
                    ></p>
                    <BackBtn url={"/photography"} style={"float-right"} color={"white"}/>
                </div>
                <div className="w-[80%] m-auto">
                    <PhotoAlbum
                        layout={"masonry"}
                        photos={photos}
                        // targetRowHeight={150}
                        spacing={8}
                        onClick={({ index: current }) => setIndex(current)}
                        renderPhoto={({ photo, wrapperStyle, imageProps, layout }) => (
                            <div
                                className={` ${
                                    !ready[layout.index] || ready[layout.index] === undefined ? "opacity-0" : "opacity-1"
                                } transition-opacity ease-in !duration-[750ms]`}
                                style={{ position: "relative", ...wrapperStyle }}
                            >
                                <img
                                    {...imageProps}
                                    data-src={photo.srcSet}
                                    onLoad={() => {
                                        setReady((prev) => {
                                            console.log("prev in ONlOad", prev);
                                            console.log("ready in onLoad", ready);
                                            console.log("layout.index", layout.index);
                                            console.log(prev[layout.index]);
                                            prev[layout.index] = true;
                                            return [...prev];
                                        });
                                    }}
                                />
                            </div>
                        )}
                    />
                    <Lightbox index={index} slides={photos} open={index >= 0} close={() => setIndex(-1)} />
                    <div className="relative">
                        {!stopPage && <div className="h-[250px]" ref={loadMoreRef}></div>}
                        <div className="h-[250px] relative bottom-[150px]  m-auto w-[250px] max-h-[250px] max-w-[250px]">
                            {loading && <Loading display={true} notInModal={true} />}
                        </div>
                    </div>
                </div>
            </div>
        </PhotoDetailsLayout>
    );
};

export default photography;
