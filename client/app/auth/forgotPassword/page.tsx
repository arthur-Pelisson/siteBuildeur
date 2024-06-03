"use client"

import { useEffect, useState } from "react";
import { forgotPassForm, formTranslate} from "./form";
import { errorType } from "@/app/types/formValidation";
import { useLanguage } from "@/contextProvider/languageProvider";
import { formValidation } from "@/utils/formValidation";
import { forgotPassword } from "@/app/request/requestAuth";
import Loading from "@/components/loading";
import { Button, Card } from "@mui/material";
import SnackBar from "@/components/snackBar";

const PageForgotPassword = () => {
    const { language } = useLanguage();
    const [email, setEmail] = useState({email:""});
    const [validationErrors, setValidationErrors] = useState<Record<string, errorType | null>>({});
    const { response, Error: error, Success: success, Loading: loading, fetchRequest, params } = forgotPassword();
    const [disableBtn, setDisableBtn] = useState(false);
    const [snack, setSnack] = useState({open: false, message: "", severity: ""});



    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setDisableBtn(false);
        setEmail({email: e.target.value});
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const newValidationErrors: Record<string, errorType | null> = {};
        forgotPassForm.forEach((field) => {
            const error = formValidation(field, email, forgotPassForm);
            if (error) {
                setDisableBtn(true);
                newValidationErrors[field.name] = error;
            }
        });

        setValidationErrors(newValidationErrors);

        if (Object.keys(newValidationErrors).length > 0) {
            console.log("Il y a des erreurs " + JSON.stringify(newValidationErrors));
            return;
        }

        await fetchRequest({ data: email, url: params.url, method: params.method });
    };


    return (
        <div className="margin:auto absolute top-[30%] bottom-0 left-0 right-0">
            <Loading display={loading} />
            <div className="bg-white w-[100%] md:w-[70%] lg:max-w-[500px]  lg:w-[50%] min-h-[300px] m-auto flex flex-col rounded-lg" style={{boxShadow: "0px 10px 7px 2px grey"}}>
                <div>
                    <h1 className="text-2xl text-center mt-3"  dangerouslySetInnerHTML={{__html:formTranslate.title[language]}}></h1>
                </div>
                <div>
                    <h2 className="text-base text-center mt-5" dangerouslySetInnerHTML={{__html:formTranslate.description[language]}} ></h2>
                </div>
                <div className="w-[50%] text-center m-auto flex flex-col">
                    <form onSubmit={handleSubmit}>
                        {forgotPassForm.map((field, index) => {
                            return (
                                <div key={index}>
                                     <label htmlFor={field.name} className="block text-sm font-medium text-gray-600">
                                {field.label[language]}
                            </label>
                                    <input
                                        type={field.type}
                                        name={field.name}
                                        id={field.name}
                                        value={email[field.name]}
                                        onChange={handleChange}
                                        className="mt-1 p-2 w-full border border-black rounded-md focus:outline-none focus:ring focus:border-blue-300 text-black"
                                    />
                                     <p className="text-red-500 text-sm h-3">{validationErrors[field.name] && validationErrors[field.name]?.[language]}</p>
                                </div>
                            );
                        })}
                        <Button  type="submit" disabled={disableBtn} variant="contained" className="btn btn-primary !mt-5">
                            {formTranslate.submit[language]}
                        </Button>
                    </form>
                </div>
            </div>
        </div>
    )



};

export default PageForgotPassword;