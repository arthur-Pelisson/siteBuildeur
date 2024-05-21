import {createRole, getRoleByName, checkIfRoleExiste} from "./role.service";
import { enum_role } from "@prisma/client";
import authorizationController from "../authorization/authorization.controller";
import { IRole } from "./role.interface";

export default {

    init: async  (): Promise<void> =>  {
        for (const role in enum_role ) {
            if (await checkIfRoleExiste(role)) {
                continue;
            }
            await createRole(role);
        }
        await authorizationController.initAuthorization();
    },

    getRoleByName: async (role: string): Promise<IRole | boolean> => {
        return await getRoleByName(role);
    }
};