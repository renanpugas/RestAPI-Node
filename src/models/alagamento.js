const mongoose = require("mongoose");

const alagamentoSchema = new mongoose.Schema({
    rua: {
        type: String,
        required: true
    },
    cidade: {
        type: String,
        required: true
    },
    estado: {
        type: String,
        required: true
    },
    email_criador: {
        type: String,
        required: true
    }
});

const Alagamento = mongoose.model("Alagamento", alagamentoSchema);

module.exports = Alagamento;