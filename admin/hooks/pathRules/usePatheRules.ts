'use client'
import { useToken } from '@/contextProvider/tokenProvider';
import { usePathname } from 'next/navigation';

const usePatheRules = () => {
    // const [authorisation, setAuthorisation] = useState<boolean | null>(null);
    // const [redirect, setRedirect] = useState<string>("");
    const pathname = usePathname();
    const { token } = useToken();

    const getAuthorisation = () => {
        
        let signIn;
        console.log("token usePathRule : ", token);
        // if (token === null ) return {authorisation: true, redirect: ""};
        if (token === false || token === null || token === undefined) {
            signIn = false;
        } else {
            signIn = true;
        }

        console.log("signIn : ", signIn);
        if (pathname.slice(0, pathname.length -1) === "/auth/connection" && !signIn) {
            return {authorisation: true, redirect: ""};
        }
        if (pathname.slice(0, pathname.length -1) === "/auth/connection" && signIn) {
            console.log("okok")
            return {authorisation: false, redirect: "/"};
        }
        if (signIn) {
            return {authorisation: true, redirect: ""};
        } else {
            return {authorisation: false, redirect: "/auth/connection"};
        }
    };

    return {getAuthorisation};
}

export default usePatheRules;