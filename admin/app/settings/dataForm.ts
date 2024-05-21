import { FieldValidation } from "../types/formValidation";
import { Place } from '../../components/googleMaps';

export const settingsEmailForm = {
    form: {
        title: 'Email paramètres',
        fields:<FieldValidation> [
            {
                name: "emailAdmin",
                type: "email",
                label: "Email de reception",
                placeholder: "example@example.fr",
                info: "C'est l'email qui recevra les email de contact",
                validation: {
                    required: true,
                    errorMessageRequired: "L'email est obligatoire",
                    regex: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/,
                    errorRegMessage: "L'email doit être valide",
                }

            },
            {
                name: 'email',
                type: 'email',
                label: 'Email d\'envoi',
                info: 'C\'est l\'email qui enverra les email de contact',
                placeholder: 'example@exampley.fr',
                validation : {
                    required: true,
                    errorMessageRequired: "L'email est obligatoire",
                    regex: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/,
                    errorRegMessage: "L'email doit être valide",
                        
                },
            },
            {
                name: "password",
                type: "password",
                label: "Mot de passe",
                placeholder: "Mot de passe",
                validation: {
                    required: true,
                    errorMessageRequired: "Le mot de passe est obligatoire",
                }
            },
            {
                name: "service",
                label: "Service",
                type: "text",
                placeholder: "Service",
                validation: {
                    required: true,
                    errorMessageRequired: "Le service est obligatoire",
                }
            }
           
        ],
    },
    buttons: "Enregistrer"
};