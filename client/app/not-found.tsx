"use client";
import Link from "next/link";
import { useLanguage } from "@/contextProvider/languageProvider";
import Button from "@mui/material/Button";
import { logos, getLogo } from "@/components/logos";
export default function NotFound() {
    const { language } = useLanguage();

    const textTrad = {
        returnHome: {
            en: "Return Home",
            fr: "Retour à la page d'accueil",
        },
        notFound: {
            en: "Not Found",
            fr: "Page non trouvée",
        },
    };

    return (
        <div className="min-height-section flex justify-center items-center ">
            <div className="flex flex-col justify-center items-center">
                <h2>{textTrad.notFound[language]}</h2>
                <Link href="/">
                    {" "}
                    <Button>{textTrad.returnHome[language]}</Button>
                </Link>
            </div>
        </div>
    );
}
