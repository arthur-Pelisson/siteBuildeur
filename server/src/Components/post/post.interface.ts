import { ITag, IPostTags } from "../tag/tag.interface";
import { enum_postType } from '@prisma/client';

export interface IPost {
    slug: string;
    id?: number;
    type?: enum_postType;
    published?: boolean;
    createdAt?: Date;
    updatedAt?: Date;
    images?: string[];
    post?: IRealization_post | IPhotography_post
    post_tags?: IPostTags[] | ITag[];
    translations?: IPostTranslation[];
    tags?:number[]
}

export interface IPostTranslation {
    id?: number;
    language: string;
    title: string;
    content: string;
    oldTitle?: string;

}

export interface IRealization_post extends IPost {
    id?: number;
    thumbnail: string;
    image: string;
    video?: string;
}

export  interface IPhotography_post extends IPost{
    id: number;
    thumbnail: string;
    image: string;
}

export interface IText_post extends IPost{
    id:number;
}