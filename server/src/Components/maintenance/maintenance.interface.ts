export interface IMaintenance {
    id: number;
    status: boolean;
    translation?: IMaintenanceTranslation[];
}

interface IMaintenanceTranslation {
    message: string;
    language: string;
}

export interface IConfigMaintenance {
    message: string;
    language: string;
}