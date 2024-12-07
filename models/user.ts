interface IUserGetbyDTO {
    id?:number,
    organization?:number,
    username: string;
    email: string;
    inviteLink: string;
}

interface ICreateUserPayload {
    username: string;
    email: string;
    password: string;
}

export type {
    IUserGetbyDTO,
    ICreateUserPayload
}