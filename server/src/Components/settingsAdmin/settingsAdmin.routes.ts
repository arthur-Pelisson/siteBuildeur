import express from "express";
import settingsAdminController from "./settingsAdmin.controller";
import SecurityController from "../../Middleware/securityController";
const routes = (app: express.Express) => {
    app.get("/settingsAdmin", SecurityController.checkAuthorization, settingsAdminController.getSettingsAdmin);
    app.put("/settingsAdmin", SecurityController.checkAuthorization, settingsAdminController.updateSettingsMailAdmin);
};

export default routes;