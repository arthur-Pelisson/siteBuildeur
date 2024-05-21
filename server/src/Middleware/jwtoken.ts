import jwt, { JwtPayload } from 'jsonwebtoken';
require('dotenv').config();
import { Request, Response, NextFunction } from 'express';
import { enum_role } from '@prisma/client';
import cookieParser from '../Utils/cookieParser';
import { log } from 'node:console';
interface Payload {
        email: string,
        role: string,
        iat?: number,
}

export interface CustomRequest extends Request {
    user: {
        tokenEmail: Payload["email"];
        tokenRole: Payload["role"];
    };
}

class jwtoken {

    static generateToken(payload: any, expire: string = ""): string {
        try {
            if (expire !== "") {
                return jwt.sign(payload, process.env.SECRET_KEY, {expiresIn: expire});
            }   
            return jwt.sign({payload}, process.env.SECRET_KEY);
        } catch (error) {
            console.log(error);
        }
    }

    static verifyToken(token: any): JwtPayload | string | false {
        try {
            return jwt.verify(token, process.env.SECRET_KEY);
        } catch (error) {
            return false;
        }
    }

    static decodeToken(token: any): JwtPayload | string | false {
        try {
            return jwt.decode(token);
        } catch (error) {
            return false;
        }
    }

   

    static async verifyUser(req: Request, res: Response, next: NextFunction): Promise<Response | void> {
        if (req.headers.cookie) {
            const token = cookieParser.getCookieValue(req.headers.cookie, 'token');
            // console.log("token", token);
            if (!token) {
                (req as CustomRequest).user = {
                    tokenEmail: "anonymous",
                    tokenRole: enum_role.GUEST as Payload["role"]
                };
                return next();
            }
        } else {
            (req as CustomRequest).user = {
                tokenEmail: "anonymous",
                tokenRole: enum_role.GUEST as Payload["role"]
            };
            return next();
        }
        // console.log("auth", req.headers.cookie);
        // const token = req.headers.cookie;

        try {
            const token = cookieParser.getCookieValue(req.headers.cookie, 'token');
            const verify = jwtoken.verifyToken(token);
            // console.log("verify", verify);
            if (!verify) {
                cookieParser.deleteCookie("token", res);
                return res.status(401).json({ message: 'Jwtoken revoqued' });
            }
            const decoded = jwtoken.decodeToken(token);
            const newToken = jwtoken.generateToken({ email: (decoded as Payload).email, role: (decoded as Payload).role }, "24h");
            cookieParser.setCookieValue("token", newToken, res);
            (<CustomRequest>req).user = {
                tokenEmail: (decoded as Payload).email,
                tokenRole: (decoded as Payload).role
            };
            // (<CustomRequest>req).user.tokenEmail = (<Payload>decoded).email;
            // console.log((decoded as Payload).role);
            // (<CustomRequest>req).user.tokenRole = (<Payload>decoded).role;
            // console.log("role", (req as CustomRequest).user.tokenRole);
            next();
        } catch (error) {
            console.log("error", error);
            cookieParser.deleteCookie("token", res);
            return res.status(401).json({ message: 'Jwtoken revoqued' });
        }
    }
}
        
export default jwtoken;
