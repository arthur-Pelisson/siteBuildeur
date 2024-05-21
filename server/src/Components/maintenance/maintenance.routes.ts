import express from 'express';
import maintenanceController from './maintenance.controller';
import SecurityController from '../../Middleware/securityController';

const routes = (app: express.Express) => {
    app.get("/maintenance",  SecurityController.checkAuthorization, maintenanceController.getMaintenance);
    app.put("/maintenance",  SecurityController.checkAuthorization, maintenanceController.updateMaintenance);
    app.patch("/maintenance",  SecurityController.checkAuthorization, maintenanceController.setStatus);
};



export default routes;