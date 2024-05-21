import { log } from "console";
import GetPathFiles from "../../Utils/GetPathFile";

const seed = async () => {
    const GetFiles = new GetPathFiles();
    const seeds = await GetFiles.init(__dirname + '/..', 'seed', ["userban", "post", "tags", ]);
    log(seeds);
    for (const seed of seeds) {
        await import (seed).then((seedModule) => {
            log(seedModule.default);
            seedModule.default();
        });
    }
};
seed();