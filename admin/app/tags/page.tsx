'use client'
import { useEffect, useState } from 'react';
import { getTags, deleteTagById } from '@/app/request/requestTag';
import AlertDialog from '@/components/snackBar/confirmDialog';
import SnackBar, { TtypeSnackB } from '@/components/snackBar/snackBar';
import { Button, Divider, Link, Tooltip } from '@mui/material';
import Loading from '@/components/loading/loading';
import { DataGrid, GridValueGetterParams } from '@mui/x-data-grid';
import dayjs from 'dayjs';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import VisibilityIcon from '@mui/icons-material/Visibility';
import AddIcon from '@mui/icons-material/Add';
import CancelIcon from '@mui/icons-material/Cancel';
import useTranslation from '@/hooks/translation/useTranslation';
import EditIcon from '@mui/icons-material/Edit';
import CreateTags from './createTags';
import EditTags from './editTag';


const PageTags = () => {
    const [tags, setTags] = useState(null);
    const { response: resTags, Error: errTags, Loading: loadTags, Success: successTags, fetchRequest: Fetchtags, params: tagsParams } = getTags();
    
    const {
        response: resdelete,
        Error: errdelete,
        Loading: loaddelete,
        Success: successdelete,
        fetchRequest: FdeleteTag,
        params: deleteParams,
    } = deleteTagById();   
    const { getTranslation: t } = useTranslation();
    const [openDialog, setOpenDialog] = useState(false);
    const [itemToDelete, setItemToDelete] = useState({ id: 0, title: "" });
    const [itemToPublish, setItemToPublish] = useState({ id: 0, title: "", published: false });
    const [snackBar, setSnackBar] = useState({ open: false, message: "", type: "" });
    const [openCreate, setOpenCreate] = useState(false);
    const [openEdit, setOpenEdit] = useState(false);
    const [editId, setEditId] = useState(0);
    useEffect(() => {
        Fetchtags(tagsParams);
    }, []);
    

    useEffect(() => {
        if (successTags) {
            setTags(resTags);
        }
        console.log("error", errTags);
    }, [resTags, errTags, loadTags, successTags]);

    useEffect(() => {
        if (successdelete && !loaddelete) {
            setSnackBar({ open: true, message: "Evénement suprimmé avec succès", type: "success" });
            console.log("itemToDelete", itemToDelete);
            console.log("Tags", tags);
            setTags((tags as any).filter((tags: any) => tags.id !== itemToDelete.id));
            setItemToDelete({ id: 0, title: "" });
            // refecthTags();
        }
        if (errdelete && !loaddelete) {
            setSnackBar({ open: true, message: "Erreur lors de la supression de l'événement", type: "error" });
            setItemToDelete({ id: 0, title: "" });
        }
        setTimeout(() => {
            setSnackBar({ open: false, message: "", type: "" });
        }, 4000);
    }, [resdelete, errdelete, loaddelete, successdelete]);


    const handleDeleteItem = (IDitemToDelete: number, titleItem: string) => {
        setItemToDelete({ id: IDitemToDelete, title: titleItem });
        setOpenDialog(true);
    };


    const handleConfirmDeleteMedia = async (response: boolean) => {
        setOpenDialog(false);
        if (!response) return;
        setSnackBar({ open: false, message: "", type: "" });
        FdeleteTag({ url: `${deleteParams.url}/${itemToDelete.id}`, method: deleteParams.method });
    };

    const openCreateTags = () => {
       setOpenCreate(true);
    };

    const openEditTags = (id:number) => {
        setEditId(id);
        setOpenEdit(true);
    }

    const closeEditTags = () => {
        setEditId(0);
        setOpenEdit(false);
    };
    const closeCreateTags = () => {
        setOpenCreate(false);
    }

    const refecthTags = () => {
        setOpenCreate(false);
        setOpenEdit(false);
        Fetchtags(tagsParams);
    };

    return (
        <div className="text-center">
            <AlertDialog
                openDial={openDialog}
                callbackResponse={handleConfirmDeleteMedia}
                btnOk={"Confirmer"}
                btnRefuse={"Annuler"}
                title="Suprimmer un événement"
                message={`Etes vous sure de vouloir suprimer cette événement "${itemToDelete.title}" ? `}
            />
            {snackBar.open && <SnackBar
                open={snackBar.open}
                message={snackBar.message}
                type={snackBar.type as TtypeSnackB}
                timeDuration={4000}
                position={{ vertical: "top", horizontal: "center" }}
            />}
            {openCreate && <CreateTags open={openCreate} close={closeCreateTags} successCreate={refecthTags} />}
            {openEdit && <EditTags open={openEdit} close={closeEditTags} successUpdateCallback={refecthTags} id={editId} />}
            <h1 className="text-4xl mb-3 underline">Tags</h1>
            <div className="flex flex-col justify-center items-center">
                <div className="w-[100%] text-center mb-4">
                    <Button className="!m-auto " variant="contained" onClick={openCreateTags}>
                       Ajouter un tag
                    </Button>
                </div>
                <div className="h-[80%] w-[90%] text-center">
                    {loadTags && <Loading />}
                    {tags && (
                        <DataGrid
                            rows={tags}
                            columns={[
                                { field: "id", headerName: "ID", width: 130 },
                                {
                                    field: "Nom français",
                                    headerName: "Nom français",
                                    width: 200,
                                    description: "Nom français du tag",
                                    valueGetter: (params: GridValueGetterParams) => {
                                        console.log("params", params.row);
                                        return t(params.row.tag_translate, "name", "fr");
                                    },
                                },
                                {
                                    field: "Nom Anglais",
                                    headerName: "Nom Anglais",
                                    width: 200,
                                    description: "Nom Anglais du tag",
                                    valueGetter: (params: GridValueGetterParams) => {
                                        return t(params.row.tag_translate, "name", "en");
                                    },
                                },
                                {
                                    field: "createdAt",
                                    headerName: "Crée",
                                    width: 250,
                                    description: "Date de création de l'événement",
                                    renderCell: (params: GridValueGetterParams) => {
                                        return dayjs(params.row.createdAt).format("DD/MM/YYYY HH:mm:ss");
                                    },
                                },
                                
                                {
                                    field: "updatedAt",
                                    headerName: "Modifié",
                                    width: 250,
                                    description: "Date de modification de l'événement",
                                    renderCell: (params: GridValueGetterParams) => {
                                        return dayjs(params.row.updatedAt).format("DD/MM/YYYY HH:mm:ss");
                                    },
                                },
                                {
                                    field: "action",
                                    headerName: "Action",
                                    width: 250,
                                    headerAlign: "center",
                                    description: "Action possible sur l'événement",
                                    align: "center",
                                    minWidth: 400,
                                    renderCell: (params: GridValueGetterParams) => (
                                        <div className="flex flex-row">
                                            <Tooltip title="Modifier cet élément" placement="top">
                                                <Button
                                                    disabled={loaddelete ? true : false ? true : false}
                                                    variant="contained"
                                                    onClick={() => openEditTags(params.row.id)}
                                                >
                                                    <EditIcon />
                                                </Button>
                                            </Tooltip>
                                            <Divider className="m-2 h-5" orientation="vertical" />
                                            <Tooltip title="Supprimer cet élément" placement="top">
                                                <Button
                                                    disabled={loaddelete ? true : false ? true : false}
                                                    color="error"
                                                    variant="contained"
                                                    onClick={() => handleDeleteItem(params.row.id, t(params.row.tag_translate, "name", "fr"))}
                                                >
                                                    <DeleteForeverIcon />
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

export default PageTags;