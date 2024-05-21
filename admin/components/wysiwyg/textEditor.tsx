"use client";
import React, { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import draftToHtml from "draftjs-to-html";
import { EditorProps } from "react-draft-wysiwyg";
import { EditorState, convertToRaw, ContentState, Modifier, AtomicBlockUtils } from "draft-js";
import Medias from "../medias/displayMedias";
import CancelIcon from "@mui/icons-material/Cancel";
import ImageIcon from '@mui/icons-material/Image';
const Editor = dynamic<EditorProps>(() => import("react-draft-wysiwyg").then((mod) => mod.Editor), { ssr: false });
// import { Editor } from "react-draft-wysiwyg";
import "/node_modules/react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import Loading from "@/components/loading/loading";
import { Modal, TextField, Typography } from "@mui/material";
import Box from '@mui/material/Box';
import { Button } from "@mui/material";

const EditorComponent = ({ handleEditorChange, defaultContent, language, customClass }) => {
    // const contentBlock = htmlToDraft(defaultContent);
    // const contentState = ContentState.createFromBlockArray(contentBlock.contentBlocks);
    // console.log(contentBlock);
    const [editorState, setEditorState] = useState(() => EditorState.createEmpty());

    useEffect(() => {
        if (typeof window !== "undefined") {
            const htmlToDraft = require("html-to-draftjs")?.default;
            if (defaultContent === "") {
                defaultContent = "<p></p>";
            }
            const defaultDraft = htmlToDraft(defaultContent);

            const contentBlock = ContentState.createFromBlockArray(defaultDraft.contentBlocks);
            setEditorState(EditorState.createWithContent(contentBlock));
        }
    }, []);

    const onEditorStateChange = (contentState) => {
        if (typeof window !== "undefined") {
            setEditorState(contentState);
        }
    };

    const onContentStateChange = (contentState) => {
        if (typeof window !== "undefined") {
            handleEditorChange(draftToHtml(convertToRaw(editorState.getCurrentContent())), language);
        }
    };


    if (typeof window === "undefined") {
        return <Loading display={true} />;
    }

    return (
        <div className="max-w-[100%]">
            <Editor
                editorState={editorState}
                onEditorStateChange={onEditorStateChange}
                contentState={editorState}
                onContentStateChange={onContentStateChange}
                wrapperClassName="demo-wrapper"
                editorClassName={`wysiwyg ${customClass}`}
                toolbarCustomButtons={[<MediasTextEditor setEditorState={setEditorState}/>]}
                localization={{
                    locale: "fr",
                }}
                toolbar={{
                    options: [
                        "inline",
                        "blockType",
                        "fontSize",
                        "list",
                        "textAlign",
                        "colorPicker",
                        "link",
                        "embedded",
                        "emoji",
                        "remove",
                        // "image",
                        "history",
                    ],
                }}
            />
        </div>
    );
};
export default EditorComponent;

const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };

const MediasTextEditor = (props) => {
    
    console.log(props);
    const { editorState, onChange } = props;
    const [open, setOpen] = useState(false);
    const [openSize, setOpenSize] = useState(false);
    const [data, setData] = useState({ width: "auto", height: "auto" , file: "" });
    
    const handleClose = () => {
        setOpen(false);
    };
    
    const selectWidthAndHeight = () => {

        const handleSubmit = () => {
            callBackData();
        }

        const handleClose = () => {
            callBackData()
        }

        return (
            <Modal open={true} onClose={handleClose} className="w-[100%] max-h-[100%] overflow-hidde flex items-center justify-center">
                    <div className=" h-[80%]  rounded-md pb-5">
                       <Box sx={style}>
                           <div onSubmit={handleSubmit} className="flex flex-col">
                            <Typography id="modal-modal-title" variant="h6" component="h2">
                                Taille de l'image
                            </Typography>
                            <TextField
                                label="Largeur en px"
                                name="width"
                                type="text"
                                defaultValue={data.width}
                                variant="outlined"
                                onChange={(e) => setData({ ...data, width: e.target.value })}
                                className="!mb-5"
                            />
                            <TextField
                                label="Hauteur en px"
                                name="height"
                                type="text"
                                defaultValue={data.height}
                                onChange={(e) => setData({ ...data, height: e.target.value })}
                                variant="outlined"
                                className="!mb-5"
                            />
                            <Button onClick={handleSubmit} variant="contained" color="success">Valider</Button>
                           </div>
                        </Box>
                    </div>
                </Modal>
        )

    };

    const callBackData = () => {
        setOpenSize(false);
        const contentState = editorState.getCurrentContent();
        const contentStateWithEntity = contentState.createEntity("IMAGE", "MUTABLE", {
            src: data.file,
            height: data.height === "auto" ? "auto" : data.height + "px",
            width: data.width + "px",
        });

        const entityKey = contentStateWithEntity.getLastCreatedEntityKey();
        const newEditorState = EditorState.set(editorState, { currentContent: contentStateWithEntity });

        const newEditorStateWithAtomicBlock = AtomicBlockUtils.insertAtomicBlock(newEditorState, entityKey, " ");

        props.setEditorState(newEditorStateWithAtomicBlock);
    };

    const onSelectFile = (file) => {
        setData({ ...data, file: file });
        setOpenSize(true);
        setOpen(false);
       
    };

    return (
        <div>
            <div onClick={() => setOpen(!open)} className="rdw-option-wrapper">
                <ImageIcon />
            </div>
            <div className="w-[100%] m-7 text-center mb-5">
                {openSize && selectWidthAndHeight(data)}
                <Modal open={open} onClose={handleClose} className="w-[100%] max-h-[100%] overflow-hidde flex items-center justify-center">
                    <div className="bg-white w-[80%] h-[80%] overflow-y-scroll rounded-md pb-5">
                        <div className="w-[100%]  h-[35px] mb-2 hover:cursor-pointer ">
                            <CancelIcon className="float-right !h-[35px] !w-[35px]" onClick={handleClose} />
                        </div>
                        <Medias
                            selectFile={true}
                            deleteFiles={false}
                            uploadFile={true}
                            searchInputFile={true}
                            callBackSelectFile={onSelectFile}
                        />
                    </div>
                </Modal>
            </div>
        </div>
    );
};
