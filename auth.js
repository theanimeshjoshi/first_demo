const passport  = require("passport");
const LocalStrategy  = require("passport-local").Strategy;
const person = require('./models/person');
const personRoutes = require('./routes/personRoutes');

passport.use(new LocalStrategy (async(username, password, done)=>{
    try{
    console.log("Credentials received: ", username, password);
    const user =await person.findOne({username : username});
    
    if (!user)
        return done(null, false, {message: "invalid username"});

    const isPasswordMatched = user.password === password ? true : false;
    if(isPasswordMatched){
        return done(null, user);
    }else{
        return done(null, false,{message: "Invalid username"})
    }
}
    catch(err){
        return done(err);
    }
}));

module.exports = passport;
