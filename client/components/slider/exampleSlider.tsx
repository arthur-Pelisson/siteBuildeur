import Slider from "./slider";
import { useState, useEffect} from "react";
import { useLanguage } from "@/contextProvider/languageProvider";
import { getSlider } from "@/app/request/requestSlider";
import useTranslation from "@/hooks/translation/useTranslation";
import 'dotenv/config'


const exampleSlider = () => {

    const [slider, setSlider] = useState([]);
    const { language } = useLanguage();
    const [runOnload, setRunOnload] = useState(false);
    const { getTranslation } = useTranslation();
    const { response: responseSlider, Error: errorSlider, Success: successSlider, Loading: loadingSlider } = getSlider();
    const [loading, setLoading] = useState(true);
    const host = process.env.NEXT_PUBLIC_API_APIHOST;



    useEffect(() => {
        if (responseSlider) {
            setSlider(responseSlider);
        }
        if (successSlider || errorSlider) {
            setLoading(false);
        }
    }, [loadingSlider, successSlider, responseSlider, errorSlider]);

    const runOnLoadImg= () => {
        console.log("runOnLoadImg");
        setRunOnload(true);
    }

    return (
        <div className="sliderContainer">
            <Slider
                runOnLoad={runOnload}
                setRunOnload={setRunOnload}
                style={{ width: "100%" }}
                sliderConf={{
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    autoplaySpeed: 5000,
                    arrows: true,
                    dots: true,
                }}
            >
                {slider.length === 0 && !loadingSlider && (
                    <div className="h-[100vh] !flex items-center justify-center">
                        <h1>No images found</h1>
                    </div>
                )}
                {((slider as any).slider_content || []).map((item, index) => {
                    return (
                        <div key={index}>
                            <div style={{ height: "100vh", overflow: "hidden" }}>
                                <img
                                    src={host + "/images/" + item.image}
                                    onLoad={runOnLoadImg}
                                    style={{ width: "100%", height: "100%", objectFit: "cover" }}
                                />
                            </div>
                            <div className="sliderContent" style={{ textAlign: "center" }}>
                                <div className="slider-title text-black">
                                    <h1 className="text-[3rem]">{getTranslation(item.slider_translation, "title", language)}</h1>
                                </div>
                                <div className="text-[1.3rem] slider-text text-black">
                                    <h5>{getTranslation(item.slider_translation, "content", language)}</h5>
                                </div>
                                <a href={item.link}>
                                    <button className="btn btn-primary text-black"></button>
                                </a>
                            </div>
                        </div>
                    );
                })}
            </Slider>
        </div>
    );
};
export default exampleSlider;