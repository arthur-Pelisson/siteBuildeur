'use client'
import { FaCheck, FaTimes } from 'react-icons/fa';
import { useSearchParams } from "next/navigation";
import { useLanguage } from '@/contextProvider/languageProvider';
import Loading from "../../../components/loading";
import { requestActivate } from '../../request/requestAuth';

const ActivationPage = () => {

    const searchParams = useSearchParams();
    const token = searchParams.get('token');
    console.log('tokenUrl : ', token);
    const { language } = useLanguage();
    const { response, Error : error, Loading: loading, Success: success} = requestActivate(token);
    
    
    const text = {
        title: {
            fr: "Activation",
            en: "Activation",
        },
        text: {
            fr: "Votre compte a bien été activé, vous pouvez des a présent vous connecter",
            en: "Your account has been activated, you can now log in"
        },
        errorTitle: {
            fr: "Erreur",
            en: "Error",
        },
        errorText: {
            fr: "Une erreur est survenue lors de l'activation de votre compte, veuillez réessayer ultérieurement",
            en: "An error occurred while activating your account, please try again later"
        },
    }
    console.log(error,' : error');
    if (error === null) {
      return;
    }

    if (error) {
        return (
          <>
            <Loading display={loading} />
            <main className=" flex flex-grow flex-shrink-0 items-center justify-center h-screen bg-white" style={{ height: `calc(100vh - 4rem - 3rem)` }}>
              <div className=" bg-red-100 border border-red-400 text-red-700 px-4 py-2 rounded-md">
                <div className="flex items-center">
                  <FaTimes className="mr-2" />
                  <p className="text-lg font-bold">{text.errorTitle[language]}</p>
                </div>
                <p className="text-gray-600">{text.errorText[language]}</p>
              </div>
            </main>
          </>
        );
      }
      
      return (
        <>
          <Loading display={loading} />
          <main className="h-auto flex flex-grow flex-shrink-0 items-center justify-center  bg-white"  style={{ height: `calc(100vh - 4rem - 3rem)` }}>
            <div className=" bg-green-100 border border-green-400 text-green-700 px-4 py-2 rounded-md">
              <div className="flex items-center">
                <FaCheck className="mr-2" />
                <p className="text-lg font-bold">{text.title[language]}</p>
              </div>
              <p className="text-gray-600">{text.text[language]}</p>
            </div>
          </main>
        </>
      );
      
};

export default ActivationPage;

