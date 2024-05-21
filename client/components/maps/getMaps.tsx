import React, { useEffect, useState } from 'react';
import { getMapByName, getMapById } from "@/app/request/requestMaps";
import GoogleMap from "@/components//maps/googleMaps";
import Loading from "@/components/loading";
import { useLanguage } from '@/contextProvider/languageProvider';


interface GetMapProps {
    mapName?: string;
    mapId?: number;

}

const GetMap = ({mapName, mapId}:GetMapProps) => {

    const { language } = useLanguage();
    const { response: mapResponseName, Error: mapErrorName, Loading: mapLoadingName, fetchRequest: fetchMapName, params: mapParamsName } = getMapByName();
    const { response: mapResponseId, Error: mapErrorId, Loading: mapLoadingId, fetchRequest: fetchMapId, params: mapParamsId } = getMapById();
    const [map, setMap] = useState<any>(null);
    const [lg, setLg] = useState<string>("fr");
    
    useEffect(() => {
        console.log("mapName : ", mapName);
        console.log("mapId : ", mapId);
        if (mapName != undefined) {
            fetchMapName({url: mapParamsName.url + mapName, method: mapParamsName.method});
        }
        if (mapId != undefined) {
            fetchMapId({url: mapParamsId.url + "/" + mapId, method: mapParamsId.method});
        }
    }, []);

    useEffect(() => {
        if (mapResponseName) {
            setMap(mapResponseName);
        }
        if (mapResponseId) {
            setMap(mapResponseId);
        }
    }, [mapResponseName, mapResponseId]);

    useEffect(() => {
        setLg(language);
    }, [language]);


    if (mapLoadingName || mapLoadingId) {
        return (
            <div className="w-[150px] h-[100px] mt-28 bottom-0 left-0 m-auto">
                <Loading display={true} notInModal={true}/>
            </div>
        )
    }

    if (map !== null) {
        return <GoogleMap lg={language} value={{address: map.address, lat: map.latitude, lng: map.longitude, zoom: map.zoom}} />
    }

}

export default GetMap;