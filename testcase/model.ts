export interface IHuman {
    name: string;
    dateOfBirth: string;
    sex: "male" | "female";
    address?: string;
}

export interface IEmployee extends IHuman {
    eId: string;
    address: string;
    position: string;
}

export interface IDevice {
    id: string;
    model: string;
}

export type Contact = {
    name: string;
    type: string;
    info: string;
}