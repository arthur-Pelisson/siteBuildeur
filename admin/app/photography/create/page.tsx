"use client";
import { FormBuildeur, CreateData } from "@/components/formBuildeur.tsx/formBuildeur";
import { getAllMaps } from "@/app/request/requestMaps";
import { useEffect, useState } from "react";
import { dataForm } from "../dataForm";
import { createPost } from "@/app/request/requestPost";
import SnackBar, { TtypeSnackB } from "@/components/snackBar/snackBar";
import { useRouter } from "next/navigation";
import Loading from "@/components/loading/loading";
import { Button } from "@mui/material";
import KeyboardReturnIcon from '@mui/icons-material/KeyboardReturn';

type TdataCreatePOst = {
    tags: number[];
    slug: string;
    images: string[];
    translation: {
        language: string;
        title: string;
        content: string;
    }[];
    data: {
        image: string;
    };
};

const PageCreatePhoto = () => {
    const { data, setData, dataSetStatus } = CreateData(dataForm);

    console.log("testtttt", data);
    const {
        response: responseCreatePost,
        Error: errorCreatePost,
        Loading: loadingCreatePost,
        Success: successCreatePost,
        fetchRequest: fetchCreatePost,
        params: paramsCpost,
    } = createPost();
    const [snack, setSnack] = useState({ open: false, message: "", type: "success" });
    const router = useRouter();

    useEffect(() => {
        // console.log("responseCreatePost : ", responseCreatePost);
        console.log("errorCreatePost : ", errorCreatePost);
        // console.log("loadingCreatePost : ", loadingCreatePost);
        // console.log("successCreatePost : ", successCreatePost);
        if (responseCreatePost && successCreatePost && !loadingCreatePost) {
            setSnack({ open: true, message: "Article créé avec succès", type: "success" });
            setTimeout(() => {
                router.push("/photography");
            }, 2000);
        }
        if (errorCreatePost && !loadingCreatePost) {
            setSnack({ open: true, message: "Erreur lors de la création de l'article : " + errorCreatePost, type: "error" });
        }
    }, [responseCreatePost, errorCreatePost, loadingCreatePost, successCreatePost]);

    const handleDataChange = (name: string, value: string, lg: string) => {
        console.log("name : ", name);
        console.log("value : ", value);
        if (lg != undefined && lg != null && lg != "") {
            setData({ ...data, [name]: { ...data[name], [lg]: value } });
        } else {
            setData({ ...data, [name]: value });
        }
        console.log("handledatachangeevent : ", data);
    };

    const serialize = (data: any) => {
        const dataPost: TdataCreatePOst = {
            tags: data.tags,
            slug: data.slug,
            images: data.multipleImages,
            translation: ["fr", "en"].map((lg: string) => {
                return {
                    language: lg,
                    title: data.title[lg],
                    content: data.content[lg],
                };
            }),
            data: {
                image: data.image,
            },
        };
        return dataPost;
    };

    const handleSubmite = () => {
        const post = serialize(data);
        fetchCreatePost({ url: paramsCpost.url + "photography", data: post, method: paramsCpost.method });
        // console.log("post : ", post);
    };

    return (
        <div>
            <SnackBar
                open={snack.open}
                message={snack.message}
                type={snack.type as TtypeSnackB}
                timeDuration={4000}
                position={{ vertical: "top", horizontal: "center" }}
            />

            <h1 className="text-center text-3xl underline">Création de séries de photos</h1>
            <div className="fixed">
                <Button variant="contained" onClick={() => router.back()}>
                    {" "}
                    <KeyboardReturnIcon /> Retour
                </Button>
            </div>
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
    );
};

export default PageCreatePhoto;
