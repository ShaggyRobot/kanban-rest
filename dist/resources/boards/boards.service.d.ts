import { JwtService } from '@nestjs/jwt';
import { Repository } from 'typeorm';
import { CreateBoardDto } from './dto/create-board.dto';
import { UpdateBoardDto } from './dto/update-board.dto';
import { Board, IBoard } from './boards.entity';
import { User } from '../users/users.entity';
export declare class BoardsService {
    private boardsRepository;
    private userRepository;
    private jwt;
    constructor(boardsRepository: Repository<Board>, userRepository: Repository<User>, jwt: JwtService);
    isExist(id: UUIDType): Promise<boolean>;
    getAll(token: string): Promise<IBoard[]>;
    getById(id: UUIDType): Promise<IBoard>;
    create(boardDto: CreateBoardDto, token: string): Promise<IBoard>;
    remove(id: UUIDType): Promise<void>;
    update(id: UUIDType, body: UpdateBoardDto): Promise<IBoard>;
}
