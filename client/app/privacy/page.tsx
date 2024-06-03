"use client";

import getParagraph from "@/components/getParagraph";
import { ClassNames } from '@emotion/react';

const pagePrivacy = () => {

    return (
        <div className="content-container">
            <p className="text-white w-[70%] m-auto">{getParagraph("privacy")}</p>
        </div>
    );

};

export default pagePrivacy;