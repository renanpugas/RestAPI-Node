const request = require("supertest");
const mongoose = require("mongoose");
const app = require("./../app");
const Usuario = require("./../src/models/usuario");

const usuarioID = new mongoose.Types.ObjectId();

beforeAll(async ()=>{

    await Usuario.deleteMany();

    await new Usuario({
        nome: "Renan",
        email: "renan@example.com",
        celular: "948198080",
        senha: "123456",
        _id: usuarioID
    }).save();

});

test("Deve cadastrar um novo usuário", async ()=>{

    const usuario = new Usuario({
        nome: "Andrew",
        email: "andrew@example.com",
        celular: "8484898987a",
        senha: "123456"
    });

    await request(app)
        .post("/usuarios")
        .send(usuario)
        .expect(201);

});

test("Deve pegar perfil de usuário", async ()=>{

    const res = await request(app)
        .get(`/usuarios/${usuarioID}`)
        .send()
        .expect(200)

});

test("Deve deletar usuário", async()=>{

    await request(app)
        .delete(`/usuarios/${usuarioID}`)
        .send()
        .expect(200)

});