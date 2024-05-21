'use client'
import { FormField, formTranslate } from "@/app/types/formValidation";

const form: FormField[] = [
    {
        name: "firstName",
        label: {
            fr: "Prénom",
            en: "First Name",
        },
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
        },
        info: {
            fr: `Nous ne partagerons jamais votre email avec quelqu'un d'autre.<br/>Nous vous enverrons un email de confirmation.`,
            en: "We will never share your email with anyone else.<br/> We will send you a confirmation email.",
        }
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
            errorMessage: {
                fr: "Le mot de passe n'est pas valide",
                en: "Password is not valid",
            },
            required: true, // Exemple : le prénom est obligatoire
            errorMessageRequired: {
                fr: "Le mot de passe est obligatoire",
                en: "Password is required",
            },
            regex: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%&])[a-zA-Z\d!@#$%&]{8,}$/,// Exemple de regex pour un mot de passe complexe
        },
        info: {
            fr: "Le mot de passe doit contenir au moins 8 caractères dont une majuscule, une minuscule, un chiffre et un caractère spécial: [!@#$%&]",
                en: "The password must contain at least 8 characters including an uppercase, a lowercase, a number and a special character: [!@#$%&]",
        }

    },
    {
        name: "confirmPassword",
        label: {
            fr: "Confirmer le mot de passe",
            en: "Confirm Password",
        },
        placeHolder: {
            fr: "Confirmer le mot de passe",
            en: "Confirm Password",
        },
        validation: {
            required: true, // Exemple : le prénom est obligatoire
            errorMessageRequired: {
                fr: "La confirmation du mot de passe est obligatoire",
                en: "Password confirmation is required",
            },
            matchField: "password", // Vérifie que le champ correspond au champ 'password'
            errorMessage: {
                fr: "Les mots de passe ne correspondent pas",
                en: "Passwords do not match",
            },
        },
    },
];

const formTranslate: formTranslate = {
    title: {
        fr: "Inscription",
        en: "Register",
    },
    submit: {
        fr: "S'inscrire",
        en: "Register",
    },
    error: {
        fr: "Erreur lors de l'inscription, veuillez réessayer",
        en: "Error during registration, please try again",
    },
    textFootFormA: {
        fr: "Deja inscrit ? ",
        en: "Already registered ? ",
    },
    textFootFormB: {
        fr: "connecter vous",
        en: "log in",
    },
}

const formSucess = {
    title: {
        fr: "Inscription",
        en: "Register",
    },
    text: {
        fr: "Inscription réussi, vous aller recevoir un mail de confirmation",
        en: "Register success, you will receive a confirmation email",
    },
    
}

export  {form, formTranslate, formSucess};
