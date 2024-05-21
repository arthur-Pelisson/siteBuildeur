import { FormField, formTranslate } from "@/app/types/formValidation"

const form: FormField[] = [
    
    {
        name: "email",
        label: "Email",
        placeHolder: "Email",
    },
    {
        name: "password",
        label:"Mot de passe",
        placeHolder:"Mot de passe",
    }
]

const formTranslate: formTranslate = {
    title: "Connexion admin",
    submit: "Se connecter",
    forgotPassword: "Mot de passe oublié",
    error: "Mots de passe ou email incorrect",
    textFootFormA: "Vous n'avez pas de compte ?",
    textFootFormB:" S'inscrire",
}

export { form, formTranslate }