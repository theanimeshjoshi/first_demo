const express = require("express");
const router = express.Router();
const Person = require("../models/personModel");


const asyncHandler = (fn) => (req, res, next) => {
    Promise.resolve(fn(req, res, next)).catch(next);
};


router.get("/", (req, res) => {
    res.status(200).send("Hey from the server");
});


router.post(
    "/",
    asyncHandler(async (req, res) => {
        const data = req.body;
        const newPerson = new Person(data);
        const response = await newPerson.save();
        console.log("Data saved successfully");
        res.status(201).json(response);
    })
);


router.get(
    "/people",
    asyncHandler(async (req, res) => {
        const response = await Person.find();
        console.log("Data fetched successfully");
        res.status(200).json(response);
    })
);

router.get(
    "/:work",
    asyncHandler(async (req, res) => {
        const { work } = req.params;
        const response = await Person.find({ work });
        res.status(200).json(response);
    })
);


router.put(
    "/:id",
    asyncHandler(async (req, res) => {
        const { id } = req.params;
        const updatedPersonData = req.body;
        const response = await Person.findByIdAndUpdate(id, updatedPersonData, {
            new: true,
            runValidators: true,
        });
        if (!response) {
            return res.status(404).json({ error: "Person not found" });
        }
        console.log("Data updated successfully");
        res.status(200).json(response);
    })
);


router.delete(
    "/:id",
    asyncHandler(async (req, res) => {
        const { id } = req.params;
        const response = await Person.findByIdAndDelete(id);
        if (!response) {
            return res.status(404).json({ error: "Person not found" });
        }
        console.log("Entry successfully deleted");
        res.status(200).json({ message: "Person deleted successfully" });
    })
);


router.use((err, req, res, next) => {
    console.error("Error:", err.message);
    res.status(500).json({ error: "Internal server error" });
});

module.exports = router;