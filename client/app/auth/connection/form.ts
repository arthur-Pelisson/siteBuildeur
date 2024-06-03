import {FormField, TFormTranslate} from "@/app/types/formValidation"

const form: FormField[] = [
    
    {
        name: "email",
        label: {
            fr: "Email",
            en: "Email",
        },
        placeHolder: {
            fr: "Email",
            en: "Email",
        },
        validation: {
            regex: /^\S+@\S+\.\S+$/, // Exemple de regex pour un email simple
            errorMessage: {
                fr: "Format d'email incorrect",
                en: "Incorrect email format",
            },
            required: true, // Exemple : le prénom est obligatoire
            errorMessageRequired: {
                fr: "Se champ est obligatoire",
                en: "This field is required",
            },
        },
    },
    {
        name: "password",
        label: {
            fr: "Mot de passe",
            en: "Password",
        },
        placeHolder: {
            fr: "Mot de passe",
            en: "Password",
        },
        validation: {
            required: true, // Exemple : le prénom est obligatoire
            errorMessageRequired: {
                fr: "Se champ est obligatoire",
                en: "This field is required",
            },
        },
    }
]

const formTranslate: TFormTranslate = {
    title: {
        fr: "Connexion",
        en: "Connection",
    },
    submit: {
        fr: "Se connecter",
        en: "Connect",
    },
    forgotPassword: {
        fr: "Mot de passe oublié",
        en: "Forgot password",
    },
    forgotPasswordLink: {
        fr: "Réinitialiser",
        en: "Reset",
    },
    error: {
        fr: "Mots de passe ou email incorrect",
        en: "Incorrect password or email",
    },
    textFootFormA: {
        fr: "Vous n'avez pas de compte ?",
        en: "You don't have an account ?",
    },
    textFootFormB: {
        fr: " S'inscrire",
        en: " Sign up",
    }
}

export { form, formTranslate }