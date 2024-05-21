import { FormField } from "@/app/types/formValidation";

export const formValidation = (Field: FormField, dataForm: any, form: FormField[])  => {
    const field = form.find((field: { name: string }) => field.name === Field.name);
    const value = dataForm[Field.name];
    
    if (!field || !field.validation || field == undefined || field.validation == undefined) {
        return;
    }

    //Validation if empty and required
    if (field.validation.required && (value == undefined || value == "")) {
        return field.validation.errorMessageRequired;
    }

    // Validation par regex
    if (field.validation.regex) {
        if (!field.validation.regex.test(value)) {
            return field.validation.errorMessage;
        }
    }

    // Validation pour la longueur minimale du mot de passe
    if (value != undefined && field.validation.minCharacters) {
        if (value.length < field.validation.minCharacters) {
            return field.validation.errorMessage;
        }
    }

    // Validation pour la longueur maximale du mot de passe
    if (value != undefined && field.validation.maxCharacters) {
        if (value.length > field.validation.maxCharacters) {
            return field.validation.errorMessageMaxCharacters;
        }
    }
    // Validation pour la correspondance avec un autre champ (confirmation de mot de passe, par exemple)
    if (field.validation.matchField) {
        const matchField = form.find((f: { name: string }) => f.name === field?.validation?.matchField);
        if (matchField && matchField.validation) {
            if (value !== dataForm[matchField.name]) {
                return field.validation.errorMessage;
            }
        }
    }
};
