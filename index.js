//require functionalities
const express = require("express");
const db = require('./db');
const person = require('./models/person');
const bodyParser = require("body-parser");
const app = express();
app.use(bodyParser.json());
require("dotenv").config();


const personRoutes = require('./routes/personRoutes');


app.use('/person', personRoutes);


const PORT = process.env.PORT || 3000;

app.listen(PORT, ()=> {console.log("server started")});