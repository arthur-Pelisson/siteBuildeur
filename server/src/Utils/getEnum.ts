export const getEnum = (enumObject: any, find: string) => {
    let result = null;
    for (const key in enumObject) {
        if (key === find) {
            result = enumObject[key];
        }
    }
    return result;
};