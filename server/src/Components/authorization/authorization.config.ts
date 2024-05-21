import { IAuthorizationConfig } from './authorization.interface';

const authorizationConfig: IAuthorizationConfig = {
    auth: {
        user: {
            read: ["admin"],
            write: ['admin'],
            update: ['admin'],
            delete: ['admin'],
        },
        maintenance: {
            read: ["user", "admin", "guest"],
            update: ['admin'],
            write: ['admin'],
            delete: ['admin'],
        },
        post_photography: {
            read: ['user', 'admin', "guest"],
            update: ['admin'],
            write: ['admin'],
            delete: ['admin'],
        },
        post_blog: {
            read: ['user', 'admin', "guest"],
            update: ['admin'],
            write: ['admin'],
            delete: ['admin'],
        },
        post_realization: {
            read: ['user', 'admin', "guest"],
            update: ['admin'],
            write: ['admin'],
            delete: ['admin'],
        },
        post_text: {
            read: ['user', 'admin', "guest"],
            update: ['admin'],
            write: ['admin'],
            delete: ['admin'],
        },
        tag: {
            read: ['user', 'admin', "guest"],
            update: ['admin'],
            write: ['admin'],
            delete: ['admin'],
        },
        slider: {
            read: ['user', 'admin', "guest"],
            update: ['admin'],
            write: ['admin'],
            delete: ['admin'],
        },
        image: {
            read: ['user', 'admin', "guest"],
            update: ['admin'],
            write: ['admin'],
            delete: ['admin'],
        },
        settingsAdmin: {
            read: ['admin'],
            update: ['admin'],
            write: ['admin'],
            delete: ['admin'],
        },
        admin_posts: {
            read: ['admin'],
            update: ['admin'],
            write: ['admin'],
            delete: ['admin'],
        },
        sendMail: {
            read: [],
            update: [],
            write: ['guest', 'user', 'admin'],
            delete: []
        }
    },
};

export default authorizationConfig;
