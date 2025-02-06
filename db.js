const mongoose = require("mongoose");
require('dotenv').config();
// const mongoURL = 'mongodb://127.0.0.1:27017/hotels';
const mongoURL = process.env.DB_URL;
mongoose.connect(mongoURL);
const db = mongoose.connection;

db.on("connected", ()=>{
    console.log("mongodb connected");
})

db.on("error", (err)=>{
    console.log("error occured" + err);
})
db.off("disconnected", ()=>{
    console.log("mongodb disconnected");
})

module.exports = db;