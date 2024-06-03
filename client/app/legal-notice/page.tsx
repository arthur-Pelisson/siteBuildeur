"use client";

import getParagraph from "@/components/getParagraph";
import { ClassNames } from '@emotion/react';

const pageLegaleNotice = () => {

    return (
        <div className="content-container">
            <p className="text-white w-[70%] m-auto">{getParagraph("legal notice")}</p>
        </div>
    );

};

export default pageLegaleNotice;