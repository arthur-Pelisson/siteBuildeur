// Register.tsx
"use client";
import { useState, useEffect } from "react";
import { form, formTranslate, formSucess } from "./form";
import { useLanguage } from "@/contextProvider/languageProvider";
import { RegisterForm } from "./types";
import { formValidation } from "@/utils/formValidation";
import LoadingComp from "../../../components/loading";
import { useRegister } from "../../request/requestAuth";
import Link from "next/link";

type TerrorValidationForm = {
    fr: string;
    en: string;
}

const Register = () => {
    const { language } = useLanguage();

    useEffect(() => {
        dataForm.lg = language;
        
    }, [language]);

    const [dataForm, setDataForm] = useState<RegisterForm>({
        email: "",
        firstName: "",
        lastName: "",
        password: "",
        confirmPassword: "",
        lg: language,
    });

    const { response, Error, Loading, Success, fetchRequest, params } = useRegister();
    const [validationErrors, setValidationErrors] = useState<Record<string, TerrorValidationForm | null>>({});
    
    const handleApiRequest = async () => {
        const response = await fetchRequest({data: dataForm, url: params.url, method:params.method});
        if (Success) {
          console.log("success ", response);
        } else {
          console.log("error", Error);
        }
      };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setDataForm({ ...dataForm, [name]: value });
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const newValidationErrors: Record<string, TerrorValidationForm | null> = {};
        form.forEach((field) => {
            const error = formValidation(field, dataForm, form);
            if (error) {
                newValidationErrors[field.name] = error;
            }
        });

        setValidationErrors(newValidationErrors);

        if (Object.keys(newValidationErrors).length > 0) {
            console.log("Il y a des erreurs " + JSON.stringify(newValidationErrors));
            return;
        }
        handleApiRequest();
    };

    return (
        <>
            <LoadingComp display={Loading} />
            {(Success && (
                <section className="flex items-baseline pt-52 bg-slate-300 justify-center h-full">
                    <div className="w-full max-w-md p-8 bg-white rounded-md shadow-md text-center mb-">
                        <h1 className="text-2xl font-semibold mb-2 text-black">{formSucess.title[language]}</h1>
                        <p className="text-black text-sm h-7">{response?.[language]}</p>
                        <p className="text-green-500 text-sm h-7">{formSucess.text[language]}</p>
                    </div>
                </section>
            )) || (
                <section className="flex items-center bg-slate-300 justify-center h-full">
                    <div className="w-full max-w-md p-8 bg-white rounded-md shadow-md">
                        <div className="text-red-700 text-center">{Error && Error[language]}</div>
                        <h1 className="text-2xl font-semibold mb-6 text-black">{formTranslate.title[language]}</h1>
                        <form onSubmit={handleSubmit} className="space-y-4">
                            {form.map((field) => (
                                <div key={field.name}>
                                    <label htmlFor={field.name} className="block text-sm font-medium text-gray-600">
                                        {field.label[language]}{field.validation?.required && <span className="text-red-500">*</span>}
                                    </label>
                                    <input
                                        autoComplete={field.name === "password" || field.name === "confirmPassword" ? "new-password" : "off"}
                                        type={field.name === "password" || field.name === "confirmPassword" ? "password" : "text"}
                                        id={field.name}
                                        name={field.name}
                                        placeholder={field.placeHolder[language]}
                                        value={dataForm[field.name]}
                                        onChange={handleInputChange}
                                        className="mt-1 p-2 w-full border rounded-md focus:outline-none focus:ring focus:border-blue-300 text-black"
                                    />
                                    <p className="text-red-500 text-xs m-1">{validationErrors[field.name]?.[language] && validationErrors[field.name]?.[language]}</p>
                                    {field.info && (
                                    <div className="info-text">
                                        <p className="text-gray-600 text-xs m-1" dangerouslySetInnerHTML={{ __html:field.info[language]}}></p>
                                    </div>
                                    )}
                                </div>
                            ))}
                            <button type="submit" className="bg-blue-500 text-white p-2 rounded-md w-full">
                                {formTranslate.submit[language]}
                            </button>
                        </form>
                        <p className="text-black text-sm mt-5">
                            {formTranslate.textFootFormA[language]}
                            <Link className="text-sky-600" href="/auth/connection" passHref>
                                {formTranslate.textFootFormB[language]}
                            </Link>
                        </p>
                    </div>
                </section>
            )}
        </>
    );
};

export default Register;
