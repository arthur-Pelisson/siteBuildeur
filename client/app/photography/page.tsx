"use client";
import { getPostByPagination, getPostByType } from "../request/requestPost";
import { GridPosts, ImgGrid, ContentGrid, ReorderGrid } from "@/components/posts/grids";
import { useState, useEffect, useRef, Suspense, useLayoutEffect, use } from "react";
import useTranslation from "@/hooks/translation/useTranslation";
import { useLanguage } from "@/contextProvider/languageProvider";
import "@/app/css/hover.css";
import "dotenv/config";
import Link from "next/link";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { useSearchParams } from "next/navigation";
import Details from "./details";
import Loading from "@/components/loading";
import dayjs from "dayjs";
import { Divider } from "@nextui-org/divider";
import { CircularProgress, Tooltip     } from "@mui/material";
import useInfinitScroll from "@/components/useInfiniScroll";
import GridPhoto from "./GridPhoto";
import { title } from "process";

const RouteHandlerPhoto = () => {
    const searchParams = useSearchParams();
    const slug = searchParams.get("slug");
    const tag = searchParams.get("tag");

    if (slug) {
        return <Details slug={slug} />;
    }

    if (tag) {
        let title = {};
        if (tag === "terminer") {
            title = {fr:"Realisation enterieure", en: "Past realizations"};
            return <GridPhoto activeFilter={true} title={title} tag={tag} typePost={"photography"} />;
        }
        if (tag === "en cours") {
            title = {fr:"En cours de réalisation", en: "In progress"};
            return <GridPhoto activeFilter={false} title={title} tag={tag} typePost={"photography"} />;

        }
    }
    
    return <PhotoPage />;
    
};

const PhotoPage = () => {
    const {language }= useLanguage();

    const textTrad = {
        done: {
            fr: "Terminer",
            en: "Done",
        },
        inProgress: {
            fr: "En cours",
            en: "In progress",
        },
        wedding: {
            fr: "Mariage",
            en: "Wedding",
        },
    };

    return (
        <>
         <div className="mb-5 h-[43.4rem;]">
                <div className="flex  flex-row justify-center content-center w-[100%] lg:w-[60%] h-[100%] align m-auto">
                <Card className="!mb-5 w-[33%%]  sm:w-[33%] h-[100%] grid-item image-container flex flex-col items-center justify-center ">
                        <Link href={`/photography/?tag=terminer`} className="h-[100%] w-[100%]">
                        <CardMedia component="img" image={`https://picsum.photos/2000/2000/?random=1`} width={"30%"} height={"auto"} sx={{ objectFit: "cover" }} />
                            <Typography gutterBottom variant="h2" className="content-container !text-[2rem] lg:!text-[3.5rem]" component="div">
                                {textTrad.done[language]}
                            </Typography>
                        </Link>
                    </Card>
                    <Card className="!mb-5 w-[33%%]  sm:w-[33%] h-[100%] grid-item image-container flex flex-col items-center justify-center ">
                        <Link href={`/photography/?tag=en cours`} className="h-[100%] w-[100%]">
                        <CardMedia component="img" image={`https://picsum.photos/2000/2000/?random=2`} width={"30%"} height={"auto"} sx={{ objectFit: "cover" }} />
                        <Typography gutterBottom variant="h2" className="content-container !text-[2rem] lg:!text-[3.5rem]" component="div">
                                {textTrad.inProgress[language]}
                            </Typography>
                        </Link>
                    </Card>
                    <Card className="!mb-5 w-[33%%]  sm:w-[33%] h-[100%] grid-item image-container flex flex-col items-center justify-center ">
                        <Link href={`/photography/?slug=wedding`} className="h-[100%] w-[100%]">
                        <CardMedia component="img" image={`https://picsum.photos/2000/2000/?random=3`} width={"30%"} height={"auto"} sx={{ objectFit: "cover" }} />
                        <Typography gutterBottom variant="h2" className="content-container !text-[2rem] lg:!text-[3.5rem]" component="div">
                                {textTrad.wedding[language]}
                            </Typography>
                        </Link>
                    </Card>
                </div>
            </div>
            
        </>
    );
};
export default RouteHandlerPhoto;
