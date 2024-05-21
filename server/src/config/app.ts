import express from 'express';
import LoadSecurityLib from '../Middleware/loadSecurityLib';
import GetPathFiles from '../Utils/GetPathFile';
import arrayRoutes from './arrayRoutes';
import role from '../Components/role/role.controller';
import maintenance from '../Components/maintenance/maintenance.controller';
import jwtoken from '../Middleware/jwtoken';
import trimData from '../Middleware/trimData';
import path from 'path';
import multer from 'multer';
import Maintenance from '../Middleware/maintenance';
import bodyParser from 'body-parser';
import settings from '../Components/settingsAdmin/settingsAdmin.controller';
import postController from '../Components/post/post.controller';

/**
 * @class App
 * @description Main class of the application
 */
class App {
    
    Express: express.Express; // Use the Express type from the 'express' module
    app: express.Express; // Use the Express type again for the 'app' property
    LoadSecurity: LoadSecurityLib; // Use 'typeof LoadSecurity' to reference the type
    GetPathFiles: GetPathFiles; // Use the GetPathFiles type you've defined
  
    constructor(express: express.Express, loadsecurity: LoadSecurityLib, getpathfiles: GetPathFiles) {
      this.Express = express;
      this.LoadSecurity = loadsecurity;
      this.GetPathFiles = getpathfiles;
      this.app = this.Express;
    }

   
    /**
     * @memberof App
     * @description Initialize the application
     */
    async init(): Promise<void> {
        this.app.use(express.json());
        this.app.use(trimData.trimBody);
        this.app.use(trimData.trimParams);
        this.app.use(bodyParser.urlencoded({ extended: true }));
        this.app.set('trust proxy', 1);
        // this.app.get('/ip', (request, response) => response.send(request.ip))
        this.app.use(express.urlencoded({ extended: true }));
        await role.init();
        await maintenance.init();
        await settings.init();
        await postController.initParagraphe(['aboutLeft', 'aboutRight', 'contact', 'home', 'footer']);
        this.runLoadSecurity();
        this.setStaticFiles();
        this.app.get("/test", (req, res) => {
            res.status(200).send("Hello World!");
        });
        //emit event appStarted to start the server
        this.app.emit("appStarted");
    }

   
    /**
     * @memberof App
     * @description Load security middleware
     */
    runLoadSecurity(): void {
        this.LoadSecurity.init(this.app, {
            helmet: true,
            cors: true,
            jwtoken: true,
            maintenance: true,
        });
    }

    /**
     * @memberof App
     * @description Load all routes from the Components folder and subfolders
     */
    async loadRoutes(): Promise<void> {
        const routes = await this.GetPathFiles.init(__dirname + '/../Components', 'routes', arrayRoutes);
        for (const route of routes) {
            await import (route).then((routeModule) => {
                routeModule.default(this.app);
            });
        }
    }


    setStaticFiles(): void {
        console.log("load static files")
        this.app.use('/public/imgmail', express.static(__dirname + '/../Utils/mails/images'));
        this.app.use('/images/public', express.static(__dirname + '/../Components/image/public'));

    }
}

export default new App(express(), new LoadSecurityLib(), new GetPathFiles());