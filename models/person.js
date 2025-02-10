const { default: mongoose } = require("mongoose");
const Mongoose  = require("mongoose");
const bcryptjs = require("bcryptjs")
const personSchema =new Mongoose.Schema({
    name:{
        type: String,
        required: true,
    },
     age:{
        type: Number,
        required: true,
     },
     work:{
        type: String,
        enum:['chef', 'waiter', 'manager'],
        required: true,
     },
     mobile:{
        type:Number,
        required: true,
     },
     email:{
        type: String,
     },
     salary:{
        type: Number,
        required: true
     },
     username:{
      type: String,
      required: true
     },
     password:{
      type: Number,
      required: true
     }
});
// personSchema.pre('save', async function (next) {
//    const person = this;
//    if(!person.isModified('password')) return next();
//    try{
//       const salt = await bcryptjs.genSalt(10);
//       next();
//    }
//    catch(err){
//       // res.json(500).json({error: "Internal server error"})
//    }
// })

const person = mongoose.model('Person', personSchema);

module.exports = person;
