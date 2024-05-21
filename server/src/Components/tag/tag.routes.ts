import express from 'express';
import tagController from './tag.controller';
import jwtoken from '../../Middleware/jwtoken';
import SecurityController from '../../Middleware/securityController';

const routes = (app: express.Express) => {
    app.get("/tag/:id",  SecurityController.checkAuthorization, tagController.getTagById);
    app.get("/tags",  SecurityController.checkAuthorization, tagController.getAllTags);
    app.post("/tag",  SecurityController.checkAuthorization, tagController.createTag);
    app.put("/tag/:id",  SecurityController.checkAuthorization, tagController.updateTag);
    app.delete("/tag/:id",  SecurityController.checkAuthorization, tagController.deleteTag);
    app.get('/tags/post/:type', SecurityController.checkAuthorization, tagController.getAllTagsByPostType);
};

export default routes;