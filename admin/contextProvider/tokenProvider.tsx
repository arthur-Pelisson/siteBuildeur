'use client'
import { createContext, useContext, ReactNode, useState, useEffect } from 'react';
import useRequest from "../hooks/request/useRequest";
import Loading from "@/components/loading/loading";
import { usePathname } from "next/navigation";

interface TokenContextProps {
  token: boolean | null;
  removeToken: () => void;
  setToken: (token: boolean) => void;
}

const TokenContext = createContext<TokenContextProps | undefined>(undefined);



export const TokenProvider: React.FC<{ children: ReactNode }> = ({ children }) => {

    const [token, setToken] = useState<boolean | null>(null);
    const {Loading:loading, fetchRequest} = useRequest();
    const pathname = usePathname();
  
    useEffect(() => { 
      const verifytoken = async () => {
          const url = '/auth/verify-token-admin';
          const method = 'POST';
          const resp = await fetchRequest({url:url, method:method});
          console.log("resp", resp);
          if (resp) {
            setToken(true);
          } else {
            setToken(false);
          }
    };
    console.log("token token provider", token);
      verifytoken();
    }, [pathname]);//add pathname to the dependency array for more accurate verification

    const removeToken = () => {
      setToken(false);
    };

    if (loading) return;

  return (
    <TokenContext.Provider value={{token, setToken, removeToken}}>
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