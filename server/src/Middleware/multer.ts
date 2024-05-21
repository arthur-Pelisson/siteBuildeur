import multer from "multer";
import path from "path";
import mime from "mime-types";
import fs from "fs/promises";
import sharp from "sharp";
const supportedImageFormats = ['image/png', 'image/jpeg', 'image/jpg', "image/svg+xml", "image/gif"];


// todo : add a class to handle the multer configuration
class Multer {

    upload: any;
    maxFileSize: number;

    constructor() {
        this.setStorage();
        this.maxFileSize = 2 * 1024 * 1024; // 2MB in bytes
    }

    public fileFilter = (req, file, cb) => {
        console.log("file", file);   
        let mimetypeAuthorisation = false;
        supportedImageFormats.map(format => {
            if (file.mimetype === format) {
                mimetypeAuthorisation = true;
            }
        }); 
        if (!mimetypeAuthorisation) {
            req.body.error = "Format non autorisé";
            return cb(null, false);
        }

        cb(null, true);
      };
      
      
      
    public setStorage() {

        // console.log("setStorage");
        const storage = multer.diskStorage({
            destination: (req, file, cb) => {
                // console.log("file", file);
              cb(null, path.join(__dirname, "..", 'Components', 'image', 'public'));
            },
            filename: async (req, file, cb) => {
                // console.log("file", file);
                // req.body.files = req.body.files || [];
                const destination = path.join(__dirname, "..", 'Components', 'image', 'public');
                file.originalname = Buffer.from(file.originalname, 'latin1').toString('utf8');
                const fileNameSplit = file.originalname.split(".");
                fileNameSplit.pop();
                const fileNameWithoutExtension = fileNameSplit.join(".");
                // console.log("file.originalname", file.originalname);
                const filePath = path.join(destination, file.originalname);
                try {
                    // console.log(filePath);
                    await fs.access(filePath);
                    req.body.error = "Une image avec ce nom existe déjà : " + fileNameWithoutExtension;
                    
                    cb(null, false);
                } catch (error) {
                    // If the file does not exist, proceed with the upload
                    // req.body.files = [...req.body.files, file.originalname]
                    cb(null, file.originalname);
                }
            },
        });
    
        const upload = multer({ storage: storage, fileFilter: this.fileFilter});
    
        this.upload = upload;
    } 

    public getSignature = async (req, res, next) => {
        // console.log("file", req.file);
        // console.log("file", req.file.filename);
    //     console.log("body error", req.body.error);
        if (req.body.error) {
            return res.status(400).send({ fr: req.body.error });
        } else {
            next();
        }
    //     const file = req.file.filename;
    //     if (!file) return;
    //     const imagePath = path.join(__dirname, "..", 'Components', 'image', 'public', file);
    //     try {
    //         const buffer = (await fs.readFile(imagePath)).toString("hex", 0, 4);
    //         console.log("buffer", buffer);
    
    //         const isValidImageSignature = (buffer) => {
    //             const signatures = {
    //                 ffd8ffdb: "jpg",
    //                 ffd8ffe1: "jpg",
    //                 "89504e47": "png",
    //                 ffd8ffe0: "jpeg",
    //             };
    //             return signatures[buffer];
    //         };
    
    //         if (!isValidImageSignature(buffer)) {
    //             await fs.unlink(imagePath);
    //             return res.status(400).send({ fr: "Invalid image signature" });
    //         }
    
    //     } catch (error) {
    //         console.error("Error reading image file:", error);
    //         return res.status(500).send({ fr: "Internal server error" });
    //     }
    };

    public resizeImageIfNeeded = async (req, res, next) => {
        const files = req.files;
        // console.log("files", files);
        if (!files) return;
    
        for (let i = 0; i < files.length; i++) {
            const file = files[i];
            const imagePath = file.path;
    
            try {
                const image = sharp(imagePath);
                const thumbnail = sharp(imagePath);
                const metadata = await image.metadata();
                const thumbnailMetadata = await image.metadata();
                // console.log("metadata", metadata);
                
                // Calculate the aspect ratio
                const aspectRatio = metadata.width / metadata.height;
                
                const maxDimension = 2000;

                let width = metadata.width;
                let height = metadata.height;
                let newWidth = 0;
                let newHeight = 0;
                // console.log("width", width);
                if (width > maxDimension || height > maxDimension) {
                    if (width >= height) {
                        newWidth = maxDimension;
                        newHeight = Math.round(maxDimension / aspectRatio);
                    }
                    if (width < height) {
                        newHeight = maxDimension;
                        newWidth = Math.round(maxDimension * aspectRatio);
                    }
                    image.resize({ width:newWidth, height: newHeight });
                }
                // console.log("format befor webp")
                thumbnail.toFormat("webp");
                // console.log("format after webp")
                if (thumbnailMetadata.width > 450 || thumbnailMetadata.height > 450) {
                    if (thumbnailMetadata.width >= thumbnailMetadata.height) {
                        thumbnail.resize({ width: 450, height: Math.round(450/aspectRatio)});
                    } 
                    if (thumbnailMetadata.width < thumbnailMetadata.height){
                        thumbnail.resize({ height: 450, width: Math.round(450*aspectRatio) });
                    }
                }
                // console.log("thumbnail path", file.destination + "/" + file.originalname.split(".")[0] + "-thumbnail.webp");
                let namethumbnail = file.originalname.split(".");
                namethumbnail.pop()
                namethumbnail = namethumbnail.join(".") + "-thumbnail.webp"
                console.log("thumbnail path", file.destination + "/" + namethumbnail);
                await thumbnail.toBuffer()
                .then((data) => {
                    fs.writeFile(file.destination + "/" + namethumbnail, data);
                });
                await image.toBuffer().then( async (data) => {
                    fs.writeFile(imagePath, data);
                });
            } catch (error) {
                // console.error("Error reading or resizing image file:", error);
                try {
                    const ImgBase = await fs.stat(imagePath);
                    if (ImgBase) {
                        await fs.unlink(imagePath);
                    }
                } catch (error) {
                    console.error("Error deleting image file:", error);
                }

                try {
                    const ImgThumbnail = await fs.stat(imagePath.split(".")[0] + "-thumbnail.webp");
                    if (ImgThumbnail) {
                        await fs.unlink(imagePath.split(".")[0] + "-thumbnail.webp");
                    }
                } catch (error) {
                    console.error("Error deleting thumbnail image file:", error);
                }
                return res.status(400).send({ fr: "Internal server error : Image type or signature invalide" });
            }
        }
        next();
    }

}


export default new Multer();