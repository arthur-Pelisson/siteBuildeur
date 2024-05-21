import authController from "./auth.controller";
import express from "express";
import RateLimite from "../../Middleware/rateLimiteRequest";

const routes = (app: express.Express) => {
    const url = "/auth";
    const rateLimit = RateLimite.CreateLimiteRateRequest(15 * 60 * 1000, 100);
    
    app.post(`${url}/login-admin`, rateLimit, RateLimite.addTimeToRequest, authController.loginAdmin);
    app.post(`${url}/verify-token-admin`, authController.verifyTokenAdmin);
    app.post(`${url}/logout-admin`, authController.logoutAdmin);
}



export default routes;