const mongoose = require("mongoose");

// const mongoURL = 'mongodb://127.0.0.1:27017/hotels';
const mongoURL = 'mongodb+srv://animeshjoshi0404:wLIND2n6Ryo307In@cluster0.gesh8.mongodb.net/'
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