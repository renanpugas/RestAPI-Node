const mongoose = require("mongoose");

const usuarioSchema = new mongoose.Schema({
    nome: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
    },
    celular: {
        type: String,
        required: true,
        minlength: 9
    },
    senha: {
        type: String,
        required: true,
        minlength: 6,
        trim: true
    }
});

const Usuario = mongoose.model("Usuario", usuarioSchema);

module.exports = Usuario;