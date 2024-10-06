import { Request, Response } from "express";
const bcrypt = require('bcrypt');
const db = require('../config/db.config')
import { QueryResult } from 'pg';

class UsuariosController {

    validarCamposEmBranco(req: Request, res: Response): boolean {
        const { nome, email, senha } = req.body;
        if (!nome || !email || !senha) {
            res.status(400).json({ msg: "Preencha todos os campos" });
            return false;
        }
        return true;
    }

    async criarConta(req: Request, res: Response) {
        let { nome, email, senha } = req.body;

        const senhaCriptografada = await bcrypt.hash(senha, 12);

        const sql = `
        INSERT INTO cliente (nome, email, senha)
        VALUES ($1, $2, $3);
      `;

      db.query(sql, [nome, email, senhaCriptografada], (err: Error, result: QueryResult<any>) => {
        if (err) {
          console.log(err);
          return res.status(500).json({ error: 'Erro ao criar a conta' });
        } else {
          console.log(result);
          return res.status(201).json({ msg: 'Conta criada com sucesso!' });
        }
      });



    }

    login (req: Request, res: Response): void {

        const { email, senha } = req.body;

        if (!this.validarCamposEmBranco(req, res)) return;



    }
}

module.exports = new UsuariosController();