import authController from "./auth.controller";
import express from "express";

const routes = (app: express.Express) => {
    const url = "/auth";
    app.post(`${url}/login`, authController.login);
    app.post(`${url}/register`, authController.register);
    app.get(`${url}/activate/:token`, authController.activeAccount);
    app.post(`${url}/forgot-password`, authController.forgotPassword);
    app.post(`${url}/reset-password/:token`, authController.resetPassword);
    app.post(`${url}/verify-token`, authController.verifyToken);
    app.post(`${url}/logout`, authController.logout);
}



export default routes;