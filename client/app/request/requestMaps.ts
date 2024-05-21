import useRequest from "../../hooks/request/useRequest";


export const getAllMaps = () => {
    const { Data: response, Error, Loading, Success, fetchRequest } = useRequest();
    const url = '/maps';
    const method = 'GET';
    return { response, Error, Loading, Success, fetchRequest, params:{url, method} }
}

export const getMapById = () => {
    const { Data: response, Error, Loading, Success, fetchRequest } = useRequest();
    const url = '/map';
    const method = 'GET';
    return { response, Error, Loading, Success, fetchRequest, params:{url, method} }
}

export const getMapByName = () => {
    const { Data: response, Error, Loading, Success, fetchRequest } = useRequest();
    const url = '/map/name/';
    const method = 'GET';
    return { response, Error, Loading, Success, fetchRequest, params:{url, method} }
}
