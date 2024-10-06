"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const Router = express_1.default.Router();
// Controllers
const UserController = require('../controller/UserController');
Router.post('/register/usuario', UserController.criarConta);
Router.post('/login/usuario', UserController.login);
module.exports = Router;
