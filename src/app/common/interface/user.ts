export interface IUser {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    permission: number;
}

export interface IHobby {
    id: string;
    name: string;
}

export interface IRole {
    id: string;
    name: string;
    permission: number;
}
