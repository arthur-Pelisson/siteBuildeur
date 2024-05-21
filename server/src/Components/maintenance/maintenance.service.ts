import { PrismaClient } from "@prisma/client";
import { IConfigMaintenance, IMaintenance } from "./maintenance.interface";
import nodeMail from 'nodemailer';

const prisma = new PrismaClient();

export const createMaintTrans = async (maint: IConfigMaintenance, maintId: number): Promise<void> => {
        await prisma.maintenance_translations.create({
            data: {
                message: maint.message,
                language: maint.language,
                maintenance_id: maintId,
            },
        });
};


export const createMaintenance = async (): Promise<IMaintenance> => {
    try {
        const createMaintenance = await prisma.maintenance.create({
            data: {
                name: "maintenance",
            },
        });
        return createMaintenance
        
    } catch (error) {
        return error;
    }
    
};

export const checkIfMaintenanceExiste = async (): Promise<IMaintenance | false> => {
    const maintenanceExiste = await prisma.maintenance.findUnique({
        where: {
            name: "maintenance",
        },
    });

    if (maintenanceExiste) {
        return maintenanceExiste;
    } else {
        return false;
    }
};

export const checkIfMaintTransExiste = async (lg: string): Promise<boolean> => {
    const maintTransExiste = await prisma.maintenance_translations.findUnique({
        where: {
            language: lg,
        },
    });
    if (maintTransExiste) {
        return true;
    } else {
        return false;
    }
};

export const getMaintenance = async (): Promise<IMaintenance | null> => {
    const maintenance = await prisma.maintenance.findUnique({
        where: {
            name: "maintenance",
        },
        select: {
            id: true,
            status: true,
            translations: true,
        },
    });

    return maintenance;
};

export const updateMaintenance = async (translations): Promise<boolean> => {
    try {
        await prisma.maintenance.update({
            where: {
                name: "maintenance",
            },
            data: {
                translations: {
                    updateMany :translations.map(translation => {
                        return {
                            where: {
                                language: translation.language,
                            },
                            data: {
                                message: translation.message,
                            },
                        };
                    })
                },
            },
        });
        return true;
    } catch(e) {
        console.log(e);
        return false;
    }
};

export const updateStatus = async (status: boolean): Promise<boolean> => {
    try {
        await prisma.maintenance.update({
            where: {
                name: "maintenance",
            },
            data: {
                status: status,
            },
        });
        return true;
    } catch(e) {
        console.log(e);
        return false;
    }
};
