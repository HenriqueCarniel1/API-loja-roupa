"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const bcrypt = require('bcrypt');
const db = require('../config/db.config');
class UsuariosController {
    validarCamposEmBranco(req, res) {
        const { nome, email, senha } = req.body;
        if (!nome || !email || !senha) {
            res.status(400).json({ msg: "Preencha todos os campos" });
            return false;
        }
        return true;
    }
    criarConta(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            let { nome, email, senha } = req.body;
            const senhaCriptografada = yield bcrypt.hash(senha, 12);
            const sql = `
        INSERT INTO cliente (nome, email, senha)
        VALUES ($1, $2, $3);
      `;
            db.query(sql, [nome, email, senhaCriptografada], (err, result) => {
                if (err) {
                    console.log(err);
                    return res.status(500).json({ error: 'Erro ao criar a conta' });
                }
                else {
                    console.log(result);
                    return res.status(201).json({ msg: 'Conta criada com sucesso!' });
                }
            });
        });
    }
    login(req, res) {
        const { email, senha } = req.body;
        if (!this.validarCamposEmBranco(req, res))
            return;
    }
}
module.exports = new UsuariosController();
