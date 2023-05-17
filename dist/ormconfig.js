"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
const path_1 = __importDefault(require("path"));
dotenv_1.default.config({
    path: path_1.default.join(__dirname, '.env'),
});
exports.default = {
    type: 'postgres',
    cache: false,
    url: process.env.PGDB_URL,
    synchronize: false,
    logging: false,
    ssl: {
        rejectUnauthorized: false,
    },
    entities: ['src/resources/**/**.entity{.ts,.js}'],
    migrations: ['./migrations/*.ts'],
};
