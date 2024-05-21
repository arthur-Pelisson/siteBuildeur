export const dataForm = [
    {
        name: "slug",
        label: "Nom unique",
            
        
        placeHolder: "Nom unique",
        type: "text",
        validation: {
            minCharacters: 2, 
            errorMessage: "Le slug doit avoir au moins 2 caractères",
            required: true,
            errorMessageRequired: "Le slug est obligatoire",
            regex : /^[^\-_/&#\?"'\]\[()]+$/,
            errorRegMessage: "Le slug ne doit pas contenir de caractères spéciaux"
        },
    },
    {
        name: "title",
        label: "Titre",
        placeHolder: {
            fr: "Titre",
            en: "Title",
        },
        type: "text",
        translation: true,
        validation: {
            minCharacters: 2, 
            errorMessage: "Le titre doit avoir au moins 2 caractères",             
            required: true,
            errorMessageRequired:"Le titre est obligatoire",
        },
    },
    {
        name: "content",
        label: "Contenu",
        placeHolder: {
            fr: "Contenu",
            en: "Content",
        },
        type: "wysiwyg",
        translation: true,
        validation: {
            required: true,
            errorMessageRequired: "Le contenu est obligatoire",
        },
    },
]

