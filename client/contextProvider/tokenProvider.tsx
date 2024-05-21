'use client'
import { createContext, useContext, ReactNode, useState, useEffect, Suspense, useMemo } from "react";
import useRequest from "../hooks/request/useRequest";
import Loading from "@/components/loading";
import { usePathname } from "next/navigation";
import { useRouter } from "next/navigation";

interface TokenContextProps {
  token: boolean;
  removeToken: () => void;
  setToken: (token: boolean) => void;
  admin: boolean;
  setAdmin: (admin: boolean) => void;
}

const TokenContext = createContext<TokenContextProps | undefined>(undefined);



export const TokenProvider: React.FC<{ children: ReactNode }> = ({ children }) => {

    const [token, setToken] = useState<boolean>(false);
    const [admin, setAdmin] = useState<boolean>(false);
    const {Data: Response, Loading:loading, fetchRequest} = useRequest();
    const pathname = usePathname();

    useEffect(() => {
      const verifytoken = async () => {
          const url = '/auth/verify-token';
          const method = 'POST';
          console.log("verifytoken", token)
          const resp:any = await fetchRequest({url:url, method:method});
          console.log("resp auth verify", resp);
          if (resp) {
            setToken(true);
          } else {
            setToken(false);
          }
      }
      verifytoken();
    }, [pathname]);

    useEffect(() => {
      console.log("Response auth", Response);
      if (Response) {
        if ((Response as any).role === "ADMIN") {
          setAdmin(true);
        }
      }
    }, [Response, loading]);

    const removeToken = () => {
      setToken(false);
    };

    
    // if (loading) return (<Loading display={true}/>);

  return (
    <TokenContext.Provider value={{token, setToken, removeToken, setAdmin, admin}}>
        {children}
    </TokenContext.Provider>
  );
};

export const useToken = () => {
    const context = useContext(TokenContext);
    if (!context) {
      throw new Error('useToken must be used within a TokenProvider');
    }
    return context;
  };