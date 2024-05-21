"use client";
import { Button, Divider } from "@mui/material";
import React, { useEffect, useState } from "react";
import { Box, Typography } from "@mui/material";
import { Modal as MuiModal } from "@mui/material";
import CancelIcon from "@mui/icons-material/Cancel";
import { styled } from "@mui/material/styles";

interface ModalProps {
    children: React.ReactNode;
    isOpen: boolean;
    iconClose?: React.ReactNode;
    close: () => void;
    style?: any;
}

const IconeToClose = ({ iconToClose, handleClose }: { iconToClose: React.ReactNode; handleClose: () => void }) => {
    if (iconToClose) {
        return (
            <div className="hover:cursor-pointer" onClick={handleClose}>
                {iconToClose}
            </div>
        );
    }

    return <CancelIcon className="right-[3%] hover:cursor-pointer  fixed !h-[35px] !w-[35px]" onClick={handleClose} />;
};

const styledBox = {
    position: "absolute",
    height: "80%",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "80%",
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 1,
};

const Modal = ({ children, isOpen, close, iconClose, style }: ModalProps) => {
    const [open, setOpen] = useState(false);
    // console.log("style", { ...styledBox, ...style });
    useEffect(() => {
        // console.log("isOpen", isOpen);
        setOpen(isOpen);
    }, []);

    useEffect(() => {
        setOpen(isOpen);
    }, [isOpen]);

    const handleClose = () => {
        setOpen(false);
        close();
    };

    return (
        <div>
            <MuiModal open={open} onClose={handleClose} aria-labelledby="modal-modal-t032itle" aria-describedby="modal-modal-description">
                <div>
                    <Box sx={{ ...styledBox, ...style }}>
                        <div className="w-[100%]  h-[35px] mb-2">
                            <IconeToClose iconToClose={iconClose} handleClose={handleClose} />
                        </div>
                        <Divider />
                        {children}
                    </Box>
                </div>
            </MuiModal>
        </div>
    );
};

export default Modal;
