const express = require("express");
const Usuario = require("./../src/models/usuario");

const router = new express.Router();

router.get("/usuarios/:id", async (req, res, next)=>{

    try {
        const usuario = await Usuario.findOne({_id: req.params.id});
        res.status(200).send(usuario);
    } catch(e){
        res.status(404).send(e);
    }

});

router.post("/usuarios", async (req, res, next)=>{

    const usuario = new Usuario(req.body);

    try {
        await usuario.save();
        res.status(201).send(usuario);
    } catch(e){
        res.status(400).send(e);
    }

});

router.patch("/usuarios/:id", (req, res, next)=>{

});

router.delete("/usuarios/:id", async (req, res, next)=>{

    try{
        const user = await Usuario.findOneAndDelete({_id: req.params.id});
        res.status(200).send();
    } catch(e){
        res.status(404).send();
    }

});

module.exports = router;