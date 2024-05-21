module.exports = {
    apps: [
        {
            name: "server-site-margaux",
            script: "./dist/server.js",
            instances: "1", // 'max' will spawn as many instances as there are CPU cores
            exec_mode: "cluster", // Enable cluster mode
            env_production: {
                NODE_ENV: "production",
            },
            env_development: {
                NODE_ENV: "development",
            },
            env_local: {
                NODE_ENV: "local",
            },
        },
    ],
};
