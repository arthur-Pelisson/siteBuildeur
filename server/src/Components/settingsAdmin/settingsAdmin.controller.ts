import { Request, Response } from "express";
import { ISettingsAdmin, IMailAdmin } from "./settingsAdmin.interface";
import { getSettingsAdmin, createSettingsAdmin, updateSettingsMailAdmin, createMailAdmin, getMailAdmin } from "./settingsAdmin.service";
import Bcrypt from "../../Utils/bcrypt";

export default {
    init: async (): Promise<void> => {
        let getSetting: ISettingsAdmin | false = await getSettingsAdmin();
        // console.log("getSetting", getSetting);
        if (!getSetting) {
            const createSetting: ISettingsAdmin | false = await createSettingsAdmin();
            // console.log("createSetting", createSetting);
            getSetting = createSetting;
        }

        if (getSetting != false) {
            const getmailAdmin: IMailAdmin | false = await getMailAdmin();

            if (!getmailAdmin) {
                // console.log("getMailAdmin", getmailAdmin);
                const passwordCrypt = await Bcrypt.encryptText("password123456password123456password123456password123456");
                // console.log("passwordCrypt", passwordCrypt);
                const mailAdmin: IMailAdmin = {
                    name: "Email",
                    email: "example@example.com",
                    emailAdmin:"example.admin@example.com",
                    password: passwordCrypt,
                    service: "gmail",
                    settingsAdminId: getSetting.id,
                };

                const newmailAdmin: IMailAdmin | false = await createMailAdmin(mailAdmin);
                // console.log("newmailAdmin", newmailAdmin);
            }
        }
    },

    getSettingsAdmin: async (req: Request, res: Response): Promise<Response> => {
        const settingsAdmin: ISettingsAdmin | false = await getSettingsAdmin();
        if (!settingsAdmin) return res.status(404).json({ fr: "paramètre non trouvé", en: "parameter not found" });
        const setting = {
            id: settingsAdmin.id,
            createdAt: settingsAdmin.createdAt,
            updateAt: settingsAdmin.updatedAt,
            settings: [{
                id: settingsAdmin.mailAdmin.id,
                name: settingsAdmin.mailAdmin.name,
                emailAdmin: settingsAdmin.mailAdmin.emailAdmin,
                updatedAt: settingsAdmin.mailAdmin.updatedAt,
                createdAt: settingsAdmin.mailAdmin.createdAt,
                email: settingsAdmin.mailAdmin.email,
                service: settingsAdmin.mailAdmin.service,
            }]
            
        };
        return res.status(200).json(setting);
    },

    updateSettingsMailAdmin: async (req: Request, res: Response): Promise<Response> => {
        let {email, service, password, emailAdmin} = req.body;
        if (!email || !service || !password || !emailAdmin) return res.status(400).json({ fr: "paramètre manquant", en: "missing parameter" });
        if (password.startsWith("***********")) {
            const getmailAdmin: IMailAdmin | false = await getMailAdmin();
            if (!getmailAdmin) return res.status(404).json({ fr: "paramètre non trouvé", en: "parameter not found" });
            password = getmailAdmin.password;
        } else {
            const passwordCrypt = await Bcrypt.encryptText(password);
            password = passwordCrypt;
        }
        const getSetting: ISettingsAdmin | false = await getSettingsAdmin();
        if (!getSetting) return res.status(404).json({ fr: "paramètre non trouvé", en: "parameter not found" });

        const settingsAdmin: IMailAdmin = {
            email: email,
            emailAdmin: emailAdmin,
            service: service,
            password: password,
            settingsAdminId: getSetting.id,
        };
        const updateSettings: boolean = await updateSettingsMailAdmin(settingsAdmin, getSetting.id);
        if (!updateSettings) return res.status(404).json({ fr: "paramètre non trouvé", en: "parameter not found" });
        return res.status(200).json({ fr: "paramètre mis à jour", en: "parameter updated" });
    },
};
