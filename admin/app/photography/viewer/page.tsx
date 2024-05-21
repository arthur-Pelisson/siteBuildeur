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

const EventViewerPage = () => {
    const searchParams = useSearchParams();
    const getId = searchParams.get("id");
    const { getTranslation } = useTranslation();
    const [detailsResponse, setDetailsResponse] = useState(null);
    const [id, setId] = useState(getId);
    const { response: response, Error: error, Loading: loading, Success: success } = getPostById(id, "photography");
    const router = useRouter();
    const [language, setLanguage] = useState("fr");
    const [index, setIndex] = useState(-1);
    const [photos, setPhotos] = useState<any[]>([]);

    useEffect(() => {
        if (response) {
            console.log("response", response);
            setDetailsResponse(response);
            loadImages(response.imagesPost);
        }
    }, [response]);

    const loadImages = async (urls: any) => {
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

    if (loading || detailsResponse === null || !response) {
        return <Loading display={true} />;
    }
    console.log("detailsResponse : ", detailsResponse);

    return (
        <>
            <div className="mb-14 fixed">
                <Button variant="contained" onClick={() => router.back()}>
                    {""}
                    <KeyboardReturnIcon /> Retour
                </Button>
            </div>
            <div className="mb-28 fixed top-40">
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
                    sx={{ width: 250, height: 250 }}
                    className={`grid-item image-container flex flex-col items-center justify-center !m-4`}
                >
                    <CardMedia
                        component="img"
                        image={detailsResponse?.Photography_post.image}
                        alt={detailsResponse?.Photography_post.image.split("/").pop()}
                        sx={{ objectFit: "containe" }}
                    />
                    <Link>
                        <Typography gutterBottom variant="h5" className="content-container " component="div">
                            {getTranslation(detailsResponse.translations, "title", language)}
                        </Typography>
                    </Link>
                </Card>
            </div>
            <div className="mt-20 mb-20">
                <Divider />
            </div>
            <div>
                <div className="flex flex-col mt-5 justify-center flex-wrap w-[100%]">
                    <div className="w-[90%] p-5 mb-10  md:w-[82%] text-center m-auto">
                        <h1 className="text-2xl mb-5 font-bold text-center underline">
                            {getTranslation((detailsResponse as unknown as photography).translations, "title", language)}
                        </h1>
                        <p
                            dangerouslySetInnerHTML={{
                                __html: getTranslation((detailsResponse as unknown as photography).translations, "content", language),
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

export default EventViewerPage;
