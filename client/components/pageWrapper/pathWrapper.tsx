'use client'
import { Suspense } from 'react';
import { useEffect, useState } from 'react';
import Loading from '@/components/loading';
import usePatheRules from '@/hooks/pathRules/usePatheRules';
import { useRouter } from 'next/navigation';

const PathWrapper = ({ children }: { children: React.ReactNode }) => {

    const {authorisation, redirect} = usePatheRules();
    const router = useRouter();

    useEffect(() => {
        console.log("authorisation before redirect ", authorisation);
        if (authorisation === false) {
            if (redirect !== "") {
                router.push(redirect);  
                return;
            }
            // console.log("authorisation redirect ", authorisation);
            router.push('/');
        }
        return () => {
            console.log("authorisation return ", authorisation);
        }
      }, [authorisation]);

    if (!authorisation || authorisation === undefined || authorisation === null) {
        return <Loading display={true} />;
    }
    return (
        <Suspense fallback={<Loading display={true} />}>
            {children}
        </Suspense>
    )
};

export default PathWrapper;