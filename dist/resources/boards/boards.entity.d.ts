import { BaseEntity } from 'typeorm';
import { Task } from '../tasks/tasks.entity';
import { User } from '../users/users.entity';
import { CreateColumnDto } from '../columns/dto/create-column.dto';
export interface IColumn {
    id: UUIDType;
    title: string;
    order: number;
}
export interface IBoard {
    id: UUIDType;
    title: string;
    description: string;
    shared?: Array<User>;
}
export declare class Board extends BaseEntity {
    id: UUIDType;
    user: string;
    userId: string | null;
    title: string;
    description: string;
    columns: CreateColumnDto[];
    tasks: Task[];
    sharedWith: User[];
}
