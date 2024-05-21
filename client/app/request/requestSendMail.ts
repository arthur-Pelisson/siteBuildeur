import useRequest from "@/hooks/request/useRequest"


export const sendMail =  () => {
    const { Data: response, Error, Loading, Success, fetchRequest } = useRequest();
    const url = '/sendMail';
    const method = 'POST';
    return { response, Error, Loading, Success, fetchRequest, params:{url, method} }
}