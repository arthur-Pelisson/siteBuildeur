"use client";
import React, { useEffect, useState } from "react";
import { form, formTranslate } from "./form";
import { useLanguage } from "@/contextProvider/languageProvider";
import { connection } from "./type";
import { formValidation } from "@/utils/formValidation";
import Loading from "../../../components/loading";
import { useToken } from "@/contextProvider/tokenProvider";
import { useConnection } from "../../request/requestAuth";
import Link from "next/link";
import { useRouter } from "next/navigation";

type errorType = {
    fr: string;
    en: string;
};

const ConnectionPage = () => {

    const [user, setUser] = useState<connection>({
        email: "",
        password: "",
    });

    const { language } = useLanguage();
    const [validationErrors, setValidationErrors] = useState<Record<string, errorType | null>>({});
    const { response, Error: error, Success: success, Loading: loading, fetchRequest, params } = useConnection();
    const router = useRouter();
    useEffect(() => {
        console.log("loading: ", loading);
        if (success) {
            router.push("/");
        } else {
            console.log("error", error);
        }
    }, [response, success, error, loading]);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setUser({ ...user, [name]: value });
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const newValidationErrors: Record<string, errorType | null> = {};
        form.forEach((field) => {
            const error = formValidation(field, user, form);
            if (error) {
                newValidationErrors[field.name] = error;
            }
        });

        setValidationErrors(newValidationErrors);

        if (Object.keys(newValidationErrors).length > 0) {
            console.log("Il y a des erreurs " + JSON.stringify(newValidationErrors));
            return;
        }

        await fetchRequest({ data: user, url: params.url, method: params.method });
    };

    return (
        <div className="flex bg-slate-300 items-center justify-center " style={{ height: `calc(100vh - 4rem - 3rem)` }}>
            <Loading display={loading} />
            <div className="w-full max-w-md p-8 bg-white rounded-md shadow-md">
                <div className="text-red-700 text-center">{error && error[language]}</div>
                <h1 className="text-2xl font-semibold mb-6 text-black">{formTranslate.title[language]}</h1>
                <form onSubmit={handleSubmit} className="space-y-4">
                    {form.map((field) => (
                        <div key={field.name}>
                            <label htmlFor={field.name} className="block text-sm font-medium text-gray-600">
                                {field.label[language]}
                            </label>
                            <input
                                type={field.name === "password" || field.name === "confirmPassword" ? "password" : "text"}
                                id={field.name}
                                autoComplete="on"
                                name={field.name}
                                placeholder={field.placeHolder[language]}
                                value={user[field.name]}
                                onChange={handleInputChange}
                                className="mt-1 p-2 w-full border rounded-md focus:outline-none focus:ring focus:border-blue-300 text-black"
                            />
                            <p className="text-red-500 text-sm h-3">{validationErrors[field.name] && validationErrors[field.name]?.[language]}</p>
                        </div>
                    ))}
                    <button type="submit" className="bg-blue-500 text-white p-2 rounded-md w-full">
                        {formTranslate.submit[language]}
                    </button>
                </form>
                <p className="text-black text-sm mt-5">
                    {formTranslate.textFootFormA[language]}
                    <Link className="text-sky-600" href="/auth/register" passHref>
                        {formTranslate.textFootFormB[language]}
                    </Link>
                </p>
                <p className="text-black text-sm mt-1">
                    {formTranslate.forgotPassword[language]}  &nbsp;
                    <Link className="text-sky-600" href="/auth/forgotPassword" passHref>
                        {formTranslate.forgotPasswordLink[language]}
                    </Link>
                </p>
            </div>
        </div>
    );
};

export default ConnectionPage;
