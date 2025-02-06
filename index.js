//require functionalities
const express = require("express");
const db = require('./db');
const person = require('./models/person');
const bodyParser = require("body-parser");
const app = express();
app.use(bodyParser.json());
require("dotenv").config();
const passport  = require("passport");
const LocalStrategy  = require("passport-local").Strategy;
const auth = require("./auth");

const logRequest = (req, res, next) => {
    console.log(`[${Date().toString()}] Request made to: ${req.originalUrl}`);
    next();
}

const localAuthMiddleware = passport.authenticate('local',{session: false});
console.log(localAuthMiddleware,"<<<<localAuthMiddleware")
app.get('/', localAuthMiddleware,(req, res) =>{
    res.json("hey from the server");
});

const personRoutes = require('./routes/personRoutes');

app.use(logRequest);
app.use('/person', personRoutes);

app.use(passport.initialize());

const PORT = process.env.PORT || 3000;

app.listen(PORT, ()=> {console.log("server started")});