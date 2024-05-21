"use client";
import { getPostById } from "@/app/request/requestPost";
import { Card, CardContent, CardMedia, Link, Typography, Button, Divider, Tooltip } from "@mui/material";
import { useSearchParams } from "next/navigation";
import useTranslation from "@/hooks/translation/useTranslation";
import LanguageNavbar from "@/components/language";
import { useEffect, useState } from "react";
import Loading from "@/components/loading/loading";
import { useRouter } from "next/navigation";
import KeyboardReturnIcon from "@mui/icons-material/KeyboardReturn";
import formateDate from "@/utils/formateDate";
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";
import PhotoAlbum, { DivElementAttributes } from "react-photo-album";

import { TyFramePost } from "../dataForm";

const BlogViewerPage = () => {

    const textTrad = {
        readMore : {
            fr: "En lire plus",
            en: "Read more"
        }
    };

    const searchParams = useSearchParams();
    const getId = searchParams.get("id");
    const { getTranslation } = useTranslation();
    const [post, setPost] = useState(null);
    const [id, setId] = useState(getId);
    const { response: response, Error: error, Loading: loading, Success: success } = getPostById(id, "blog");
    const router = useRouter();
    const [language, setLanguage] = useState("fr");
    const [index, setIndex] = useState(-1);
    const [photos, setPhotos] = useState<any[]>([]);

    useEffect(() => {
        if (response) {
            console.log("response", response);
            setPost(response);
            loadImages((response as any).imagesPost);
        }
    }, [response]);

    const loadImages = async (urls: string[]) => {
        console.log("urls", urls);
        let i = 0;
        const loadedPhotos: any[] = await Promise.all(
            urls.map(async (image: any) => {
              console.log("image", image);
              i++
              let width = 1500
              let height = 1500
              if (i % 2 == 0) {
                width = 1000
                height = 1500
              }
              let fakeImg = `https://picsum.photos/${width}/${height}/?random=${i}`
                const img = new Image();
                // img.src = image.image;
                img.src = fakeImg;
                await img.decode();
                return { src: fakeImg, width: img.width, height: img.height };
                
            })
        );
        console.log("loadedPhotos", loadedPhotos);
        setPhotos(loadedPhotos);
    };

    if (loading || post === null || !response) {
        return <Loading display={true} />;
    }
    console.log("detailsResponse : ", post);

    return (
        <>
            <div className="mb-14 fixed z-50">
                <Button variant="contained" onClick={() => router.back()}>
                    {""}
                    <KeyboardReturnIcon /> Retour
                </Button>
            </div>
            <div className="mb-28 fixed top-40 z-50">
                {["fr", "en"].map((lang) => {
                    return (
                        <Button variant={language == lang ? "contained" : "underlined"} key={lang} onClick={() => setLanguage(lang)}>
                            {lang}
                        </Button>
                    );
                })}
            </div>
            <div className="flex flex-col items-center justify-center m-4">
            <Card
                                key={index}
                                className={` bg-white w-[100%] lg:w-[80%] min-w-[350px] h-[500px] lg:h-[300px] grid-item flex flex-col lg:flex-row  items-center justify-center !m-4 mb-5  transition-opacity ease-in !duration-[750ms]`}
                            >
                     <CardMedia
                                    component="img"
                                    className="w-[100%] max-h-[48%] lg:max-w-[50%] lg:max-h-[100%]" 
                                    // image={post.blog_post.image}
                                    image={`https://picsum.photos/1000/1000/?random=${index}`}
                                    alt={(post as any).blog_post.image.split("/").pop()}
                                    sx={{ objectFit: "cover"}}
                                />
                     <CardContent className="w-[100%] lg:w-[50%] lg:max-h-[100%]">
                                        <Tooltip title={getTranslation((post as any).translations, "title", language)}>
                                            <Typography gutterBottom variant="h5" className="text-ellipsis-2rows min-h-[4rem]" component="div">
                                                {getTranslation((post as any).translations, "title", language)}
                                                {/* Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque a leo finibus, tempor ante sit amet, mollis sapien. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia  */}
                                            </Typography>
                                        </Tooltip>
                                        <Typography gutterBottom className="!text-sm text-slate-500 text-left mb-1" component="div">
                                            {formateDate((post as any).createdAt, language, "ymdw")}
                                        </Typography>
                                        <p
                                            className="text-black text-base text-left text-ellipsis-6rows  !lg:!text-ellipsis-7rows"
                                            dangerouslySetInnerHTML={{
                                                __html: getTranslation((post as any).translations, "content", language),
                                            }}
                                        ></p>
                                        <Link href={`/blog?slug=${(post as any).slug.replace(/ /g, "-")}`}>
                                            <p className="!text-blue-600 mt-2">
                                                {(textTrad).readMore[language]}
                                            </p>
                                        </Link>
                                </CardContent>
                </Card>
            </div>
            <div className="mt-20 mb-20">
                <Divider />
            </div>
            <div>
                <div className="flex flex-col mt-5 justify-center flex-wrap w-[100%]">
                    <div className="w-[90%] p-5 mb-10  md:w-[82%] text-center m-auto">
                        <h1 className="text-2xl mb-5 font-bold text-center underline">
                            {getTranslation((post as any).translations, "title", language)}
                        </h1>
                        <p
                            dangerouslySetInnerHTML={{
                                __html: getTranslation((post as any).translations, "content", language),
                            }}
                        ></p>
                    </div>
                    <div className="w-[80%] m-auto mb-16">
                        <PhotoAlbum
                            layout={"masonry"}
                            photos={photos}
                            // targetRowHeight={150}
                            onClick={({ index: current }) => setIndex(current)}
                        />
                        <Lightbox index={index} slides={photos} open={index >= 0} close={() => setIndex(-1)} />
                    </div>
                </div>
            </div>
        </>
    );
};

export default BlogViewerPage;
