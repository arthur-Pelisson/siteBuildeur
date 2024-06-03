'use client';
import { useEffect } from 'react';
import useRequest from '@/hooks/request/useRequest';

export const getPostByType = (type: string) => {
    const { Data: response, Error, Loading, Success, fetchRequest } = useRequest();
    const url = '/admin_posts/' + type;
    const method = 'GET';
    useEffect(() => {
        fetchRequest({url, method});
    }, []); 
    return { response, Error, Loading, Success }
}

export const getPostById = (id: number, type: string) => {
    const { Data: response, Error, Loading, Success, fetchRequest } = useRequest();
    const url = '/post/' + type + "/" + id;
    const method = 'GET';
    useEffect(() => {
        fetchRequest({url, method});
    }, []); 
    return { response, Error, Loading, Success }
}

export const getPostBySlug = (slug: string, type: string) => {
    const { Data: response, Error, Loading, Success, fetchRequest } = useRequest();
    const url = '/post/' + type + "/slug/" + slug;
    const method = 'GET';
    useEffect(() => {
        fetchRequest({url, method});
    }, []); 
    return { response, Error, Loading, Success }
}

export const deletePostById = () => {
    const { Data: response, Error, Loading, Success, fetchRequest } = useRequest();
    const url = '/post/';
    const method = 'DELETE';
    return { response, Error, Loading, Success, fetchRequest, params:{url, method} }
}

export const deleteMultiplePostsById = () => {
    const { Data: response, Error, Loading, Success, fetchRequest } = useRequest();
    const url = '/posts';
    const method = 'DELETE';
    return { response, Error, Loading, Success, fetchRequest, params:{url, method} }
}

export const setPublishPost = () => {
    const { Data: response, Error, Loading, Success, fetchRequest } = useRequest();
    const url = '/post/';
    const method = 'PATCH';
    return { response, Error, Loading, Success, fetchRequest, params:{url, method} }
};

export const createPost = () => {
    const { Data: response, Error, Loading, Success, fetchRequest } = useRequest();
    const url = '/post/';
    const method = 'POST';
    return { response, Error, Loading, Success, fetchRequest, params:{url, method} }
};

export const updatePost = () => {
    const { Data: response, Error, Loading, Success, fetchRequest } = useRequest();
    const url = '/post/';
    const method = 'PUT';
    return { response, Error, Loading, Success, fetchRequest, params:{url, method} }
}