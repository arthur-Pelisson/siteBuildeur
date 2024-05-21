import { Request, Response } from 'express';
import { IPostTags, ITag } from './tag.interface';
import {  getTagById, 
    createTag, 
    updateTag, 
    getAllTags, 
    deleteByIdTag 
} from './tag.service';
import { log } from 'console';
import { getEnum } from '../../Utils/getEnum';
import { getAllPosts } from '../post/post.service';
import { enum_postType } from '@prisma/client';
export default {


    getTagById: async (req: Request, res: Response): Promise<Response> => {
        const id: number = parseInt(req.params.id);
        if (isNaN(id)) return res.status(400).send({fr: "Id n'est pas un nombre", en: "Id is not a number"});
        const tag = await getTagById(id);
        if (tag === false) return res.status(404).send({fr: "Tag non trouvé", en: "Tag not found"});
        return res.status(200).send(tag);
    },

    // getTagByPostTagId: async (req: Request, res: Response): Promise<Response> => {
    //     const id: number = parseInt(req.params.id);
    //     if (isNaN(id)) return res.status(400).send("Id is not a number");
    //     const postTags = await getTagById(id);
        
    // },

    getAllTags: async (req: Request, res: Response): Promise<Response> => {
        const tags: ITag[] = await getAllTags();
        return res.status(200).send(tags);
    },

    getAllTagsByPostType: async (req: Request, res: Response): Promise<Response> => {
        let type: string = req.params.type;
        if (!type) return res.status(400).send({fr: "Propriété manquante", en: "Missing property"});
        type = getEnum(enum_postType, type.toUpperCase())
        const posts: any = await getAllPosts(type, false);
        console.log("posts", posts.length);
        const tags: ITag[] = await getAllTags();
        const postTags: ITag[] = [];
        // console.log("posts 111111111111111111111", posts);
        for (let i = 0; i < posts.length; i++) {
            console.log("slug" , posts[i].slug)
            console.log("posts[i].post_tags", posts[i].post_tags);
        }
        // console.log("tags 11111111111111111111111111", tags);   
        for (let i = 0; i < posts.length; i++) {
            for (let j = 0; j < posts[i].post_tags.length; j++) {
                for (let k = 0; k < tags.length; k++) {
                    // console.log("posts[i].post_tags[j].tag_id", posts[i].post_tags[j].tag_id);
                    // console.log("tags[k].id", tags[k].id);

                    if (posts[i].post_tags[j].tag_id === tags[k].id && !postTags.includes(tags[k])) {
                        postTags.push(tags[k]);
                    }
                }
            }
        }
        console.log("postTags", postTags);
        return res.status(200).send(postTags);
    },

    createTag: async (req: Request, res: Response): Promise<Response> => {
        let tags = req.body;
        console.log("tags", tags);
        if (tags.length < 1) return res.status(400).send({fr: "Propriété manquante", en: "Missing property"});
        let checkEmpty = false;
        for (let i = 0; i < tags.length; i++) {
            if (!tags[i].name || !tags[i].language) return res.status(400).send({fr: "Propriété manquante", en: "Missing property"});
            if (tags[i].name === "") checkEmpty = true;
        }
        if (checkEmpty) return res.status(400).send({fr: "Propriété vide", en: "Empty property"});
        
        const newTag = await createTag(tags);
        if (!newTag) return res.status(400).send({fr: "Tag non créé", en: "Tag not created"});
        return res.status(200).send(newTag);
    },

    updateTag: async (req: Request, res: Response): Promise<Response> => {
        const { id } = req.params;
        const tags = req.body;
        if (tags.length <= 1) return res.status(400).send({fr: "Propriété manquante", en: "Missing property"});
        let checkEmpty = false;
        for (let i = 0; i < tags.length; i++) {
            if (!tags[i].name || !tags[i].language) return res.status(400).send({fr: "Propriété manquante", en: "Missing property"});
            if (tags[i].name === "") checkEmpty = true;
        }
        if (checkEmpty) return res.status(400).send({fr: "Propriété vide", en: "Empty property"});
        const oldTag = await getTagById(parseInt(id));
        if (!oldTag) return res.status(404).send({fr: "Tag non trouvé", en: "Tag not found"});

        for (let i = 0; i < tags.length; i++) {
            for (let j = 0; j < oldTag.tag_translate.length; j++) {
                if (tags[i].language === oldTag.tag_translate[j].language) {
                    tags[i]["oldName"] = oldTag.tag_translate[j].name;
                }
            }
        }

        const update = await updateTag(tags, parseInt(id));
        if (!update) return res.status(400).send({fr: "Tag non mis à jour", en: "Tag not updated"});
        return res.status(200).send({fr: "Tag mis à jour", en: "Tag updated"});
    },

    deleteTag: async (req: Request, res: Response): Promise<Response> => {
        const id: number = parseInt(req.params.id);
        if (isNaN(id)) return res.status(400).send({fr: "Id n'est pas un nombre", en: "Id is not a number"});
        const tag: ITag | false = await getTagById(id);
        if (tag === false) return res.status(404).send({fr: "Tag non trouvé", en: "Tag not found"});
        const deleteTag = await deleteByIdTag(id);
        if (!deleteTag) return res.status(400).send({fr: "Tag non supprimé", en: "Tag not deleted"});
        return res.status(200).send({fr: "Tag supprimé", en: "Tag deleted"});
    },
}