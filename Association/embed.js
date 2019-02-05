var mongoose = require('mongoose');
mongoose.connect("mongodb://localhost/blod_demo", { useNewUrlParser: true });

var postSchema = new mongoose.Schema({
    title: String,
    content: String
});

var postModal = mongoose.model("postModel", postSchema);


var userSchema = new mongoose.Schema({
    email: String,
    name: String,
    posts: [postSchema]
});

var User = mongoose.model("User", userSchema);


var newUser = new User({
    email: "prp4203@gmail.com",
    name: "Parth"

});

newUser.posts.push({
    title: "Just kidding",
    content: "Kuch ni"
});


newUser.save(function (err, user) {
    if (err) {
        console.log(err);


    } else {
        console.log(user);

    }
});

User.findOne({ name: "parth" }, function (err, user) {

    if (err) {
        console.log(err);
        
    }else
    {
        newUser.posts.push({
            title:"second one",
            content:"second content"
        });
        newUser.save(function(err,user){
            if(err){
                console.log(err);
                
            }
            else{
                console.log(user);
                
            }
        });
    }
});

// var newPost = new postModal({
//     title: "nothing",
//     content: "yeye"
// });

// newPost.save(function (err, post) {

//     if (err) {
//         console.log(err);

//     }
//     else {
//         console.log(post);

//     }
// });