"use client";
import { useEffect, useState } from "react";
import { getPostByType, deletePostById, setPublishPost } from "../request/requestPost";
import Loading from "@/components/loading/loading";
import useTranslation from "@/hooks/translation/useTranslation";
import { Button, Tooltip } from "@mui/material";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import EditIcon from "@mui/icons-material/Edit";
import { DataGrid, GridColDef, GridValueGetterParams } from "@mui/x-data-grid";
import dayjs from "dayjs";
import { Divider } from "@nextui-org/divider";
import Badge from "@mui/material/Badge";
import AlertDialog from "@/components/snackBar/confirmDialog";
import SnackBar from "@/components/snackBar/snackBar";
import { PathParamsContext } from "next/dist/shared/lib/hooks-client-context.shared-runtime";
import snackBar from "@/components/snackBar/snackBar";
import { TtypeSnackB } from "@/components/snackBar/snackBar";
import AddIcon from "@mui/icons-material/Add";
import CancelIcon from "@mui/icons-material/Cancel";
import Link from "next/link";
import VisibilityIcon from '@mui/icons-material/Visibility';


const PagePhotography = () => {
    const [posts, setPosts] = useState(null);
    const { response: respost, Error: errpost, Loading: loadpost, Success: successpost } = getPostByType("photography");
    const {
        response: resdelete,
        Error: errdelete,
        Loading: loaddelete,
        Success: successdelete,
        fetchRequest: FdeletePost,
        params: deleteParams,
    } = deletePostById();
    const {
        response: respublish,
        Error: errpublish,
        Loading: loadpublish,
        Success: successpublish,
        fetchRequest: FpublishPost,
        params: publishParams,
    } = setPublishPost();
    const { getTranslation: t } = useTranslation();
    const [openDialog, setOpenDialog] = useState(false);
    const [itemToDelete, setItemToDelete] = useState({ id: 0, title: "" });
    const [itemToPublish, setItemToPublish] = useState({ id: 0, title: "", published: false });
    const [snackBar, setSnackBar] = useState({ open: false, message: "", type: "" });

    useEffect(() => {
        if (successpost) {
            setPosts(respost);
        }
        console.log("error", errpost);
    }, [respost, errpost, loadpost, successpost]);

    useEffect(() => {
        if (successdelete && !loaddelete) {
            setSnackBar({ open: true, message: "photographie suprimmé avec succès", type: "success" });
            console.log("itemToDelete", itemToDelete);
            console.log("posts", posts);
            setPosts((posts as any).filter((post: any) => post.id !== itemToDelete.id));
            setItemToDelete({ id: 0, title: "" });
        }
        if (errdelete && !loaddelete) {
            setSnackBar({ open: true, message: "Erreur lors de la supression de photographie", type: "error" });
            setItemToDelete({ id: 0, title: "" });
        }
    }, [resdelete, errdelete, loaddelete, successdelete]);

    useEffect(() => {
        if (successpublish && !loadpublish) {
            let message = "";
            if (itemToPublish?.published) {
                message = "photographie dépuplier avec succès";
            } else {
                message = "photographie publier avec succès";
            }
            setSnackBar({ open: true, message: message, type: "success" });
            setPosts(
                (posts as any).map((post: any) => {
                    if (post.id === itemToPublish.id) {
                        post.published = !post.published;
                    }
                    return post;
                })
            );
            setItemToPublish({ id: 0, title: "", published: false });
        }
        if (errpublish && !loadpublish) {
            setSnackBar({ open: true, message: "Erreur lors de la publication de photographie", type: "error" });
            setItemToPublish({ id: 0, title: "", published: false });
        }
    }, [respublish, errpublish, loadpublish, successpublish]);

    const handleDeleteItem = (IDitemToDelete: number, titleItem: string) => {
        setItemToDelete({ id: IDitemToDelete, title: titleItem });
        setOpenDialog(true);
    };

    const handlePublish = (IDitemToPublish: number, titleItem: string, published: boolean) => {
        setOpenDialog(false);
        setItemToPublish({ id: IDitemToPublish, title: titleItem, published: published });
        FpublishPost({ url: `${publishParams.url}photography/publishe/${IDitemToPublish}`, method: publishParams.method });
    };

    const handleConfirmDeleteMedia = async (response: boolean) => {
        setOpenDialog(false);
        if (!response) return;
        setSnackBar({ open: false, message: "", type: "" });
        FdeletePost({ url: `${deleteParams.url}photography/${itemToDelete.id}`, method: deleteParams.method });
    };

    return (
        <div className="text-center">
            <AlertDialog
                openDial={openDialog}
                callbackResponse={handleConfirmDeleteMedia}
                btnOk={"Confirmer"}
                btnRefuse={"Annuler"}
                title="Suprimmer la serie de photographie"
                message={`Etes vous sure de vouloir suprimer cette serie de photo "${itemToDelete.title}" ? `}
            />
            <SnackBar
                open={snackBar.open}
                message={snackBar.message}
                type={snackBar.type as TtypeSnackB}
                timeDuration={4000}
                position={{ vertical: "top", horizontal: "center" }}
            />
            <h1 className="text-4xl mb-3 underline">Photos</h1>
            <div className="flex flex-col justify-center items-center">
                <div className="w-[100%] text-center mb-4">
                    <Button className="!m-auto " variant="contained" href="/photography/create">
                        Ajouter une séries de photos
                    </Button>
                </div>
                <div className="h-[80%] w-[90%] text-center">
                    {loadpost && <Loading />}
                    {posts && (
                        <DataGrid
                            rows={posts}
                            columns={[
                                { field: "id", headerName: "ID", width: 130 },
                                {
                                    field: "slug",
                                    headerName: "Nom unique",
                                    width: 130,
                                    headerAlign: "center",
                                    align: "center",
                                    description: "Nom unique du post",
                                    renderCell: (params: GridValueGetterParams) => {
                                        return (
                                            <Link  target="_blank" className='hover:text-sky-500' href={`${process.env.NEXT_PUBLIC_API_CLIENTHOST}/photography?slug=${encodeURIComponent(params.row.slug)}`}>
                                                {params.row.slug}
                                            </Link>
                                        );
                                    },
                                },
                                {
                                    field: "title",
                                    headerName: "Titre",
                                    width: 130,
                                    description: "Titre du post de photo",
                                    headerAlign: "Left",
                                    flex: 1,
                                    type: "string",
                                    valueGetter: (params: GridValueGetterParams) => {
                                        return t(params.row.translations, "title", "fr");
                                    },
                                    // renderCell: (params: GridValueGetterParams) => {
                                    //     return t(params.row.translations, "title", "fr");
                                    // },
                                    sortComparator: (v1, v2, cellParams1: GridValueGetterParams, cellParams2: GridValueGetterParams) => {
                                        return v1.toString().localeCompare(v2.toString());
                                    },
                                },
                                {
                                    field: "published",
                                    headerName: "Status",
                                    width: 130,
                                    headerAlign: "center",
                                    align: "center",
                                    description: "Si le post est publié ou non",
                                    renderCell: (params: GridValueGetterParams) => {
                                        // return params.row.published ? "Publié" : "Non publié";
                                        return (
                                            <div className="flex flex-row justify-center items-center">
                                                <p>{params.row.published ? "Publié" : "Non publié"}</p>
                                                <div
                                                    className={`m-1  rounded-full w-3 h-3 ${params.row.published ? "bg-green-500" : "bg-red-500"}`}
                                                ></div>
                                            </div>
                                        );
                                    },
                                },
                                {
                                    field: "createdAt",
                                    headerName: "Crée",
                                    width: 250,
                                    description: "Date de création du post",
                                    renderCell: (params: GridValueGetterParams) => {
                                        return dayjs(params.row.createdAt).format("DD/MM/YYYY HH:mm:ss");
                                    },
                                },
                                {
                                    field: "updatedAt",
                                    headerName: "Modifié",
                                    width: 250,
                                    description: "Date de modification deu post",
                                    renderCell: (params: GridValueGetterParams) => {
                                        return dayjs(params.row.updatedAt).format("DD/MM/YYYY HH:mm:ss");
                                    },
                                },
                                {
                                    field: "action",
                                    headerName: "Action",
                                    width: 250,
                                    headerAlign: "center",
                                    description: "Action possible sur le post",
                                    align: "center",
                                    minWidth: 400,
                                    renderCell: (params: GridValueGetterParams) => (
                                        <div className="flex flex-row">
                                            <Tooltip title="Modifier cet élément" placement="top">
                                                <Button
                                                    disabled={loaddelete ? true : false || loadpublish ? true : false}
                                                    variant="contained"
                                                    href={`/photography/edit?slug=${params.row.slug}`}
                                                >
                                                    <EditIcon />
                                                </Button>
                                            </Tooltip>
                                            <Divider className="m-2 h-5" orientation="vertical" />
                                            <Tooltip title="Supprimer cet élément" placement="top">
                                                <Button
                                                    disabled={loaddelete ? true : false || loadpublish ? true : false}
                                                    color="error"
                                                    variant="contained"
                                                    onClick={() => handleDeleteItem(params.row.id, t(params.row.translations, "title", "fr"))}
                                                >
                                                    <DeleteForeverIcon />
                                                </Button>
                                            </Tooltip>
                                            <Divider className="m-2 h-5" orientation="vertical" />
                                            <Tooltip title={params.row.published ? "Dépublier" : "Publier"} placement="top">
                                                <Button
                                                    disabled={loaddelete ? true : false || loadpublish ? true : false}
                                                    color="info"
                                                    variant="contained"
                                                    onClick={() =>
                                                        handlePublish(params.row.id, t(params.row.translations, "title", "fr"), params.row.published)
                                                    }
                                                >
                                                    {params.row.published ? <CancelIcon /> : <AddIcon />}
                                                </Button>
                                            </Tooltip>
                                            <Divider className="m-2 h-5" orientation="vertical" />
                                            <Tooltip title="Voir cet élément" placement="top">
                                                <Button
                                                    disabled={loaddelete ? true : false || loadpublish ? true : false}
                                                    color="info"
                                                    variant="contained"
                                                    href={`/photography/viewer?id=${params.row.id}`}
                                                >
                                                    <VisibilityIcon />
                                                </Button>
                                            </Tooltip>
                                        </div>
                                    ),
                                },
                            ]}
                            initialState={{
                                pagination: {
                                    paginationModel: { page: 0, pageSize: 15 },
                                },
                            }}
                            disableRowSelectionOnClick
                            pageSizeOptions={[5, 10, 25, 50, 100]}
                        />
                    )}
                </div>
            </div>
        </div>
    );
};

export default PagePhotography;
