'use client'
import { Suspense } from 'react';
import { useEffect, useState } from 'react';
import Loading from '@/components/loading/loading';
import { useRouter } from 'next/navigation';
import usePatheRules from '@/hooks/pathRules/usePatheRules';
import { usePathname } from 'next/navigation';
import { useToken } from '@/contextProvider/tokenProvider';
import ConnectionPage from '@/app/auth/connection/page';
import path from 'path';
const PathWrapper = ({ children }: { children: React.ReactNode }) => {
    // console.log("4.1")
    const {getAuthorisation} = usePatheRules();
    const router = useRouter();
    const pathname = usePathname();
    const [loading, setLoading] = useState(true);
    const { token } = useToken();

    useEffect(() => {
        if (token === null) return; 
        checkAuth();
      }, [token, pathname]);

      const checkAuth = () => {
        setLoading(true);
        const {authorisation, redirect} = getAuthorisation();
        if (authorisation === false) {
            router.push(redirect);
        }
        if (authorisation === true) {
            setLoading(false);
        }
      }
      
    if (loading) {
        return <Loading display={true} />;
    }

    return (
        <>
            {children}
        </>
    )
};

export default PathWrapper;