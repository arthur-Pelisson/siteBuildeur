'use client';
import { useEffect, useState, useCallback } from "react"
import useRequest from "../../hooks/request/useRequest";

export const requestActivate = (token) => {
    const { Data: response, Error, Loading, Success, fetchRequest } = useRequest();
    const url = '/auth/activate/' + token;
    const method = 'GET';
    useEffect(() => {
        fetchRequest({url, method});
    }, []); 
    return { response, Error, Loading, Success }
}

export const useConnection = () => {
    const { Data: response, Error, Loading, Success, fetchRequest } = useRequest();
    const url = '/auth/login';
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
    const url = '/auth/logout';
    const method = 'POST';
    return { response, Error, Loading, Success, fetchRequest, params:{url, method} }
};

export const forgotPassword =() => {
    const { Data: response, Error, Loading, Success, fetchRequest } = useRequest();
    const url = '/auth/forgot-password';
    const method = 'POST';
    return { response, Error, Loading, Success, fetchRequest, params:{url, method} }
}

export const resetPassword = () => {
    const { Data: response, Error, Loading, Success, fetchRequest } = useRequest();
    const url = '/auth/reset-password/';
    const method = 'POST';
    return { response, Error, Loading, Success, fetchRequest, params:{url, method} }
}
