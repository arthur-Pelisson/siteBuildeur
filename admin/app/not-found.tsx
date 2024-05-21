"use client";
import Link from "next/link";
import Button from "@mui/material/Button";
import { getLogo } from "@/components/logos/logos";
export default function NotFound() {

    const textTrad = {
        returnHome:"Retour à la page d'accueil",
        notFound: "Page non trouvée"
    };

    return (
        <div className="min-height-section flex justify-center items-center ">
            <div className="flex flex-col justify-center items-center">
                <img className="ml-11"  alt="logo" />
                <h2>{textTrad.notFound}</h2>
                <Link href="/">
                    <Button>{textTrad.returnHome}</Button>
                </Link>
            </div>
        </div>
    );
}
