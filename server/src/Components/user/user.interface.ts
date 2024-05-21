import {IRole} from "../role/role.interface";

export interface IUser {
    id?: number;
    email: string;
    createdAt?: Date;
    updatedAt?: Date;
    role?:{
        role: IRole;
    };
    profile?: IProfile;   
    password?: string;
    active?: boolean;
    isAdmin?: boolean;
}

export interface IProfile {
    lastName: string;
    firstName: string;
    languagePref?: string;
}