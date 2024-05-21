'use client'
import React, { useEffect, useState } from 'react';
import { useToken } from '@/contextProvider/tokenProvider';
import Loading from '@/components/loading/loading';
import { useRouter } from 'next/navigation';
import { logout } from '@/app/request/requestAuth';
const DisconnectionPage = () => {
    const { removeToken, token } = useToken();
    // const [loading, setLoading] = useState(true);
    const router = useRouter();

    const { response, Error: error, Success: success, Loading: loadingRequest, fetchRequest, params } = logout();
    
    useEffect(() => {
        // setLoading(true);
        fetchRequest(params);
    }, []);

    useEffect(() => {
        if (success) {
            removeToken();
            // router.push("/auth/connection");
            // setLoading(false);
        }
    }, [success]);



    return (
        <div>
          <Loading display={loadingRequest}/>
        </div>
    )
};

export default DisconnectionPage;