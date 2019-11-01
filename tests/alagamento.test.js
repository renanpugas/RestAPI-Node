const request = require("supertest");
const mongoose = require("mongoose");
const app = require("./../app");
const Usuario = require("./../src/models/usuario");
const Alagamento = require("./../src/models/alagamento");

const usuarioID = new mongoose.Types.ObjectId();
const alagamentoID = new mongoose.Types.ObjectId();

beforeAll(async ()=>{
    
    await Usuario.deleteMany();
    await Alagamento.deleteMany();

    const usuario = new Usuario({
        nome: "Ronaldo",
        email: "ronaldo@example.com",
        celular: "123456789",
        senha: "123456",
        _id: usuarioID
    });
    
    await usuario.save();

    await new Alagamento({
        rua: "Avenida Paulista",
        cidade: "São Paulo",
        estado: "São Paulo",
        email_criador: usuario.email,
        _id: alagamentoID
    }).save();

});

test("Deve cadastrar ponto de alagamento", async ()=>{

    const alagamento = new Alagamento({
        rua: "Avenida Globo",
        cidade: "São Paulo",
        estado: "São Paulo",
        email_criador: "ronaldo@example.com"
    });

    await request(app)
        .post("/alagamentos")
        .send(alagamento)
        .expect(201);

});

describe("Deve buscar  alagamentos", ()=>{

    test("Deve pegar dados de um alagamento especifíco", async ()=>{

        const res = await request(app)
            .get(`/alagamentos/${alagamentoID}`)
            .send()
            .expect(200);
    
    });

    test("Deve buscar alagamentos de uma cidade", async ()=>{

        const res = await request(app)
            .get(`/alagamentos?cidade=São Paulo`)
            .send()
            .expect(200);

    });

    test("Deve buscar alagamentos de um estado", async ()=>{

        const res = await request(app)
            .get(`/alagamentos?estado=São Paulo`)
            .send()
            .expect(200);

    });

    test("Deve buscar alagamentos de uma rua", async ()=>{

        const res = await request(app)
            .get(`/alagamentos?rua=Avenida Paulista`)
            .send()
            .expect(200);

    });

    test("Deve buscar alagamentos cadastrados por um usuário", async ()=>{

        const res = await request(app)
            .get(`/alagamentos?email=ronaldo@example.com`)
            .send()
            .expect(200);
            
    });
    

});


test("Deve excluir alagamento", async ()=>{

    await request(app)
        .delete(`/alagamentos/${alagamentoID}`)
        .send()
        .expect(200)

});