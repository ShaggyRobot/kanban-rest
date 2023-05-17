"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BoardsService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const jwt_1 = require("@nestjs/jwt");
const typeorm_2 = require("typeorm");
const boards_entity_1 = require("./boards.entity");
const users_entity_1 = require("../users/users.entity");
const getUniqueByProp = (arr, prop) => [
    ...new Map(arr.map((obj) => [obj[prop], obj])).values(),
];
let BoardsService = class BoardsService {
    constructor(boardsRepository, userRepository, jwt) {
        this.boardsRepository = boardsRepository;
        this.userRepository = userRepository;
        this.jwt = jwt;
    }
    async isExist(id) {
        const resp = await this.boardsRepository.findOne({ where: { id } });
        if (!resp) {
            throw new common_1.HttpException('Board not found!', common_1.HttpStatus.NOT_FOUND);
        }
        return !!resp;
    }
    async getAll(token) {
        try {
            const { userId } = this.jwt.decode(token);
            const ownBoards = await this.boardsRepository.find({
                where: [
                    {
                        userId,
                    },
                    {
                        userId: (0, typeorm_2.IsNull)(),
                    },
                ],
            });
            const sharedBoards = await this.userRepository
                .createQueryBuilder()
                .relation(users_entity_1.User, 'sharedBoards')
                .of({ id: userId })
                .loadMany();
            const allBoards = ownBoards.concat(sharedBoards);
            return getUniqueByProp(allBoards, 'id');
        }
        catch (error) {
            throw new common_1.HttpException('Can not get boards.', common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async getById(id) {
        const board = await this.boardsRepository
            .createQueryBuilder('boards')
            .where({ id })
            .select([
            'boards.userId',
            'boards.id',
            'boards.title',
            'boards.description',
            'columns.id',
            'columns.title',
            'columns.order',
            'tasks.id',
            'tasks.title',
            'tasks.order',
            'tasks.description',
            'tasks.userId',
            'files.filename',
            'files.fileSize',
            'shared.id',
            'shared.login',
        ])
            .leftJoin('boards.columns', 'columns')
            .leftJoin('columns.tasks', 'tasks')
            .leftJoin('tasks.files', 'files')
            .leftJoin('boards.sharedWith', 'shared')
            .getOne();
        if (!board) {
            throw new common_1.HttpException('Board not found!', common_1.HttpStatus.NOT_FOUND);
        }
        return board;
    }
    async create(boardDto, token) {
        const board = new boards_entity_1.Board();
        const { userId } = this.jwt.decode(token);
        board.title = boardDto.title;
        board.description = boardDto.description;
        board.userId = userId;
        board.sharedWith = [];
        try {
            const modelBoard = await this.boardsRepository.save(board);
            return modelBoard;
        }
        catch (error) {
            throw new common_1.HttpException('Can not save board to DB.', common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async remove(id) {
        const board = (await this.boardsRepository.findOne({ where: { id } }));
        if (!board) {
            throw new common_1.HttpException('Board not found!', common_1.HttpStatus.NOT_FOUND);
        }
        await board.remove();
    }
    async update(id, body) {
        const shared = body.sharedWith ? body.sharedWith : [];
        const board = (await this.boardsRepository.findOne({ where: { id } }));
        const sharedWith = await this.userRepository.find({
            where: {
                login: (0, typeorm_2.In)(shared),
            },
        });
        if (!board) {
            throw new common_1.HttpException('Board not found!', common_1.HttpStatus.NOT_FOUND);
        }
        board.title = body.title;
        board.description = body.description;
        board.sharedWith = sharedWith;
        const data = await board.save();
        return data;
    }
};
BoardsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(boards_entity_1.Board)),
    __param(1, (0, typeorm_1.InjectRepository)(users_entity_1.User)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        jwt_1.JwtService])
], BoardsService);
exports.BoardsService = BoardsService;
