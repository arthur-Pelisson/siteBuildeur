import express from "express";
import postController from "./post.controller";
import jwtoken from "../../Middleware/jwtoken";
import SecurityController from "../../Middleware/securityController";

const routes = (app: express.Express) => {
    app.get("/post/:type/:id",  SecurityController.checkAuthorization, postController.getPost);
    app.get("/post/:type/slug/:slug",  SecurityController.checkAuthorization, postController.getPostBySlug);
    app.get("/posts/:type",  SecurityController.checkAuthorization, postController.getAllPosts);
    app.get("/posts/:type/:page",  SecurityController.checkAuthorization, postController.getAllPosts);
    app.get("/posts/:type/:page/:tag",  SecurityController.checkAuthorization, postController.getAllPosts);
    app.get("/admin_posts/:type",  SecurityController.checkAuthorization, postController.getAllPostsAdmin);
    app.post("/post/:type",  SecurityController.checkAuthorization, postController.createPost);
    app.put("/post/:type/:id",  SecurityController.checkAuthorization, postController.updatePost);
    app.delete("/post/:type/:id",  SecurityController.checkAuthorization, postController.deletePost);
    app.patch("/post/:type/publishe/:id",  SecurityController.checkAuthorization, postController.publierPost);
};

export default routes;