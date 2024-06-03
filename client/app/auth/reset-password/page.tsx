"use client";
import { useLanguage } from "@/contextProvider/languageProvider";
import Loading from "@/components/loading";
import { errorType } from "@/app/types/formValidation";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { resetPassword } from "@/app/request/requestAuth";
import { form, formTranslate } from "./form";
import { formValidation } from "@/utils/formValidation";
import { Button } from "@mui/material";
import { useRouter } from 'next/navigation';

const pageResetPassword = () => {
    const router = useRouter();
    const searchParams = useSearchParams();
    const { language } = useLanguage();
    const token = searchParams.get("token");
    const [data, setData] = useState({ password: "", confirmPassword: "" });
    const [validationErrors, setValidationErrors] = useState<Record<string, errorType | null>>({});
    const { response, Loading:loading, Error, Success, fetchRequest, params } = resetPassword();
    const [disableBtn, setDisableBtn] = useState(false);
    const [error, setError] = useState<string>("");
    useEffect(() => {
        if (Success && !loading && response) {
            router.push("/auth/connection");
        }

        if (!Success && !loading && response) {
            setError(Error);
        }
    }, [response, loading, Error, Success]);

    const handleChange = (e) => {
        setDisableBtn(false);
        setData({ ...data, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const newValidationErrors: Record<string, errorType | null> = {};
        form.forEach((field) => {
            const error = formValidation(field, data, form);
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

        await fetchRequest({ data: data, url: params.url + token, method: params.method });
    };

    return (
        <div className="margin:auto sm:relative mt-10 md:mt-0 md:absolute md:top-[20%] md:bottom-0 md:left-0 md:right-0">
            <Loading display={loading} />
            <div
                className="bg-white sm:w-[90%] md:w-[70%] lg:max-w-[500px]  lg:w-[50%] min-h-[300px] m-auto flex flex-col rounded-lg"
                style={{ boxShadow: "0px 10px 7px 2px grey" }}
            >
                <div>
                    <h1 className="text-2xl text-center mt-3" dangerouslySetInnerHTML={{ __html: formTranslate.title[language] }}></h1>
                </div>
                <div>
                    <p>{error !== "" && (
                        <div className="bg-red-200 p-2 text-red-500 text-center">
                            {error}
                        </div>
                    )}</p>
                </div>
                <div>
                    <h2 className="text-base text-center mt-5" dangerouslySetInnerHTML={{ __html: formTranslate.description[language] }}></h2>
                </div>
                <div className="w-[80%] md:w-[40%] lg:w-[50%] text-center m-auto flex flex-col">
                    <form onSubmit={handleSubmit}>
                        {form.map((field, index) => {
                            return (
                                <div key={index}>
                                    <label htmlFor={field.name} className="block text-sm font-medium text-gray-600">
                                        {field.label[language]}
                                    </label>
                                    <input
                                        type={field.type}
                                        name={field.name}
                                        id={field.name}
                                        value={data[field.name]}
                                        onChange={handleChange}
                                        className="mt-1 p-2 w-full border border-black rounded-md focus:outline-none focus:ring focus:border-blue-300 text-black"
                                    />
                                    <p className={`text-red-500 text-sm h-[50px] ${validationErrors !== null ? "" : "opacity-0"}`}>
                                        {validationErrors[field.name] && validationErrors[field.name]?.[language]}
                                    </p>
                                </div>
                            );
                        })}
                        <Button type="submit" disabled={disableBtn} variant="contained" className="btn btn-primary !m-5">
                            {formTranslate.submit[language]}
                        </Button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default pageResetPassword;