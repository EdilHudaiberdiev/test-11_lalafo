import { Model } from 'mongoose';

export interface UserFields {
    username: string;
    displayName: string;
    phone: string;
    password: string;
    token: string;
}

interface UserMethods {
    checkPassword(password: string): Promise<boolean>;
    generateToken(): void;
}

type UserModel = Model<UserFields, unknown, UserMethods>;