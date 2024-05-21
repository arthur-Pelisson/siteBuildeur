import useRequest from "@/hooks/request/useRequest"

export const getTags = () => {
    const { Data: response, Error, Loading, Success, fetchRequest } = useRequest();
    const url = `/tags`;
    const method = 'GET';
    return { response, Error, Loading, Success, fetchRequest, params:{url, method} };
}

export const getTagsByType = (type: string) => {
    const { Data: response, Error, Loading, Success, fetchRequest } = useRequest();
    const url = `/tags/post/${type}`;
    const method = 'GET';
    return { response, Error, Loading, Success, fetchRequest, params:{url, method} };
}