import useRequest from "@/hooks/request/useRequest"
import { useEffect } from "react"

export const getSlider = () => {
    const { Data: response, Error, Loading, Success, fetchRequest } = useRequest();
    const url = `/slider/byname/home`;
    const method = 'GET';
    useEffect(() => {
        fetchRequest({url, method});
    }, []);
    return { response, Error, Loading, Success, fetchRequest}
}