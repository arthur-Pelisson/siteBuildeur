import fs from 'fs';

/**
 * @class GetPathFiles
 */
class GetPathFiles {
    paths: Array<string>;
    fs: typeof fs;
    exclude: Array<string>;

    /**
     * Creates an instance of GetPathFiles.
     * @memberof GetPathFiles
     */
    constructor() {
        this.fs = require('fs');
        this.paths = new Array();
    }
    
    /**
     * @memberof GetPathFiles
     * @description Get all files in a folder
     */
    async init(folder: string, identifieur: string, exlusion: Array<string> = []): Promise<Array<string>> {
        this.exclude = exlusion;
        try {
            await this.getFiles(folder, identifieur);
            if (this.paths.length === 0) {
                throw new Error('No files found');
            }
            
            return this.paths;
        } catch (error) {
            console.log(error);
        }
    }

    /**
     * @memberof GetPathFiles
     * @description Get all files in a folder
     */
    async getFiles(folder: string, identifieur: string): Promise<void>  {
        const files = this.fs.readdirSync(folder);
        
        for (const file of files) {
            const filePath = `${folder}/${file}`;
            if (this.fs.lstatSync(filePath).isDirectory()) {
                this.getFiles(filePath, identifieur);
            } else if (file.includes(identifieur)) {
                if (this.ExcludeFile(filePath)){ continue; }

                this.savePath(filePath);
            }
        }
    }

    /**
     * @memberof GetPathFiles
     * @description Exclude files from the array of paths
     */
    ExcludeFile(filePath: string): boolean {
        for (let i = 0; i < this.exclude.length; i++) {
            if (filePath.includes(this.exclude[i]) || filePath.includes('js.map')) {
                return true;
            }
        }
    }

    /**
     * @memberof GetPathFiles
     */
    savePath(path: string): void {
        this.paths.push(path);
    }

}

export default GetPathFiles;