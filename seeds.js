var mongoose = require("mongoose"),
    book = require("./Association/models/books"),
    data = [
        {
            title: "Written by parth",
            author: "Parth",
            image: "https://i.ytimg.com/an_webp/FLVpM-dHIm8/mqdefault_6s.webp?du=3000&sqp=CIrikOIF&rs=AOn4CLBkaHD0yGm8osP4Q7xhgu9CG2Vp-w",
            body: "nothing is impossible"
        },
        {
            title: "Wen by parth",
            author: "Parth",
            image: "https://i.ytimg.com/an_webp/FLVpM-dHIm8/mqdefault_6s.webp?du=3000&sqp=CIrikOIF&rs=AOn4CLBkaHD0yGm8osP4Q7xhgu9CG2Vp-w",
            body: "nothing is iible"
        },
        {
            title: "Writtparth",
            author: "Parth",
            image: "https://i.ytimg.com/an_webp/FLVpM-dHIm8/mqdefault_6s.webp?du=3000&sqp=CIrikOIF&rs=AOn4CLBkaHD0yGm8osP4Q7xhgu9CG2Vp-w",
            body: "nothing is iossible"
        }
    ],
    Comment=require("./Association/models/comment");

function seedDB() {
    book.remove({}, function (err, books) {
        if (err) {
            console.log(err);

        } else {
            console.log("books are successfully removed");
            data.forEach(function (seed) {
                book.create(seed, function (err, book) {
                    if (err) {
                        console.log(err);
                    }else{
                        console.log("sucssesfully add");
                        Comment.create({
                            com:"Hello",
                            writtenby:"parth"
                        },function(err,comments){
                            if(err){
                                console.log(err);
                                
                            }else{
                                book.comments.push(comments);
                                book.save();
                                console.log("comment is created");
                                
                            }
                        })
                    }
        
                })
            })
        }
    });
    
}

module.exports = seedDB;

