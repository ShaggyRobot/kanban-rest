import { BaseEntity } from 'typeorm';
import { Board } from '../boards/boards.entity';
export interface ILogin {
    login: string;
    password: string;
}
export interface IUser {
    name: string;
    login: string;
    password: string;
}
export interface IUserNoId {
    id: UUIDType;
    name: string;
    login: string;
}
export declare class User extends BaseEntity {
    id: UUIDType;
    name: string;
    login: string;
    password: string;
    tasks: string;
    boards: string;
    sharedBoards: Board[];
}
