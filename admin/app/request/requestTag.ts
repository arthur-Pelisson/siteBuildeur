import useRequest from "@/hooks/request/useRequest"

export const getTags = () => {
    const { Data: response, Error, Loading, Success, fetchRequest } = useRequest();
    const url = `/tags`;
    const method = 'GET';
    return { response, Error, Loading, Success, fetchRequest, params:{url, method} };
}

export const getTagById = () => {
    const { Data: response, Error, Loading, Success, fetchRequest } = useRequest();
    const url = `/tag`;
    const method = 'GET';
    return { response, Error, Loading, Success, fetchRequest, params:{url, method} };
}

export const createTag = () => {
    const { Data: response, Error, Loading, Success, fetchRequest } = useRequest();
    const url = `/tag`;
    const method = 'POST';
    return { response, Error, Loading, Success, fetchRequest, params:{url, method} };
}

export const updateTag = () => {
    const { Data: response, Error, Loading, Success, fetchRequest } = useRequest();
    const url = `/tag`;
    const method = 'PUT';
    return { response, Error, Loading, Success, fetchRequest, params:{url, method} };
}

export const deleteTagById = () => {
    const { Data: response, Error, Loading, Success, fetchRequest } = useRequest();
    const url = `/tag`;
    const method = 'DELETE';
    return { response, Error, Loading, Success, fetchRequest, params:{url, method} };
}