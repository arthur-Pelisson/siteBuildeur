"use client";
import { Wrapper, Status } from "@googlemaps/react-wrapper";
import { ReactElement, useEffect, useRef, useState } from "react";
import { TextField, Typography } from "@mui/material";
import Loading from '@/components/loading/loading';

type TGoogleMap = {
    input: boolean;
    style?: string;
    name?: string;
    error? : string | null;
    value?: any
    defaultStyle?: boolean;
    callBackdata?: (name:string, value: Place, lg?: any) => void;
};

export type Place = {   
    address: string;
    lat: number;
    lng: number;
    zoom?: number;
};

const GoogleMap = ({input=true, style='w-[100%] h-[500px]', defaultStyle=true, callBackdata, name, error, value}:TGoogleMap) => {
    console.log("google maps value: ", value);
    const [errorInput, setErrorInput] = useState<string>(error || "");
    const [place, setPlace] = useState<Place>(value || {address: "", lat: 0, lng: 0, zoom: 8});
    
    useEffect(() => {
        if (callBackdata) callBackdata((name as string), place);
    }, [place]);

    useEffect(() => {
        setPlace(value);
    }, [value]);

    useEffect(() => {
        console.log("error : ", error);
        if (error !== null && error !== undefined) setErrorInput(error);
        else setErrorInput("");
    }, [error]);

    const handleChangeInput = (value: Place) => {
        setPlace(value);
    }; 

    const render = (status: Status): ReactElement => {
        if (status === Status.FAILURE) return <div>Failed to load</div>;
        return <Loading display={true}/>;
      };
    
    console.log("errorInput : ", errorInput);
    return (
        <div className={`${defaultStyle ? `mt-10 border-2 p-5 ${errorInput !== "" && errorInput != undefined ? "border-red-600" : ""}`: ""}`}>
            <Wrapper apiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || ""} render={render} libraries={["places"]}>
                <Typography variant="h6" className={`text-center text-red-600 mb-5 ${errorInput !== "" ? "" : "opacity-0"}`}>{error}</Typography>
                {input && <InputAutoComplete value={value} callBack={handleChangeInput} />}
                <div className={style} >
                    <MyMapComponent place={place} setPlace={setPlace} />
                </div>
            </Wrapper>
        </div>
    );
};

export default GoogleMap;


const MyMapComponent = ({place, setPlace}:any) => {
    const ref = useRef(null);
    useEffect(() => {
        // console.log("place:", place);
        const MyMap = new window.google.maps.Map((ref.current as any), {
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
            setPlace({...place, zoom: MyMap.getZoom()});
        });
    }, [place]);


    return (
        <>
            <div className="w-[100%] h-[100%]" ref={ref} id="map" />
        </>
    );
};

const InputAutoComplete = ({callBack, value}: any) => {
    const inputRef = useRef(null);
    if (value.lat == -1) {
        value.lat = 45.76049453859834;
        value.lng = 4.83350194776288;
        value.zoom = 12;
    }
    const [valueMap, setValue] = useState<Place>(value || {address: "", lat: 45.76049453859834, lng: 4.83350194776288, zoom: 12});

    useEffect(() => {
        if (inputRef.current === null) return;
            (inputRef.current as HTMLInputElement).value = valueMap.address;
    }, [value]);

    useEffect(() => {
        if (inputRef.current === null) return;
       const Autocomplete =  new window.google.maps.places.Autocomplete(inputRef.current, {
            types: ["address"],
            fields: ["address_components", "geometry", "formatted_address"],
            componentRestrictions: { country: "fr" },
    });


        
        google.maps.event.addListener(Autocomplete, "place_changed", () => {
            const place = Autocomplete.getPlace();
            if (place === undefined) return;
            if (place.formatted_address === undefined) return;
            if (place?.geometry?.location === undefined) return;
            const address: string = place.formatted_address ;
            const lat: number = place.geometry.location.lat();
            const lng: number = place.geometry.location.lng();
            setValue({address, lat, lng, zoom: 17});

        });
    }, [inputRef]);

    useEffect(() => {
        callBack(valueMap);
    }, [valueMap]);
    
    return (
        <>
        <div className="w-[40%] text-center m-auto mb-10">
            <TextField
                inputRef={inputRef}
                label="Adresse"
                variant="outlined"
                size="small"
                fullWidth
            />
        </div>
        </>
    )
};
