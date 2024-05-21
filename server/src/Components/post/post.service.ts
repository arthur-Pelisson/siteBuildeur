import { PrismaClient } from "@prisma/client";
import { IPost, IRealization_post } from "./post.interface";
import { log } from "console";


const prisma = new PrismaClient();

export const getPostById = async (id: number, type: string): Promise<IPost | false> => {
    const post = await prisma.post.findUnique({
        where: {
            id: id,
        },
        select: {
            id: true,
            type: true,
            slug: true,
            createdAt: true,
            updatedAt: true,
            published: true,
            imagesPost: true,
            Photography_post: type === "PHOTOGRAPHY" ? true : false,
            Realization_post: type === "REALIZATION" ? true : false,
            blog_post: type === "BLOG" ? true : false,
            translations: {
                select: {
                    id: true,
                    title: true,
                    content: true,
                    language: true,
                },
            },
            post_tags: {
                select: {
                    tag_id: true,
                    post_id: true,
                },
            },
        },
    });
    if (post) {
        return post;
    }
    return false;
};

export const getPostBySlug = async (slug: string, type: string): Promise<IPost | false> => {
    const post = await prisma.post.findUnique({
        where: {
            slug: slug,
        },
        select: {
            id: true,
            type: true,
            slug: true,
            createdAt: true,
            updatedAt: true,
            published: true,
            imagesPost: true,
            Photography_post: type === "PHOTOGRAPHY" ? true : false,
            Realization_post: type === "REALIZATION" ? true : false,
            blog_post: type === "BLOG" ? true : false,
            translations: {
                select: {
                    id: true,
                    title: true,
                    content: true,
                    language: true,
                },
            },
            post_tags: {
                select: {
                    tag_id: true,
                    post_id: true,
                },
            },
        },
    });
    if (post) {
        return post;
    }
    return false;
};

export const getAllPostPagination = async (type: string, showUnpublished: boolean, page: number, tag): Promise<IPost[] | []> => {
    console.log(tag)
    let where = {};
    if (type) {
        where = {
            type: type,
        };
    }

    if (!showUnpublished) {
        where = {
            ...where,
            published: true,
        };
    }

    if (tag) {
        where = {
            ...where,
            post_tags: {
                some: {
                    tag_id: tag,
                },
            },
        };
    }

    let sort = [];
    if (type === "PHOTOGRAPHY") {
        sort["Frame_post"] = {
            createdAt: "desc",
        };
    }
    if (type === "REALIZATION") {
        sort["Realization_post"] = {    
            createdAt: "desc",
        };
    }

    if (type === "BLOG") {
        sort["blog_post"] = {
            createdAt: "desc",
        };
    }
    try {
        const posts = await prisma.post.findMany({
            skip: (page - 1) * 10,
            take: 10,
            where: where,
            orderBy: sort,
            select: {
                id: true,
                slug: true,
                type: true,
                createdAt: true,
                updatedAt: true,
                published: true,
                Photography_post: type === "PHOTOGRAPHY" ? true : false,
                Realization_post: type === "REALIZATION" ? true : false,
                blog_post: type === "BLOG" ? true : false,
                translations: {
                    select: {
                        title: true,
                        content: true,
                        language: true,
                    },
                },
                post_tags: {
                    select: {
                        tag_id: true,
                        post_id: true,
                    },
                },
            },
        });
        return posts;
    } catch (e) {
        console.log(e);
        return [];
    }
};

export const getAllPosts = async (type: string, showUnpublished: boolean): Promise<IPost[] | []> => {
    let where = {};
    if (type) {
        where = {
            type: type,
        };
    }

    if (!showUnpublished) {
        where = {
            ...where,
            published: true,
        };
    }

    const posts = await prisma.post.findMany({
        where: where,
        select: {
            id: true,
            slug: true,
            type: true,
            createdAt: true,
            updatedAt: true,
            published: true,
            Photography_post: type === "PHOTOGRAPHY" ? true : false,
            Realization_post: type === "REALIZATION" ? true : false,
            blog_post: type === "BLOG" ? true : false,
            imagesPost: true,
            translations: {
                select: {
                    title: true,
                    content: true,
                    language: true,
                },
            },
            post_tags: {
                select: {
                    tag_id: true,
                    post_id: true,
                },
            },
        },
    });
    return posts;
};


export const createPostRealization = async (post: IPost): Promise<IPost | boolean> => {
    let tmp = post.post.image.split(".")
    tmp.pop()
    let thumbnail = tmp.join(".") + "-thumbnail.webp"
    console.log(post);
    try {
        const newpost = await prisma.post.create({
            data: {
                type: post.type,
                slug: post.slug,
                imagesPost: {
                    createMany: {
                        data: post.images.map((image) => ({
                            image: image,
                        })),
                    }
                },
                Realization_post: {
                    create: {
                        video: (post.post as IRealization_post).video,
                        thumbnails: thumbnail,
                        image: post.post.image,
                    },
                },
                post_tags: {
                    create: post.post_tags.map((tagId) => ({
                        tag_id: tagId,
                    })),
                },
                translations: {
                    create: post.translations,
                },
            },
            include: {
                Realization_post: true,
                post_tags: true,
                translations: true,
            },
        });
        return newpost;
    } catch (error) {
        console.log(error);
        return false;
    }
};
export const createPostPhotography = async (post: IPost): Promise<IPost | boolean> => {
    console.log(post.post.image);
    let tmp = post.post.image.split(".")
    tmp.pop()
    let thumbnail = tmp.join(".") + "-thumbnail.webp"
    try {
        const newpost = await prisma.post.create({
            data: {
                type: post.type,
                slug: post.slug,
                imagesPost: {
                    createMany: {
                        data: post.images.map((image) => ({
                            image: image,
                        })),
                    }
                },
                Photography_post: {
                    create: {
                        image: post.post.image,
                        thumbnails: thumbnail,
                    },
                },
                post_tags: {
                    create: post.post_tags.map((tagId) => ({
                        tag_id: tagId,
                    })),
                },
                translations: {
                    create: post.translations,
                },
            },
            include: {
                Photography_post: true,
                post_tags: true,
                translations: true,
            },
        });
        return newpost;
    } catch (error) {
        log(error);
        return false;
    }
};

export const createPostText = async (post: IPost): Promise<IPost | boolean> => {
    try {
        const nextTextPost = await prisma.post.create({
            data: {
                type: post.type,
                slug: post.slug,
                text_post: {
                    create: {},
                },
                translations: {
                    create: post.translations,
                },
            },
            include: {
                text_post: true,
                post_tags: true,
                translations: true,
            },
        });
        return nextTextPost;
    } catch (e) {
        console.log(e);
        return false;
    }
};

export const createPostBlog = async (post: IPost): Promise<IPost | boolean> => {
    let tmp = post.post.image.split(".")
    tmp.pop()
    let thumbnail = tmp.join(".") + "-thumbnail.webp"
    console.log(post.type);
    try {
        const newBlogPost = await prisma.post.create({
            data: {
                type: post.type,
                slug: post.slug,
                blog_post: {
                    create: {
                        image: post.post.image,
                        thumbnails: thumbnail,
                    },
                },
                translations: {
                    create: post.translations,
                },
            },
            include: {
                blog_post: true,
                post_tags: true,
                translations: true,
            },
        });
        return newBlogPost;
    } catch (e) {
        console.log(e);
        return false;
    }
};

export const updatePostText = async (post: IPost): Promise<boolean> => {
    try {
        await prisma.post.update({
            where: {
                id: post.id,
            },
            data: {
                slug: post.slug,
                text_post: {},
                translations: {
                    updateMany: post.translations.map((translation) => {
                        return {
                            where: {
                                title: translation.oldTitle,
                                language: translation.language,
                            },
                            data: {
                                language: translation.language,
                                title: translation.title,
                                content: translation.content,
                            },
                        };
                    }),
                },
            },
        });
        return true;
    } catch (e) {
        return false;
    }
};

export const updatePostBlog = async (post: IPost): Promise<boolean> => {
    let tmp = post.post.image.split(".")
    tmp.pop()
    let thumbnail = tmp.join(".") + "-thumbnail.webp"
    try {
        await prisma.post.update({
            where: {
                id: post.id,
            },
            data: {
                slug: post.slug,
                blog_post: {
                    update: {
                        image: post.post.image,
                        thumbnails: thumbnail,
                    },
                },
                translations: {
                    updateMany: post.translations.map((translation) => {
                        return {
                            where: {
                                title: translation.oldTitle,
                                language: translation.language,
                            },
                            data: {
                                language: translation.language,
                                title: translation.title,
                                content: translation.content,
                            },
                        };
                    }),
                },
            },
        });
        return true;
    } catch (e) {
        return false;
    }
};


export const updatePostRealization = async (post: IPost): Promise<boolean> => {
    let tmp = post.post.image.split(".")
    tmp.pop()
    let thumbnail = tmp.join(".") + "-thumbnail.webp"
    try {
        await prisma.post.update({
            where: {
                id: post.id,
                type: post.type,
            },
            data: {
                slug: post.slug,
                imagesPost: {
                    deleteMany: {
                        image: {
                            notIn: post.images.map((image) => image),
                        },
                    },
                    connectOrCreate: post.images.map((image) => ({
                        where: { unique_image_post: { postId: post.id, image: image } },
                        create: { image: image},
                    })),
                },
                Realization_post: {
                    update: {
                        thumbnails: thumbnail,
                        image: post.post.image,
                        video: (post.post as IRealization_post).video,
                    },
                },
                post_tags: {    
                    deleteMany: {
                        tag_id: {
                            notIn: post.tags.map((tag) => tag),
                        },
                    },
                    connectOrCreate: post.tags.map((tag) => ({
                        where: {
                            tag_id_post_id: { post_id: post.id, tag_id: tag }
                        },
                        create: { tag_id: tag },
                    })),
                },
                translations: {
                    updateMany: post.translations.map((translation) => {
                        return {
                            where: {
                                title: translation.oldTitle,
                                language: translation.language,
                            },
                            data: {
                                language: translation.language,
                                title: translation.title,
                                content: translation.content,
                            },
                        };
                    }),
                },
            },
        });

        return true;
    } catch (error) {
        return false;
    }
};

export const updatePostPhotography = async (post: IPost): Promise<boolean> => {
    let tmp = post.post.image.split(".")
    tmp.pop()
    let thumbnail = tmp.join(".") + "-thumbnail.webp"
    console.log(post);
    try {
        await prisma.post.update({
            where: {
                id: post.id,
            },
            data: {
                imagesPost: {
                    deleteMany: {
                        image: {
                            notIn: post.images.map((image) => image),
                        },
                    },
                    connectOrCreate: post.images.map((image) => ({
                        where: { unique_image_post: { postId: post.id, image: image } },
                        create: { image: image},
                    })),
                },
                slug: post.slug,
                Photography_post: {
                    update: {
                        image: post.post.image,
                        thumbnails: thumbnail,
                    },
                },
                post_tags: {    
                    deleteMany: {
                        tag_id: {
                            notIn: post.tags.map((tag) => tag),
                        },
                    },
                    connectOrCreate: post.tags.map((tag) => ({
                        where: {
                            tag_id_post_id: { post_id: post.id, tag_id: tag }
                        },
                        create: { tag_id: tag },
                    })),
                },
                translations: {
                    updateMany: post.translations.map((translation) => {
                        return {
                            where: {
                                title: translation.oldTitle,
                                language: translation.language,
                            },
                            data: {
                                language: translation.language,
                                title: translation.title,
                                content: translation.content,
                            },
                        };
                    }),
                },
            },
        });
        return true;
    } catch (error) {
        console.log(error);
        return false;
    }
};

export const deletePostById = async (id: number): Promise<boolean> => {
    try {
        await prisma.post.delete({
            where: {
                id: id,
            },
        });
        return true;
    } catch (error) {
        return false;
    }
};

export const publishedPost = async (id: number, published: boolean): Promise<boolean> => {
    try {
        await prisma.post.update({
            where: {
                id: id,
            },
            data: {
                published: published,
            },
        });
        return true;
    } catch (error) {
        return false;
    }
};

export const findImageInPost = async (name: string): Promise<string[] | []> => {
    console.log(name);
    try {
        const image = await prisma.post.findMany({
            where: {
                OR: [
                    {
                        Realization_post: {
                            image: {
                                contains: name,
                            },
                        },
                    },
                    {
                        Photography_post: {
                            image: {
                                contains: name,
                            },
                        },
                    },
                ],
            },
            select: {
                slug: true,
            },
        });
        return image.map((i) => i.slug);
    } catch (error) {
        console.log(error);
        return [];
    }
};
