var mongoose = require("mongoose");
var bookblogSchema = new mongoose.Schema({
    title: String,
    author: String,
    image: String,
    body: String,
    releaseDate: { type: Date, default: Date.now },
    comments: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Comment"
        }
    ]

});
module.exports = mongoose.model("book", bookblogSchema);


