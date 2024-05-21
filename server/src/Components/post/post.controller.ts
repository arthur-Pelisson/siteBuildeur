import { Request, Response } from "express";
import { IPost } from "./post.interface";

import {
    getPostById,
    createPostRealization,
    createPostPhotography,
    createPostText,
    updatePostPhotography,
    getAllPosts,
    deletePostById,
    publishedPost,
    updatePostRealization,
    getPostBySlug,
    updatePostText,
    getAllPostPagination,
    createPostBlog,
    updatePostBlog,
} from "./post.service";
import { getTagByName } from "../tag/tag.service";
import { getEnum } from "../../Utils/getEnum";
import { enum_role } from "@prisma/client";
import { enum_postType } from "@prisma/client";
import trimData from '../../Middleware/trimData';

export default {
    getPost: async (req: Request, res: Response): Promise<Response> => {
        const id: number = parseInt(req.params.id);
        let type = req.params.type;
        type = getEnum(enum_postType, type.toUpperCase());

        const Role = getEnum(enum_role, (req as any).user.tokenRole);

        let showUnpublished = false;
        if (Role === enum_role.ADMIN) {
            showUnpublished = true;
        }
        if (isNaN(id)) return res.status(400).send({ en: "Id is not a number", fr: "L'id n'est pas un nombre" });
        const post: IPost | false = await getPostById(id, type);
        if (post === false) return res.status(404).send({ en: "Post not found", fr: "Post non trouver" });
        //fillter post for user who can't see unpublished post
        if (showUnpublished || post.published) {
            return res.status(200).send(post);
        }
        return res.status(404).send({ en: "Post not found", fr: "Post non trouver" });
    },

    getPostBySlug: async (req: Request, res: Response): Promise<Response> => {
        const slug: string = req.params.slug;
        let type = req.params.type;
        console.log("type", type);
        console.log("slug", slug);
        type = getEnum(enum_postType, type.toUpperCase());
        
        // const Role = getEnum(enum_role, (req as any).user.tokenRole);
        let showUnpublished = false;
        // if (Role === enum_role.ADMIN) {
        //     showUnpublished = true;
        // }
        const post: IPost | false = await getPostBySlug(slug, type);
        // console.log("post", post);
        if (post === false) return res.status(404).send({ en: "Post not found", fr: "Post non trouver" });
        //fillter post for user who can't see unpublished post
        if (showUnpublished || post.published) {
            return res.status(200).send(post);
        }
        return res.status(404).send({ en: "Post not found", fr: "Post non trouver" });
    },

    getAllPostsAdmin: async (req: Request, res: Response): Promise<Response> => {
        console.log("getAllPostsAdmin");
        let type = req.params.type;
        let tag: string = req.params.tag;
        let page: number = parseInt(req.params.page);
        type = getEnum(enum_postType, type.toUpperCase());
        const Role = getEnum(enum_role, (req as any).user.tokenRole);

        let showUnpublished = false;
        if (Role === enum_role.ADMIN) {
            showUnpublished = true;
        }

        if (type === null) {
            res.status(400).send("Type not found");
        }

        let posts: IPost[] = [];
        if (page !== undefined && page !== null && !isNaN(page) && page > 0) {
            posts = await getAllPostPagination(type, showUnpublished, page, tag);
        } else {
            posts = await getAllPosts(type, showUnpublished);
        }
        return res.status(200).send(posts);
    },

    getAllPosts: async (req: Request, res: Response): Promise<Response> => {
        let type = req.params.type;
        let page: number = parseInt(req.params.page);
        let tag: string = req.params.tag;
        console.log("tag", tag);
        type = getEnum(enum_postType, type.toUpperCase());
        let showUnpublished = false;

        if (type === null) {
            res.status(400).send("Type not found");
        }
        let tagId = null;
        if (tag) {
            const tagExist = await getTagByName(tag);
            if (!tagExist) return res.status(400).send({ fr: "Tag not found" });
            tagId = tagExist.id;
        }
        let posts: IPost[] = [];
        if (page !== undefined && page !== null && !isNaN(page) && page > 0) {
            posts = await getAllPostPagination(type, showUnpublished, page, tagId);
        } else {
            posts = await getAllPosts(type, showUnpublished);
        }
        return res.status(200).send(posts);
    },

    createPost: async (req: Request, res: Response): Promise<Response> => {
        const { tags, translation, data, slug, images } = req.body;

        console.log("create post image : ", images);
        if (translation) {
            Object.keys(translation).map((key) => {
                translation[key].title = trimData.trimString(translation[key].title);
                translation[key].content = trimData.trimString(translation[key].content);
            });
        }
        // console.log("maps", maps);
        const type = req.params.type;
        slug.toLowerCase();
        trimData.trimString(slug);
        if (type === undefined || type == "" || !type) return res.status(400).send({ fr: "Missing type" });
        switch (type) {
            case "photography":
            case "realization":
            case "blog":
                if (!data.image || !slug) return res.status(400).send({ fr: "Missing property" });
                break;
            case "text":
                if (!slug) return res.status(400).send({ fr: "Missing property" });
                break;
            case "realization":
                if (!data.video) return res.status(400).send({ fr: "Missing property" });
                break;
            default:
                return res.status(400).send({ fr: "Type not found" });
        }

        const postExist = await getPostBySlug(slug, type);
        if (postExist) return res.status(400).send({ fr: "Le nom unique existe déjà" });
        const post = {
            type: getEnum(enum_postType, type.toUpperCase()),
            post_tags: tags,
            slug: slug,
            translations: translation,
            post: data,
            images: images,
        };

        const newPost = async (post: any, type: string) => {
            switch (type) {
                case "realization":
                    return await createPostRealization(post);
                case "photography":
                    return await createPostPhotography(post);
                case "text":
                    return await createPostText(post);
                case "blog":
                    return await createPostBlog(post);
                default:
                    return false;
            }
        };

        const postCreated = await newPost(post, type);
        if (!postCreated) return res.status(400).send({ fr: "Post not created" });
        return res.status(200).send(postCreated);
    },

    updatePost: async (req: Request, res: Response): Promise<Response> => {
        const id = parseInt(req.params.id);
        if (isNaN(id)) return res.status(400).send({ fr: "Id is not a number" });
        const { tags, translation, data, slug, images } = req.body;
        const type = req.params.type;
        if (translation) {
            Object.keys(translation).map((key) => {
                translation[key].title = trimData.trimString(translation[key].title);
                translation[key].content = trimData.trimString(translation[key].content);
            });
        }
        slug.toLowerCase();
        trimData.trimString(slug);
        if (type === undefined || type == "" || !type) return res.status(400).send({ fr: "Missing type" });
        const oldPost = await getPostById(id, type);
        if (!oldPost) return res.status(400).send({ fr: "Post not found" });

        switch (type) {
            case "photography":
            case "realization":
                if (!slug || !data.image) return res.status(400).send({ fr: "Missing property" });
                break;
            case "text":
            case "blog":
                if (!slug) return res.status(400).send({ fr: "Missing property" });
                break;
            case "realization":
                if (!data.video) return res.status(400).send({ fr: "Missing property" });
                break;
            default:
                return res.status(400).send({ fr: "Type not found" });
        }
        const postExist = await getPostBySlug(slug, type);
        if (postExist && postExist.id !== id) return res.status(400).send({ fr: "Le nom unique existe déjà" });


        const post = {
            id: id,
            slug: slug,
            images: images,
            type: getEnum(enum_postType, type.toUpperCase()),
            post_tags: tags,
            translations: translation,
            post: data,
            tags: tags,
        };

        const updatePost = async (post: IPost, type: string) => {
            switch (type) {
                case "realization":
                    return await updatePostRealization(post);
                case "photography":
                    return await updatePostPhotography(post);
                case "text":
                    return await updatePostText(post);
                case "blog":
                    return await updatePostBlog(post);
                default:
                    return false;
            }
        };

        const postUpdated = await updatePost(post, type);
        if (!postUpdated) return res.status(400).send({ fr: "Post not updated" });
        return res.status(200).send({ fr: "Post updatedddd" });
    },

    deletePost: async (req: Request, res: Response): Promise<Response> => {
        const id = parseInt(req.params.id);
        if (isNaN(id)) return res.status(400).send({ fr: "Id is not a number" });
        const post = await deletePostById(id);
        if (!post) return res.status(400).send({ fr: "Post not found" });
        return res.status(200).send({ fr: "Post deleted" });
    },

    publierPost: async (req: Request, res: Response): Promise<Response> => {
        const id = parseInt(req.params.id);
        let type = req.params.type;
        type = getEnum(enum_postType, type.toUpperCase());

        if (isNaN(id)) return res.status(400).send({ fr: "Id is not a number" });
        const post = await getPostById(id, type);

        if (!post) return res.status(400).send({ fr: "Post not found" });
        const postPublished = await publishedPost(id, !post.published);
        if (!postPublished) return res.status(400).send({ fr: "Post not published" });
        return res.status(200).send({ fr: "Post published" });
    },


    initParagraphe: async (arrayOfSlug:string[]): Promise<Response> => {
        for (const slug of arrayOfSlug) {
            const postExist = await getPostBySlug(slug, "TEXT");
            if (postExist) return;
            const post: IPost = {
                type: getEnum(enum_postType, "TEXT"),
                slug: slug,
                translations: [
                    {
                        language: "fr",
                        title: "titre " + slug,
                        content: "Contenue de " + slug,
                    },
                    {
                        language: "en",
                        title: "Title " + slug,
                        content: "Content of " + slug,
                    },
                ],
            }
            await createPostText(post);
        }
    },
};
