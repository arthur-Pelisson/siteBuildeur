import { PrismaClient } from "@prisma/client";
import Bcrypt from "../../Utils/bcrypt";
import { userAuth } from "./auth.interface";
import roleController from "../role/role.controller";
import { IRole } from "../role/role.interface";
import { IUser } from "../user/user.interface";
import { log } from "console";
import { getUserByEmail } from "../user/user.service";

const prisma = new PrismaClient();

export const serviceLogin = async (User: userAuth, autorised = false): Promise<IUser | false> => {
    let where = {};
    if (autorised) {
        where = {
            role: {
                name: "ADMIN",
            },
        };
    }

    const user = await prisma.user.findUnique({
        where: {
            email: User.email,
            active: true,
            role: where,
        },
        select: {
            id: true,
            email: true,
            password: true,
            role: {
                select: {
                    role: {
                        select: {
                            name: true,
                        },
                    },
                },
            },
        },
    });

    if (!user) {
        return false;
    }

    const isPasswordCorrect = await Bcrypt.comparePassword(User.password, user.password);

    if (isPasswordCorrect) {
        return user;
    }
    return false;
};
export const serviceLoginAdmin = async (User: userAuth): Promise<IUser | false> => {
    const user = await prisma.user.findUnique({
        where: {
            email: User.email,
            active: true,
            role: {
                roleId: 1,
            },
        },
        select: {
            id: true,
            email: true,
            password: true,
            role: {
                select: {
                    role: {
                        select: {
                            name: true,
                        },
                    },
                },
            },
        },
    });

    if (!user) {
        return false;
    }

    const isPasswordCorrect = await Bcrypt.comparePassword(User.password, user.password);

    if (isPasswordCorrect) {
        return user;
    }
    return false;
};

export const serviceRegister = async (User: userAuth, token: string): Promise<boolean | typeof User> => {
    const hashedPassword: string = await Bcrypt.hashPassword(User.password);
    const role = <IRole>await roleController.getRoleByName("USER");
    if (!role) return false;
    try {
        const userRegister = await prisma.user.create({
            data: {
                email: User.email,
                password: hashedPassword,
                // miss a true pour les tests
                jwtoken_active_user: {
                    create: {
                        token: token,
                    },
                },
                role: {
                    create: {
                        roleId: role.id,
                    },
                },
                profile: {
                    create: {
                        firstName: User.profile.firstName,
                        lastName: User.profile.lastName,
                    },
                },
            },
        });
        return userRegister;
    } catch (error) {
        return false;
    }
};

export const serviceActiveAccount = async (token: string): Promise<boolean> => {
    const activeUser = await prisma.jwtoken_active_user.findUnique({
        where: {
            token: token,
        },
        select: {
            user: true,
            createdAt: true,
        },
    });
    if (activeUser) {
        await prisma.user.update({
            where: {
                id: activeUser.user.id,
            },
            data: {
                active: true,
            },
        });
        await prisma.jwtoken_active_user.delete({
            where: {
                token: token,
            },
        });
        return true;
    }

    return false;
};

export const cleanTokenActivation = async (): Promise<void> => {
    const activeUser = await prisma.jwtoken_active_user.findMany({
        where: {
            createdAt: {
                lte: new Date(Date.now() - 60 * 60 * 1000),
            },
        },
        select: {
            user: true,
        },
    });

    if (activeUser) {
        for (let i = 0; i < activeUser.length; i++) {
            await prisma.user.delete({
                where: {
                    id: activeUser[i].user.id,
                },
            });
        }
    }
};

export const createTokenResetPassword = async (email: string, token: string): Promise<boolean> => {
    try {
        await prisma.jwtoken_reset_password.create({
            data: {
                token: token,
                user: {
                    connect: {
                        email: email,
                    },
                },
            },
        });
        return true;
    } catch (error) {
        return false;
    }
};

export const cleanTokenResetPassword = async (): Promise<void> => {
    const token = await prisma.jwtoken_reset_password.findMany({
        where: {
            createdAt: {
                lte: new Date(Date.now() - 60 * 60 * 1000),
            },
        },
        select: {
            token: true,
        },
    });

    if (token) {
        for (let i = 0; i < token.length; i++) {
            await prisma.jwtoken_reset_password.delete({
                where: {
                    token: token[i].token,
                },
            });
        }
    }
};

export const getActivateTokenByEmailUser = async (email: string): Promise<string | false> => {
    const user = await getUserByEmail(email);
    if (!user) return false;
    const token = await prisma.jwtoken_active_user.findUnique({
        where: {
            userId: user.id,
        },
        select: {
            token: true,
        },
    });
    if (!token) return false;
    return token.token;
};

export const getResetPasswordTokenByEmailUser = async (email: string): Promise<string | false> => {
    const user = await getUserByEmail(email);
    if (!user) return false;
    const token = await prisma.jwtoken_reset_password.findUnique({
        where: {
            userId: user.id,
        },
        select: {
            token: true,
        },
    });
    if (!token) return false;
    return token.token;
};

export const deleteTokenResetPassword = async (email: string): Promise<boolean> => {
    const user = await getUserByEmail(email);
    if (!user) return false;
    try {
        const token = await prisma.jwtoken_reset_password.delete({
            where: {
                userId: user.id,
            },
            select: {
                token: true,
            },
        });
        return true;
    } catch (error) {
        return false;
    }
};
