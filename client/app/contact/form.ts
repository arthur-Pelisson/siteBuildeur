import { FormField } from "../types/formValidation"

export const form:FormField[] = [
    {
        name:"firstName",
        label:{
            fr: "Nom",
            en: "Name"
        },
        placeHolder: {
            fr: "Votre nom",
            en: "Your last name"
        },
        type: "text",
        validation: {
            required: true,
            errorMessageRequired: {
                fr: "Ce champ est obligatoire",
                en: "This field is required"
            }
        }
    },
    {
        name:"lastName",
        label:{
            fr: "Prénom",
            en: "First name"
        },
        placeHolder: {
            fr: "Votre prénom",
            en: "Your first name"
        },
        type: "text",
        validation: {
            required: true,
            errorMessageRequired: {
                fr: "Ce champ est obligatoire",
                en: "This field is required"
            }
        }
    },
    {
        name:"email",
        label:{
            fr: "Email",
            en: "Email"
        },
        placeHolder: {
            fr: "Votre email",
            en: "Your email"
        },
        type: "email",
        validation: {
            required: true,
            regex: /^\S+@\S+\.\S+$/,
            errorMessage: {
                fr: "Format d'email incorrect",
                en: "Incorrect email format"
            },
            errorMessageRequired: {
                fr: "Ce champ est obligatoire",
                en: "This field is required"
            }
        }
    },
    {
        name:"society",
        label:{
            fr: "Société",
            en: "Company"
        },
        placeHolder: {
            fr: "Votre société",
            en: "Your company"
        },
        type: "text",
        validation: {
            required: true,
            errorMessageRequired: {
                fr: "Ce champ est obligatoire",
                en: "This field is required"
            }
        }
    },
    {
        name:"message",
        label:{
            fr: "Message",
            en: "Message"
        },
        placeHolder: {
            fr: "Votre message",
            en: "Your message"
        },
        type: "textarea",
        validation: {
            required: true,
            errorMessageRequired: {
                fr: "Ce champ est obligatoire",
                en: "This field is required"
            }
        }
    }
]

export const otherText = {
        submit: {
            fr: "Envoyer",
            en: "Send"
        },
    }
