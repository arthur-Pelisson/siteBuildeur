import authoriConfig  from './authorization.config';
import { createAuthorization, deleteAuthorizationFromConfig, checkIfAuthorizationExiste } from './authorization.service';
import { enum_role, enum_action } from "@prisma/client";

export default {
    initAuthorization: async (): Promise<void> => {
        for (const ressource in authoriConfig.auth) {
            for (const action in authoriConfig.auth[ressource]) {
                for (const role of authoriConfig.auth[ressource][action]) {
                    let UpAction = action.toUpperCase();
                    let UpRole = role.toUpperCase();
                    if (await checkIfAuthorizationExiste(ressource, UpAction as enum_action, UpRole as enum_role)) {
                        continue;
                    }
                    await createAuthorization(ressource, UpAction as enum_action, UpRole as enum_role);
                }
            }
        }
        await deleteAuthorizationFromConfig(authoriConfig);
    },
}   