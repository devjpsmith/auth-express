import { Request } from 'express';

export type UserRequest = Request & {
    user: User;
};

export type User = {
    permissions: string[];
};