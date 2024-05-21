import { enum_action, enum_role, enum_postType } from "@prisma/client";
import { checkIfAuthorizationExiste } from '../Components/authorization/authorization.service';
import { Request, Response, NextFunction } from "express";
import { getUserByEmail, getUserById } from "../Components/user/user.service";
import GetPathFiles from "../Utils/GetPathFile";
import { getEnum } from "../Utils/getEnum";
import { log } from "console";
import { CustomRequest } from "./jwtoken";
class SecurityController {

    /**
     * @memberof SecurityController
     * @description Check if the user has the authorization to access the route
     */
    public static async checkAuthorization(req: Request, res: Response, next: NextFunction): Promise<Response | void> {
        // console.log("checkAuthorization")
        // console.log((req as CustomRequest).user)
        log((req as CustomRequest).user)
        if (!(req as CustomRequest).user) {
            log("Unauthorized")
            return res.status(401).send('Unauthorized');
        }
        //get role from token
        const role = SecurityController.getRole((req as CustomRequest).user.tokenRole) as enum_role;
        //get action from method
        const action = SecurityController.getAction(req.method);
        //get ressource from url
        const ressource = await SecurityController.getRessource(req.url);
        if (!ressource) { return res.status(400).send({en:"Ressource not found", fr:"Cette ressource n'éxiste pas"}); }
        // console.log(ressource, action, role)
        log(action, ressource, role)
        //check if the user has the authorization to access the route by other rules than the authorization table
        const rulesOveride = await SecurityController.checkRules(ressource, action, req);
        // if ((req as any).user.tokenEmail === "user@user.user.com") {
            // log(rulesOveride)
        // }
        if (rulesOveride) {
            log("accepted by rulesOveride")
            return next();
        }
        try {
            const authorization = await checkIfAuthorizationExiste(ressource, action,  role);
            if (authorization) {
                log("accepted")
                next();
            } else {
                log("refused")
                res.status(401).send('Unauthorized');
            }
        } catch (error) {
            res.status(500).send(error);
        }
    }

    private static async checkRules(ressource: string, action:string , req: Request): Promise<boolean> {
        const rules = SecurityController.rules;
        for (const rule of rules[ressource] || []) {
            if (rule.fnc.length !== 0 && rule.action.includes(action)) {
                for (const fnc of rule.fnc) {
                    const ruleSuccess = await fnc(req);
                    if (ruleSuccess) {
                        return true;
                    }
                }
            }
        }
        return false;
    }

    private static get rules(): any {
        return {
            "user": [
                {
                    action: [enum_action.UPDATE, enum_action.DELETE, enum_action.READ],
                    fnc: [SecurityController.profile  ,SecurityController.userOwnerById, SecurityController.userOwnerByEmail]
                },
            ]
        }
    }

    private static getRole(tokenRole: string): enum_role {
      return SecurityController.getEnum(enum_role, tokenRole);
    }

    private static getEnum(enumObject:any, find: string): any {
        let result = null;
        for (const key in enumObject as any) {
            if (key === find) {
                result = enumObject[key];
            }
        }
        return result;
    }

    private  static async getRessource(url: string): Promise<string | false> {
        const getPathFiles = new GetPathFiles();
        //get all routes from Components folder 
        const ressources = await getPathFiles.init('./src/Components', 'routes', ["auth", "role"]);
        let ressourceArray = [];
        for (const ressource of ressources) {
            // keep ressource name by removing the path and the extension
            const ressourceName = ressource.split('/')[ressource.split('/').length - 1].split('.')[0];
            ressourceArray.push(ressourceName);
        }

        // find url ressource name is plural or singular
        let ressource = SecurityController.pluriel(url.split('/')[1], ressourceArray);
        console.log(ressource)
        
        if (ressource === "post") {
            const postType = url.split('/')[2];
            if (getEnum(enum_postType, postType.toUpperCase()) === null) {return false;}
            ressource = ressource + "_" + postType;
            console.log(ressource)
        }
        return ressource;
    }
    
    private static pluriel(ressource: string, ressourceArray: string[]): string {
        // find url ressource name is plural or singular by comparing with the ressource array
        for (const ressourceName of ressourceArray) {
            if (ressourceName + "s" === ressource) {
                return ressourceName;
            }
        }
        return ressource;
    }

    private static getAction(methode: string): enum_action {
        const action = {
            GET: enum_action.READ,
            POST: enum_action.WRITE,
            PUT: enum_action.UPDATE,
            PATCH: enum_action.UPDATE,
            DELETE: enum_action.DELETE,
        }
        return action[methode];
    }

    private static async userOwnerById(req: Request): Promise<boolean> {
        // console.log(req.params)
        const id: number = parseInt(req.params.id);
        if (!id || !(req as CustomRequest).user.tokenEmail || isNaN(id)) return false;
        const user = await getUserById(id);
        if (!user) return false; 
        if (user.email !== (req as CustomRequest).user.tokenEmail) return false;
        return true;
    }
    
    private static async userOwnerByEmail(req: Request): Promise<boolean> {
        console.log('params', req.params)
        const email: string = req.params.email;
        if (!email || !(req as CustomRequest).user.tokenEmail ) return false;
        if (email !== (req as CustomRequest).user.tokenEmail) return false;
        return true;
    }

    private static async profile(req: Request): Promise<boolean> {
        const ressource = req.url.split('/')[1];
        const checkIfProfile = req.url.split('/').pop();
        if (ressource === "user" && checkIfProfile === "profile") {
            return true;
        }
        return false;
    }
}

export default SecurityController;