export interface ISettingsAdmin {
    id?: number;
    mailAdmin?: IMailAdmin;
    createdAt?: Date;
    updatedAt?: Date;

}

export interface IMailAdmin {
    id?: number;
    name?: string;
    emailAdmin: string;
    email: string;
    password: string;
    service: string;
    settingsAdminId: number;
    createdAt?: Date;
    updatedAt?: Date;
}