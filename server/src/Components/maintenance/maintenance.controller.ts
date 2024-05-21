import {
    createMaintTrans,
    getMaintenance,
    checkIfMaintTransExiste,
    checkIfMaintenanceExiste,
    createMaintenance,
    updateMaintenance,
    updateStatus,
} from "./maintenance.service";

import { Request, Response } from "express";
import { IMaintenance } from "./maintenance.interface";
import { configMaintenance } from "./maintenance.config";

export default {
    init: async (): Promise<void> => {
        const getMaintenance = await checkIfMaintenanceExiste();
        let maintId: number;
        if (!getMaintenance) {
            const maintenance = await createMaintenance();
            maintId = maintenance.id;
        } else {
            maintId = getMaintenance.id;
        }

        for (const maint of configMaintenance) {
            if (await checkIfMaintTransExiste(maint.language)) {
                continue;
            }
            await createMaintTrans(maint, maintId);
        }
    },

    getMaintenance: async (req: Request, res: Response): Promise<Response> => {
        const maintenance: IMaintenance = await getMaintenance();
        return res.status(200).send(maintenance);
    },

    updateMaintenance: async (req: Request, res: Response): Promise<Response> => {
        // console.log(req.body);
        console.log(req.body.status);
        console.log(req.body.translations);
        const { translations } = req.body;
        if (!translations) return res.status(400).send("Missing properties");
        const success = await updateMaintenance(translations);
        if (!success) return res.status(500).send("Error updating maintenance");
        return res.status(200).send({fr:"Maintenance updated"});
    },

    setStatus: async (req: Request, res: Response): Promise<Response> => {
        const { status } = req.body;
        if (status === undefined) return res.status(400).send("Missing properties");
        const success = await updateStatus(status);
        if (!success) return res.status(500).send("Error updating maintenance status");
        return res.status(200).send({fr:"Maintenance status updated"});
    },
};
