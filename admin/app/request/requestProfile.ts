import useRequest from "@/hooks/request/useRequest"
import { useEffect } from "react"

export const getUserByEmail = (email) => {
    const { Data: response, Error, Loading, Success, fetchRequest } = useRequest();
    const url = `/user/email/${email}`;
    const method = 'GET';
    useEffect(() => {
        fetchRequest({url, method});
    }, []);
    return { response, Error, Loading, Success }
}

export const updateUserById = (id) => {
    const { Data: response, Error, Loading, Success, fetchRequest } = useRequest();
    const url = `/user/${id}`;
    const method = 'PUT';
    return { response, Error, Loading, Success, fetchRequest, params:{url, method} }
};

export const updateProfile = () => {
    const { Data: response, Error, Loading, Success, fetchRequest } = useRequest();
    const url = `/user/update/profile`;
    const method = 'PUT';
    return { response, Error, Loading, Success, fetchRequest, params:{url, method} }
};

export const getProfile = () => {
    const { Data: response, Error, Loading, Success, fetchRequest } = useRequest();
    const url = '/user/get/profile';
    const method = 'GET';
    useEffect(() => {
        fetchRequest({url, method});
    }, []);
    return { response, Error, Loading, Success, fetchRequest, params:{url, method} }
}

export const updatePassword = () => {
    const { Data: response, Error, Loading, Success, fetchRequest } = useRequest();
    const url = `/user/change_password/profile`;
    const method = 'PATCH';
    return { response, Error, Loading, Success, fetchRequest, params:{url, method} }
}