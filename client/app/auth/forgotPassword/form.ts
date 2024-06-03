import { FormField, TFormTranslate } from "@/app/types/formValidation"


const forgotPassForm: FormField[] = [
        
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
                regex: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%&])[a-zA-Z\d!@#$%&]{8,}$/, 
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
        }
]

const formTranslate: TFormTranslate = {
    title: {
        fr: "Mot de passe oublié",
        en: "Forgot password",
    },
    submit: {
        fr: "Envoyer",
        en: "Send",
    },
    forgotPassword: {
        fr: "Retour",
        en: "Back",
    },
    description: {
        fr: `Veuillez entrer votre email pour réinitialiser votre mot de passe<br/>Un email vous sera envoyé`,
        en: `Please enter your email to reset your password<br/>An email will be sent to you<br/>A link will be sent to your email to reset your password`,
    }
}

export {forgotPassForm, formTranslate}