import { IProfile } from "../user/user.interface";

export interface userAuth {
    email: string;
    password: string;
    profile?: IProfile;
}