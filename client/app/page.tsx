"use client";
import HomeLayout from "./layoutHome";
import { useLanguage } from "@/contextProvider/languageProvider";
import { logos } from "@/components/logos";
import Link from "next/link";
import "dotenv/config";
import { getPostBySlug } from "./request/requestPost";
import getParagraph from "../components/getParagraph";
import { Card, CardMedia, Typography } from "@mui/material";
import "@/app/css/hover.css";

export default function Home() {
    const textTrad = {
        photo: {
            fr: "Photographies",
            en: "Photography",
        },
        realisations: {
            fr: "Réalisations",
            en: "Realizations",
        },
    };

    const { language } = useLanguage();

    const host = process.env.NEXT_PUBLIC_API_APIHOST;
    const { response: responseText, Error: erroText, Loading: loadingText, Success: successText } = getPostBySlug("home", "text");
    console.log(responseText);

    return (
        <HomeLayout>
            <div className="mb-5">
                <div className="flex flex-wrap flex-col justify-center content-center align ">
                    <Card className="!mb-5 w-[100%] max-h-[200px] sm:w-[80%] h-[200px] grid-item image-container flex flex-col items-center justify-center ">
                        <Link href={`/photography`} className="h-[100%] w-[100%]">
                        <CardMedia component="img" image={`https://picsum.photos/2000/1000/?random=1`} width={"100%"} height={"auto"} sx={{ objectFit: "cover" }} />
                            <Typography gutterBottom variant="h2" className="content-container " component="div">
                                {textTrad.photo[language]}
                            </Typography>
                        </Link>
                    </Card>
                    <Card className=" w-[100%] max-h-[200px] sm:w-[80%] h-[200px] grid-item image-container flex flex-col items-center justify-center ">
                        <Link href={`/realizations`} className="h-[100%] w-[100%]">
                        <CardMedia component="img" image={`https://picsum.photos/2000/1000/?random=3`} width={"100%"} height={"auto"} sx={{ objectFit: "cover" }} />
                            <Typography gutterBottom variant="h2" className="content-container m-0" component="div">
                                {textTrad.realisations[language]}
                            </Typography>
                        </Link>
                    </Card>
                </div>
            </div>
        </HomeLayout>
    );
}
