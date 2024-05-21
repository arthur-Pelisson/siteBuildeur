import { userAuth } from './auth.interface';
import { Request, Response } from 'express';
import { 
    serviceLogin,
    serviceRegister, 
    serviceActiveAccount, 
    cleanTokenActivation, 
    createTokenResetPassword 
} from './auth.service';
import { getUserByEmail, updatePassword } from '../user/user.service';
import Regex from '../../Utils/regex';
import jwtoken from '../../Middleware/jwtoken';
import mail from '../../Utils/mails/sendMail';
import Bcrypt from '../../Utils/bcrypt';
import { log } from 'node:console';
import cookieParser from '../../Utils/cookieParser';


export default {

    login:async (req: Request, res: Response): Promise<Response> => {
        const { email, password } = req.body;
        const loginData: userAuth = {
            email,
            password,
        };
        
        if (!loginData.email || !loginData.password || loginData.email === "" || loginData.password === "") return res.status(400).send("Missing email or password");
        const user = await serviceLogin(loginData);
        if (!user) return res.status(400).json({fr: "Identifiant incorrect", en: "Incorrect identifier"});
        const token = jwtoken.generateToken({email:user.email, role:user.role.role.name}, "24h");
        cookieParser.setCookieValue("token", token, res);
        return res.status(200).json({token:token});
    },
    
    loginAdmin:async (req: Request, res: Response) => {
        const { email, password } = req.body;
        const loginData: userAuth = {
            email,
            password,
        };  
        
        if (!loginData.email || !loginData.password || loginData.email === "" || loginData.password === "") return res.status(400).send({fr: "Identifiant incorrect", en: "Incorrect identifier"});
        const user = await serviceLogin(loginData, true);
        if (!user) return res.status(400).json({fr: "Identifiant incorrect", en: "Incorrect identifier"});
        const token = jwtoken.generateToken({email:user.email, role:user.role.role.name}, "24h");
        cookieParser.setCookieValue("token", token, res);
        // console.log(res.cookie("token", token));
        return res.status(200).json({fr: "Connecté", en: "Connected"});
    },
    
    register: async (req: Request, res: Response): Promise<Response> => {
        const { password, email, firstName, lastName} = req.body;
        let { lg } = req.body;
        if (lg === undefined || lg === "") lg = "fr";
        // log("////////////////////////////////////////////");
        // log(req.body);
        
        if ( !email || !password || !firstName || !lastName) return res.status(400).json({fr: "Missing property", en: "Propriété manquante"});
        if (!Regex.validateEmail(email)) return res.status(400).json({fr: "Email invalide", en: "Invalide email"});
        
        if (!Regex.validatePassword(password)) return res.status(400).json({fr: "Invalide password", en: "Mot de passe invalide"});

        const registerData: userAuth = {
            password,
            email,
            profile: {
                firstName,
                lastName,
            }
        };
        
        
        const token = jwtoken.generateToken(email);
        const user = await serviceRegister(registerData, token);
        if (!user) return res.status(400).json({fr: "Email déjà utilisé", en: "Email already used"});
        const [mailBody, mailSubject] = mail.templateMail("register", {token: token, lg: lg});
        const sendMail = await mail.sendMail(registerData.email, mailSubject, mailBody);
        if (!sendMail) return res.status(400).json({fr: "Erreur lors de l'envoie du mail", en: "Error while sending mail"});
        return res.status(200).json({fr: "Email envoyé", en: "Email sent"});
    },

    activeAccount: async (req: Request, res: Response): Promise<Response> => {
        const token = req.params.token;
        if (!token) return res.status(400).json({fr: "Token manquant", en: "Missing token"});
        await cleanTokenActivation();
        const activeUser = await serviceActiveAccount(token);
        if (!activeUser) return res.status(400).json({fr: "Token invalide", en: "Invalide token"});
        return res.status(200).json({fr: "Compte activé", en: "Account activated"});
    },

    forgotPassword: async (req: Request, res: Response): Promise<Response> => {
        const email = req.body.email;
        let { lg } = req.body;
        if (lg === undefined || lg === "") lg = "fr";
        if (!email) return res.status(400).json({fr: "Email manquant", en: "Missing email"});
        const user = await getUserByEmail(email);
        if (!user) return res.status(400).json({fr: "Email invalide", en: "Invalide email"});
        const token = jwtoken.generateToken(email);
        const createToken = await createTokenResetPassword(user.email, token );
        if (!createToken) return res.status(400).json({fr: "Erreur lors de la création du token", en: "Error while creating token"});

        const [mailBody, mailSubject] = mail.templateMail("resetPassword", {token: token, lg: lg});
        // log("mailSubject : ", mailSubject);
        // log("mailBody : ", mailBody);
        // log("user.email : ", user.email);
        const sendMail = await mail.sendMail(user.email, mailSubject, mailBody);
        if (user.email == "pelisson.arthur.test@gmail.com") return res.status(200).send("Email sent");
        if (!sendMail) return res.status(400).json({fr: "Erreur lors de l'envoie du mail", en: "Error while sending mail"});
        return res.status(200).json({fr: "Email envoyé", en: "Email sent"});
    },

    resetPassword: async (req: Request, res: Response): Promise<Response> => {
        const token = req.params.token;
        const password = req.body.password;
        const verifToken = jwtoken.verifyToken(token);
        if (!verifToken) return res.status(400).json({fr: "Token invalide", en: "Invalide token"});
        const decoded = jwtoken.decodeToken(token);
        const email = (<any>decoded).payload;
        if (!token || !password ) return res.status(400).json({fr: "Token ou mot de passe manquant", en: "Missing token or password"});
        if (!Regex.validatePassword(password)) return res.status(400).json({fr: "Mot de passe invalide", en: "Invalide password"});
        const user = await getUserByEmail(email);
        if (!user) return res.status(400).json({fr: "Email invalide", en: "Invalide email"});
        
        const hashedPassword = await Bcrypt.hashPassword(password);
        
        const User = {
            id: user.id,
            password: hashedPassword,
            email: user.email,
        }

        const updateUserPassword = await updatePassword(User);
        if (!updateUserPassword) return res.status(400).json({fr: "Erreur lors de la mise à jour du mot de passe", en: "Error while updating password"});
        return res.status(200).json({fr: "Mot de passe mis à jour", en: "Password updated"});
    },

    verifyToken: async (req: Request, res: Response): Promise<Response> => {
        if (!req.headers.cookie) return res.status(401).json({fr: "Token invalide", en: "Invalide token"});
        const token = cookieParser.getCookieValue(req.headers.cookie, 'token');
        const verifToken = jwtoken.verifyToken(token);
        const decoded = jwtoken.decodeToken(token);
        if (!verifToken) {
            cookieParser.deleteCookie("token", res);
            return res.status(401).json({fr: "Token invalide", en: "Invalide token"});
        }
        return res.status(200).json({fr: "Token valide", en: "Token valid", role: (<any>decoded).role});
    },

    verifyTokenAdmin: async (req: Request, res: Response): Promise<Response> => {
        if (!req.headers.cookie) return res.status(401).json({fr: "Token invalide", en: "Invalide token"});
        const token = cookieParser.getCookieValue(req.headers.cookie, 'token');
        const verifToken = jwtoken.verifyToken(token);
        if (!verifToken) {
            cookieParser.deleteCookie("token", res);
            return res.status(401).json({fr: "Token invalide", en: "Invalide token"});
        } 
        const decoded = jwtoken.decodeToken(token);
        if ((<any>decoded).role !== "ADMIN") {
            cookieParser.deleteCookie("token", res);
            return res.status(401).json({fr: "Token invalide", en: "Invalide token"});
        } 
        return res.status(200).json({fr: "Token valide", en: "Token valid", role: (<any>decoded).role});
    },

    logoutAdmin: async (req: Request, res: Response): Promise<Response> => {
        cookieParser.deleteCookie("token", res);
        return res.status(200).json({fr: "Déconnecté", en: "Disconnected"});
    },

    logout: async (req: Request, res: Response): Promise<Response> => {
        cookieParser.deleteCookie("token", res);
        return res.status(200).json({fr: "Déconnecté", en: "Disconnected"});
    }
    
};
