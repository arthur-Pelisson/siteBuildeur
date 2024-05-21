export type FieldValidation = {
    regex?: RegExp;
    minCharacters?: number;
    matchField?: string;
    required?: boolean;
    errorMessage?:string,
    errorMessageRequired?: string,
    [key: string]: any;
}

export type FormField = {
    name: string;
    label: string,
    placeHolder: string,
    validation?: FieldValidation;
    [key: string]: any;
}

export type formTranslate = {
    [key: string]: string;
    
}