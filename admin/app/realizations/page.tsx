"use client";
import 'dotenv/config'
import { useEffect, useState } from "react";
import { getPostByType, deletePostById, setPublishPost, deleteMultiplePostsById } from "../request/requestPost";
import Loading from "@/components/loading/loading";
import useTranslation from "@/hooks/translation/useTranslation";
import { Button, Checkbox, Tooltip } from "@mui/material";
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
import { Router } from 'next/router';
import VisibilityIcon from '@mui/icons-material/Visibility';



const PageEditions = () => {
    const [posts, setPosts] = useState(null);
    const { response: respost, Error: errpost, Loading: loadpost, Success: successpost } = getPostByType("realization");
    const {
        response: resdelete,
        Error: errdelete,
        Loading: loaddelete,
        Success: successdelete,
        fetchRequest: FdeletePost,
        params: deleteParams,
    } = deleteMultiplePostsById();
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
    const [itemsToDelete, setItemsToDelete] = useState<any []>([]);
    const [itemToPublish, setItemToPublish] = useState({ id: 0, title: "", published: false });
    const [snackBar, setSnackBar] = useState({ open: false, message: "", type: "" });
    const [selection, setSelection] = useState<any[]>([]);

    useEffect(() => {
        if (successpost) {
            setPosts(respost);
        }
    }, [respost, errpost, loadpost, successpost]);

    useEffect(() => {
        if (successdelete && !loaddelete) {
            setSnackBar({ open: true, message: "Réalisation suprimmé avec succès", type: "success" });
            console.log("itemToDelete", itemsToDelete);
            console.log("posts", posts);
            setPosts((posts as any).filter((post: any) => {
                return !itemsToDelete.find((item) => item.id === post.id);
            }));
            setItemsToDelete([]);
        }
        if (errdelete && !loaddelete) {
            setSnackBar({ open: true, message: "Erreur lors de la supression de la Réalisation", type: "error" });
            setItemsToDelete([]);
        }
    }, [resdelete, errdelete, loaddelete, successdelete]);

    useEffect(() => {
        if (successpublish && !loadpublish) {
            let message = "";
            if (itemToPublish?.published) {
                message = "Réalisation dépuplier avec succès";
            } else {
                message = "Réalisation publier avec succès";
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
            setSnackBar({ open: true, message: "Erreur lors de la publication du post réalisation", type: "error" });
            setItemToPublish({ id: 0, title: "", published: false });
        }
    }, [respublish, errpublish, loadpublish, successpublish]);

    const handleDeleteItems = (items: number[]) => {
        console.log("items", items);
        let itemsArray:any = [];
        items.map((itemsID: number) => {
            let item = (posts as any).find((post: any) => post.id === itemsID);
            let title = t(item.translations, "title", "fr");
            itemsArray.push({ id: itemsID, title: title });
        });
        setItemsToDelete(itemsArray);
        setOpenDialog(true);
    };


    const setSelectionRows = (newSelectionModel: any) => {
        setSelection(newSelectionModel);
    }

    const handlePublish = (IDitemToPublish: number, titleItem: string, published: boolean) => {
        setOpenDialog(false);
        setItemToPublish({ id: IDitemToPublish, title: titleItem, published: published });
        FpublishPost({ url: `${publishParams.url}realization/publishe/${IDitemToPublish}`, method: publishParams.method });
    };

    const handleConfirmDeleteMedia = async (response: boolean) => {
        setOpenDialog(false);
        if (!response) return;
        setSnackBar({ open: false, message: "", type: "" });
        console.log("itemsToDelete", itemsToDelete);
        FdeletePost({ url: `${deleteParams.url}/realization`, method: deleteParams.method, data: itemsToDelete });
    };
    console.log(`${process.env.NEXT_PUBLIC_API_CLIENTHOST}/productions?slug=`)
    return (
        <div className="text-center">
            {itemsToDelete.length > 0 && (
                <AlertDialog
                    openDial={openDialog}
                    callbackResponse={handleConfirmDeleteMedia}
                    btnOk={"Confirmer"}
                    btnRefuse={"Annuler"}
                    title="Suprimmer un article"
                    message={`Etes vous sure de vouloir suprimer ${itemsToDelete.length === 1 ? "cette" : "ces" } article${itemsToDelete.length === 1 ? "s" : ""} ${itemsToDelete.map((item) => `"${item.title}"`)} ? `}
                />
            )}
            <SnackBar
                open={snackBar.open}
                message={snackBar.message}
                type={snackBar.type as TtypeSnackB}
                timeDuration={4000}
                position={{ vertical: "top", horizontal: "center" }}
            />
            <h1 className="text-4xl mb-3 underline">Réalisation</h1>
            <div className="flex flex-col justify-center items-center">
                <div className="w-[100%] text-center mb-4">
                    <Button className="!m-auto " variant="contained" href="/realizations/create">
                        Ajouter une Réalisation
                    </Button>
                </div>
                <div className="h-[80%] w-[90%] text-center">
                    {loadpost && <Loading />}
                    <div className={`${selection.length === 0 ? "opacity-0": "" }`}>
                        
                            <div className="flex flex-row  items-center">
                                <p>{selection.length} éléments selectionné</p>
                                <Tooltip title={"Supprimer les éléments sélectionnés."}>
                                <Button
                                    className='!rounded-full !h-[50px] !w-[50px] !ml-1'
                                    disabled={loaddelete ? true : false || loadpublish ? true : false}
                                    variant="contained"
                                    color="error"
                                    onClick={() => handleDeleteItems(selection)}
                                >
                                     <DeleteForeverIcon />
                                </Button>
                                </Tooltip>
                            </div>
                    </div>
                    {posts && (
                        <DataGrid
                            rows={posts}
                            
                            columns={[
                                // { field: "id", headerName: "ID", width: 130 },
                                {
                                    field: "slug",
                                    headerName: "Nom unique",
                                    width: 130,
                                    headerAlign: "center",
                                    align: "center",
                                    description: "Nom unique du post",
                                    renderCell: (params: GridValueGetterParams) => {
                                        return (
                                            <Link  target="_blank" className='hover:text-sky-500' href={`${process.env.NEXT_PUBLIC_API_CLIENTHOST}/realizations?slug=${encodeURIComponent(params.row.slug)}`}>
                                                {params.row.slug}
                                            </Link>
                                        );
                                    },
                                },
                                {
                                    field: "title",
                                    headerName: "Titre",
                                    width: 130,
                                    description: "Titre du livre",
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
                                    description: "Si la production est publié ou non",
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
                                    description: "Date de création du livre",
                                    renderCell: (params: GridValueGetterParams) => {
                                        return dayjs(params.row.createdAt).format("DD/MM/YYYY HH:mm:ss");
                                    },
                                },
                                {
                                    field: "updatedAt",
                                    headerName: "Modifié",
                                    width: 250,
                                    description: "Date de modification du livre",
                                    renderCell: (params: GridValueGetterParams) => {
                                        return dayjs(params.row.updatedAt).format("DD/MM/YYYY HH:mm:ss");
                                    },
                                },
                                {
                                    field: "action",
                                    headerName: "Action",
                                    width: 250,
                                    headerAlign: "center",
                                    description: "Action possible sur le livre",
                                    align: "center",
                                    minWidth: 400,
                                    renderCell: (params: GridValueGetterParams) => (
                                        <div className="flex flex-row">
                                            <Tooltip title="Modifier cet élément" placement="top">
                                                <Button
                                                    disabled={loaddelete ? true : false || loadpublish ? true : false}
                                                    variant="contained"
                                                    href={`/realizations/edit?slug=${params.row.slug}`}
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
                                                    onClick={() => handleDeleteItems([params.row.id])}
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
                                                    href={`/realizations/viewer?id=${params.row.id}`}
                                                >
                                                    <VisibilityIcon />
                                                </Button>
                                            </Tooltip>
                                        </div>
                                    ),
                                },
                            ]}
                            checkboxSelection
                            // gridRowId={(row: any) => row.id}
                            onRowSelectionModelChange={(newSelectionModel) => {
                                setSelectionRows(newSelectionModel);
                              }}
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

export default PageEditions;
