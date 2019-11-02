const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

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

usuarioSchema.statics.login = async (email, senha)=>{

    const usuario = await Usuario.findOne({ email });

    if(!usuario){
        throw new Error("Dados incorretos");
    }

    const isMatch = bcrypt.compare(senha, usuario.senha);

    if(!isMatch){
        throw new Error("Dados incorretos");
    }

    return usuario;

};

usuarioSchema.pre("save", async function(next){

    const usuario = this;

    usuario.senha = await bcrypt.hash(usuario.senha, 8);

    next();

});

const Usuario = mongoose.model("Usuario", usuarioSchema);

module.exports = Usuario;