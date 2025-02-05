const mongoose = require("mongoose");

const mongoURL = 'mongodb://127.0.0.1:27017/hotels';
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