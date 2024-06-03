import { PrismaClient } from "@prisma/client";
import {IUser} from "./user.interface";
import Bcrypt from "../../Utils/bcrypt";

const prisma = new PrismaClient();

export const getUserById = async (id:number):Promise<IUser | false> => {
    try {
        const user = await prisma.user.findUnique({
            where: {
                id: id,
            },
            select: {
                id: true,
                email: true,
                active: true,
                role: {
                    select: {
                        role: {
                            select: {
                                name: true,
                                id: true,
                            }
                        }
                    }
                },
                profile: {
                    select: {
                        firstName: true,
                        lastName: true,
                    }
                }
            }
        });
        if (user) {
            return user;
        } else {
            false;
        }
    } catch (error) {
        console.log(error);
        return false;
    }
  
};

export const getPasswordByUserId = async (id: number): Promise<string | false> => {
    try {
        const user = await prisma.user.findUnique({
            where: {
                id: id,
            },
            select: {
                password: true,
            }
        });
        if (user) {
            return user.password;
        } else {
            false;
        }
    } catch(e) {
        console.log(e);
        return false;
    }
   
};

export const getUserByEmail = async (email: string, id: number|false = false): Promise<IUser | false> => {
    try {
        const user = await prisma.user.findUnique({
            where: {
                email: email,
            },
            select: {
                id: true,
                email: true,
                active: true,
                role: {
                    select: {
                        role: {
                            select: {
                                name: true,
                                id: true,
                            }
                        }
                    }
                },
                profile: {
                    select: {
                        firstName: true,
                        lastName: true,
                    }
                }
            }
        });
        if (user) {
            if (id && user.id === id) {
                return false;
            }
            return user;
        } else {
            false;
        }
    } catch(e) {
        console.log(e);
        return false;
    }
}

export const getAllUsers = async (): Promise<IUser[]> => {
    try {
        const users = await prisma.user.findMany({
            select: {
                id: true,
                email: true,
                active: true,
                profile: {
                    select: {
                        firstName: true,
                        lastName: true,
                    }
                },
                role: {
                    select: {
                        role: {
                            select: {
                                name: true,
                            }
                        }
                    }
                }
            }
        });
        return users;
    } catch(e) {
        console.log(e);
        return [];
    }
};

export const createUser = async (User: IUser):Promise<IUser|boolean> => {
    const hashedPassword: string = await Bcrypt.hashPassword(User.password)
    try {
       const newuser =  await prisma.user.create({
            data: {
                email: User.email,
                active: User.active,
                password: hashedPassword,
                profile: {
                    create: {
                        firstName: User.profile.firstName,
                        lastName: User.profile.lastName,
                    }
                },
                role: {
                    create: {
                        roleId: User.role.role.id
                    }
                }
            }, select: {
                id: true,
                email: true,
                active: true,
                role: {
                    select: {
                        role: {
                            select: {
                                name: true,
                            }
                        }
                    }
                },
                profile: {
                    select: {
                        firstName: true,
                        lastName: true,
                    }
                },
                createdAt: true,
                updatedAt: true,
            }
            
        });
        return newuser;
    } catch (error) {
        console.log(error);
        return false;
    }
};

export const updateUser = async (user:IUser): Promise<boolean> => {
    try {
        await prisma.user.update({
            where: {
                id: user.id
            },
            data: {
                email: user.email,
                active: user.active,
                profile: {
                    update: {
                        firstName: user.profile.firstName,
                        lastName: user.profile.lastName,
                    }
                },
                role: {
                    update: {
                        roleId: user.role.role.id
                    }
                }
            }
        });
        return true;
    } catch (error) {
        return false;
    }
    
};

export const updatePassword = async (user:IUser): Promise<boolean> => {
    try {
        await prisma.user.update({
            where: {
                id: user.id
            },
            data: {
                password: user.password
            }
        });
        return true;
    } catch (error) {
        return false;
    }
};

export const getPassword = async (id: number): Promise<boolean> => {
    try {
        const user = await prisma.user.findUnique({
            where: {
                id: id,
            },
            select: {
                password: true,
            }
        });
        if (user) {
            return true;
        } else {
            return false;
        }
    } catch (e) {
        console.log(e);
        return false;
    }
};

export const deleteUser = async (id: number): Promise<boolean> => {
    try {
        await prisma.user.delete({
            where: {
                id: id
            }
        });
        return true;
    } catch (error) {
        return false;
    }

};


export const createUserForTest = async (User: IUser):Promise<IUser> => {
    const hashedPassword: string = await Bcrypt.hashPassword(User.password)
    try {
        const user = await prisma.user.create({
            data: {
                email: User.email,
                active: User.active,
                password: hashedPassword,
                profile: {
                    create: {
                        firstName: User.profile.firstName,
                        lastName: User.profile.lastName,
                    }
                },
                role: {
                    create: {
                        roleId: User.role.role.id
                    }
                }
            },
            select:{
                id: true,
                email: true,
                active: true,
                role: {
                    select: {
                        role: {
                            select: {
                                name: true,
                            }
                        }
                    }
                },
                profile: {
                    select: {
                        firstName: true,
                        lastName: true,
                    }
                }
            }
        });
        return user;
    } catch (error) {
        
    }
};
