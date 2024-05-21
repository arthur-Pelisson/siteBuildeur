'use client'
import {nav, profileBar, authNav} from '@/components/navbar/dataNavbar'
import { useEffect, useState } from 'react';
import { useToken } from '@/contextProvider/tokenProvider';
import { usePathname } from 'next/navigation';

const usePatheRules = () => {
    const [authorisation, setAuthorisation] = useState<boolean | null>(null);
    const [redirect, setRedirect] = useState<string>("");
    const {token} = useToken();
    const pathname = usePathname();

    const searchAuthInNav = () => {
        const path = pathname;
        let dataElementNav = nav.find((element) => {
            return element.path === path || element.path === path.slice(0, path.length -1);
        });
        
        if (dataElementNav === undefined) {
            dataElementNav = profileBar.find((element) => {
                return element.path === path || element.path === path.slice(0, path.length -1);
            });
        }
        if (dataElementNav === undefined) {
            dataElementNav = authNav.find((element) => {
                return element.path === path || element.path === path.slice(0, path.length -1);
            });
        }
        return dataElementNav;
    }


    useEffect(() => {
        let signIn:boolean;
        signIn = token

        console.log('activation : token : ', token);
        console.log('signIn', signIn);
        const isAuthorisation:any = searchAuthInNav();
        // console.log('isAuthorisation', isAuthorisation);
        if (isAuthorisation?.shouldBeco === undefined && isAuthorisation?.redirect === undefined || isAuthorisation?.shouldBeco === signIn && isAuthorisation?.redirect === undefined ) {
            // console.log('isAuthorisation true', isAuthorisation);
            setAuthorisation(true);
        } else {
            // console.log('isAuthorisation false', isAuthorisation);
            if (isAuthorisation?.redirect !== undefined) {
                setRedirect(isAuthorisation.redirect);
            }
            setAuthorisation(false);
        }

    }, [token, pathname]);



    return {authorisation, redirect};
}

export default usePatheRules;