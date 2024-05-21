'use client'
import { useState, useEffect } from 'react';
import useRequest from '@/hooks/request/useRequest';

export const getSettings = () => {
    const { Data: response, Error, Loading, Success, fetchRequest } = useRequest();
    const url = '/settingsAdmin';
    const methode = 'GET';
    return { response, Error, Loading, Success, fetchRequest, params: { url, methode } }; 
};

export const updateSettings = () => {
    const { Data: response, Error, Loading, Success, fetchRequest } = useRequest();
    const url = '/settingsAdmin';
    const methode = 'PUT';
    return { response, Error, Loading, Success, fetchRequest, params: { url, methode } }; 
};