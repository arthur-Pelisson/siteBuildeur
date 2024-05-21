"use client";
import {
    Accordion,
    AccordionDetails,
    AccordionSummary,
    Autocomplete,
    Checkbox,
    Chip,
    FormControl,
    InputLabel,
    MenuItem,
    OutlinedInput,
    Select,
    TextField,
    Typography,
} from "@mui/material";
import { getTags } from "@/app/request/requestTag";
import Modal from "@mui/material/Modal";
import Medias from "../medias/displayMedias";
import { Button } from "@mui/material";
import { use, useEffect, useState, useCallback } from "react";
import EditorComponent from "../wysiwyg/textEditor";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import DeleteForever from "@mui/icons-material/DeleteForever";
import { Divider } from "@nextui-org/divider";
import CancelIcon from "@mui/icons-material/Cancel";
import { formValidation } from "@/utils/formValidation";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import dayjs from "dayjs";
import "dayjs/locale/fr";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";
import PhotoAlbum, { DivElementAttributes } from "react-photo-album";
import IframeVideo from "../iframeVideo";
import GoogleMap from "../googleMaps";

const style = {
    // position: "absolute" as "absolute",
    // top: "50%",
    // left: "50%",
    // transform: "translate(-50%, -50%)",
    width: "100%",
    // bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    // p: 4,
};

const CreateData = (dataForm: any) => {
    console.log("dataForm : ", dataForm);
    const [dataSetStatus, setDataSetStatus] = useState<boolean>(false);
    const [data, setData] = useState<any>({});

    useEffect(() => {
        dataForm.map((item: any) => {
            if (item?.data === false) return;
            // console.log("item : ", item);
            if (item?.translation) {
                setData((prev: any) => ({ ...prev, [item.name]: { fr: "", en: "" } }));
            } else if (item.obj != undefined) {
                setData((prev: any) => ({ ...prev, [item.name]: item.obj }));
            } else {
                if (item?.type === "doubledateTimePicker") {
                    setData((prev: any) => ({ ...prev, [item.name + "Start"]: "" }));
                    setData((prev: any) => ({ ...prev, [item.name + "End"]: "" }));
                    return;
                }
                if (item?.type === "multipleImages") {
                    setData((prev: any) => ({ ...prev, [item.name]: [] }));
                    return;
                }
                setData((prev: any) => ({ ...prev, [item.name]: "" }));
            }
        });
        setDataSetStatus(true);
    }, []);

    return { data, setData, dataSetStatus };
};

const FormBuildeur = ({ dataForm, callBackData, callBackHandleSubmite, data, submit, valueGetter }: any) => {
    console.log("dataaaaaaaaaaaaaa", data);
    const [validationErrors, setValidationErrors] = useState<Record<string, string | null>>({});
    const [disabled, setDisabled] = useState<boolean>(false);

    const handleData = (name: string, value: any, lg: string) => {
        console.log("name handlechaqnge : ", name);
        console.log("value handlechange: ", value);
        console.log("lg handlechange : ", lg);
        setDisabled(false);
        callBackData(name, value, lg);
    };

    useEffect(() => {
        if (Object.keys(validationErrors).length > 0) {
            setDisabled(true);
        } else {
            setDisabled(false);
        }
    }, [validationErrors]);

    const handleSubmite = () => {
        let newValidationErrors: Record<any, any> = {};
        // console.log("dataForm : ", dataForm);
        // console.log("data : ", data);
        dataForm.forEach((field: any) => {
            // console.log("field : ", field);
            if (field?.translation === true) {
                ["fr", "en"].forEach((lg) => {
                    const error = formValidation(field, data, dataForm, lg);
                    if (error) {
                        console.log(newValidationErrors);
                        newValidationErrors[field.name] = { ...newValidationErrors[field.name], [lg]: error };
                    }
                });
            } else {
                const error = formValidation(field, data, dataForm);
                if (error) {
                    newValidationErrors[field.name] = error;
                }
            }
        });
        setValidationErrors(newValidationErrors);

        if (Object.keys(newValidationErrors).length > 0) {
            // console.log("Il y a des erreurs " + JSON.stringify(newValidationErrors));
            // console.log("newValidationErrors : ", newValidationErrors);
            return;
        }
        callBackHandleSubmite();
    };

    // console.log("dataForm : ", dataForm);
    return (
        <div className="w-[80%] flex flex-col">
            {dataForm.map((item: any, index: number) => {
                return (
                    <div key={index}>
                        {item.type === "text" && (
                            <Input callBackData={handleData} value={data[item.name]} {...item} error={validationErrors?.[item.name]} />
                        )}
                        {item.type === "file" && (
                            <SelectFile callBackData={handleData} value={data[item.name]} {...item} error={validationErrors?.[item.name]} />
                        )}
                        {item.type === "wysiwyg" && (
                            <Wysiwyg
                                callBackData={handleData}
                                data={item}
                                value={data[item.name]}
                                translation={item?.translation}
                                error={validationErrors?.[item.name]}
                            />
                        )}
                        {item.type === "dateTimePicker" && (
                            <DateTimePickerC
                                callBackData={handleData}
                                {...item}
                                data={item}
                                value={data[item.name]}
                                translation={item?.translation}
                                error={validationErrors?.[item.name]}
                            />
                        )}
                        {item.type === "DoubledateTimePicker" && (
                            <DoubleDateTimePicker
                                callBackData={handleData}
                                {...item}
                                data={item}
                                valueStart={data[item.name + "Start"]}
                                valueEnd={data[item.name + "End"]}
                                translation={item?.translation}
                                error={validationErrors?.[item.name]}
                            />
                        )}
                        {item.type === "map" && (
                            <GoogleMap
                                input={true}
                                value={data[item.name]}
                                error={validationErrors?.[item.name]}
                                callBackdata={handleData}
                                name={item.name}
                            />
                        )}
                         {item.type === "selectMap" && (
                            <SelectAutocompleteMap
                                value={data[item.name]}
                                {...item}
                                error={validationErrors?.[item.name]}
                                callBackData={handleData}
                            />
                        )}
                        {item.type === "multipleImages" && <MultipleImages callBackData={handleData} value={data[item.name]} {...item} />}
                        {item.type === "selectTags" && <SelectMultiTag callBackData={handleData} value={data[item.name]} {...item} />}
                        {item.type === "video" && <Video callBackData={handleData} value={data[item.name]} {...item} />}
                    </div>
                );
            })}
            <Submite value={submit} callBackHandleSubmite={handleSubmite} error={disabled} />
        </div>
    );
};

const Wysiwyg = ({ data, callBackData, label, translation, error, value }: any) => {
    // console.log("value : ", value);
    const [tabIndex, setTabIndex] = useState("fr");

    const handleEditorChange = (editorState: string) => {
        console.log("editorState : ", editorState);
        callBackData(data.name, editorState, tabIndex);
    };

    if (translation === false) {
        return (
            <div>
                <div>
                    <Typography variant="h6" component="h2">
                        {data.label}
                    </Typography>
                </div>
                <div>{error && <div className="text-red-500">{error}</div>}</div>
                <EditorComponent defaultContent={value} handleEditorChange={handleEditorChange} language={"fr"} customClass={"!h-[500px]"} />
            </div>
        );
    }

    return (
        <div className="w-[100%] m-auto flex flex-col justify-center items-center">
            <div>
                <Typography variant="h6" component="h2">
                    {data.label}
                </Typography>
            </div>
            <TabContext value={tabIndex}>
                <TabList onChange={(e, value) => setTabIndex(value)}>
                    {["fr", "en"].map((lg, index) => {
                        return <Tab className={`${error?.[lg] !== undefined ? "!bg-red-500 !text-white" : ""}`} key={index} label={lg} value={lg} />;
                    })}
                </TabList>
                <div className="flex justify-center ">
                    {["fr", "en"].map((lg, index) => {
                        return (
                            <TabPanel key={index} value={lg} sx={{ width: "100%" }}>
                                {error?.[lg] && <div className="text-red-500">{error?.[lg]}</div>}
                                {typeof window !== "undefined" && (
                                    <EditorComponent
                                        defaultContent={value[lg]}
                                        handleEditorChange={handleEditorChange}
                                        language={lg}
                                        customClass={"!h-[500px]"}
                                    />
                                )}
                            </TabPanel>
                        );
                    })}
                </div>
            </TabContext>
        </div>
    );
};

const SelectFile = ({ label, name, value, error, callBackData, placeholder }: any) => {
    console.log("value select file : ", value);
    const [open, setOpen] = useState<boolean>(false);
    const onRemoveImage = () => {
        callBackData(name, null);
    };

    const onSelectFile = (file: any) => {
        callBackData(name, file);
        setOpen(false);
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <div className="w-[100%] m-7 text-center mb-5">
            <Modal open={open} onClose={handleClose} className="w-[100%] max-h-[100%] overflow-hidde flex items-center justify-center">
                <div className="bg-white w-[80%] h-[80%] overflow-y-scroll rounded-md pb-5">
                    <div className="w-[100%]  h-[35px] mb-2 hover:cursor-pointer ">
                        <CancelIcon className="float-right !h-[35px] !w-[35px]" onClick={handleClose} />
                    </div>
                    <Medias selectFile={true} deleteFiles={false} uploadFile={true} searchInputFile={true} callBackSelectFile={onSelectFile} />
                </div>
            </Modal>
            <div>
                <div>
                    <Typography variant="h6" component="h2">
                        {label}
                    </Typography>
                </div>
                <div>{error && <div className="text-red-500">{error}</div>}</div>
                <div>
                    <Button variant="contained" onClick={() => setOpen(true)}>
                        Select Image
                    </Button>
                </div>
                <div className="text-center w-[100%] mt-3">
                    <div className="w-[450px] h-[450px] overflow-hidden border-black border-1 m-auto">
                        {value && (
                            <>
                                <img src={value} style={{ width: "100%", height: "100%", objectFit: "contain" }} alt="image" />
                            </>
                        )}
                    </div>
                    <DeleteForever className={`${value ? "hover:cursor-pointer" : "opacity-0"}`} onClick={onRemoveImage} />
                </div>
            </div>
        </div>
    );
};

const Input = ({ label, name, value, callBackData, translation, placeHolder, error }: any) => {
    const [tabIndex, setTabIndex] = useState("fr");
    console.log("value input : ", value);

    const onChange = (name: any, value: any, lg: string | null = null) => {
        if (translation === true && lg !== null) {
            callBackData(name, value, lg);
        } else {
            callBackData(name, value);
        }
    };
    // console.log("error input", error)
    if (translation === true) {
        return (
            <div>
                <div>
                    <Typography variant="h6" component="h2">
                        {label}
                    </Typography>
                </div>
                <TabContext value={tabIndex}>
                    <TabList onChange={(e, value) => setTabIndex(value)}>
                        {["fr", "en"].map((lg, index) => {
                            return (
                                <Tab className={`${error?.[lg] !== undefined ? "!bg-red-500 !text-white" : ""}`} key={index} label={lg} value={lg} />
                            );
                        })}
                    </TabList>
                    {["fr", "en"].map((lg, index) => (
                        <TabPanel key={index} value={lg}>
                            {typeof window !== "undefined" && (
                                <TextField
                                    autoComplete="off"
                                    inputProps={{ spellCheck: "false" }}
                                    type="text"
                                    key={name}
                                    label={label[lg]} // Use the English label for simplicity
                                    placeholder={placeHolder[lg]} // Use the English placeholder for simplicity
                                    variant="outlined"
                                    fullWidth
                                    required
                                    value={value[lg]}
                                    onChange={(e) => onChange(name, e.target.value, lg)}
                                    error={error?.[lg] !== undefined}
                                    helperText={error?.[lg] || ""}
                                />
                            )}
                        </TabPanel>
                    ))}
                </TabContext>
            </div>
        );
    }

    return (
        <div>
            <div>
                <Typography variant="h6" component="h2">
                    {label}
                </Typography>
            </div>
            <TextField
                autoComplete="off"
                inputProps={{ spellCheck: "false" }}
                type="text"
                key={name}
                label={label} // Use the English label for simplicity
                placeholder={placeHolder} // Use the English placeholder for simplicity
                variant="outlined"
                fullWidth
                required
                value={value}
                onChange={(e) => onChange(name, e.target.value)}
                error={error !== undefined}
                helperText={error}
            />
        </div>
    );
};

const DateTimePickerC = ({ label, name, value, callBackData, translation, placeHolder, error }: any) => {
    // console.log("value date : ", value);
    const [tabIndex, setTabIndex] = useState("fr");
    console.log(error);

    const onChange = (name: any, value: any, lg: string | null = null) => {
        value = dayjs(value).format("YYYY-MM-DDTHH:mm:ssZ");
        // console.log("value : ", dayjs(value));
        // console.log("value : ", value);
        // console.log("name : ", name);
        callBackData(name, value, tabIndex);
    };

    return (
        <div className="w-[100%] flex flex-col justify-center items-center">
            <div>
                <Typography variant="h6" component="h2">
                    {label}
                </Typography>
            </div>
            <div>
                <Typography className="text-red-500" component="p">
                    {error && error}
                </Typography>
            </div>
            <div>
                <LocalizationProvider adapterLocale="fr" dateAdapter={AdapterDayjs}>
                    <DateTimePicker
                        label={label}
                        defaultValue={dayjs()}
                        value={value && dayjs(value)}
                        onChange={(newValue) => onChange(name, newValue)}
                        ampm={false}
                        // disablePast={true}
                        onError={(reason, value) => {
                            console.log(reason, value);
                        }}
                        format="DD/MM/YYYY HH:mm"
                    />
                </LocalizationProvider>
            </div>
        </div>
    );
};

const DoubleDateTimePicker = ({ label, name, valueStart, valueEnd, callBackData, translation, placeHolder, error }: any) => {
    dayjs.locale("fr");
    const [inputValueStart, setInputValueStart] = useState<any>(dayjs(valueStart) || dayjs().add(1, "hour"));
    const [inputValueEnd, setInputValueEnd] = useState<any>(dayjs(valueEnd) || dayjs().add(2, "hour"));
    const [errorInput, setErrorInput] = useState<any>(null);
    const [minTimeStart, setMinTimeStart] = useState<any>(dayjs().add(1, "hour"));
    // console.log(error);

    useEffect(() => {
        console.log(dayjs(inputValueStart).format("YYYY-MM-DDTHH:mm:ssZ"));
    }, [inputValueStart, inputValueEnd]);

    const handleError = (reason: any, value: any) => {
        // console.log("reason : ", reason);
        // console.log("value : ", value);
        // setErrorInput(true);
    };

    const onChange = (name: any, value: any) => {
        if (errorInput) return;
        callBackData(name, value.format("YYYY-MM-DDTHH:mm:ssZ"));
    };

    return (
        <div className="w-[100%] flex flex-col justify-center items-center">
            <div>
                <Typography variant="h6" component="h2">
                    {label}
                </Typography>
            </div>
            <div>
                <Typography className="text-red-500" component="p">
                    {error && error}
                </Typography>
            </div>
            <div>
                <LocalizationProvider adapterLocale="fr" dateAdapter={AdapterDayjs}>
                    <DateTimePicker
                        label="Date de début"
                        defaultValue={dayjs().add(1, "hour")}
                        value={inputValueStart}
                        onChange={(newValue) => onChange("dateStart", newValue)}
                        ampm={false}
                        onError={(reason, value) => {
                            handleError(reason, value);
                        }}
                        name="date_start"
                        // disablePast={true}
                        format="DD/MM/YYYY HH:mm"
                        // maxDate={inputValueEnd}
                    />
                    <DateTimePicker
                        label="Date de fin"
                        defaultValue={dayjs().add(2, "hour")}
                        value={inputValueEnd}
                        onChange={(newValue) => onChange("dateEnd", newValue)}
                        ampm={false}
                        name="date_end"
                        onError={(reason, value) => {
                            handleError(reason, value);
                        }}
                        disablePast={true}
                        format="DD/MM/YYYY HH:mm"
                        minDate={dayjs(valueStart)}
                        minTime={dayjs(valueStart).add(1, "hour")}
                        maxDate={dayjs(valueStart)}
                    />
                </LocalizationProvider>
            </div>
        </div>
    );
};

const MultipleImages = ({ label, name, value, callBackData }: any) => {
    console.log("value multiple images : ", value);
    const [open, setOpen] = useState<boolean>(false);
    const [index, setIndex] = useState(-1);
    const [photos, setPhotos] = useState<any[]>([]);

    const loadImages = async () => {
        const loadedPhotos: any[] = await Promise.all(
            value.map(async (image: string) => {
                const img = new Image();
                img.src = image;
                await img.decode();
                return { src: image, width: img.width, height: img.height };
            })
        );
        setPhotos(loadedPhotos);
    };

    const onRemoveImage = (imageToRemove: string) => {
        let images: string[] = value;
        images = images.filter((image) => image !== imageToRemove);
        console.log("images on remove images : ", images);
        callBackData(name, images);
    };

    useEffect(() => {
        console.log("value in use effect multiple images : ", value);
        loadImages();
    }, [JSON.stringify(value)]);

    const onSelectFile = (file: any) => {
        let images: string[] = value;
        images.push(file);
        callBackData(name, images);
        setOpen(false);
    };

    const handleClose = () => {
        setOpen(false);
    };
    console.log("photos : ", photos);
    return (
        <Accordion className="p-5">
            <AccordionSummary aria-controls="panel2-content" id="panel2-header" expandIcon={<ExpandMoreIcon />}>
                Séries d'images
            </AccordionSummary>
            <AccordionDetails>
                <Modal open={open} onClose={handleClose} className="w-[100%] max-h-[100%] overflow-hidde flex items-center justify-center">
                    <div className="bg-white w-[80%] h-[80%] overflow-y-scroll rounded-md pb-5">
                        <div className="w-[100%]  h-[35px] mb-2 hover:cursor-pointer ">
                            <CancelIcon className="right-[11%]  fixed !h-[35px] !w-[35px]" onClick={handleClose} />
                        </div>
                        <Medias selectFile={true} deleteFiles={false} uploadFile={true} searchInputFile={true} callBackSelectFile={onSelectFile} />
                    </div>
                </Modal>
                <div className="text-center">
                    <div>
                        <Typography variant="h6" component="h2">
                            {label}
                        </Typography>
                    </div>
                    <div>
                        <Button variant="contained" onClick={() => setOpen(true)}>
                            Select Image
                        </Button>
                    </div>
                    <Divider className="mt-3 mb-3" />
                </div>
                <PhotoAlbum
                    renderPhoto={({ photo, wrapperStyle, renderDefaultPhoto }) => (
                        <div style={{ position: "relative", ...wrapperStyle }}>
                            {renderDefaultPhoto({ wrapped: true })}
                            <DeleteForever className={`${value ? "hover:cursor-pointer" : "opacity-0"}`} onClick={() => onRemoveImage(photo.src)} />
                        </div>
                    )}
                    layout={"masonry"}
                    photos={photos}
                    targetRowHeight={150}
                    onClick={({ index: current }) => setIndex(current)}
                />
                <Lightbox index={index} slides={photos} open={index >= 0} close={() => setIndex(-1)} />
            </AccordionDetails>
        </Accordion>
    );
};

import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import { getAllMaps } from "@/app/request/requestMaps";

const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;

const SelectMultiTag = ({ label, placeHolder, name, value, callBackData, options, error }: any) => {
    const [tags, setTags] = useState<any[]>([]);
    const [ready, setReady] = useState<boolean>(false);
    const {
        response: getTagsResponse,
        Success: getTagsSuccess,
        Error: getTagsError,
        Loading: getTagsLoading,
        fetchRequest: getTagsFecth,
        params: getTagsParams,
    } = getTags();

    useEffect(() => {
        getTagsFecth(getTagsParams);
    }, []);

    const serializeTags = (tags: any) => {
        return tags.map((tag: any) => {
            for (const element of tag.tag_translate) {
                if (element.language === "fr") {
                    return { title: element.name, id: tag.id };
                }
            }
        });
    };

    const getTagsById = (tagsId: number[]) => {
        console.log("tagsId : ", tagsId);
        const defaultValue:any = [];
        tags.map((tag: any) => {
            for (const id of tagsId) {
                if (tag.id === id) {
                    defaultValue.push(tag);
                }
            }
        });
        console.log("defaultValue : ", defaultValue);
        return defaultValue
    }

    useEffect(() => {
        if (getTagsResponse && getTagsSuccess) {
            console.log("getTagsResponse : ", getTagsResponse);
            setTags(serializeTags(getTagsResponse));
            setReady(true);
        }
    }, [getTagsResponse]);

    const onChange = (name: any, value: any, lg: string | null = null) => {
        console.log("value select tags: ", value);
        const newValue = value.map((tag: any) => tag.id);
        console.log("name select tags: ", name);
        if (lg !== null) {
            callBackData(name, newValue, lg);
        } else {
            callBackData(name, newValue);
        }
    };

    if (getTagsLoading || !ready) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <div>
                <Typography variant="h6" component="h2">
                    {label}
                </Typography>
            </div>
            <div>
                <Typography className="text-red-500" component="p">
                    {error && error}
                </Typography>
            </div>
            <div>
                {ready && (
                    <Autocomplete
                        multiple
                        id="checkboxes-tags-demo"
                        defaultValue={getTagsById(value)}
                        options={tags}
                        disableCloseOnSelect
                        getOptionLabel={(option) => option.title}
                        onChange={(e, value) => onChange(name, value)}
                        renderOption={(props, option, { selected }) => (
                            <li {...props}>
                                <Checkbox icon={icon} checkedIcon={checkedIcon} style={{ marginRight: 8 }} checked={selected} />
                                {option.title}
                            </li>
                        )}
                        style={{ width: 500 }}
                        renderInput={(params) => <TextField {...params} label={label} placeholder={placeHolder} />}
                    />
                )}
            </div>
        </div>
    );
};

const Video = ({ label, name, value, callBackData, translation, placeHolder, error }: any) => {
    const [tabIndex, setTabIndex] = useState("fr");
    console.log("value input : ", value);
    const [textAccordion, setTextAccordion] = useState<string>("Voir la video");
    
    const handleExpand = (expand: boolean) => {
        if (expand) {
            setTextAccordion("Fermer la video")
        } else {
            setTextAccordion("Voir la video")
        }

    };

    const onChange = (name: any, value: any) => {
            callBackData(name, value);
    };
    // console.log("error input", error)

    return (
        <div className="border-b-black border-1 mb-5">
            <div className="w-[100%] m-auto">
                <Typography sx={{textAlign:"center"}} variant="h6" component="h2">
                    {label}
                </Typography>
            </div>
            <TextField
                autoComplete="off"
                inputProps={{ spellCheck: "false" }}
                type="text"
                key={name}
                label={label} // Use the English label for simplicity
                placeholder={placeHolder} // Use the English placeholder for simplicity
                variant="outlined"
                fullWidth
                required
                value={value}
                onChange={(e) => onChange(name, e.target.value)}
                error={error !== undefined}
                helperText={error}
            />
            <Accordion className="p-5" onChange={(e, expanded) => {handleExpand(expanded)}}>
            <AccordionSummary aria-controls="panel2-content" id="panel2-header" expandIcon={<ExpandMoreIcon />}>
                <p className="text-center w-[100%]">
                {textAccordion}
                </p>
            </AccordionSummary>
            <AccordionDetails>
            <div className="w-[100%] m-auto">
                <IframeVideo url={value} />
            </div>
            </AccordionDetails>
            </Accordion>
        </div>
    );
};

const SelectAutocompleteMap = ({ label, accordionName, name, value, callBackData, placeHolder, error }: any) => {
    console.log("value select : ", value);
    const { response: maps, Error: errorMaps, Loading: loadingMaps, fetchRequest: fetchMaps, params: paramsMaps } = getAllMaps();

    const [dataMap, setDataMap] = useState<any>(null);

    useEffect(() => {
        fetchMaps(paramsMaps);
        if (value === undefined || value === "" || value === null) setDataMap(null);
        const map = getValue();
        setDataMap(map);
    }, []);

    useEffect(() => {
        console.log("value : ", value);
        console.log("maps : ", maps);
        if (value === undefined || value === "" || value === null) setDataMap(null);
        const findMap = getValue();
        setDataMap(findMap);
    }, [value, maps]);

    const getValueName = (value: any) => {
        if (value === undefined || value === "" || value === null) return "";
        console.log("value : ", value);
        console.log(maps)

        if (maps === undefined || maps === null) return;
        return (maps as any[]).find((option:any) => option.id === value).name;
    };

    const getValue = () => {
        if (value === undefined || value === "" || value === null) return "";
        console.log("value : ", value);
        console.log(maps)
        if (maps === undefined || maps === null) return;
        return (maps as any[]).find((option:any) => option.id === value);
        // valueGetter.map((option) => {
        // console.log("option : ", option.id);
        // });
    }
    
    const handleChangeValue = (e: any, value:any) => {
        // console.log("e : ", e);
        console.log("value : ", value);
        if (value === null) {
            callBackData(name, "");
            return;
        }
        callBackData(name, value.id);
    };

    if (loadingMaps || errorMaps ||  !maps ) return;
    return (
        <div className="w-[100%] h-auto text-center">
            <Accordion className="w-[50%] !m-auto">
                <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel1-content" id="panel1-header">
                   {accordionName}
                </AccordionSummary>
                <AccordionDetails className="m-auto min-h-[450px]">
            <Autocomplete
                disablePortal
                id="combo-box-demo"
                value={getValue()}
                inputValue={getValueName(value)}
                options={maps}
                onChange={(e, value) => handleChangeValue(e, value)}
                sx={{ width: 300, margin: "auto", marginBottom: "1.5rem" }}
                renderInput={(params) => <TextField {...params} label={label} />}
                getOptionKey={(option) => option.id || ""}
                getOptionLabel={(option) => option.name || ""}
            />
            {dataMap && (
                <div className="w-[100%] h-[400px] text-center m-auto">
                    <GoogleMap
                        input={false}
                        value={{ address: dataMap.address, lng: dataMap.longitude, lat: dataMap.latitude, zoom: dataMap.zoom }}
                        style="w-[100%] h-[350px] m-auto"
                        defaultStyle={false}
                    />
                </div>
            )}
                </AccordionDetails>
            </Accordion>
        </div>
    );
};

const Submite = ({ value, callBackHandleSubmite, error }: any) => {
    // console.log("error : ", error);
    return (
        <div className="m-7 w-[100%] text-center">
            <Button className="w-[10%] m-auto" variant="contained" type="submit" disabled={error ? true : false} onClick={callBackHandleSubmite}>
                {value}
            </Button>
        </div>
    );
};

export { FormBuildeur, CreateData };
