import { Request, Response } from "express";
import { getUserById, getAllUsers, updateUser, deleteUser, createUser, getUserByEmail, updatePassword, getPasswordByUserId } from "./user.service";
import { enum_role } from "@prisma/client";
import { getEnum } from "../../Utils/getEnum";
import { getRoleById, getRoleByName } from "../role/role.service";
import { IUser } from "./user.interface";
import { IRole } from "../role/role.interface";
import Bcrypt from "../../Utils/bcrypt";
import Regex from "../../Utils/regex";
import { log } from "console";
import jwtoken from "../../Middleware/jwtoken";
import cookieParser from "../../Utils/cookieParser";

export default {
    getByid: async (req: Request, res: Response): Promise<Response> => {
        const id: number = parseInt(req.params.id);
        if (isNaN(id)) return res.status(400).send("Id is not a number");
        const user = await getUserById(id);
        if (!user) return res.status(400).send("User not found");
        if (user.email === (req as any).user.tokenEmail) {
            return res.status(200).send(user);
        }
        return res.status(200).send(user);
    },

    getProfile: async (req: Request, res: Response): Promise<Response> => {
        const email = (req as any).user.tokenEmail;
        console.log("getprofile : ", email);
        const userByEmail = await getUserByEmail(email);
        if (!userByEmail) return res.status(400).send("User not found");
        const user = await getUserById(userByEmail.id);
        if (!user) return res.status(400).send("User not found");
        const userData = {
            id: user.id,
            email: user.email,
            profile: user.profile,
        };
        return res.status(200).send(userData);
    },

    updateProfile: async (req: Request, res: Response): Promise<Response> => {
        console.log("update user");
        const userEmail = (req as any).user.tokenEmail;
        let user = await getUserByEmail(userEmail);
        console.log("user: ", user);
        if (!user) return res.status(400).json({ fr: "Utilisateur non trouvé", en: "User not found" });

        //if user is not admin, he can only update his own account
        const { email, firstName, lastName } = req.body;
        if (!email || !firstName || !lastName) return res.status(400).json({ fr: "Propriété manquante", en: "Missing property" });
        if (!Regex.validateEmail(email)) return res.status(400).send({ fr: "Email invalide", en: "Invalide email" });
        const checkIfMailExist = await getUserByEmail(email, user.id);
        if (checkIfMailExist) return res.status(400).json({ fr: "Email déjà utilisé", en: "Email already exist" });

        const User: IUser = {
            id: user.id,
            email: email,
            active: true,
            profile: {
                firstName: firstName,
                lastName: lastName,
            },
            role: {
                role: {
                    id: user.role.role.id,
                    name: user.role.role.name,
                },
            },
        };
        const update = await updateUser(User);
        if (!update) return res.status(400).json({ fr: "profile non mis à jour", en: "Profile not updated" });
        const token = jwtoken.generateToken({ email: User.email, role: User.role.role.name }, "24h");
        cookieParser.setCookieValue("token", token, res);
        return res.status(200).json({ fr: "Profile mis à jour", en: "Profile updated" });
    },

    getByEmail: async (req: Request, res: Response): Promise<Response> => {
        console.log(req.params);
        const email = req.params.email;
        if (!email) return res.status(400).send("Missing email");
        const user = await getUserByEmail(email);
        if (!user) return res.status(400).send("User not found");
        return res.status(200).send(user);
    },

    getAll: async (req: Request, res: Response): Promise<Response> => {
        const users = await getAllUsers();
        return res.status(200).send(users);
    },

    create: async (req: Request, res: Response): Promise<Response> => {
        const { email, active, roleId, password, firstName, lastName } = req.body;

        if (!email || !active || !roleId || !password || !firstName || !lastName) return res.status(400).send("Missing property");
        const checkIfMailExist = await getUserByEmail(email);
        if (checkIfMailExist) return res.status(400).send("Email already exist");
        if (!Regex.validateEmail(email)) return res.status(400).send("Invalide email");
        if (!Regex.validatePassword(password)) return res.status(400).send("Invalide password");
        const roleName = <IRole | false>await getRoleById(roleId);
        if (!roleName) return res.status(400).send("Role not found");

        const User: IUser = {
            email: email,
            active: active,
            password: password,
            profile: {
                firstName: firstName,
                lastName: lastName,
            },
            role: { role: roleName },
        };

        const user = await createUser(User);
        if (!user) return res.status(400).send("User not created");
        return res.status(200).send(user);
    },

    update: async (req: Request, res: Response): Promise<Response> => {
        console.log("update user");
        const id: number = parseInt(req.params.id);
        if (isNaN(id)) return res.status(400).json({ fr: "Id n'est pas un nombre", en: "Id is not a number" });
        const Role = getEnum(enum_role, (req as any).user.tokenRole);
        let user = await getUserById(id);
        if (!user) return res.status(400).json({ fr: "Utilisateur non trouvé", en: "User not found" });

        //if user is not admin, he can only update his own account
        if (Role === enum_role.USER) {
            const { email, firstName, lastName } = req.body;
            if (!email || !firstName || !lastName) return res.status(400).json({ fr: "Propriété manquante", en: "Missing property" });
            if (!Regex.validateEmail(email)) return res.status(400).send({ fr: "Email invalide", en: "Invalide email" });
            const checkIfMailExist = await getUserByEmail(email, id);
            if (checkIfMailExist) return res.status(400).json({ fr: "Email déjà utilisé", en: "Email already exist" });

            const User: IUser = {
                id: id,
                email: email,
                active: true,
                profile: {
                    firstName: firstName,
                    lastName: lastName,
                },
                role: {
                    role: {
                        id: user.role.role.id,
                        name: user.role.role.name,
                    },
                },
            };
            const update = await updateUser(User);
            if (!update) return res.status(400).json({ fr: "profile non mis à jour", en: "Profile not updated" });
            const token = jwtoken.generateToken({ email: User.email, role: User.role.role.name }, "24h");
            cookieParser.setCookieValue("token", token, res);
            return res.status(200).json({ fr: "Profile mis à jour", en: "Profile updated" });
        }

        //if user is admin, he can update any account
        if (Role === enum_role.ADMIN) {
            const { email, active, role, firstName, lastName } = req.body;
            if (!email || !active || !role || !firstName || !lastName) return res.status(400).send("Missing property");
            if (email === "" || firstName === "" || lastName === "") return res.status(400).send("Empty property");
            if (!Regex.validateEmail(email)) return res.status(400).send("Invalide email");
            const checkIfMailExist = await getUserByEmail(email, id);
            if (checkIfMailExist) return res.status(400).send("Email already exist");

            const roleId = <IRole | false>await getRoleById(role);
            if (!roleId) return res.status(400).send("Role not found");

            const User: IUser = {
                id: id,
                email: email,
                active: active,
                profile: {
                    firstName: firstName,
                    lastName: lastName,
                },
                role: { role: roleId },
            };
            const update = await updateUser(User);

            if (!update) return res.status(400).send("User not updated");
            return res.status(200).send("User updated");
        }
    },

    changePassword: async (req: Request, res: Response): Promise<Response> => {
        // const id: number = parseInt(req.params.id);
        // if (isNaN(id)) return res.status(400).send("Id is not a number");
        const getUserById = await getUserByEmail((req as any).user.tokenEmail);
        if (!getUserById) return res.status(400).send({fr: "Utilisateur non trouvé", en: "User not found"});
        let userPassword = await getPasswordByUserId(getUserById.id);
        if (!userPassword) return res.status(400).send({fr: "Mot de passe non trouvé", en: "Password not found"});
        const role = getEnum(enum_role, (req as any).user.tokenRole);
        const { password, newPassword } = req.body;
        // if (role !== enum_role.ADMIN) {
            if (!password || password === "") return res.status(400).send({fr: "Propriété manquante", en: "Missing property"});
            const checkPassword = await Bcrypt.comparePassword(password, userPassword);
            if (!checkPassword) return res.status(400).send({fr: "Mot de passe incorrect", en: "Invalide password"});
        // }
        if (!newPassword) return res.status(400).send({fr: "Propriété manquante", en: "Missing property"});
        const checkNewPassword = Regex.validatePassword(newPassword);
        if (!checkNewPassword) return res.status(400).send({fr: "Mot de passe invalide", en: "Invalide password"});

        const hashedPassword: string = await Bcrypt.hashPassword(newPassword);
        const update = await updatePassword({ id: getUserById.id, password: hashedPassword } as IUser);
        if (!update) return res.status(400).send({fr: "Mot de passe non mis à jour", en: "Password not updated"});
        return res.status(200).send({fr: "Mot de passe mis à jour", en: "Password updated"});
    },

    delete: async (req: Request, res: Response): Promise<Response> => {
        const id: number = parseInt(req.params.id);
        if (isNaN(id)) return res.status(400).send("Id is not a number");
        const getUser = await getUserById(parseInt(req.params.id));
        if (!getUser) return res.status(400).send("User not found");
        await deleteUser(id);
        return res.status(200).send("User deleted");
    },
};
