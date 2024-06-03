import authController from "./auth.controller";
import express from "express";
import RateLimite from "../../Middleware/rateLimiteRequest";


const routes = (app: express.Express) => {
    const url = "/auth";
    const rateLimit = RateLimite.CreateLimiteRateRequest(15 * 60 * 1000, 10);  
    app.post(`${url}/login`,rateLimit, RateLimite.addTimeToRequest, authController.login);
    app.post(`${url}/register`, authController.register);
    app.get(`${url}/activate/:token`, authController.activeAccount);
    app.post(`${url}/forgot-password`, RateLimite.addTimeToRequest, rateLimit,RateLimite.addTimeToRequest, authController.forgotPassword);
    app.post(`${url}/reset-password/:token`, authController.resetPassword);
    app.post(`${url}/verify-token`, authController.verifyToken);
    app.post(`${url}/logout`, authController.logout);
}



export default routes;