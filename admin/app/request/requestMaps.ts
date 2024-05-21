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

export const createMap = () => {
    const { Data: response, Error, Loading, Success, fetchRequest } = useRequest();
    const url = '/map';
    const method = 'POST';
    return { response, Error, Loading, Success, fetchRequest, params:{url, method} }
}

export const updateMap = () => {
    const { Data: response, Error, Loading, Success, fetchRequest } = useRequest();
    const url = '/map';
    const method = 'PUT';
    return { response, Error, Loading, Success, fetchRequest, params:{url, method} }
}

export const deleteMap = () => {
    const { Data: response, Error, Loading, Success, fetchRequest } = useRequest();
    const url = '/map';
    const method = 'DELETE';
    return { response, Error, Loading, Success, fetchRequest, params:{url, method} }
}