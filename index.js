//require functionalities
const express = require("express");
const db = require('./db');
const person = require('./models/person')
const bodyParser = require("body-parser")
const app = express();
app.use(bodyParser.json());

//importing routers
const personRoutes = require('./routes/personRoutes')


//using routes
app.use('/person', personRoutes)



app.listen(3000, ()=> {console.log("server started")})