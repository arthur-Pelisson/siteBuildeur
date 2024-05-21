'use client'
import React, { useEffect, useState } from 'react';
import { useToken } from '@/contextProvider/tokenProvider';
import { logout } from '@/app/request/requestAuth';
import Loading from '@/components/loading';
import { useRouter } from 'next/navigation';
const DisconnectionPage = () => {
    const { removeToken, token } = useToken();
    const [loading, setLoading] = useState(true);
    const router = useRouter();
    const { response, Error: error, Success: success, Loading: loadingRequest, fetchRequest, params } = logout();

    useEffect(() => {
        // setLoading(true);
        fetchRequest(params);
    }, []);

    useEffect(() => {
        if (success) {
            removeToken();
            router.push("/");
        }
    }, [success]);



    return (
        <div>
          <Loading display={loading}/>
        </div>
    )
};

export default DisconnectionPage;