"use client";
import { FormBuildeur, CreateData } from "@/components/formBuildeur.tsx/formBuildeur";
import { useEffect, useState, use } from 'react';
import { dataForm } from "../dataForm";
import { getPostBySlug, setPublishPost, updatePost } from "@/app/request/requestPost";
import SnackBar, { TtypeSnackB } from "@/components/snackBar/snackBar";
import { useRouter } from 'next/navigation';
import { useSearchParams } from "next/navigation";
import { Button } from "@mui/material";
import Loading from "@/components/loading/loading";

type TdataCreatePOst = {
    tags: number[];
    slug: string;
    translation: {
        language: string;
        title: string;
        content: string;
    }[];
};

const EditeParagraphPage = () => {
    const { data, setData, dataSetStatus } = CreateData(dataForm);
    const searchParams = useSearchParams();
    const slug = searchParams.get('slug');


    const { response: content, Error: errorContent, Loading: loadingContent, Success: successContent } = getPostBySlug(slug, "text");
    const {
        response: responseUpdatePost,
        Error: errorUpdatePost,
        Loading: loadingUpdatePost,
        Success: successUpdatePost,
        fetchRequest: fetchUpdatePost,
        params: paramsUpost,
    } = updatePost();
    const { response: resPublish, Error: errorPublish, Success: successPublish, Loading: loadingPublish, fetchRequest: publishFetch, params: publishParams } = setPublishPost();
    const [ready, setReady] = useState(false);
    const [snack, setSnack] = useState({ open: false, message: "", type: "" });
    const router = useRouter();

    useEffect(() => {
        console.log("data : ", data);
    }, [data]);


    useEffect(() => {
        if (responseUpdatePost && successUpdatePost && !loadingUpdatePost) {
            setSnack({ open: true, message: "Article mis à jour avec succès", type: "success" });
            setTimeout(() => {
                setSnack({ open: false, message: "", type: "" });
            }, 4000);
            return;
        }
        if (errorUpdatePost && responseUpdatePost && !loadingUpdatePost) {
            setSnack({ open: true, message: "Erreur lors de la mis a jour de l'article", type: "error" });
            setTimeout(() => {
                setSnack({ open: false, message: "", type: "" });
            }, 4000);
            return;
        }
    }, [responseUpdatePost, errorUpdatePost, loadingUpdatePost, successUpdatePost]);

    const reduceObject = (obj: any) => {
        return Object.keys(obj).reduce((acc, key) => {
            return { ...acc, ...obj[key] };
        }, {});
    };

    useEffect(() => {
        if (content && successContent && !loadingContent) {
            // console.log("content : ", content);
            setData({
                slug: (content as any).slug,
                title: reduceObject((content as any).translations.map((tr:any) => {
                    return { [tr.language]: tr.title };
                })),
                    
                
                content: reduceObject((content as any).translations.map((tr: any) => {
                    return { [tr.language]: tr.content };
                })),
            });
            setReady(true);
        }
    }, [content]);

    useEffect(() => {
        if (successUpdatePost && !loadingUpdatePost) {
            setSnack({ open: true, message: "Article mis à jour avec succès", type: "success" });
            return;
        }
        if (errorUpdatePost && !loadingUpdatePost) {
            setSnack({ open: true, message: "Erreur lors de la mis a jour de l'article : " + errorUpdatePost, type: "error" });
            return;
        }
    }, [responseUpdatePost, errorUpdatePost, loadingUpdatePost, successUpdatePost]);

    const handleDataChange = (name: string, value: any, lg:string) => {
        if (lg != undefined && lg != null && lg != "") {
            setData({ ...data, [name]: { ...data[name], [lg]: value } });
        } else {
            setData({ ...data, [name]: value });
        }
    };

    const serialize = (data: any) => {
        const dataPost: TdataCreatePOst = {
            tags: [],
            slug: data.slug,
            translation: ["fr", "en"].map((lg: string) => {
                return {
                    language: lg,
                    title: data.title[lg],
                    content: data.content[lg],
                };
            }),
        };
        return dataPost;
    };

    const setPublish = async () => {
        const waiter = await publishFetch({ url: publishParams.url + "text/publishe/" + (content as any)?.id , method: publishParams.method });
        if (waiter) {
            (content as any).published = !(content as any)?.published;
            setSnack({ open: true, message: "Status mis à jour", type: "success" });
            setTimeout(() => {
                setSnack({ open: false, message: "", type: "" });
            }, 4000);
        }
        if (!waiter) {
            (content as any).published = !(content as any)?.published;
            setSnack({ open: true, message: "Une erreur ces produite", type: "error" });
            setTimeout(() => {
                setSnack({ open: false, message: "", type: "" });
            }, 4000);
        }
    };

    const handleSubmite = async () => {
        const post = serialize(data);
        setSnack((prevSnack) => ({ ...prevSnack, open: false, message: "", type: "" }));
        fetchUpdatePost({ url: paramsUpost.url + "text/" + (content as any)?.id, data: post, method: paramsUpost.method });
    };

    if (loadingContent || !ready) {
        return <Loading display={true}/>
    
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
            <h1 className="text-center text-3xl underline">Modification de paragraphe</h1>
            <div className="w-[100%] mt-5">
                <div className="w-fit m-auto">
                    <Button className="m-auto" disabled={loadingPublish == true ? true : false} variant="contained" color={(content as any)?.published === true ? "error" : "success"} onClick={() => setPublish()}>
                        {(content as any)?.published === true ? "Dépublier l'article" : "Publier l'article"}
                    </Button>
                </div>
            </div>
            <div className="flex flex-col justify-center items-center">
                {dataSetStatus && (
                    <div className="flex flex-col justify-center items-center w-[100%]">
                        <FormBuildeur submit="Update" dataForm={dataForm} data={data} callBackData={handleDataChange} callBackHandleSubmite={handleSubmite} />
                    </div>
                )}
            </div>
        </div>
    );
};

export default EditeParagraphPage;
