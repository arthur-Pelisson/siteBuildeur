"use client";
import { useEffect, useState } from "react";
import Modal from "@/components/modal";
import dataForm from "./dataForm";
import { FormBuildeur, CreateData } from "@/components/formBuildeur.tsx/formBuildeur";
import { formValidation } from "@/utils/formValidation";
import { createTag } from "../request/requestTag";
import { Language } from "../../../client/contextProvider/languageProvider";
import SnackBar, {TtypeSnackB} from "@/components/snackBar/snackBar";


const CreateTags = ({ open, close, successCreate }: { open: boolean; close: () => void, successCreate: () => void }) => {
    const { data, setData, dataSetStatus } = CreateData(dataForm);
    const {
        response: responseCreateTag,
        Error: errorCreateTag,
        Loading: loadingCreateTag,
        Success: successCreateTag,
        fetchRequest: fetchCreateTag,
        params: paramsCtag,
    } = createTag();
    const [snack, setSnack] = useState({ open: false, message: "", type: "" });
    useEffect(() => {}, [open]);

    useEffect(() => {
        console.log("data : ", data);
    }, [data]);

    useEffect(() => {
        if (responseCreateTag && successCreateTag && !loadingCreateTag) {
            setSnack({ open: true, message: "Tag créé avec succès", type: "success" });
            setTimeout(() => {
                successCreate();
                close();
            }, 2000);
        }
        if (errorCreateTag && !loadingCreateTag) {
            setSnack({ open: true, message: "Erreur lors de la création du tag : " + errorCreateTag, type: "error" });
        }
    }, [responseCreateTag, errorCreateTag, loadingCreateTag, successCreateTag]);

    const handleSubmite = () => {
        console.log("data handle submite: ", data);
        const tag = serialize(data);
        console.log("tag handle submite: ", tag);
        fetchCreateTag({ url: paramsCtag.url, data: tag, method: paramsCtag.method });
        console.log("post : ", tag);
    };

    const serialize = (data: any) => {
        const newData = [];
        for (const key in data.tag) {
            console.log("key : ", key);
            console.log("data.tag[key] : ", data.tag[key]);
            const obj = {
                name: data.tag[key],
                language: key,
            };
            newData.push(obj);
        }
        return newData;
    };

    const handleDataChange = (name: string, value: any, lg: string) => {
        if (lg != undefined && lg != null && lg != "") {
            setData({ ...data, [name]: { ...data[name], [lg]: value } });
        } else {
            setData({ ...data, [name]: value });
        }
    };

    return (
        <>
            <SnackBar
                open={snack.open}
                message={snack.message}
                type={(snack.type as TtypeSnackB)}
                timeDuration={3000}
                position={{ vertical: "top", horizontal: "center" }}
            ></SnackBar>
            <Modal isOpen={open} style={{ width: "60%" }} close={close}>
                <div>
                    <h1 className="text-center text-lg">Créer un tag</h1>
                    <div>
                        <div className="flex flex-col">
                            {dataSetStatus && (
                                <div className="flex flex-col justify-center items-center w-[100%]">
                                    <FormBuildeur
                                        submit="Créer"
                                        dataForm={dataForm}
                                        data={data}
                                        callBackData={handleDataChange}
                                        callBackHandleSubmite={handleSubmite}
                                    />
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </Modal>
        </>
    );
};

export default CreateTags;
