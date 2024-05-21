"use client";
import { FormBuildeur, CreateData } from "@/components/formBuildeur.tsx/formBuildeur";
import { useEffect, useState } from "react";
import { dataForm, TdataCreatePost } from "../dataForm";
import { createPost } from "@/app/request/requestPost";
import SnackBar, { TtypeSnackB } from "@/components/snackBar/snackBar";
import { useRouter } from 'next/navigation';

const CreateBlogPage = () => {
    const { data, setData, dataSetStatus } = CreateData(dataForm);
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
        console.log("data : ", data);
    }, [data]);

    useEffect(() => {
        console.log("responseCreatePost : ", responseCreatePost);
        console.log("errorCreatePost : ", errorCreatePost);
        console.log("loadingCreatePost : ", loadingCreatePost);
        console.log("successCreatePost : ", successCreatePost);
        if (responseCreatePost && successCreatePost && !loadingCreatePost) {
            setSnack({ open: true, message: "Article créé avec succès", type: "success" });
            setTimeout(() => {
                router.push("/blog");
            }, 2000);
        }
        if (errorCreatePost && !loadingCreatePost) {
            setSnack({ open: true, message: "Erreur lors de la création de l'article : " + errorCreatePost, type: "error" });
        }
    }, [responseCreatePost, errorCreatePost, loadingCreatePost, successCreatePost]);

    const handleDataChange = (name: string, value: any, lg:string) => {
        if (lg != undefined && lg != null && lg != "") {
            setData({ ...data, [name]: { ...data[name], [lg]: value } });
        } else {
            setData({ ...data, [name]: value });
        }
    };

    const serialize = (data: any) => {
        const dataPost: TdataCreatePost = {
            tags: data.tags,
            slug: data.slug,
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
        fetchCreatePost({ url: paramsCpost.url + "blog", data: post, method: paramsCpost.method });
        console.log("post : ", post);
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

            <h1 className="text-center text-3xl underline">Création d'article</h1>
            <div className="flex flex-col">
                {dataSetStatus && (
                    <div className="flex flex-col justify-center items-center w-[100%]">
                        <FormBuildeur submit="Créer" dataForm={dataForm} data={data} callBackData={handleDataChange} callBackHandleSubmite={handleSubmite} />
                    </div>
                )}
            </div>
        </div>
    );
};

export default CreateBlogPage;
