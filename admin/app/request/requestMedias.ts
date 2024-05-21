import useRequest from "@/hooks/request/useRequest";
import { useEffect } from "react";

export const getMedias = () => {
    const { Data: response, Error, Loading, Success, fetchRequest } = useRequest();
    const url = '/images/public';
    const method = 'GET';
    return { response, Error, Loading, Success, fetchRequest, params:{url, method} }
}

export const uploadMedia = () => {
    const { Data: response, Error, Loading, Success, fetchRequest } = useRequest();
    const url = '/images/public/';
    const method = 'POST';
    const image = true;
    return { response, Error, Loading, Success, fetchRequest, params:{url, method, image} }
}

export const deleteMedia = () => {
    const { Data: response, Error, Loading, Success, fetchRequest } = useRequest();
    const url = '/images/public/';
    const method = 'DELETE';
    return { response, Error, Loading, Success, fetchRequest, params:{url, method} }
} 