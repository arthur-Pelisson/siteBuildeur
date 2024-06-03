import { FormField, TFormTranslate } from "@/app/types/formValidation";

const form:FormField[] = [
    {
        name:"password",
        type:"password",
        label:{
            fr:"Mot de passe",
            en:"Password"
        },
        placeHolder:{
            fr:"Mot de passe",
            en:"Password"
        },
        validation:{
            regex:/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%&])[a-zA-Z\d!@#$%&]{8,}$/,
            errorMessage:{
                fr:"Le mot de passe doit contenir au moins 8 caractères dont une lettre et un chiffre",
                en:"Password must contain at least 8 characters including a letter and a number"
            },
            required:true,
            errorMessageRequired:{
                fr:"Ce champ est obligatoire",
                en:"This field is required"
            }
        }
    },
    {
        name:"confirmPassword",
        type:"password",
        label:{
            fr:"Confirmer le mot de passe",
            en:"Confirm password"
        },
        placeHolder:{
            fr:"Confirmer le mot de passe",
            en:"Confirm password"
        },
        matchField:"password",
        validation:{
            required:true,
            errorMessageRequired:{
                fr:"Ce champ est obligatoire",
                en:"This field is required"
            }
        }
    }
]

const formTranslate:TFormTranslate = {
    title: {
        fr: "Réinitialiser le mot de passe",
        en: "Reset password"
    },
    submit: {
        fr: "Envoyer",
        en: "Send"
    },      
    description: {
        fr: "Veuillez entrer votre nouveau mot de passe",
        en: "Please enter your new password"
    }
}

export {form, formTranslate};