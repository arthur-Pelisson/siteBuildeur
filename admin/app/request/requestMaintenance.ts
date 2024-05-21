'use client'
import useRequest from "../../hooks/request/useRequest";
import { useEffect } from "react";

export const getMaintenance = () => {
    const { Data: response, Error, Loading, Success, fetchRequest } = useRequest();
    const url = '/maintenance';
    const method = 'GET';

    useEffect(() => {
        fetchRequest({url, method});
    }, []);

    return { response, Error, Loading, Success}
}

export const updateMaintenance = () => {
    const { Data: response, Error, Loading, Success, fetchRequest } = useRequest();
    const url = '/maintenance';
    const method = 'PUT';
    return { response, Error, Loading, Success, fetchRequest, params:{url, method} }
    
}

export const updateStatus = () => {
    const { Data: response, Error, Loading, Success, fetchRequest } = useRequest();
    const url = '/maintenance';
    const method = 'PATCH';
    return { response, Error, Loading, Success, fetchRequest, params:{url, method} }
}