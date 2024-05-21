import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useState, useRef, useEffect, useLayoutEffect } from "react";
import { useLanguage } from "@/contextProvider/languageProvider";

const translation = {
    link: {
        fr: "Voir plus",
        en: "See more",
    },
};

const SliderComp = ({ children, sliderConf, runOnLoad, setRunOnload, style = {} }) => {
    const [dotsY] = useState(20);
    const divSliderRef = useRef(null);
    const [posContentY, setPosContentY] = useState(0);

    useLayoutEffect(() => {
        console.log("runOnLoad", runOnLoad);
        window.addEventListener("resize", resize);
        resize();
        return () => {
            console.log("removeEventListener");
            removeEventListener("resize", resize);
            setRunOnload(false);
        };
    }, [runOnLoad, posContentY]);

    const resize = () => {
            console.log("resize");
            const divSliderContentEl = document.getElementsByClassName("sliderContent");
            if (divSliderContentEl.length > 0) {
                for (let i = 0; i < divSliderContentEl.length; i++) {
                    const element = divSliderContentEl[i] as HTMLElement;
                    if (divSliderRef.current) {
                        const divSlider = divSliderRef.current as HTMLElement;
                        const posContentY = (divSlider.clientHeight - element.clientHeight) / 4;
                        element.style.bottom = `${posContentY}px`;
                        setPosContentY(posContentY);
                    }
                }
            }
        };

    const settings = {
        dots: sliderConf.dots || false,
        lazyLoad: sliderConf.lazyLoad || true,
        infinite: sliderConf.infinite || true,
        speed: sliderConf.speed || 500,
        slidesToShow: sliderConf.slidesToShow || 1,
        autoplay: sliderConf.autoplay || false,
        autoplaySpeed: sliderConf.autoplaySpeed || 5000,
        slidesToScroll: sliderConf.slidesToScroll || 1,
        pauseOnHover: sliderConf.pauseOnHover || false,
        adaptiveHeight: sliderConf.adaptiveHeight || true,
        nextArrow: <SampleNextArrow />,
        prevArrow: <SamplePrevArrow />,
        appendDots: (dots) => (
            <div
                style={{
                    // backgroundColor: "black",
                    borderRadius: "10px",
                    padding: "10px",
                    bottom: dotsY,
                }}
            >
                <ul style={{ margin: "0px" }}> {dots} </ul>
            </div>
        ),
    };

    function SampleNextArrow(props) {
        const { className, style, onClick } = props;
        return <div className={className} style={{ ...style, display: "block", right: "30px", zIndex: "1", color: "black" }} onClick={onClick} />;
    }

    function SamplePrevArrow(props) {
        const { className, style, onClick } = props;
        return <div className={className} style={{ ...style, display: "block", left: "0px", zIndex: "1", color: "black" }} onClick={onClick} />;
    }

    return (
        <div style={{ ...style }}>
            <div style={{ ...style }} ref={divSliderRef}>
                <Slider {...settings}>{children}</Slider>
            </div>
        </div>
    );
};

export default SliderComp;
