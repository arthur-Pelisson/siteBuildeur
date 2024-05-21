import userController from "./user.controller";
import express from "express";
import SecurityController from "../../Middleware/securityController";

const routes = (app: express.Express) => {
    app.get("/users", SecurityController.checkAuthorization , userController.getAll);
    app.get("/user/:id", SecurityController.checkAuthorization, userController.getByid);
    app.get("/user/email/:email", SecurityController.checkAuthorization, userController.getProfile)
    app.post("/user", SecurityController.checkAuthorization, userController.create);
    app.put("/user/:id", SecurityController.checkAuthorization, userController.update);
    app.patch("/user/change_password/profile", SecurityController.checkAuthorization, userController.changePassword);
    app.delete("/user/:id", SecurityController.checkAuthorization, userController.delete);
    app.get("/user/get/profile", SecurityController.checkAuthorization, userController.getProfile);
    app.put("/user/update/profile", SecurityController.checkAuthorization, userController.updateProfile);
}

export default routes;