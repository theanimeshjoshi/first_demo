const express = require("express");
const router = express.Router();
const person = require('../models/person')

router.get("/", (req, res)=>{
    res.send("hey from the server")
});

router.post("/", async (req, res)=>{
    try{
        const data = req.body;
    const newPeron = new person(data);
    const response = await newPeron.save();
    console.log("data saved successfully");
    res.status(200).json(response);
    }
    catch(err){
        console.log(err);
        res.status.json(500)({error: "internal server error"})
    }
});

router.get("/people", async (req, res)=>{
    try{
        const response = await person.find();
        console.log("data fetched");
        res.status(200).json(response);
    }
    catch(err){
        res.status(500).json({error: "internal server error"});
    }
});

router.get('/:work', async (req, res)=>{
    try{
        const data = req.params.work;
    const response = await person.find({work: data});
    res.status(200).json(response);
    }
    catch(err){
        res.status(500).json({error: "internal server error"});
    }
});

router.put('/:id', async (req, res)=>{
    try{
        const personId = req.params.id;
        const updatedPersonData = req.body;
        const response = await person.findByIdAndUpdate(personId, updatedPersonData,{
            new: true,
            runValidators: true
        });
        console.log("data updated");
        res.status(200).json(response);
    }
    catch(err){
        res.status(500).json({error: "internal server error"})
    }
});

router.delete('/:id', async (req, res)=>{
    try{
        const personId = req.params.id;
        const response = await person.findByIdAndDelete(personId);
        console.log("entry successfully deleted")
    }
    catch(err){
        res.status(500).json({error: "internal server error"});
    }
});

module.exports = router;