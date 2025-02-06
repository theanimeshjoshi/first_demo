const express = require("express");
const router = express.Router();
const Person = require("../models/personModel");
const { body, param, validationResult } = require("express-validator");

const asyncHandler = (fn) => (req, res, next) => {
    Promise.resolve(fn(req, res, next)).catch(next);
};

const validate = (validations) => async (req, res, next) => {
    await Promise.all(validations.map(validation => validation.run(req)));
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    next();
};

router.get("/", (req, res) => {
    res.status(200).send("Hey from the server");
});

router.post(
    "/",
    validate([
        body("name").isString().notEmpty(),
        body("age").isInt({ min: 0 }),
        body("work").isString().notEmpty(),
    ]),
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
    validate([param("work").isString().notEmpty()]),
    asyncHandler(async (req, res) => {
        const { work } = req.params;
        const response = await Person.find({ work });
        res.status(200).json(response);
    })
);

router.put(
    "/:id",
    validate([
        param("id").isMongoId(),
        body("name").optional().isString(),
        body("age").optional().isInt({ min: 0 }),
        body("work").optional().isString(),
    ]),
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
    validate([param("id").isMongoId()]),
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
