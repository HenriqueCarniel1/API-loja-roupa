const express = require('express');
const app = express();
const cors = require('cors');
const routes = require('../routes/routes')
const porta:number = 3000;

app.use(express.urlencoded({extended:true}));
app.use(cors());
app.use(express.json());
app.use(routes);


app.listen(porta, () => {
    console.log(`Servidor rodando  http://localhost:${porta}`);
  });