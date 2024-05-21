"use client";
import { useLanguage } from "@/contextProvider/languageProvider";
import LanguageNavbar from "@/components/languageComp/language";
import useTranslation from "@/hooks/translation/useTranslation";
import { logos } from "./logos";
import React, { useEffect, useState } from "react";
import { getMaintenance } from "@/app/request/requestMaintenance";
import { useRouter } from "next/navigation";
import { usePathname } from "next/navigation";
import { useToken } from "@/contextProvider/tokenProvider";
import Loading from "./loading";
const trad = {
    reload: {
        fr: "Recharger la page",
        en: "Reload the page",
    }
}

const Maintenance = ({ children }: { children: React.ReactNode }) => {
    
    const { response: resMaintenance, Error: errMaintenance, Loading: LoadMaintenance, Success: succMaintenance, fetchRequest, params } = getMaintenance();
    const { language } = useLanguage();
    const [isMaintenanceActive, setIsMaintenanceActive] = useState<boolean | null>(null);

    const [maintenance, setMaintenance] = useState<boolean | null>(null); // Mettez à true pour activer la page de maintenance
    // const [admin, setAdmin] = useState<boolean>(false);
    const { getTranslation } = useTranslation();
    const router = useRouter();
    const path = usePathname();
    const { admin } = useToken();



    useEffect(() => {
        fetchRequest({url: params.url, method: params.method});
    }, []);

    useEffect(() => {   
        if (succMaintenance) {
            console.log("respsonse maintenance : ", resMaintenance);
            setMaintenance((resMaintenance as any)?.status);
        }
    }, [resMaintenance, errMaintenance, LoadMaintenance, succMaintenance]);

    useEffect(() => {
        if (maintenance && path !== "/" && !admin) {
            console.log("redirect");
            router.push("/");
            return;
        }
    }, [maintenance]);


    const createLogo = (logo, index) => {
        if (index > 3) return;
        return (
            <div key={logo.src.src} className="w-32 h-32 m-4">
                <img src={`${logo.src.src}`} alt={logo.alt} />
            </div>
        )
    }

    if (LoadMaintenance) {
        return (
            <>
            <div className="w-[100vw] h-[91.3vh] flex ">
                <div className="w-[20%] m-auto">
                    <Loading display={true} notInModal={true} />
                </div>
            </div>
            </>
        )
    }
    console.log("path main : ", path)
    console.log("admin main : ", admin)
    console.log("maint maint : ", maintenance)
    console.log("res maint : ", resMaintenance)
   

    if (!admin && !LoadMaintenance && maintenance || !admin && errMaintenance && !LoadMaintenance && !resMaintenance) {
        import("@/styles/maintenance.css").catch(error => {
            console.error("Failed to import maintenance CSS file:", error);
        });
        return (
            <>
                <div className="flex flex-col min-h-screen">
                    <div className="w-[100%] h-[2rem] mb-[1rem]">
                        <LanguageNavbar leftPixel={-8} />
                    </div>
                    <div className="flex-grow flex-shrink-0 bg-gray-100 flex flex-col pt-4 min-[481px]:pt-48 items-center">
                        <div className="w-[8rem] h-[8rem] mb-[5rem]">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200"><path fill="#000000" stroke="#000000" strokeWidth="15" transformOrigin="center" d="m148 84.7 13.8-8-10-17.3-13.8 8a50 50 0 0 0-27.4-15.9v-16h-20v16A50 50 0 0 0 63 67.4l-13.8-8-10 17.3 13.8 8a50 50 0 0 0 0 31.7l-13.8 8 10 17.3 13.8-8a50 50 0 0 0 27.5 15.9v16h20v-16a50 50 0 0 0 27.4-15.9l13.8 8 10-17.3-13.8-8a50 50 0 0 0 0-31.7Zm-47.5 50.8a35 35 0 1 1 0-70 35 35 0 0 1 0 70Z"><animateTransform type="rotate" attributeName="transform" calcMode="spline" dur="2" values="0;120" keyTimes="0;1" keySplines="0 0 1 1" repeatCount="indefinite"></animateTransform></path></svg>
                        </div>
                        <div className="text-center w-[50%]">
                            { maintenance && <h1 className="text-gray-600 !text-[2rem]" dangerouslySetInnerHTML={{__html:getTranslation((resMaintenance as any).translations, "message", language)}} ></h1>}
                            { !maintenance && !resMaintenance && <p className="text-gray-600 w-[100%] text-center" >Site under maintenance</p>}
                        </div>
                    </div>
                </div>
            </>
        );
    }
    
    // if (admin && !LoadMaintenance && succMaintenance && resMaintenance || !maintenance) {
        return <>{children}</>;
    // }
};

export default Maintenance;
