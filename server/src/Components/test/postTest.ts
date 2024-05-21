import { IPostTranslation, IPost} from '../post/post.interface';
import { ITag, IPostTags } from '../tag/tag.interface';
import { createPostPhotography, createPostRealization, deletePostById } from '../post/post.service';
import { enum_postType } from '@prisma/client';
import { log } from 'console';

class PostTest {

    type: enum_postType;
    tags: IPostTags[] | ITag[];
    translation: IPostTranslation[];
    data: any;
    slug: string;
    images: string[];
    
    constructor(type, slug, tags, translation, data, images) {
        this.slug = slug;
        this.type = type;
        this.tags = tags;
        this.translation = translation;
        this.data = data;
        this.images = images;
    }

    async createPost() {
        switch (this.type.toUpperCase()) {
            case "PHOTOGRAPHY":
                return await createPostPhotography(this.post);
            case "REALIZATION":
                return await createPostRealization(this.post);
            // case "EVENT":
            //     return await createPostEvent(this.post);
            // case "TEXT":
            //     return await createPostText(this.post);
        }
    }

    get post(): IPost {
        return {
            type: this.type,
            slug: this.slug,
            post_tags: this.tags,
            translations: this.translation,
            post: this.data,
            images: this.images,
        };
    }

    static async createPost(type, slug, tags, translation, data, images?) {
        let post = new PostTest(type, slug, tags, translation, data, images);
        const newpost = await post.createPost();
        log(newpost);
        return newpost;
    }

    static async deletePost(id: number) {
        await deletePostById(id);
    }

}

export default PostTest;