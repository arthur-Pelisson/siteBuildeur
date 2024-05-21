import { Request, Response, NextFunction } from 'express';
import { getMaintenance } from '../Components/maintenance/maintenance.service';
import { getEnum } from '../Utils/getEnum';
import { enum_role } from '@prisma/client';
import { CustomRequest } from './jwtoken';
class Maintenance {
    private static whitelist: string[] = ['/maintenance', '/auth/login-admin', '/public/imgmail', '/images/public'];

    public static async checkMaintenance(req: Request, res: Response, next: NextFunction): Promise<Response | void> {
        const maintenance = await getMaintenance();
        // console.log("maintenance: ", maintenance);
        // Skip maintenance check for whitelisted routes
        // console.log("whitelisted route: ", req.path);
        // console.log("whitelisted route: ", Maintenance.isWhitelistedRoute(req.path));
        if (Maintenance.isWhitelistedRoute(req.path)) {
            return next();
        }
        
        if (!maintenance.status) {
            return next();
        }
        
        if (maintenance.status) {
            console.log("role maint: ", (req as CustomRequest).user);
            console.log("maintenance path " + req.path);
            const role = getEnum(enum_role, (req as CustomRequest).user.tokenRole);
            if (role !== enum_role.ADMIN) {
                return res.status(503).send({ fr: 'Site en maintenance', en: 'Site in maintenance' });
            }
            next();
        }
    }

    private static isWhitelistedRoute(path: string): boolean {
        if (path.includes('/images/public/') || path.includes('/public/imgmail')) {
            return true;
        }
        return Maintenance.whitelist.includes(path);
    }
}

export default Maintenance;