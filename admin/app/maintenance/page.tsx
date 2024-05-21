"use client";
import React, { use, useState, useEffect } from "react";
import EditorComponent from "@/components/wysiwyg/textEditor";
import { getMaintenance, updateMaintenance, updateStatus } from "@/app/request/requestMaintenance";
import Loading from "@/components/loading/loading";
import { Button } from "@mui/material";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import Snackbar from "@/components/snackBar/snackBar";

type TMaintenance = {
    status: boolean;
    translations: {
        message: string;
        language: string;
    }[];
};

const MaintenancePage = () => {
    const [defaultContent, setDefaultContent] = useState("<p>Default content</p>");
    const { response: resMaintenance, Error: errorMaintenance, Loading: loadingMaintenance, Success: successMaintenance } = getMaintenance();
    const {
        response: resUpdateMaintenance,
        Error: errorUpdateMaintenance,
        Loading: loadingUpdateMaintenance,
        Success: successUpdateMaintenance,
        fetchRequest: FupdateMaintenance,
        params,
    } = updateMaintenance();
    const { response: resStatus, Error: errorStatus, Loading: loadingStatus, Success: successStatus, fetchRequest: FupdateStatus, params:statusParams } = updateStatus();
    const [content, setContent] = useState<TMaintenance | null>(null);
    const [tabIndex, setTabIndex] = useState("fr");
    const [open, setOpen] = useState(false);

    
    const setStatus = async () => {
        setContent({ ...content, status: !content?.status, translations: content?.translations || [] });
        setOpen(true);
        const waiter = await FupdateStatus({ data: { status: !content?.status }, url: statusParams.url, method: statusParams.method});
        if (waiter || !waiter) {
            setOpen(true);
        }
    };

    useEffect(() => {
        if (successMaintenance) {
            console.log("respsonse maintenance : ", resMaintenance);
            setContent(resMaintenance.mnt);
        }
    }, [resMaintenance, successMaintenance, errorMaintenance, loadingMaintenance]);
    
    useEffect(() => {
        if (errorStatus && !loadingStatus) {
            console.log("errorStatus", errorStatus);
            setContent({ ...content, status: !content?.status, translations: content?.translations || [] });
        }
    }, [errorStatus, loadingStatus]);

    const handleSave = async () => {
        setOpen(false);
        const request = await FupdateMaintenance({ data: content, url: params.url, method: params.method});
        if (request || !request) {
            console.log("request", request);
            setOpen(true);
        }
    };

    const displaySnackBar = () => {
        if (successUpdateMaintenance) {
            return (
                <Snackbar
                    open={open}
                    type="success"
                    message="Maintenance sauvegarder"
                    timeDuration={4000}
                    position={{ vertical: "top", horizontal: "center" }}
                />
            );
        }
        if (successStatus) {
            return (
                <Snackbar
                    open={open}
                    type="success"
                    message={`Status de maintenance mis à jour : ${content?.status === true ? "Activé" : "Désactivé"}`}
                    timeDuration={4000}
                    position={{ vertical: "top", horizontal: "center" }}
                />
            );
        }
        if (errorUpdateMaintenance || errorStatus) {
            return (
                <Snackbar
                    open={open}
                    type="error"
                    message={`Une erreur ces produite : ${errorUpdateMaintenance || errorStatus}`}
                    timeDuration={4000}
                    position={{ vertical: "top", horizontal: "center" }}
                />
            );
        }
    };
    
    const handleEditorChange = (editorState: string, language: string) => {
        let newcontent: TMaintenance | null = content;
        if (newcontent === null) return;
        console.log("newcontent", newcontent);
        newcontent.translations.map((translation, index) => {
            if (translation.language === language) {
                if (newcontent == null) return;
                newcontent.translations[index].message = editorState;
            }
        });
        setContent(newcontent);
    };

    if (loadingMaintenance && !content) {
        return <Loading />;
    }

    return (
        <div className="overflow-auto">
            {/* <h1 className="w-[100%] text-center">Maintenance page édition</h1> */}
            {open && displaySnackBar()}
            <div className="w-[100%]">
                <div className="w-fit m-auto">
                    <Button className="m-auto" disabled={loadingStatus == true ? true : false} variant="contained" color={content?.status === true ? "success" : "error"} onClick={() => setStatus()}>
                        {content?.status === true ? "Désactiver la mantenance" : "Activer la Maintenance"}
                    </Button>
                </div>
            </div>
            <TabContext value={tabIndex}>
                <TabList onChange={(e, value) => setTabIndex(value)}>
                    {content?.translations.map((translation, index) => {
                        return <Tab label={translation.language} key={index} value={translation.language} />;
                    })}
                </TabList>
                {content?.translations.map((translation, index) => {
                    return (
                        <TabPanel key={index} value={translation.language}>
                            {typeof window !== 'undefined' && (
                                <EditorComponent
                                defaultContent={translation.message}
                                handleEditorChange={handleEditorChange}
                                language={translation.language}
                                customClass={"!h-[500px]"}
                            />
                            )}
                        </TabPanel>
                    );
                })}
            </TabContext>
            <div className="w-[100%]">
                <div className="w-fit m-auto">
                    <Button variant="contained" color="primary" onClick={handleSave}>
                        Enregistrer
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default MaintenancePage;
