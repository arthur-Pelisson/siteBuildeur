"use client";
import { getSettings, updateSettings } from "@/app/request/requestSettings";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import { Box, Button, Card, Divider, InputAdornment, Tab, TextField } from "@mui/material";
import { set } from "immutable";
import PreviousMap from "postcss/lib/previous-map";
import { useEffect, useState } from "react";
import { settingsEmailForm } from './dataForm';
import { formValidation } from "@/utils/formValidation";
import { FieldValidation, FormField } from "../types/formValidation";
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import SnackBar, { TtypeSnackB } from "@/components/snackBar/snackBar";
const settingsPage = () => {
    const [settings, setSettings] = useState<any>(null);
    const [nameSettings, setNameSettings] = useState<string[]>([]);
    const [value, setValue] = useState('Email');
    const [snack, setSnack] = useState({ open: false, message: "", type: "" });

    const {
        response: getReponse,
        Error: getError,
        Loading: getLoading,
        Success: getSuccess,
        fetchRequest: getFetche,
        params: getParams,
    } = getSettings();

    useEffect(() => {
        getFetche({ url: getParams.url, method: getParams.methode });
    }, []);

    useEffect(() => {
        if (getReponse && !getLoading) {
            setSettings(getReponse);
            getNameSettings(getReponse);
            return;
        }
        if (getError) {
            console.log(getError);
            return;
        }
    }, [getReponse]);

    const getNameSettings = (settings: any) => {
        settings &&
            settings.settings.map((setting: any) => {
                if (setting && setting.name !== undefined) {
                    setNameSettings((prev) => {
                        return [...prev, setting.name];
                    });
                }
            });
    };

    const handleChange = (event: React.SyntheticEvent, newValue: string) => {
        setValue(newValue);
    };

    console.log("nameSettings",nameSettings);
    return (
        <div>
            <SnackBar
                open={snack.open}
                message={snack.message}
                type={snack.type as TtypeSnackB}
                timeDuration={4000}
                position={{ vertical: "top", horizontal: "center" }}
            />
            <Box sx={{ width: "100%", typography: "body1" }}>
                <TabContext value={value}>
                    <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
                        <TabList onChange={handleChange} aria-label="lab API tabs example">
                            {nameSettings.map((name, index) => {
                                return <Tab label={name} value={name} key={index} />;
                            })}
                        </TabList>
                    </Box>
                    {nameSettings.map((name, index) => {
                        if (getLoading || !settings) return <div>Chargement...</div>;
                        return (
                            <TabPanel value={name} key={index}>
                                {name === "Email" && settings && <RenderEmailSettings setSnack={setSnack} settings={settings.settings[index]} />}
                            </TabPanel>
                        );
                    })}
                </TabContext>
            </Box>
        </div>
    );
};

export default settingsPage;


const RenderEmailSettings = ({settings, setSnack}: {settings:any, setSnack:any}) => {
    console.log("settings render email", settings);
    const { response: updateResponse, Error: updateError, Loading: updateLoading, Success: updateSuccess, fetchRequest: updateFetch, params: updateParams } = updateSettings();
    const [validationErrors, setValidationErrors] = useState<Record<string, string | false>>({});
    const [showPassword, setShowPassword] = useState(false);
    const [data, setData] = useState<any>({
        emailAdmin: settings.emailAdmin,
        email: settings.email,
        password: "****************",
        service: settings.service,
    });

    useEffect(() => {
        if (updateResponse && !updateLoading) {
            if (updateSuccess) {
                setSnack({ open: true, message: "Mise à jour réussie", type: "success" });
                return;
            } 
            if (updateError && !updateSuccess) {
                setSnack({ open: true, message: "Echec de la mise à jour", type: "error" });
                return;
            }
        }  
    }, [updateResponse]);
    
    const handleChange = (name: string, value: string) => {
        setData((prev: any) => {
            return { ...prev, [name]: value };
        });
    };

    const handleSave = () => {
        // setDisableSubmit(true);
        // console.log('Updated Form Data:', formData);
        const newValidationErrors: Record<string, string | false> = {};
        settingsEmailForm.form.fields.forEach((field: FormField) => {
                const error = formValidation(field, data, settingsEmailForm.form.fields);
                if (error) {
                    newValidationErrors[field.name] = error;
                }
            });
    
            setValidationErrors(newValidationErrors);
    
            if (Object.keys(newValidationErrors).length > 0) {
                // setDisableSubmit(true);
                console.log("Il y a des erreurs " + JSON.stringify(newValidationErrors));
                return;
            }
    
            handleUpdateSettings();
      };

      const handleUpdateSettings = async () => {
        setSnack({ open: false, message: "", type: "" });
        updateFetch({ url: updateParams.url, method: updateParams.methode, data: data });
      };


    console.log("render email", settings);
    return (
        <div>
            <h3 className="mb-3">{settingsEmailForm.form.title}</h3>
            <div className="w-[50%]">
            
            {settingsEmailForm.form.fields.map((field: FieldValidation, index: number) => {
                return (
                    <>
                    {index !== 0 && <Divider sx={{ mb: 2 }}/>}
                    {field.info && <p className="text-sm mb-3">{field.info}</p>}
                    <TextField
                    autoComplete={field?.autocomplete}
                    sx={{ mb: 2 }}
                    inputProps={{ spellCheck: 'false' }}
                    type={field.type === "password" ? showPassword ? "text" : "password" : field.type}
                    key={field.name}
                    label={field.label} 
                    placeholder={field.placeholder} 
                    variant="outlined"
                    fullWidth
                    required={ field.validation?.required }
                    value={data[field.name]}
                    onChange={(e) => handleChange(field.name, e.target.value)}
                    error={validationErrors[field.name] !== undefined}
                    helperText={validationErrors[field.name]}
                    InputProps={{
                        endAdornment: field.type === "password" ? <InputAdornment className="hover:cursor-pointer" onClick={() => setShowPassword(!showPassword)} position="end">{showPassword ? <Visibility/>: <VisibilityOff/>}</InputAdornment> : "",
                      }}
                />
                    </>
                );
            })}
            <Button variant="contained" onClick={handleSave}>
                {settingsEmailForm.buttons}
            </Button>
            </div>

        </div>
    );
};