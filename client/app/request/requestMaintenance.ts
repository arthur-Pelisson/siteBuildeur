'use client'
import useRequest from "../../hooks/request/useRequest";
import { useEffect } from "react";

export const getMaintenance = () => {
    const { Data: response, Error, Loading, Success, fetchRequest } = useRequest();
    const url = '/maintenance';
    const method = 'GET';

    return { response, Error, Loading, Success, fetchRequest, params: { url, method } };
}
