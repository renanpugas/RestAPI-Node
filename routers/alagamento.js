const express = require("express");
const Alagamento = require("./../src/models/alagamento");

const router = new express.Router();

router.get("/alagamentos/:id", async (req, res, next)=>{

    try{ 
        const alagamento = await Alagamento.findOne({ _id: req.params.id });
        res.status(200).send(alagamento);
    } catch(e) {
        res.status(404).send(e);
    }
});

router.get("/alagamentos", async (req, res, next)=>{

    if(!req.query){
        res.send(404);
    } else if(req.query.cidade){

        try {
            const alagamento = await Alagamento.find({ cidade: req.query.cidade });
            res.status(200).send(alagamento);
        } catch(e){
            console.log(e);
            res.status(400).send();
        }

    } else if(req.query.rua){

        try {
            const alagamento = await Alagamento.find({ rua: req.query.rua });
            res.status(200).send(alagamento);
        } catch(e){
            res.status(400).send();
        }

    } else if(req.query.estado){

        try {
            const alagamento = await Alagamento.find({ estado: req.query.estado });
            res.status(200).send(alagamento);
        } catch(e){
            res.status(400).send();
        }

    } else if(req.query.email){

        try {
            const alagamento = await Alagamento.find({ email_criador: req.query.email });
            res.status(200).send(alagamento);
        } catch(e){
            res.status(400).send();
        }

    }

});

router.post("/alagamentos", async (req, res, next)=>{

    try{
        const alagamento = new Alagamento(req.body);
        await alagamento.save();
        res.status(201).send(alagamento);
    } catch(e){
        res.status(400).send(e);
    }

});

router.patch("/alagamentos/:id", (req, res, next)=>{

});

router.delete("/alagamentos/:id", async (req, res, next)=>{

    try{
        const alagamento = await Alagamento.findOneAndDelete(req.params.id);
        res.status(200).send(alagamento);
    } catch(e){
        res.status(400).send(e);
    }
    
});

module.exports = router;