import { Express } from "express";
import { crossOriginEmbedderPolicy } from "helmet";
import jwtoken from '../Middleware/jwtoken';
import Maintenance from '../Middleware/maintenance';

/**
 * @class LoadSecurityLib
 * @classdesc Represents a class for loading security middleware.
 */
class LoadSecurityLib {

    /**
     * @memberof LoadSecurityLib
     * @description Initializes the security middleware.
     * @param {Express} app - The Express application.
     * @param {Object} params - The parameters for configuring the middleware.
     * @param {boolean} params.helmet - Indicates whether to load the helmet middleware.
     * @param {boolean} params.cors - Indicates whether to load the cors middleware.
     * @param {boolean} params.jwtoken - Indicates whether to load the jwtoken middleware.
     * @param {boolean} params.maintenance - Indicates whether to load the maintenance middleware.
     */
    init(app: Express, params: { helmet: boolean; cors: boolean; jwtoken: boolean; maintenance: boolean  }): void  {
        if (params.helmet) { this.loadHelmet(app); }
        if (params.cors) { this.loadCors(app); }
        if (params.jwtoken) { this.loadJwtoken(app); }
        if (params.maintenance) { this.loadMaintenance(app); }
    }

    /**
     * @memberof LoadSecurityLib
     * @description Loads the helmet middleware.
     * @param {Express} app - The Express application.
     */
    loadHelmet(app: Express): void {
        if (process.env.NODE_ENV !== 'production') {
            console.log("helmet loaded");
        }
        const helmet = require('helmet');
        app.use(helmet({
                crossOriginResourcePolicy: { policy: "same-site" },
                contentSecurityPolicy: {
                    hsts: { maxAge: 31536000, includeSubDomains: true },
                    referrerPolicy: { policy: "same-origin" },
                    // crossOriginEmbedderPolicy: { policy: "require-corp" },
                    crossOriginOpenerPolicy: { policy: "same-origin" },
                    crossOriginResourcePolicy: { policy: "same-site" },
                    noSniff: true,
                    xssFilter: true,
                    frameguard: { action: "sameorigin" },
                }
            }
        ));
    }

    /**
     * @memberof LoadSecurityLib
     * @description Loads the cors middleware.
     * @param {Express} app - The Express application.
     */
    loadCors(app: Express): void {
        console.log("cors loaded");
        const cors = require('cors');
        const corsOptions = {
            origin: [process.env.CORS, process.env.CORSADMIN],
            optionsSuccessStatus: 200,
            // allowHeaders: ['Content-Type', 'Authorization', 'Content-Length', 'X-Requested-With', 'Accept', 'Origin', 'X-Auth-Token', 'token', 'credentials', 'include'],
            allowCredentials: true,
            credentials: true,
          }
        app.use(cors(corsOptions));
    }
    
    
    /**
     * @memberof LoadSecurityLib
     * @description Loads the jwtoken middleware.
     * @param {Express} app - The Express application.
     */
    loadJwtoken(app: Express): void {
        app.use(jwtoken.verifyUser)
    }

    /**
     * @memberof LoadSecurityLib
     * @description Loads the maintenance middleware.
     * @param {Express} app - The Express application.
     */
    loadMaintenance(app: Express): void {
        app.use(Maintenance.checkMaintenance)
    }

}

export default LoadSecurityLib;