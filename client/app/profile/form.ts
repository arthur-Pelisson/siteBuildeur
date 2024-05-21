import { title } from "process";
import { FormField, TFormTranslate } from "../types/formValidation";

const formTranslate: TFormTranslate = {
    title: {
        fr: "Mon compte",
        en: "My account", 
    },
    subTitle: {
        fr: "Modifier mes informations",
        en: "Edit my informations",
    },
    submit: {
        fr: "Enregistrer",
        en: "Save",
    },
    error: {
        fr: "Une erreur est survenue",
        en: "An error occured",
    },
};

const form: FormField[] = [
    {
        name: "firstName",
        label: {
            fr: "Prénom",
            en: "First Name",
        },
        autoComplete: "given-name",
        placeHolder: {
            fr: "Prénom",
            en: "First Name",
        },
        validation: {
            minCharacters: 2, // Exemple : le prénom doit avoir au moins 2 caractères
            errorMessage: {
                fr: "Le prénom doit avoir au moins 2 caractères",
                en: "First Name must have at least 2 characters",
            },
            maxCharacters: 50, 
            errorMessageMaxCharacters: {
                fr: "Le prénom doit avoir au maximum 50 caractères",
                en: "First Name must have at maximum 50 characters",
            },
            required: true, // Exemple : le prénom est obligatoire
            errorMessageRequired: {
                fr: "Le prénom est obligatoire",
                en: "First Name is required",
            },
        },
    },
    {
        name: "lastName",
        label: {
            fr: "Nom",
            en: "Last Name",
        },
        autoComplete: "family-name",
        placeHolder: {
            fr: "Nom",
            en: "Last Name",
        },
        validation: {
            minCharacters: 2, // Exemple : le nom doit avoir au moins 2 caractères
            errorMessage: {
                fr: "Le nom doit avoir au moins 2 caractères",
                en: "Last Name must have at least 2 characters",
            },
            maxCharacters: 50, 
            errorMessageMaxCharacters: {
                fr: "Le nom doit avoir au maximum 50 caractères",
                en: "Last Name must have at maximum 50 characters",
            },
            required: true, // Exemple : le prénom est obligatoire
            errorMessageRequired: {
                fr: "Le nom est obligatoire",
                en: "Last Name is required",
            },
        },
    },
    {
        name: "email",
        label: {
            fr: "Email",
            en: "Email",
        },
        autoComplete: "email",
        placeHolder: {
            fr: "Email",
            en: "Email",
        },
        validation: {
            regex: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/, // Exemple de regex pour un email simple
            errorMessage: {
                fr: "Format d'email incorrect",
                en: "Incorrect email format",
            },
            required: true, // Exemple : le prénom est obligatoire
            errorMessageRequired: {
                fr: "Le mail est obligatoire",
                en: "Email is required",
            },
            maxCharacters: 50, 
            errorMessageMaxCharacters: {
               fr: "Le mail doit avoir au maximum 50 caractères",
                en: "Email must have at maximum 50 characters",
            },
        },
        info: {
            fr: `Nous ne partagerons jamais votre email avec quelqu'un d'autre.<br/>Nous vous enverrons un email de confirmation.`,
            en: "We will never share your email with anyone else.<br/> We will send you a confirmation email.",
        }
    },
]

const formPassword: FormField[] = [
    {
        name: "password",
        type: "password",
        label: {
            fr:"Mots de passe actuel",
            en: "Current password",
        },
        placeHolder: {
            fr:"Mots de passe",
            en: "Current password",
        },
        validation: {
            regex: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%&])[a-zA-Z\d!@#$%&]{8,}$/,
            errorRegMessage: {
                fr:"Le mot de passe doit contenir au moins une lettre majuscule, une lettre minuscule, un chiffre et un caractère spécial",
                en: "The password must contain at least one uppercase letter, one lowercase letter, one number and one special character",
            },
            minCharacters: 8, // Exemple : le mot de passe doit avoir au moins 8 caractères
            errorMessage: {
                fr: "Le mot de passe doit avoir au moins 8 caractères",
                en: "The password must have at least 8 characters",
            },
            required: true, // Exemple : le prénom est obligatoire
            errorMessageRequired: {
                fr:"Le mot de passe est obligatoire",
                en: "Password is required",
            }
        },
    },
    {
        name: "newPassword",
        type: "password",
        label: {
            fr: "Nouveau mots de passe",
            en: "New password",
        },
        placeHolder: {
            fr:"Nouveau mots de passe",
            en: "New password",
        },
        validation: {
            regex: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%&])[a-zA-Z\d!@#$%&]{8,}$/,
            errorRegMessage: {
                fr:"Le mot de passe doit contenir au moins une lettre majuscule, une lettre minuscule, un chiffre et un caractère spécial",
                en: "The password must contain at least one uppercase letter, one lowercase letter, one number and one special character",
            },
            minCharacters: 8, // Exemple : le mot de passe doit avoir au moins 8 caractères
            errorMessage: { 
                fr:"Le mot de passe doit avoir au moins 8 caractères",
                en: "The password must have at least 8 characters",
            },
            required: true, // Exemple : le prénom est obligatoire
            errorMessageRequired: {
                fr: "Le mot de passe est obligatoire",
                en: "Password is required",
            }
        },
    },
    {
        name: "confirmPassword",
        type: "password",
        label: {
            fr:"Confirmer mots de passe",
            en: "Confirm password",
        },
        placeHolder: {
            fr: "Confirmer mots de passe",
            en: "Confirm password",
        },
        validation: {
            require: true,
            errorMessageRequired: {
                fr: "Le mot de passe est obligatoire",
                en: "Password is required",
            },
            matchField: "newPassword", // Vérifie que le champ correspond au champ 'password'
            errorMessage: {
                fr: "Les mots de passe ne correspondent pas",
                en: "Passwords do not match",
            }
                
        }
    }
]

export { form, formTranslate, formPassword }