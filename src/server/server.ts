const express = require('express');
const app = express();
const cors = require('cors');
const porta:number = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));



app.listen(porta, () => {
    console.log(`Servidor rodando na porta ${porta}`);
  });