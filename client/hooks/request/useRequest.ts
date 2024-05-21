'use client';
import { useEffect, useState } from "react"
import requestBuildeur from "./requestBuildeur";
import { useRouter } from 'next/navigation';


const useRequest = () => {
  
  const [Loading, SetLoading] = useState<boolean>(false);
  const [Error, SetError] = useState<any>(null);
  const [Data, SetData] = useState(null);
  const [Success, SetSuccess] = useState<any>(false);
  const abortController = new AbortController();
  const router = useRouter();


  useEffect(() => {
      return () => {
        console.log("Abort");
          abortController.abort();
      };
  }, []);
  
  const fetchRequest = async (dataRequest) => {
      SetLoading(true);
      console.log("dataRequest", dataRequest);
      try {
          const response = await requestBuildeur({
            ...dataRequest,
            signal: abortController.signal,
            
          });
    
          console.log(response);
    
          if (response && response.status === 500) {
            console.log("Sattus 500");
            SetError("Internal server error");
            SetSuccess(false);
            SetLoading(false);
            return false;
          }

          if (response && response.status === 401) {
            console.log("Sattus 401");
            SetError("Unauthorized");
            SetSuccess(false);
            SetLoading(false);
            return false;
          }

          if (response && response.status === 503) {
            console.log("Status 503");
            SetError("Service Unavailable");
            SetSuccess(false);
            SetLoading(false);
            router.push("/");
            return false;
          }
    
          if (response && response.status === 200) {
            console.log("Sattus 200");
            try {
              const responseJson = await response.json();
              console.log(responseJson);
              SetData(responseJson);
              SetSuccess(true);
              SetError(false);
              SetLoading(false);
              return true;
            } catch (e) {
              SetSuccess(false);
              SetError(true);
              SetLoading(false);
              console.log("Error : " + e);
              return false;
            }
          }
          // if error happens//
          SetSuccess(false);
          SetLoading(false);
          
          try {
            console.log("Sattus 400");
            const responseJson = await response.json();
            SetError(responseJson);
            console.log(responseJson);
            return false;
          } catch (e) {
            SetError("Error : " + e);
            return false;
          }
        } catch (error) {
          console.error("Error in fetchRequest:", error);
          SetError({fr: "Pas ou peut de connexion réseau", en: "No or little network connection"});
          SetSuccess(false);
          SetLoading(false);
          return false;
        }
      };

    return {Data, Error, Loading, Success, fetchRequest};

}

export default useRequest;