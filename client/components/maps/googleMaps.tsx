"use client";
import { Wrapper, Status } from "@googlemaps/react-wrapper";
import { useEffect, useRef, useState } from "react";
import Loading from "@/components/loading";

type TGoogleMap = {
    style?: string;
    value?: any;
};

export type Place = {
    address: string;
    lat: number;
    lng: number;
    zoom?: number;
};

const GoogleMap = ({ style = "w-[100%] h-[500px]", value }: TGoogleMap) => {
    console.log("google maps value: ", value);
    const [place, setPlace] = useState<Place>(value || { address: "", lat: 0, lng: 0, zoom: 8 });

    const render = (status: Status) => {
        if (status === Status.FAILURE) return <div>Failed to load</div>;
        if (status === Status.LOADING) return <Loading display={true} />;
    };

    return (
        <>
            <Wrapper apiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || ""} libraries={["places"]}>
                <div className="w-[100%] h-[100%]">
                    <MyMapComponent place={place} setPlace={setPlace} />
                </div>
            </Wrapper>
        </>
    );
};

export default GoogleMap;

const MyMapComponent = ({ place, setPlace }: Place) => {
    const ref = useRef(null);
    useEffect(() => {
        // console.log("place:", place);
        const MyMap = new window.google.maps.Map(ref.current as any, {
            center: { lat: place.lat, lng: place.lng },
            zoom: place.zoom || 8,
        });
        if (place.address !== "") {
            new window.google.maps.Marker({
                position: { lat: place.lat, lng: place.lng },
                map: MyMap,
            });
        }
        google.maps.event.addListener(MyMap, "zoom_changed", () => {
            setPlace({ ...place, zoom: MyMap.getZoom() });
        });
    }, [place]);

    return (
        <>
            <div className="w-[100%] h-[100%]" ref={ref} id="map" />
        </>
    );
};
