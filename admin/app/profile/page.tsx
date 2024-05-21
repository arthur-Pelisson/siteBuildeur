'use client'
import { useToken } from "../../contextProvider/tokenProvider";
import React, { use, useEffect, useState } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import SnackBar, {TtypeSnackB} from "@/components/snackBar/snackBar";
import Loading from "@/components/loading/loading";
import {form, formPassword, text} from "./form";
import { updateProfile, getProfile, updatePassword } from "../request/requestProfile";
import { formValidation } from "@/utils/formValidation";
import { InputAdornment } from "@mui/material";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";



type formData = {
    id: number | null;
    email: string | null;
    firstName: string | null;
    lastName: string | null ;
};

type TpasswordForm = {
    password:string;
    newPassword: string;
}

const Profile = () => {

    const [validationErrors, setValidationErrors] = useState<Record<string, string | false>>({});
    const [validationErrorsPassword, setValidationErrorsPassword] = useState<Record<string, string | false>>({});
    const {Error, Loading: loading, Success, response} = getProfile();
    const {params, Error: errorUpdate, Loading: loadingUpdate, Success: successUpdate, response: responseUpdate, fetchRequest} = updateProfile();
    const {Error: errorUpdatePassword, Loading: loadingUpdatePassword, Success: successUpdatePassword, response: responseUpdatePassword, fetchRequest: fetchUpdatePassword, params: updatePasswordParams} = updatePassword();
    const [open, setOpen] = useState(true);
    const [disableSubmit, setDisableSubmit] = useState(false);
    const [disbleSubmitPassword, setDisableSubmitPassword] = useState(false);
    const [emailCheck, setEmailCheck] = useState("");
    const [snack, setSnack] = useState({open: false, message: "", type: ""});
    const [loadingTime, setLoadingTime] = useState(true);
    const [showPassword, setShowPassword] = useState(formPassword.map((field) => {return {name: field.name, show: false}}));
    const [formData, setFormData] = useState<formData>({
        id: null,
        email: "",
        firstName: "",
        lastName: "",
    });

    const [passwordForm, setPasswordForm] = useState<TpasswordForm>({
        password: "",
        newPassword: "",
    });

    useEffect(() => {
      console.log("response profile : ", response);
        if (response && response !== null && !Error) {
            setDataFromReponse();
            setEmailCheck((response as any)?.email);
        }
    }, [response]);

    useEffect(() => {
        displayAlert();
        console.log("emailCheck : ", emailCheck);
        console.log("formData.email : ", formData.email);
        console.log("responseUpdate : ", responseUpdate);
        if (responseUpdate && successUpdate && emailCheck !== formData.email) {
            setOpen(true);
        }
    }, [responseUpdate]);

    useEffect(() => {
        displayAlert();
        if (responseUpdatePassword && successUpdatePassword) {
            setOpen(true);
        }
    }, [responseUpdatePassword]);


    const setDataFromReponse = () => {
        setFormData({
            id: (response as any)?.id,
            email: (response as any)?.email,
            firstName: (response as any)?.profile.firstName,
            lastName: (response as any)?.profile.lastName,
        });
    }

    const minLoadingTime = (time: number) => {
        setLoadingTime(false);
        setTimeout(() => {
            setLoadingTime(true);
        }, time);
        
    };


    const handleChange = (name:string, value: string) => {
        setOpen(false);
        if (disableSubmit) {
            setDisableSubmit(false);
        }
        console.log("name : ", name);
        setFormData((prevData) => ({
        ...prevData,
        [name]: value,
        }));
    };

    const handleChangePassword = (name:string, value: string) => {
        setOpen(false);
        if (disbleSubmitPassword) {
            setDisableSubmitPassword(false);
        }
        setPasswordForm((prevData) => ({
        ...prevData,
        [name]: value,
        }));
    }

    const createSnackBar = (type: TtypeSnackB, message: string) => {
        setSnack({open: true, message: message, type: type});
    }

  const displayAlert = () => {
    // console.log("loadingUpdate : ", loadingUpdate);
    if (loadingUpdate || loadingUpdatePassword) return;
    // console.log("errorUpdate : ", errorUpdate);
    let type: TtypeSnackB;
    let message:string;
    console.log("errorUpdate : ", errorUpdate);
    console.log("errorUpdatePassword : ", errorUpdatePassword);
    console.log("successUpdate : ", successUpdate);
    console.log("successUpdatePassword : ", successUpdatePassword);
    if (errorUpdate || errorUpdatePassword) {
        type = "error"
        message = errorUpdate || errorUpdatePassword || "";
        return createSnackBar(type, message);
    }
    if (successUpdate || successUpdatePassword) {
        type = "success"
        message = responseUpdate?.fr || responseUpdatePassword?.fr || "";
        return createSnackBar(type, message);
    }
  };

  const handleShowPassword = (field) => {
    setSnack({open: false, message: "", type: ""});
    setShowPassword((prev) => {
        return prev.map((item) => {
            if (item.name === field.name) {
                return {name: item.name, show: !item.show}
            }
            return item;
        })
    })
  }

  const handleUpdateUSer = async () => {
    console.log("update user")
    setOpen(true);
    const success = await fetchRequest({data: formData, url: params.url, method:params.method});
    console.log("test", success)
    if (!success) {
        setDataFromReponse();
    }
  };

  const handleSavePassword = async (e) => {
    e.preventDefault();
    console.log("update password")
    const newValidationErrors: Record<string, string | false> = {};
    formPassword.forEach((field) => {
        const error = formValidation(field, passwordForm, formPassword);
        if (error) {
            newValidationErrors[field.name] = error;
        }
    });

    setValidationErrorsPassword(newValidationErrors);

    if (Object.keys(newValidationErrors).length > 0) {
        setDisableSubmitPassword(true);
        console.log("Il y a des erreurs " + JSON.stringify(newValidationErrors));
        return;
    }
    handleUpdatePassword();
  };

  const handleSave = (e) => {
    e.preventDefault();
    console.log("save")
    minLoadingTime(1000);
    // setDisableSubmit(true);
    // console.log('Updated Form Data:', formData);
    const newValidationErrors: Record<string, string | false> = {};
        form.forEach((field) => {
            const error = formValidation(field, formData, form);
            if (error) {
                newValidationErrors[field.name] = error;
            }
        });

        setValidationErrors(newValidationErrors);

        if (Object.keys(newValidationErrors).length > 0) {
            setDisableSubmit(true);
            console.log("Il y a des erreurs " + JSON.stringify(newValidationErrors));
            return;
        }

        handleUpdateUSer();
  };

  const handleUpdatePassword = async () => {
    console.log("update password")
    setDisableSubmit(true);
    setOpen(false);
    const success = await fetchUpdatePassword({data: passwordForm, url: updatePasswordParams.url, method:updatePasswordParams.method});
    if (!success) {
        setPasswordForm({
            password: "",
            newPassword: ""
        });
    }
  };

  const displayLoading = () => {
    return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '93vh' }}>
            <SnackBar open={snack.open} type={(snack.type as TtypeSnackB)} message={snack.message} timeDuration={4000} position={{vertical: "top", horizontal:"center"}}/>
            <Card sx={{width: {xs:"50%", lg:"30%"}, height: {xs:"50%", lg: "40%"}}}  style={{ padding: '20px', margin: "auto"}}>
                <CardContent className="w-[50%] m-auto">
                    <Loading display={true} notInModal={true} />
                </CardContent>
            </Card>
        </div>
        )
  }


  if (loading ) {
    return displayLoading();
  }

  if (loadingUpdate || !loadingTime) {
    return displayLoading();
  }
  return (
    <div style={{ display: 'flex', flexDirection: "column" , justifyContent: 'center', alignItems: 'center', marginTop:"75px" }}>
        <SnackBar open={snack.open} type={(snack.type as TtypeSnackB)} message={snack.message} timeDuration={4000} position={{vertical: "top", horizontal:"center"}}/>
      <Card sx={{width: {xs:"50%", lg:"30%"}}}  style={{padding: '20px'}}>
        <CardContent>
          <Typography variant="h5" gutterBottom>
            {text.title}
          </Typography>
          <form>
          <Typography variant="subtitle1" gutterBottom sx={{marginBottom: "0.8rem"}}>
            {text.subTitle}
          </Typography>
            <Stack spacing={2}>
                {response === null && (
                    <Typography variant="subtitle1" gutterBottom sx={{marginBottom: "0.8rem", color: "red"}}>
                        {text.error}
                    </Typography>
                
                )}
              {form.map((field) => (
                <TextField
                  autoComplete={field.autoComplete}
                  inputProps={{ spellCheck: 'false' }}
                  type={field.type}
                  key={field.name}
                  label={field.label} 
                  placeholder={field.placeHolder} 
                  variant="outlined"
                  fullWidth
                  required={ field.validation?.required }
                  value={formData[field.name] || ''}
                  onChange={(e) => handleChange(field.name, e.target.value)}
                  error={validationErrors[field.name] !== undefined}
                  helperText={validationErrors[field.name]}
                />
              ))}
              <Button disabled={disableSubmit} type="submit" variant="contained" onClick={(e) => handleSave(e)}>
                {text.submit}
              </Button>
            </Stack>
          </form>
          <form>
            <Typography variant="subtitle1" gutterBottom sx={{marginBottom: "0.8rem", marginTop: "1rem"}}>
                Modifier votre mot de passe
            </Typography>
            {formPassword.map((field) => (
                <TextField
                    autoComplete={field.autoComplete}
                    sx={{marginTop: "0.8rem"}}
                    inputProps={{ spellCheck: 'false' }}
                    type={showPassword.find((item) => item.name === field.name)?.show ? "text" : "password"}
                    key={field.name}
                    label={field.label} 
                    placeholder={field.placeHolder} 
                    variant="outlined"
                    fullWidth
                    required={ field.validation?.required }
                    value={passwordForm[field.name] || ''}
                    onChange={(e) => handleChangePassword(field.name, e.target.value)}
                    error={validationErrorsPassword[field.name] !== undefined}
                    helperText={validationErrorsPassword[field.name]}
                    InputProps={{
                        endAdornment: field.type === "password" ? <InputAdornment className="hover:cursor-pointer" onClick={() => {handleShowPassword(field)}} position="end">{showPassword.find((item) => item.name === field.name)?.show ? <Visibility/>: <VisibilityOff/>}</InputAdornment> : "",
                      }}
                />
            ))}
            <Button sx={{marginTop:"1rem", width: "100%"}} disabled={disbleSubmitPassword} type="submit" variant="contained" onClick={(e) => handleSavePassword(e)}>
                {text.submit}
            </Button>
        </form>
        </CardContent>
      </Card>
    </div>
  );
};


export default Profile;