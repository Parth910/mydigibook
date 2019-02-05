var mongoose =require("mongoose");
var commentSchema =mongoose.Schema({
    com:String,
    writtenby:String
});


module.exports =mongoose.model("Comment",commentSchema);