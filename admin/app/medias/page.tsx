'use client'
import Medias from "@/components/medias/displayMedias";



const MediaPage = () => {
    return (
        <>
            <div className="w-[100%]">
                <Medias selectFile={false} deleteFiles={true} uploadFile={true} searchInputFile={true} /> 
            </div>
        </>
    );
};

export default MediaPage;
