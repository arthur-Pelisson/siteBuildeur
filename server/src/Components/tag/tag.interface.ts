export interface ITag {
    map?(arg0: (tag: ITag) => Promise<void>): Promise<void>;
    id?: number;
    createdAt?: Date;
    updatedAt?: Date;
    tag_translate?: ITagTranslation[];
    oldName?: string;
}

export interface ITagTranslation {
    id?: number;
    language?: string;
    name?: string;
}

export interface IPostTags {
    id?: number;
    post_id?: number;
    tag_id?: number;
    tag?:number;
}