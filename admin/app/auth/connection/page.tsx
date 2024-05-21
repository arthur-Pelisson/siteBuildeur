"use client";
import React, { useEffect, useState } from "react";
import { form, formTranslate } from "./form";
import { connection } from "./type";
import { formValidation } from "@/utils/formValidation";
import Loading from "@/components/loading/loading";
import { useToken } from "@/contextProvider/tokenProvider";
import { useConnection } from "../../request/requestAuth";
import { useRouter } from "next/navigation";
import { getLogo } from "@/components/logos/logos";
import LockIcon from '@mui/icons-material/Lock';
import EmailIcon from '@mui/icons-material/Email';


type errorType = {
    fr: string;
    en: string;
};

const ConnectionPage = () => {

    const [user, setUser] = useState<connection>({
        email: "",
        password: "",
    });
    const [validationErrors, setValidationErrors] = useState<Record<string, errorType | null>>({});
    const { setToken, token } = useToken();
    const [ready, setReady] = useState(false);
    const { response, Error: error, Success: success, Loading: loading, fetchRequest, params } = useConnection();
    const router = useRouter();
    useEffect(() => {
        console.log("loading: ", loading);
        if (success && !error && response) {
            console.log("response : ", response);
            console.log("token : ", response?.["token"]);
            // setTokenCookie(response?.["token"] as unknown as Token);
            // setToken(true);
            router.push("/");
        } 
        if (error && !loading) {
            console.log("error", error);
            setReady(false);
        }
        
    }, [response, success, error, loading, token]);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setUser({ ...user, [name]: value });
    };

    const desableButtonColor = () => {
        if (user.email === "" || user.password === "") {
            return "bg-gray-400 cursor-not-allowed";
        }
        return "bg-blue-500";
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
        setReady(true);
        await fetchRequest({ data: user, url: params.url, method: params.method });
    };
    return (
        <main className="flex bg-slate-300 items-center justify-center " style={{ height: "100%" }}>
            {ready &&<Loading display={ready} notInModal={false}/>}
            <div className="w-full max-w-md p-8 bg-white rounded-md shadow-md">
                <div className="text-red-700 text-center">{error && error}</div>
                <h1 className="text-2xl font-semibold mb-6 text-black">{formTranslate.title}</h1>
                <form onSubmit={handleSubmit} className="space-y-4">
                    {form.map((field) => (
                        <div key={field.name}>
                            <label htmlFor={field.name} className="block text-sm font-medium text-gray-600">
                                {field.label}
                            </label>
                            <div className="flex flex-row">
                                {field.name === "password" && <span className="text-black m-auto mr-1"><LockIcon/></span>}
                                {field.name === "email" && <span className="text-black m-auto mr-1"><EmailIcon/></span>}
                                <input
                                    type={field.name === "password" || field.name === "confirmPassword" ? "password" : "text"}
                                    id={field.name}
                                    autoComplete="on"
                                    name={field.name}
                                    placeholder={field.placeHolder}
                                    value={user[field.name]}
                                    onChange={handleInputChange}
                                    className="mt-1 p-2 w-full border rounded-md focus:outline-none focus:ring focus:border-blue-300 text-black"
                                />
                            </div>
                            <p className="text-red-500 text-sm h-3">{validationErrors[field.name] && validationErrors[field.name]}</p>
                        </div>
                    ))}
                    <button type="submit" disabled={user.email === "" ? true: false || user.password === "" ? true : false} className={`text-white p-2 rounded-md w-full ${desableButtonColor()}`}>
                        {formTranslate.submit}
                    </button>
                </form>
            </div>
        </main>
    );
};

export default ConnectionPage;
