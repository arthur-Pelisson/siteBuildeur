export interface ISlider {
    id?: number;
    name: string;
    createdAt?: Date; // Similarly, a string representation of a DateTime
    updatedAt?: Date; // Similarly, a string representation of a DateTime
    slider_content: ISliderContent[];
}

export interface ISliderContent {
    id?: number;
    link: string;
    image: string;
    createdAt?: Date; // This is a string representation of a DateTime; you might want to use a Date object here
    updatedAt?: Date; // Similarly, a string representation of a DateTime
    slider_translation: ISliderTranslation[];
}

export interface ISliderTranslation {
    id?: number;
    title: string;
    content: string;
    language: string;
}
