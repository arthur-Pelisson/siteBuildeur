"use client";
import getParagraph from "@/components/getParagraph";
import { useLanguage } from "@/contextProvider/languageProvider";
import { form, otherText } from "./form";
import { useEffect, useState } from "react";
import { Button, Card, CardContent, Divider } from "@mui/material";
import { formValidation } from "@/utils/formValidation";
import { sendMail } from "@/app/request/requestSendMail";
import SnackBar from "@/components/snackBar";

type errorType = {
    fr: string;
    en: string;
};

const messageSnack = {
    error: {
        fr: "Une erreur s'est produite",
        en: "An error has occurred",
    },
    success: {
        fr: "Votre message a bien été envoyé",
        en: "Your message has been sent",
    },
};
const ContactAbout = () => {
    const { language } = useLanguage();
    const { Loading, Error, Success, response, fetchRequest, params } = sendMail();
    const [validationErrors, setValidationErrors] = useState<Record<string, errorType | null>>({});
    const [snackBar, setSnackBar] = useState({ open: false, message: "", type: "" });
    const [data, setData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        message: "",
        society: "",
    });
    useEffect(() => {
        console.log("response : ", response);
        console.log("Success : ", Success);
        console.log("Error : ", Error);
        
        if (Error) {
            if (Error?.[language]) {
                setSnackBar({ open: true, message: Error[language], type: "error" });
                return;
            }
            setSnackBar({ open: true, message: messageSnack.error[language], type: "error" });
            return;
        }
        if (Success) {
            setData({
                firstName: "",
                lastName: "",
                email: "",
                message: "",
                society: "",
            });
            setSnackBar({ open: true, message: messageSnack.success[language], type: "success" });
            return;
        }
    }, [response, Success, Error]);

    const handleChange = (e) => {
        setSnackBar({ open: false, message: "", type: "" });
        setData({ ...data, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const newValidationErrors: Record<string, errorType | null> = {};
        form.forEach((field) => {
            const error = formValidation(field, data, form);
            if (error) {
                newValidationErrors[field.name] = error;
            }
        });

        setValidationErrors(newValidationErrors);

        if (Object.keys(newValidationErrors).length > 0) {
            console.log("Il y a des erreurs " + JSON.stringify(newValidationErrors));
            return;
        }

        await fetchRequest({ data: data, url: params.url, method: params.method });
    };
    console.log("validationErrors : ", validationErrors);
    console.log("snackbar : ", snackBar);
    return (
        <>
            <SnackBar
                message={snackBar.message}
                type={snackBar.type}
                open={snackBar.open}
                timeDuration={4000}
                position={{ vertical: "top", horizontal: "center" }}
            />
             <div className="w-[50%] m-auto text-white ">{getParagraph("contact")}</div>
                <div className="flex flex-col items-center justify-center w-[80%] m-auto mb-8">
                    <div className="flex justify-center flex-row w-[100%] sm:w-[80%] lg:w-[70%] md:w-[80%] flex-wrap">
                        {form.map((field) => {
                            return (
                                <div className="w-[50%] flex flex-col items-center justify-center">
                                    <label
                                        className={`block mt-3 text-sm font-medium !text-eggs ${
                                            field.type === "textarea" ? "w-[180%]" : "w-[80%]"
                                        } text-left `}
                                    >
                                        {field.label[language]}
                                    </label>
                                    {field.type === "textarea" ? (
                                        <textarea
                                            name={field.name}
                                            id={field.name}
                                            value={data[field.name]}
                                            onChange={handleChange}
                                            className={`w-[180%]  h-[300px] px-3 py-2 text-gray-700 border rounded-lg focus:outline-none ${
                                                validationErrors[field.name] ? "border-red-500" : ""
                                            }`}
                                            placeholder={field.placeHolder[language]}
                                        ></textarea>
                                    ) : (
                                        <input
                                            type={field.type}
                                            name={field.name}
                                            value={data[field.name]}
                                            onChange={handleChange}
                                            id={field.name}
                                            className={`w-[80%] px-3 py-2 text-gray-700 border rounded-lg focus:outline-none ${
                                                validationErrors[field.name] ? "border-red-500" : ""
                                            }`}
                                            placeholder={field.placeHolder[language]}
                                        />
                                    )}
                                    <p className="text-red-500 text-xs h-3">
                                        {validationErrors[field.name] && validationErrors[field.name]?.[language]}
                                    </p>
                                </div>
                            );
                        })}
                    </div>
                    <Button onClick={handleSubmit} variant="contained" className="btn " sx={{ marginTop: "1rem" }}>
                        {otherText.submit[language]}
                    </Button>
            </div>
        </>
    );
};

export default ContactAbout;
