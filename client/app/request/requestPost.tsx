'use client';
import { useEffect } from 'react';
import useRequest from '@/hooks/request/useRequest';

export const getPostByType = (type) => {
    const { Data: response, Error, Loading, Success, fetchRequest } = useRequest();
    const url = '/posts/' + type;
    const method = 'GET';
    useEffect(() => {
        fetchRequest({url, method});
    }, []); 
    return { response, Error, Loading, Success }
}
export const getPostByPagination = (type) => {
    const { Data: response, Error, Loading, Success, fetchRequest } = useRequest();
    const url = '/posts/' + type;
    const method = 'GET';
    return { response, Error, Loading, Success, fetchRequest, params: {url, method}}
}

export const getPostById = (id, type) => {
    const { Data: response, Error, Loading, Success, fetchRequest } = useRequest();
    const url = '/post/' + type + "/" + id;
    const method = 'GET';
    useEffect(() => {
        fetchRequest({url, method});
    }, []); 
    return { response, Error, Loading, Success }
}

export const getPostBySlug = (slug, type) => {
    const { Data: response, Error, Loading, Success, fetchRequest } = useRequest();
    const url = '/post/' + type + "/slug/" + slug;
    const method = 'GET';
    useEffect(() => {
        fetchRequest({url, method});
    }, []); 
    return { response, Error, Loading, Success }
}