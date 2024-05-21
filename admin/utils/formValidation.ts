import { FormField } from "@/app/types/formValidation";
import dayjs from "dayjs";
dayjs().locale("fr");
export const formValidation = (Field: FormField, dataForm: any, form: any, lg: string|false = false)  => {
    // console.log("Field : ", Field);
    // console.log("dataForm : ", dataForm);
    // console.log("form : ", form);
    // console.log("Field.name : ", Field.name);
    // if (Field.name === "submit") return;
    const field = form.find((field: { name: string }) => field.name === Field.name);
    let value: any ="";
    let value2:any ="";
    if (lg !== false) {
        value = dataForm[Field.name][lg];
    } else if (field.type === "DoubledateTimePicker") {
        value = dataForm[Field.name + "Start"];
        value2 = dataForm[Field.name + "End"];
    } else {
        value = dataForm[Field.name];
    }
    // console.log("value : ", value);
    // console.log(field)
    if (!field || !field.validation || field == undefined || field.validation == undefined) {
        return;
    }

    if (field.type === "map" && field.validation.required) {
        if (value.lat === -1 || value.lng === -1 || value.address === "" || value.zoom === -1) {
            return field.validation.errorMessageRequired;
        }
    }

    //Validation if empy and required
    if (field.validation.required && field.type === "DoubledateTimePicker") {
        console.log("value", value)
        console.log("value2", value2)
        if (value == undefined || value == "" || value2 == undefined || value2 == "") {
            return field.validation.errorMessageRequired;
        }
    } else {
        if (field.validation.required && (value == undefined || value == "")) {
            return field.validation.errorMessageRequired;
        }
    }

    if (field.type === "DoubledateTimePicker" && field.validation.minDate) {
        if (dayjs(value).isBefore(dayjs(value2), "day")) {
            return field.validation.errorMessageMinDate;
        }
    }

    if (field.type === "DoubledateTimePicker" && field.validation.minTime) {
        if (dayjs(value2).isBefore(dayjs(value), "minute") && dayjs(value2).isBefore(dayjs(value), "hour")) {
            return field.validation.errorMessageMinTime;
        }
    }

    if (field.type === "DoubledateTimePicker" && field.validation.sameData) {
        if (!dayjs(value).isSame(value2, 'day') || !dayjs(value).isSame(value2, 'year') || !dayjs(value).isSame(value2, 'month') ) {
            return field.validation.errorMessageSameData;
        }
    }


    // Validation par regex
    if (field.validation.regex) {
        if (!field.validation.regex.test(value)) {
            return field.validation.errorRegMessage;
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
