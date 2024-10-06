import express from 'express';

const Router = express.Router();

// Controllers
const UserController = require('../controller/UserController');

Router.post('/register/usuario', UserController.criarConta);
Router.post('/login/usuario', UserController.login);


module.exports = Router;
