import { PrismaClient } from "@prisma/client";
import { IAuthorizationConfig } from "./authorization.interface";
import { enum_role } from "@prisma/client";
import { enum_action } from "@prisma/client";

const prisma = new PrismaClient();

export const createAuthorization = async (ressource: string, UpAction: string, UpRole: string) => {
    try {
        await prisma.authorization.create({
            data: {
                ressource: ressource,
                action: UpAction as enum_action,
                role: {
                    connect: {
                        name: UpRole as enum_role,
                    },
                },
            },
        });
        return true;
    } catch (error) {
        console.log(error);
        false;
    }
};

export const checkIfAuthorizationExiste = async (ressource: string, action: enum_action, role: enum_role) => {
    try {
        const authorizationExiste = await prisma.authorization.findUnique({
            where: {
                nameRole_ressource_action: {
                    nameRole: role,
                    ressource: ressource,
                    action: action,
                },
            },
        });
        
        if (authorizationExiste) {
            return true;
        } else {
            return false;
        }
    } catch (error) {
        throw new Error(error);
    }
};

const getAllAuthorization = async () => {
    try {
        const authorization = await prisma.authorization.findMany({
            select: {
                ressource: true,
                action: true,
                role: {
                    select: {
                        name: true,
                    },
                },
            },
        });
        return authorization;
    } catch (error) {
        console.log(error);
    }
};

export const deleteAuthorizationFromConfig = async (config: IAuthorizationConfig): Promise<void> => {
    const allAuthorization = await getAllAuthorization();
    for (const auth of allAuthorization) {
        if (config.auth?.[auth.ressource]?.[auth.action.toLowerCase()].includes(auth.role.name.toLowerCase())) {
            continue;
        }
        try {
            await prisma.authorization.delete({
                where: {
                    nameRole_ressource_action: {
                        nameRole: auth.role.name,
                        ressource: auth.ressource,
                        action: auth.action,
                    },
                },
            });
        } catch (e) {
            console.log(e);
        }
    }
};
