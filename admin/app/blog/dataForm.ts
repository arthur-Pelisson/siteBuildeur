export const dataForm = [
    {
        name: "slug",
        label: "Nom unique",
        placeHolder: "Mon nom unique",
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
    {
        name: "image",
        label: "Image",
        placeHolder: "Image",
        type: "file",
        validation: {
            required: true,
            errorMessageRequired: "L'image est obligatoire",
        },
    },
    {
        name:"tags",
        label:"Tags",
        type:"selectTags",
    }

]

export type TdataCreatePost = {
    tags: number[];
    slug: string;
    images?: string[];
    Frame_Post?: TyFramePost;
    translation: {
        language: string;
        title: string;
        content: string;
    }[];
    data: {
        image: string;
    };
};

export type TyFramePost = {
    id: number;
    imagesPost: any[];
    Frame_post: {
        image: string;
        thumbnails: string;
    };
    translations: [
        {
            title: string;
            content: string;
            language: string;
        }
    ];
}
