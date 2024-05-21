'use client'
import getParagraph from "@/components/getParagraph";
const PageAbout = () => {
    return (
        <div>
            <div className="w-[90%] text-white justify-center items-center m-auto mt-16 flex flex-col lg:flex-row ">
                <div className="w-[95%] lg:w-[50%]">
                    {getParagraph("aboutLeft")}
                </div>
                <div className="w-[95%] lg:w-[50%]">
                    {getParagraph("aboutRight")}

                </div>
            </div>
        </div>
    );
};

export default PageAbout;