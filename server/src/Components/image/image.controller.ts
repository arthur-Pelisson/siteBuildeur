import fs from "fs/promises"; // Use fs/promises to work with promises
import path from "path";
import { findImageInPost } from "../post/post.service";
const publicFolderPath = path.join(__dirname, "public");

export default {
    async getImages(req, res) {
        try {
            const files = await fs.readdir(publicFolderPath);
            const images = files.filter((file) => file.match(/\.(jpg|jpeg|png|gif|mkv|svg)$/));
            const imageUrls = images.map((image) => `${process.env.HOST}/images/public/${image}`);
            return res.status(200).send(imageUrls);
        } catch (err) {
            console.error(err);
            return res.status(500).send({ fr: err.message });
        }
    },

    async uploadImage(req, res) {
        // console.log("req.file", req.file);
        // console.log("req.body", req.body);
        // console.log(JSON.stringify(req.body));
        res.status(200).send({ fr: "Image uploaded" });
    },

    async deleteImage(req, res) {
        console.log("req.body", req.body);
        let { names } = req.body;
        if (names.length === 0) return res.status(400).send({ fr: "Nom de l'image manquant" });
        const allImagePath: string[] = [];
        for (let i = 0; i < names.length; i++) {
            let name = names[i].toString();
            const imagePath = path.join(publicFolderPath, name);
            allImagePath.push(imagePath);
            const imageInPost = await findImageInPost(`${process.env.HOST}/images/public/${name}`);

            console.log("imageInPost", imageInPost);
            if (imageInPost.length > 0) {
                const slugsPost = imageInPost.map((slug) => {
                    return " " + slug;
                });
                return res.status(400).send({ fr: "L'image " + name + " est utiliser  dans les posts suivant :" + slugsPost });
            }
        }
        try {
            for (let i = 0; i < allImagePath.length; i++) {
                await fs.unlink(allImagePath[i]);
                let namethumbnailsplit:string[] = allImagePath[i].split(".");
                namethumbnailsplit.pop()
                let namethumbnail = namethumbnailsplit.join(".") + "-thumbnail.webp"
                await fs.unlink(namethumbnail);
            }
            return res.status(200).send({ fr: "Image supprimé" });
        } catch (err) {
            console.error(err);
            return res.status(500).send({ fr: err.message });
        }
    },
};
