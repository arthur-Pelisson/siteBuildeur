import { title } from "process";
import { FormField, formTranslate } from "../types/formValidation";
import { Place } from '../../../client/components/maps/googleMaps';


const text = {
    title: "Profile",
    subTitle: "Modifier mes informations",
    submit: "Enregistrer",
    error: "Une erreur est survenue",
}

const form: FormField[] = [
    {
        name: "firstName",
        label: "Prénom",
         
        autoComplete: "given-name",
        placeHolder: "Prénom",
           
        validation: {
            minCharacters: 2, // Exemple : le prénom doit avoir au moins 2 caractères
            errorMessage: "Le prénom doit avoir au moins 2 caractères",
               
            maxCharacters: 50, 
            errorMessageMaxCharacters: {
                fr: "Le prénom doit avoir au maximum 50 caractères",
                en: "First Name must have at maximum 50 characters",
            },
            required: true, // Exemple : le prénom est obligatoire
            errorMessageRequired:"Le prénom est obligatoire",
                
        },
    },
    {
        name: "lastName",
        label: "Nom",
          
        autoComplete: "family-name",
        placeHolder: "Nom",
          
        validation: {
            minCharacters: 2, // Exemple : le nom doit avoir au moins 2 caractères
            errorMessage: "Le nom doit avoir au moins 2 caractères",

            maxCharacters: 50, 
            errorMessageMaxCharacters: "Le nom doit avoir au maximum 50 caractères",
                
            required: true, // Exemple : le prénom est obligatoire
            errorMessageRequired: "Le nom est obligatoire",
               
        },
    },
    {
        name: "email",
        label: "Email",
           
        autoComplete: "email",
        placeHolder: "Email",
           
        validation: {
            regex: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/, // Exemple de regex pour un email simple
            errorMessage: "Format d'email incorrect",
              
            required: true, // Exemple : le prénom est obligatoire
            errorMessageRequired: "Le mail est obligatoire",
                
            maxCharacters: 50, 
            errorMessageMaxCharacters: "Le mail doit avoir au maximum 50 caractères",
              
        },
    },
]

const formPassword: FormField[] = [
    {
        name: "password",
        type: "password",
        label: "Mots de passe actuel",
        placeHolder: "Mots de passe",
        validation: {
            regex: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%&])[a-zA-Z\d!@#$%&]{8,}$/,
            errorRegMessage: "Le mot de passe doit contenir au moins une lettre majuscule, une lettre minuscule, un chiffre et un caractère spécial",
            minCharacters: 8, // Exemple : le mot de passe doit avoir au moins 8 caractères
            errorMessage: "Le mot de passe doit avoir au moins 8 caractères",
            required: true, // Exemple : le prénom est obligatoire
            errorMessageRequired: "Le mot de passe est obligatoire",
        },
    },
    {
        name: "newPassword",
        type: "password",
        label: "Nouveau mots de passe",
        placeHolder: "Nouveau mots de passe",
        validation: {
            regex: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%&])[a-zA-Z\d!@#$%&]{8,}$/,
            errorRegMessage: "Le mot de passe doit contenir au moins une lettre majuscule, une lettre minuscule, un chiffre et un caractère spécial",
            minCharacters: 8, // Exemple : le mot de passe doit avoir au moins 8 caractères
            errorMessage: "Le mot de passe doit avoir au moins 8 caractères",
            required: true, // Exemple : le prénom est obligatoire
            errorMessageRequired: "Le mot de passe est obligatoire",
        },
    },
    {
        name: "confirmPassword",
        type: "password",
        label: "Confirmer mots de passe",
        placeHolder: "Confirmer mots de passe",
        validation: {
            require: true,
            errorMessageRequired: "Le mot de passe est obligatoire",
            matchField: "newPassword", // Vérifie que le champ correspond au champ 'password'
            errorMessage: "Les mots de passe ne correspondent pas",
                
        }
    }
]
    

export { form, formPassword, text }