 const dataForm = [
    {
        name: "tag",
        type: "text",
        translation: true,
        label: "Tag",
        placeHolder: {
            fr: "Plage",
            en: "Beaches",
        },
        validation: {
            minCharacters: 2,
            errorMessage: "Le tag doit avoir au moins 2 caractères",
            required: true,
            errorMessageRequired: "Le tag est obligatoire",
        },
    }
]

export default dataForm;