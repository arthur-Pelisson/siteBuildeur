'use client';
import { useEffect, useState } from "react"
import requestBuildeur from "./requestBuildeur";
import { useRouter } from "next/navigation";
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
  
  const fetchRequest = async (dataRequest: any) => {
      SetLoading(true);
      console.log("dataRequestaaaaaaa : ", dataRequest);
      try {
          const response = await requestBuildeur({
            ...dataRequest,
            signal: abortController.signal,
            
          });
          if (response && response.status === 500) {
            console.log("Status 500");
            console.log(response);
            SetError("Internal server error");
            SetSuccess(false);
            SetLoading(false);
            return false;
          }

          if (response && response.status === 401 || response.status === 503) {
            console.log("Status 401");
            SetSuccess(false);
            SetLoading(false);
            SetError("Vous n'êtes pas autorisé à effectuer cette action");
            return false;
          }
    
          if (response && response.status === 200) {
            console.log("Status 200");
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


          if (response && response.status === 404) {
            console.log("Status 404");
            SetError("Une erreur est survénue, veuillez réessayer plus tard");
            SetSuccess(false);
            SetLoading(false);
            return false;
          }
          // if error happens//
          SetSuccess(false);
          SetLoading(false);
          
          try {
            console.log("Other error");
            const responseJson = await response.json();
            console.log(response?.status);
            console.log(responseJson);
            SetError(responseJson.fr);
            return false;
          } catch (e) {
            SetError("Error : " + e);
            return false;
          }
          
        } catch (error) {
          console.error("Error in fetchRequest:", error);
          SetError("Pas ou peut de connexion réseau");
          SetSuccess(false);
          SetLoading(false);
          return false;
        }
      };

    return {Data, Error, Loading, Success, fetchRequest};

}

export default useRequest;