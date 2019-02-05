var mongoose = require('mongoose');
mongoose.connect("mongodb://localhost/blod_demo_1", { useNewUrlParser: true });


var Post =require("./models/post.js");
var User =require("./models/user.js");

// Post.create({
//     title:"nothing is impossblefg",
//     content:"what you are expectingffb"
// },function(err,post){
//     User.findOne({email:"dfrst@ssrt.com"},function(err,founduser){
//         if(err){
//             console.log(err);
            
//         }else{
//             founduser.posts.push(post);
//             founduser.save(function(err,data){
//                 if(err){
//                     console.log(err);
                    
//                 }else{
//                     console.log(data);
                    
//                 }
//             })
//         }
//     })

// })

// User.create({
//     email:"dfrst@ssrt.com",
//     name:"Horminei"
// })

User.findOne({email:"dfrst@ssrt.com"}).populate("posts").exec(function(err,data){
    if(err){
        console.log(err);
        
    }else{
        console.log(data);
        
    }
})