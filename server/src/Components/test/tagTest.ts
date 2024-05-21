import { log } from "node:console";
import { ITagTranslation } from "../tag/tag.interface";
import { createTag, deleteByIdTag } from "../tag/tag.service";


class tagTest {
    tags: ITagTranslation[];

    constructor(tags: ITagTranslation[]) {
        this.tags = tags;
    }

    static async createTag(tags: ITagTranslation[]) {
        let tag = new tagTest(tags);
        const newTag = await createTag(tag.tags);
        return newTag;
    }

    static async deleteTag(id: number) {
        await deleteByIdTag(id);
    }


}

export default tagTest;