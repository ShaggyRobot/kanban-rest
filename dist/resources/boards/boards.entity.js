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
Object.defineProperty(exports, "__esModule", { value: true });
exports.Board = void 0;
const swagger_1 = require("@nestjs/swagger");
const typeorm_1 = require("typeorm");
const tasks_entity_1 = require("../tasks/tasks.entity");
const columns_entity_1 = require("../columns/columns.entity");
const users_entity_1 = require("../users/users.entity");
let Board = class Board extends typeorm_1.BaseEntity {
};
__decorate([
    (0, swagger_1.ApiProperty)({ example: '9a111e19-24ec-43e1-b8c4-13776842b8d5', description: 'ID Board' }),
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], Board.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => users_entity_1.User, (user) => user.tasks, { onDelete: 'SET NULL', onUpdate: 'CASCADE' }),
    (0, typeorm_1.JoinColumn)({ name: 'userId' }),
    __metadata("design:type", String)
], Board.prototype, "user", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: '40af606c-c0bb-47d1-bc20-a2857242cde3', description: 'ID of the User who owns the Board' }),
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", Object)
], Board.prototype, "userId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Homework tasks', description: 'Board title' }),
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Board.prototype, "title", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'My board tasks', description: 'Board description' }),
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Board.prototype, "description", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => columns_entity_1.Column, (column) => column.board, { onDelete: 'CASCADE', onUpdate: 'CASCADE' }),
    __metadata("design:type", Array)
], Board.prototype, "columns", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => tasks_entity_1.Task, (task) => task.board, { onDelete: 'CASCADE', onUpdate: 'CASCADE' }),
    __metadata("design:type", Array)
], Board.prototype, "tasks", void 0);
__decorate([
    (0, typeorm_1.ManyToMany)(() => users_entity_1.User, (user) => user.sharedBoards),
    (0, typeorm_1.JoinTable)(),
    __metadata("design:type", Array)
], Board.prototype, "sharedWith", void 0);
Board = __decorate([
    (0, typeorm_1.Entity)('boards')
], Board);
exports.Board = Board;
