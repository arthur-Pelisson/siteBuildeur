import { PrismaClient } from '@prisma/client'
import { ISettingsAdmin, IMailAdmin } from './settingsAdmin.interface';
const prisma = new PrismaClient();

export const getSettingsAdmin = async ():Promise<ISettingsAdmin | false> => {
    try {
        const settingsAdmin = await prisma.settingsAdmin.findFirst({
            include: {
                mailAdmin: true,
            },
        });
        return settingsAdmin;
    } catch (error) {
        console.log("error getSettingsAdmin : ", error);
        return false;
    }
};

export const updateSettingsMailAdmin = async (mailAdmin: IMailAdmin, settingId: number):Promise<boolean> => {
    try {
        await prisma.mailAdmin.update({
            where: {
                settingsAdminId: settingId,
            },
            data: mailAdmin,
        });
        return true;
    } catch (error) {
        console.log("error updateSettingsMailAdmin : ", error);
        return false;
    }
};

export const createSettingsAdmin = async () => {
    try {
        const newSetting = await prisma.settingsAdmin.create({
            data: {}
        });
        return newSetting;
    } catch (error) {
        console.log("error createSettingsAdmin : ", error);
        return false;
    }
};

export const createMailAdmin = async (mailAdmin: IMailAdmin):Promise<IMailAdmin | false> => {
    try {
        const newMailAdmin = await prisma.mailAdmin.create({
            data: mailAdmin,
        });
        return newMailAdmin;
    } catch (error) {
        console.log("error createMail admin : ", error);
        return false;
    }
};

export const getMailAdmin = async ():Promise<IMailAdmin | false> => {
    try {
        const mailAdmin = await prisma.mailAdmin.findFirst({});
        return mailAdmin;
    } catch (error) {
        console.log("error getMailAdmin : ", error);
        return false;
    }
};