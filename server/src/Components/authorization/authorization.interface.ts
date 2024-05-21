export interface IAuthorizationConfig {
    auth: {
        user: AccessConfig;
        maintenance: AccessConfig;
        post_realization: AccessConfig;
        post_photography: AccessConfig;
        post_text: AccessConfig;
        post_blog: AccessConfig;
        tag: AccessConfig;
        slider: AccessConfig;
        image: AccessConfig;
        settingsAdmin: AccessConfig;
        admin_posts: AccessConfig;
        sendMail: AccessConfig;
    };
}

interface AccessConfig {
    read: string[];
    update: string[];
    write: string[];
    delete: string[];
}