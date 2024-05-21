'use client';
import useRequest from "../../hooks/request/useRequest";

export const useConnection = () => {
    const { Data: response, Error, Loading, Success, fetchRequest } = useRequest();
    const url = '/auth/login-admin';
    const method = 'POST';
    return { response, Error, Loading, Success, fetchRequest, params:{url, method} }
}

export const useRegister = () => {
    const { Data: response, Error, Loading, Success, fetchRequest } = useRequest();
    const url = '/auth/register';
    const method = 'POST';
    return { response, Error, Loading, Success, fetchRequest, params:{url, method} }
};

export const logout = () => {
    const { Data: response, Error, Loading, Success, fetchRequest } = useRequest();
    const url = '/auth/logout-admin';
    const method = 'POST';
    return { response, Error, Loading, Success, fetchRequest, params:{url, method} }
};
