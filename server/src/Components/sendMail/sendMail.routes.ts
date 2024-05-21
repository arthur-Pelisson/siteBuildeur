import express from "express";
import SecurityController from "../../Middleware/securityController";
import sendMailController from "./sendMail.controller"; 
import RateLimite from "../../Middleware/rateLimiteRequest";

const rateLimit = RateLimite.CreateLimiteRateRequest(15 * 60 * 1000, 5);

const routes = (app: express.Express) => {
    app.post("/sendMail", SecurityController.checkAuthorization, rateLimit, sendMailController.sendMail);
}

export default routes;