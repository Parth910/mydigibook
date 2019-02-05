var mongoose =require("mongoose"),
    passportlocalmongoose = require("passport-local-mongoose");
var luserShcema = mongoose.Schema({
    username:String,
    password : String
});

luserShcema.plugin(passportlocalmongoose);

module.exports =mongoose.model("User",luserShcema);