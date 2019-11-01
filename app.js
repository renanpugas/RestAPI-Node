const express = require("express");
require("./src/db/mongoose");

const app = express();

const usuarioRouter = require("./routers/usuario.js");
const alagamentoRouter = require("./routers/alagamento.js");

app.use(express.json());

app.use(usuarioRouter);
app.use(alagamentoRouter);


module.exports = app;