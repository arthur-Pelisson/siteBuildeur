import { PrismaClient } from "@prisma/client";
import { enum_role } from "@prisma/client";
import { IRole } from "./role.interface";
const prisma = new PrismaClient();

export const createRole = async (role: string): Promise<boolean> => {
    await prisma.role.create({
        data: {
            name: role as enum_role,
        },
    });
    return true;
};

export const getRoleById = async (id: number): Promise<IRole | false> => {
    const role = await prisma.role.findUnique({
        where: {
            id: id,
        },
        select: {
            name: true,
            id: true,
        },
    });
    if (role) {
        return role;
    } else {
        return false;
    }

};

export const checkIfRoleExiste = async (role: string): Promise<boolean> => {
    const roleExiste = await prisma.role.findUnique({
        where: {
            name: role as enum_role,
        },
    });
    if (roleExiste) {
        return true;
    } else {
        return false;
    }
};

export const getRoleByName = async (role: string): Promise<IRole | boolean> => {
    const roleExiste = await prisma.role.findUnique({
        where: {
            name: role.toUpperCase() as enum_role,
        },
        select: {
            name: true,
            id: true,
        }
    });
    if (roleExiste) {
        return roleExiste;
    } else {
        return false;
    }    
}