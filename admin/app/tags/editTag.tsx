"use client";
import { useEffect, useState } from "react";
import Modal from "@/components/modal";
import dataForm from "./dataForm";
import { FormBuildeur, CreateData } from "@/components/formBuildeur.tsx/formBuildeur";
import { formValidation } from "@/utils/formValidation";
import { updateTag, getTagById } from "../request/requestTag";
import { Language } from "../../../client/contextProvider/languageProvider";
import SnackBar, {TtypeSnackB} from "@/components/snackBar/snackBar";


const EditTags = ({ open, close, successUpdateCallback, id }: { open: boolean; close: () => void, successUpdateCallback: () => void, id:number }) => {
    const { data, setData, dataSetStatus } = CreateData(dataForm);
    const [snack, setSnack] = useState({ open: false, message: "", type: "" });

    const {response : responseGetTag, Error: errorGetTag, Loading: loadingGetTag, Success: successGetTag, fetchRequest: FgetTag, params:paramsGetTag} = getTagById();

    const {
        response: responseUpdate,
        Error: errorUpdate,
        Loading: loadingUpdate,
        Success: successUpdate,
        fetchRequest: fetchUpdate,
        params: paramsUpdatetag,
    } = updateTag();

    useEffect(() => {
        FgetTag({url: paramsGetTag.url + "/" + id, method: paramsGetTag.method});
    }, []);

    useEffect(() => {
        if (responseGetTag && successGetTag && !loadingGetTag) {
            console.log("responseGetTag : ", responseGetTag);
            let newData = {};
            (responseGetTag as any).tag_translate.map((tag:any) => {
                newData = {...newData, [tag.language]: tag.name};
            });
            setData({tag:newData});
        }
    }, [responseGetTag, errorGetTag, loadingGetTag, successGetTag]);

    useEffect(() => {
        console.log("data : ", data);
    }, [data]);

    useEffect(() => {
        if (responseUpdate && successUpdate && !loadingUpdate) {
            setSnack({ open: true, message: "Tag modifier avec succès", type: "success" });
            setTimeout(() => {
                successUpdateCallback();
                close();
            }, 2000);
        }
        if (errorUpdate && !loadingUpdate) {
            setSnack({ open: true, message: "Erreur lors de la modification du tag : " + errorUpdate, type: "error" });
        }
    }, [responseUpdate, errorUpdate, loadingUpdate, successUpdate]);


    const handleSubmite = () => {
        console.log("data handle submite: ", data);
        const tag = serialize(data);
        console.log("tag handle submite: ", tag);
        fetchUpdate({ url: paramsUpdatetag.url + "/" + id, data: tag, method: paramsUpdatetag.method });
        console.log("post : ", tag);
    };

    const serialize = (data: any) => {
        const newData = [];
        for (const key in data.tag) {
            // console.log("key : ", key);
            // console.log("data.tag[key] : ", data.tag[key]);
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
                    <h1 className="text-center text-lg">Modifier un tag</h1>
                    <div>
                        <div className="flex flex-col">
                            {dataSetStatus && (
                                <div className="flex flex-col justify-center items-center w-[100%]">
                                    <FormBuildeur
                                        submit="Update"
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

export default EditTags;
