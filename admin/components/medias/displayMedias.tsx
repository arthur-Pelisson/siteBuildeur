"use client";
import Loading from "@/components/loading/loading";
import { Autocomplete, Button, CardActions, Checkbox, CircularProgress, TextField, Tooltip } from "@mui/material";
import { useEffect, useLayoutEffect, useRef, useState, useCallback } from "react";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { styled } from "@mui/material/styles";
import { getMedias, uploadMedia, deleteMedia } from "@/app/request/requestMedias";
import SaveIcon from "@mui/icons-material/Save";
import SnackBar, { TtypeSnackB } from "../snackBar/snackBar";
import "dotenv/config";
import { Card, Divider } from "@nextui-org/react";
import centerGrid from "../layoutComp/centerGrid";
import AlertDialog from "../snackBar/confirmDialog";
import { usePathname } from "next/navigation";
import DeleteIcon from "@mui/icons-material/Delete";


const VisuallyHiddenInput = styled("input")({
    clip: "rect(0 0 0 0)",
    clipPath: "inset(50%)",
    height: 1,
    overflow: "hidden",
    position: "absolute",
    bottom: 0,
    left: 0,
    whiteSpace: "nowrap",
    width: 1,
});

const LoazyLoadingImg = ({ img, setReadyLoad, index }) => {
    const [ready, setReady] = useState<boolean>(false);
    const imgRef = useRef<HTMLImageElement>(null);
    img = img.split(".")
    img.pop()
    img = img.join(".") + "-thumbnail.webp"
    
    useEffect(() => {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    imgRef.current?.setAttribute("src", img);
                    const image = new Image();
                    image.src = img;
                    image.onload = () => {
                        setReady(true);
                        setReadyLoad((prev) => {
                            return [...prev, prev[index] = true];
                        
                        });
                    }
                    // console.log("imgRef", imgRef.current);
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.1 });

        if (imgRef.current) {
            observer.observe(imgRef.current);
        }

        return () => {
            if (imgRef.current) {
                observer.unobserve(imgRef.current);
            }
        };
    }, [img]);

    return (
        <>
        <div className="relative w-[100%] h-[100%]">
            {!ready && (
                <div className="absolute w-[250px]">
                <Loading display={true} notInModal={true} />
            </div>
            )}
        <img
            loading="lazy"
            ref={imgRef}
            data-src={img}
            alt="image"
            className={`${ready ? 'opacity-1' : 'opacity-0'} w-[100%] h-[100%] object-scale-down transition-opacity ease-in !duration-[750ms]`}
            />
        </div>
        </>
    );
};

const UploadMedias = ({ addMedia, callBackUploadLoading, setSnack }: any) => {
    const {
        response: resUploadMedia,
        Error: errorUploadMedia,
        Loading: loadingUploadMedia,
        Success: successUploadMedia,
        fetchRequest: FuploadMedia,
        params: uploadMediaParams,
    } = uploadMedia();
    const [fileName, setFileName] = useState<string[]>([]);
    const [file, setFile] = useState<File[]>([]);
    const pathname = usePathname();
    const [progress, setProgress] = useState<number>(0);
    const [progressShow, setProgressShow] = useState<boolean>(false);

    // useEffect(() => {
    //     console.log("snack", snack);
    //     setOpenSnack(snack.open);
    // }, [snack]);

    useEffect(() => {
        console.log("resUploadMedia", resUploadMedia);
        callbackloading();
        if (successUploadMedia && resUploadMedia !== null && errorUploadMedia !== true && !loadingUploadMedia) {
            console.log("successUploadMediaaaaaaaaaaaaaaaaaaaaaaaaaa", successUploadMedia);
            setSnack({ open: true, message: (resUploadMedia as any).fr, type: "success" });
            setFile([]);
            setTimeout(() => {
                setProgressShow(false);
                addMedia(fileName);
                setFileName([]);
                setProgress(0);
            }, 1000);
            return;
        }
        console.log("errorUploadMedia", errorUploadMedia);
        if (errorUploadMedia && !successUploadMedia && !loadingUploadMedia) {
            console.log("errorUploadMedia", errorUploadMedia);
            setSnack({ open: true, message: errorUploadMedia, type: "error" });
            setTimeout(() => {
                setProgressShow(false);
                setProgress(0);
                setFileName([]);
            }, 1000);
            return;
        }
    }, [errorUploadMedia, successUploadMedia, resUploadMedia, loadingUploadMedia]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files?.length === 0) return;
        console.log("e.target.files", e.target.files);
        let file = e.target.files;
        if (file === null) return;
        const allFiles = [];
        const allFilesName = [];
        for (let i = 0; i < file?.length; i++) {
            allFilesName.push(file[i]?.name);
            allFiles.push(file[i]);
        }
        setFileName(allFilesName);
        console.log("file", file);
        setFile(allFiles);
    };

    const callbackloading = () => {
        callBackUploadLoading(loadingUploadMedia);
    };

    const onProgress = (pourcentProgress: number) => {
        // const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
        if (pourcentProgress > 100) {
            pourcentProgress = 100;
        }
        setProgress(pourcentProgress);
    };

    const handleUpload = () => {
        console.log("file", file);
        if (file === null) return;
        setSnack({ open: false, message: "", type: "" });
        setProgressShow(true);
        FuploadMedia({
            data: { image: file },
            url: uploadMediaParams.url,
            method: uploadMediaParams.method,
            image: uploadMediaParams.image,
            onProgress: onProgress,
        });
    };

    if (loadingUploadMedia || progressShow) {
        return (
            <>
                <div className=" flex items-center justify-center m-auto text-center border-2 border-gray-400 w-[15rem] h-[15rem] p-10">
                    {/* {progress} */}
                    {/* <Loading display={true} notInModal={true} /> */}
                    <div className="relative flex items-center justify-center">
                        <div>
                            <p className="text-center">{progress}</p>
                        </div>
                        <div className="absolute !top-[-62px] !left-[-62px]">
                            <CircularProgress variant="determinate" value={progress} size={150} />
                        </div>
                    </div>
                </div>
            </>
        );
    }
    return (
        <div className="w-[100%]">
            <div className={`m-auto text-center border-2 border-gray-400 p-10 ${pathname.toString() === "/" ? "w-[100%]" : "lg:w-[50%] w-[100%]"}`}>
                <h1></h1>
                <label htmlFor="upload-button">
                    <VisuallyHiddenInput id="upload-button" multiple type="file" accept="image/*|video/*" onChange={handleChange} />
                    <Button variant="contained" component="span" className="!m-5" startIcon={<CloudUploadIcon />}>
                        UPLOAD
                    </Button>
                    <p className="h-2 text-center">{fileName.length <= 1 ? fileName[0] : fileName.length + " : Fichiers"}</p>
                    <Button
                        variant="contained"
                        disabled={file.length === 0 ? true : false}
                        className="!rounded-full !m-5 !w-[60px] !h-[60px]"
                        onClick={handleUpload}
                    >
                        <SaveIcon />
                    </Button>
                </label>
            </div>
        </div>
    );
};

type TDisplatMedia = {
    addMedia: string[];
    deleteFile: boolean;
    selecteFile: boolean;
    setSnack: (snack: { open: boolean; message: string; type: string }) => void;
    searchInput?: boolean;
    uploadLoading?: boolean;
    callBackSelectFile?: (file: string) => void;
};
// TO DO when uploading and scroll remove uploaded image on display and when searching stop the load of other image to scroll
const DisplayMedias = ({ addMedia, deleteFile, selecteFile, searchInput, callBackSelectFile, uploadLoading, setSnack }: TDisplatMedia) => {
    const {
        response: resMedias,
        Error: errorMedias,
        Loading: loadingMedias,
        Success: successMedias,
        fetchRequest: FGetMedia,
        params: getMediasParams,
    } = getMedias();
    const {
        response: resDeleteMedia,
        Error: errorDeleteMedia,
        Loading: loadingDeleteMedia,
        Success: successDeleteMedia,
        fetchRequest: FdeleteMedia,
        params: deleteMediaParams,
    } = deleteMedia();
    let [medias, setMedias] = useState<string[]>([]);
    const [saveRespMedia, setSaveRespMedia] = useState<string[]>([]);
    const [deleMedias, setDeleteMedias] = useState<boolean>(false);
    const [mediaToDelete, setMediaToDelete] = useState<string[]>([]);
    const mainDiv = useRef<HTMLElement>(null);
    const [openDialog, setOpenDialog] = useState<boolean>(false);
    const [isReady, setIsReady] = useState(false);
    const [multipleSelect, setMultipleSelect] = useState<string[]>([]);
    const [ready, setReady] = useState<boolean[]>([]);
    const pathname = usePathname();
    const [nomorePage, setNomorePage] = useState<boolean>(false);
    const [page, setPage] = useState<number>(0);
    const lazyRef = useRef<HTMLDivElement>(null);
    const [uploadedFile, setUploadedFile] = useState<string[]>([]);
    const [filterString, setFilterString] = useState<string>("");
    
    const handleResize = useCallback(() => {
        centerGrid(mainDiv, setIsReady);
    }, [mainDiv.current, setIsReady]);

    useEffect(() => {
        FGetMedia({ url: getMediasParams.url, method: getMediasParams.method });
    }, []);

    useLayoutEffect(() => {
        // Initial centering
        console.log("aaaaaaaaaaaaaaaaaaaaaaaaaaa", mainDiv);
        handleResize();

        // Add resize event listener
        window.addEventListener("resize", handleResize);

        // Cleanup on component unmount
        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, [mainDiv.current, medias]);

    useEffect(() => {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                console.log("observer filter string : ", filterString)
                if (entry.isIntersecting && !nomorePage && filterString === "") {
                    setPage((prev) => prev + 1);
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.1, rootMargin: "0px" });

        if (lazyRef.current) {
            if (lazyRef.current) {
                observer.observe(lazyRef.current);
            }
        }
        return () => {
            if (lazyRef.current) {
                observer.unobserve(lazyRef.current);
            }
        }
    }, [lazyRef.current, page, filterString]);

    useEffect(() => {
        console.log("addMedia", addMedia);
        if (addMedia.length === 0 && addMedia != null) return;
        let addMedias: string[] = [];
        for (let i = 0; i < addMedia.length; i++) {
            addMedias.push(process.env.NEXT_PUBLIC_API_APIHOST + "/images/public/" + addMedia[i]);
        }
        setSaveRespMedia((prev) => {
            const newMedias = [...prev, ...addMedias];
            return sortByName(newMedias);
        });
        console.log("addMedias", addMedias);
        console.log("medias", medias);
        const mediasToSort = [...medias, ...addMedias];
        console.log("mediasToSort", mediasToSort);
        const sortedMedias  = sortByName(mediasToSort);
        console.log("sortedMedias", sortedMedias);
        // setSaveRespMedia(sortedMedias);
        // setMedias(sortedMedias);
    }, [addMedia]);

    useEffect(() => {
        if (mediaToDelete.length !== 0) {
            console.log("mediaToDelete", mediaToDelete);
            let filtermedia = saveRespMedia;
            for (let i = 0; i < mediaToDelete.length; i++) {
                filtermedia = filtermedia?.filter((media) => media !== mediaToDelete[i]);
            }
            console.log("filtermedia", filtermedia);
            setSaveRespMedia(sortByName(filtermedia));
            // setMedias(sortByName(filtermedia));
            setMediaToDelete([]);
            setMultipleSelect([]);
        }
    }, [deleMedias]);

    useEffect(() => {
        if (successDeleteMedia && resDeleteMedia && !loadingDeleteMedia) {
            setDeleteMedias(!deleMedias);
            setNomorePage(false);
            setSnack({ open: true, message: (resDeleteMedia as any).fr, type: "success" });
            return;
        }
        if (errorDeleteMedia && !loadingDeleteMedia && !successDeleteMedia) {
            setSnack({ open: true, message: errorDeleteMedia, type: "error" });
            setMediaToDelete([]);
            setMultipleSelect([]);
            return;
        }
    }, [resDeleteMedia, errorDeleteMedia, loadingDeleteMedia, successDeleteMedia]);

    useEffect(() => {
        if (resMedias === null) return;
        if (errorMedias) return;
        if (loadingMedias) return;
        console.log("resMedias", resMedias);
        setSaveRespMedia(sortByName(resMedias as string[]));
        setPage(1);
    }, [resMedias, errorMedias, loadingMedias, successMedias]);

    const HandledeleteMedia = (media: string[]) => {
        console.log(media)
        setMediaToDelete([...media]);
        setOpenDialog(true);
    };

    useEffect(() => {
        // if (page === 1) return;
        getMediasByPage(page);
    }, [page, saveRespMedia]);

    const getMediasByPage = (page: number) => {
        console.log("page", page);
        console.log("saveRespMedia", saveRespMedia);
        if (saveRespMedia.length === 0) {
            setNomorePage(true);
            return;
        };
        const mediasPage:string [] = [];
        for (let i = 0; i < page*10; i++) {
            if (saveRespMedia[i] === undefined) {
                setNomorePage(true);
                break;
            };
            mediasPage.push(saveRespMedia[i]);
        }

        if (mediasPage.length === 0) return;
        setMedias(sortByName([...mediasPage]))
    };

    const sortByName = (array: string[]) => {
        return array.sort((a, b) => {
            return a.toLocaleLowerCase().localeCompare(b.toLocaleLowerCase());
        });
    }

    const addMultipleSelect = (e: any, indexFile: number) => {
        console.log("e.target.checked", e.target.checked);
        console.log("nameFiles", indexFile);
        const nameFile = medias[indexFile];
        if (e.target.checked) {
            setMultipleSelect((prev) => {
                return [...prev, nameFile];
            });
        } else {
            setMultipleSelect((prev) => {
                return prev.filter((index) => index !== nameFile);
            });
        }
        console.log("multipleSelect", multipleSelect);
    };

    const filterSearchInput = (value: string) => {
        setFilterString(value);
        console.log("value", value);
        console.log("response medias serch input :", saveRespMedia);
        console.log("medias: ", medias);
        if (saveRespMedia === null) return;
        if (value === "" && saveRespMedia !== null) {
            setMedias(saveRespMedia as string[]);
        }
        const filteredMedias: string[] = [];
        for (let i = 0; i < (saveRespMedia as any).length; i++) {
            const media: string = saveRespMedia[i];
            const mediaName = media.split("/").pop()?.split(".").shift();
            // console.log("mediaName", mediaName);
            if (mediaName === undefined) return false;

            // console.log("mediaName", mediaName);
            // console.log("value", value);
            if (mediaName.toString().toLowerCase().includes(value.toString().toLowerCase())) {
                filteredMedias.push(media);
            }
        }
        setMedias(sortByName(filteredMedias));
    };

    const handleConfirmDeleteMedia = (confirm: boolean) => {
        // console.log("confirm", confirm);
        setOpenDialog(false);
        if (confirm !== true) return;
        if (mediaToDelete.length === 0) return;
        // console.log("media", mediaToDelete);
        let mediasToDelete = {
            names: [] as string[],
        };
        for (let i = 0; i < mediaToDelete.length; i++) {
            const mediaName = mediaToDelete[i].split("/").pop();
            if (mediaName === undefined) continue;
            mediasToDelete.names.push(mediaName);
        }
        // console.log("mediaName", mediaName);
        FdeleteMedia({ url: deleteMediaParams.url, method: deleteMediaParams.method, data: mediasToDelete });
    };

    // if (loadingMedias) {
    //     return (
    //         <>
    //             <Loading display={true} />
    //         </>
    //     );
    // }
    // console.log("mediassss", medias);
    // console.log("isReady", isReady);
    return (
        <>
            <div className="flex justify-center flex-col flex-wrap m-0 items-center min-h-[350px]">
                <AlertDialog
                    openDial={openDialog}
                    callbackResponse={handleConfirmDeleteMedia}
                    btnOk={"Confirmer"}
                    btnRefuse={"Annuler"}
                    title="Suprimmer un médias"
                    message={`Etes vous sure de vouloir suprimer se medias "${mediaToDelete.map((media) => media.split("/").pop())}"`}
                />

                {searchInput && (
                    <div className={`w-[80%] md:w-[50%] text-center ${pathname === "/" ? "!w-[85%]" : ""}`}>
                        <SearchMedias callBackStringSearch={filterSearchInput} medias={saveRespMedia} />
                    </div>
                )}
                <div
                    ref={mainDiv as React.RefObject<HTMLDivElement>}
                    className={`flex flex-wrap ${!isReady ? "opacity-0" : "opacity-1"} transition-opacity ease-in !duration-[750ms]`}
                >
                    {(medias as any)?.map((media: string, index: number) => {
                        return (
                            <Card
                                key={index}
                                className={`m-2 w-[300px] h-[350px] items-center ${!ready[index] ? "opacity-0" : "opacity-1"} transition-opacity ease-in !duration-[750ms]`}
                            >
                                <div className="h-[25px] w-[100%] p-1">
                                    {multipleSelect.length > 0 && deleteFile && (multipleSelect as string[]).find((element) => element === media) && (
                                        <Tooltip title={"Supprimer les elements selectioner"}>
                                            <DeleteIcon
                                                className="hover:cursor-pointer"
                                                fontSize="small"
                                                onClick={() => {
                                                    HandledeleteMedia(multipleSelect);
                                                }}
                                            />
                                        </Tooltip>
                                    )}
                                    {(deleteFile || selecteFile) && (
                                        <Tooltip title={"Multiple selection"}>
                                            <Checkbox
                                                checked={(multipleSelect as string[]).find((element) => element === media) ? true : false}
                                                onChange={(e) => addMultipleSelect(e, index)}
                                                size="small"
                                                sx={{ height: "10px", float: "right" }}
                                            />
                                        </Tooltip>
                                    )}
                                </div>
                                <Divider />

                                <div key={index} className="m-2">
                                    <div className="w-[300px] h-[220px] min-w-[300px] min-h-[220px]">
                                        <LoazyLoadingImg img={media} setReadyLoad={setReady} index={index} />
                                    </div>
                                </div>
                                <Divider />
                                <Tooltip title={media.split("/").pop()} placement="top">
                                    <p className="w-[100%]  overflow-hidden whitespace-nowrap text-ellipsis text-center">{media.split("/").pop()}</p>
                                </Tooltip>
                                <Divider />
                                <CardActions className="w-[100%]">
                                    {deleteFile && (
                                        <Tooltip title="Supprimer cet élément">
                                            <Button
                                                disabled={uploadLoading ? true : false}
                                                className="!m-auto"
                                                variant="contained"
                                                onClick={() => HandledeleteMedia([media])}
                                            >
                                                SUPPRIMER
                                            </Button>
                                        </Tooltip>
                                    )}
                                    {selecteFile && (
                                        <Tooltip title="Sélectionner cet élément">
                                            <Button
                                                disabled={uploadLoading ? true : false}
                                                className="!m-auto"
                                                variant="contained"
                                                onClick={() => callBackSelectFile && callBackSelectFile(media)}
                                            >
                                                SELECT
                                            </Button>
                                        </Tooltip>
                                    )}
                                </CardActions>
                            </Card>
                        );
                    })}
                </div>
                    <div ref={lazyRef} className="h-[350px] w-[100%]">

                    </div>
            </div>
        </>
    );
};

type TMediasProps = {
    selectFile: boolean;
    uploadFile: boolean;
    deleteFiles: boolean;
    searchInputFile?: boolean;
    callBackSelectFile?: (file: string) => void;
};

const Medias = ({ selectFile, callBackSelectFile, uploadFile, deleteFiles, searchInputFile }: TMediasProps) => {
    const [media, setMedias] = useState<string[]>([]);
    const [uploadLoading, setUploadLoading] = useState<boolean>(false);
    const [snack, setSnack] = useState({ open: false, message: "", type: "" });
    const callBackUploadLoading = (loading: boolean) => {
        setUploadLoading(loading);
    };

    const addMedia = (namefile: string[]) => {
        console.log("namefile", namefile);
        setMedias(namefile);
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
            {uploadFile && <UploadMedias setSnack={setSnack} addMedia={addMedia} callBackUploadLoading={callBackUploadLoading} />}
            <DisplayMedias
                selecteFile={selectFile}
                deleteFile={deleteFiles}
                searchInput={searchInputFile}
                callBackSelectFile={callBackSelectFile}
                addMedia={media}
                uploadLoading={uploadLoading}
                setSnack={setSnack}
            />
        </div>
    );
};

const SearchMedias = ({ callBackStringSearch, medias }) => {
    const [search, setSearch] = useState<string>("");
    const [bounceSearch, setBounceSearch] = useState<any>(null);

    const handleSearchInput = useCallback(
        (value: string) => {
            // console.log("value handle search", value);

            if (value == null) {
                value = "";
            }
            // console.log("value", value);
            setSearch(value);

            if (bounceSearch !== null) {
                clearTimeout(bounceSearch);
            }
            const timeoutId = setTimeout(() => {
                callBackStringSearch(value);
            }, 500);

            setBounceSearch(timeoutId);
        },
        [bounceSearch]
    );

    useEffect(() => {
        return () => {
            if (bounceSearch !== null) {
                clearTimeout(bounceSearch);
            }
        };
    }, [bounceSearch, search]);

    return (
        <>
            <div>
                <Autocomplete
                    freeSolo={true}
                    disablePortal={false}
                    disableCloseOnSelect={false}
                    includeInputInList={true}
                    options={medias.map((name) => {
                        return name.split("/").pop().split(".").shift() as string;
                    })}
                    // value={search}
                    // inputValue={""}
                    getOptionKey={(option) => {
                        // console.log("option", option);
                        return option;
                    }}
                    getOptionLabel={(option) => {
                        // console.log("option label", option);
                        return option;
                    }}
                    defaultValue={""}
                    onChange={(event, newValue) => {
                        console.log("newValue", newValue);
                        handleSearchInput(newValue);
                    }}
                    onInputChange={(event, newInputValue) => {
                        console.log("newInputValue", newInputValue);
                        handleSearchInput(newInputValue);
                    }}
                    renderInput={(params) => (
                        <TextField
                            {...params}
                            id="outlined-search"
                            label="Recherche de médias"
                            variant="outlined"
                            autoFocus={true}
                            sx={{ width: "100%", marginTop: "5rem", marginBottom: "5rem" }}
                        />
                    )}
                />
            </div>
        </>
    );
};

export default Medias;
