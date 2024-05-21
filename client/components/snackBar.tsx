import React, { useEffect, useState } from 'react';
import Snackbar from '@mui/material/Snackbar';
import { Alert } from "@mui/material";

export type TtypeSnackB = "success" | "info" | "warning" | "error" | undefined;

const SnackBar = (props) => {
    const [message, setMessage] = useState(props.message);
    const [type, setType] = useState<TtypeSnackB>(props.type);
    const [timeDuration, setTimeDuration] = useState(props.timeDuration);
    const [position, setPosition] = useState(props.position);
    const [open, setOpen] = useState(props.open);

    useEffect(() => {
        setMessage(props.message);
        setType(props.type);
        setTimeDuration(props.timeDuration);
        setPosition(props.position);
    }, []);

    useEffect(() => {
        setOpen(props.open);
        setMessage(props.message);
        setType(props.type);
        setTimeDuration(props.timeDuration);
    }, [props.open, props.message, props.type, props.timeDuration, props.position]);
    
    const handleCloseSnackBar = (event?: React.SyntheticEvent | Event, reason?: string) => {
        if (reason === 'clickaway') {
          return;
        }
        setOpen(false);
      };
    
       
    return (
        <Snackbar anchorOrigin={position} open={open} autoHideDuration={timeDuration} onClose={handleCloseSnackBar}>
            <Alert severity={type} sx={{ width: '100%', justifyContent: "center", bottom: "724px"}}>
                {message}
            </Alert>
        </Snackbar>
    )
     
}

export default SnackBar;