export type FieldValidation = {
    regex?: RegExp;
    minCharacters?: number;
    matchField?: string;
    required?: boolean;
    errorMessage?: {
      fr: string;
      en: string;
    };
    errorMessageRequired?: {
      fr: string;
      en: string;
    };
    [key: string]: any;
}

export type FormField = {
    name: string;
    label: {
      fr: string;
      en: string;
    };
    placeHolder: {
      fr: string;
      en: string;
    };
    validation?: FieldValidation;
    [key: string]: any;
}

export type TFormTranslate = {
    [key: string]: {
      fr, en
    };
    
}

export type errorType = {
  fr: string;
  en: string;
};