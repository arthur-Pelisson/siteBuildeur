// set a array of unique tags id from a posts array 
export const getTagsFromPost = (dataPost) => {
    const tagsArray = [];
    for (let i = 0; i < (dataPost as any).length; i++) {
        for (let j = 0; j < (dataPost as any)[i].post_tags.length; j++) {
            if (!tagsArray.includes((dataPost as any)[i].post_tags[j].tag_id as never)) {
                tagsArray.push((dataPost as any)[i].post_tags[j].tag_id as never);
            }
        }
    }
    return tagsArray;
};

export const setTagsFromPost = (dataPost, tags) => {
    for (let i = 0; i < (dataPost as any).length; i++) {
        for (let j = 0; j < (dataPost as any)[i].post_tags.length; j++) {
            (dataPost as any)[i].post_tags[j].tag_name = tags.find((tag) => tag.id === (dataPost as any)[i].post_tags[j].tag_id);
        }
    }
    return dataPost;
}