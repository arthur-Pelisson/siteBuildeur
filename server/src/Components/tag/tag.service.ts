import { PrismaClient } from "@prisma/client";
import { ITag, ITagTranslation } from "./tag.interface";
import { log } from "node:console";

const prisma = new PrismaClient();

export const getTagById = async (id: number):Promise<false | ITag> => {
    const tag = await prisma.tags.findUnique({
        where: {
            id: id,
        },
        select: {
            id: true,
            createdAt: true,
            updatedAt: true,
            tag_translate: {
                select: {
                    name: true,
                    language: true,
                },
            },
        },
    });
    if (tag) {
        return tag;
    }
    return false;
};

export const getAllTags = () => {
    const tags = prisma.tags.findMany({
        select: {
            id: true,
            tag_translate: {
                select: {
                    name: true,
                    language: true,
                },
            },
        },
    });
    return tags;
};

export const createTag = async (tags: ITagTranslation[]):Promise<ITagTranslation|boolean> => {
    try {
        const tagTranslateData = tags.map(tag => ({
            name: tag.name,
            language: tag.language,
        }));

       const newTags = await prisma.tags.create({
            data: {
                tag_translate: {
                    createMany: {
                        data: tagTranslateData,
                    }
                },
            },
        });
        return newTags;
        } catch (error) {
            return false;
        }
    };

export const updateTag = async (tags: ITag[], id: number) => {
    const update = async (tag) => {
        await prisma.tags.update({
            where: {
                id: id,
            },
            data: {
                tag_translate: {
                    update: {
                        where: {
                            name_language: {
                                name: tag.oldName,
                                language: tag.language,
                            },
                        },
                        data: {
                            name: tag.name,
                        },
                    }
                },
            },
        });
    }

    const result = await Promise.all(tags.map(async tag => {
        update(tag);
   }))
   if (result) {
       return true;
    }
    return false;
};

export const deleteByIdTag = async (id:number):Promise<boolean> => {
    try {
        await prisma.tags.delete({
            where: {
                id: id,
            },
        });
        return true;
    } catch (error) {
        return false;
    }
};

export const deletePostTag = async (tagId: number[], postId: number):Promise<boolean> => {
    for (let i = 0; i < tagId.length; i++) {
        try {
            await prisma.post_tags.delete({
                where: {
                    tag_id_post_id: {
                        tag_id: tagId[i],
                        post_id: postId
                    }
                }
            });
        } catch (error) {
            return false;
        }
    }
    return true;
};

export const createPostTag = async (tagId: number[], postId: number):Promise<boolean> => {
    for (let i = 0; i < tagId.length; i++) {
        const tag = await getTagById(tagId[i]);
        if (!tag) return false;
        try {
            await prisma.post_tags.create({
                data:{
                    tag_id: tagId[i],
                    post_id: postId,
                },
            });
            return true;
        } catch (error) {
            return false;
        }
    }
    return true;
};

export const getTagByName = async (name: string):Promise<ITag> => {
    const tag = await prisma.tags.findFirst({
        where: {
            tag_translate: {
                some: {
                    name: name,
                },
            },
        },
        select: {
            id: true,
        },
    });
    return tag;
};

