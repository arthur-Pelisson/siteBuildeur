import * as express from "express";
import imageController from "./image.controller";
import SecurityController from "../../Middleware/securityController";
import Multer from "../../Middleware/multer";

const routes = (app: express.Express) => {  
    app.get("/images/public", function (req,res,next) {
        next();
    },  SecurityController.checkAuthorization, imageController.getImages);
    app.post("/images/public", SecurityController.checkAuthorization, Multer.upload.array("image"), Multer.getSignature, Multer.resizeImageIfNeeded, imageController.uploadImage);
    app.delete("/images/public", SecurityController.checkAuthorization, imageController.deleteImage);
    app.use('/public/imgmail', express.static(__dirname + '/../Utils/mails/images'));
    app.use('/images/public', express.static(__dirname + '/../Components/image/public'));
};

export default routes;