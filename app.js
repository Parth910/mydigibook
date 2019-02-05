var bodyParser = require("body-parser"),
    methodOverride = require("method-override"),
    mongoose = require("mongoose"),
    express = require("express"),
    app = express(),
    Comment = require("./Association/models/comment"),
    passport = require("passport"),
    localstrategy = require("passport-local"),
    passportLocalMongoose = require("passport-local-mongoose"),
    User = require("./Association/models/luser");


mongoose.connect("mongodb://localhost/my_first_appnext", { useNewUrlParser: true });
app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(methodOverride('_method'));
app.use(require("express-session")({
    secret: "Hello",
    resave: false,
    saveUninitialized: false
}));
passport.use(User.createStrategy());
passport.use(new localstrategy(User.authenticate()));
app.use(passport.initialize());
app.use(passport.session());
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());
app.use(function(req,res,next){
    res.locals.curruser=req.user;
    next();
});
var book = require("./Association/models/books"),
    seedDB = require("./seeds");

// seedDB();
app.get("/", function (req, res) {

    res.redirect("/books");

});

app.get("/books", function (req, res) {
    book.find({}, function (err, books) {
        if (err) {
            console.log("error");
        } else {
            res.render("books/index", { books: books,curruser:req.user });
        }
    })

});

app.get("/books/new", function (req, res) {
    res.render("books/new");
});

app.get("/books/:id", function (req, res) {


    book.findById(req.params.id).populate("comments").exec(function (err, showbook) {
        if (err) {
            res.send("error occured while showing database");

        } else {
            res.render("books/show", { book: showbook });
        }

    });
});

app.post("/books", function (req, res) {
    book.create(req.body.book, function (err, newBook) {
        if (err) {
            res.send("New book is not created!!!!XD");
        }
        else {
            res.redirect("/books");
        }
    });
});

app.get("/books/:id/edit", function (req, res) {

    book.findById(req.params.id, function (err, showbook) {
        if (err) {
            res.send("error occured while showing database");

        } else {
            res.render("books/edit", { book: showbook });
        }

    });
});
app.put("/books/:id", function (req, res) {
    book.findByIdAndUpdate(req.params.id, req.body.book, function (err, updatedbook) {
        if (err) {
            res.send("there is an errr");
        }
        else {
            res.redirect("/books/" + req.params.id);
        }
    });
});
app.delete("/books/:id", function (req, res) {
    book.findByIdAndDelete(req.params.id, function (err, deletebook) {
        if (err) {
            res.redirect("/books");
        } else {
            res.redirect("/books");
        }
    });
});

app.get("/books/:id/comments/new",isLoggedIn, function (req, res) {
    book.findById(req.params.id, function (err, combook) {
        if (err) {
            console.log(err);

        } else {

            res.render("comments/newcom", { book: combook });

        }
    })


});
app.post("/books/:id/comments",isLoggedIn, function (req, res) {
    book.findById(req.params.id).populate("comments").exec(function (err, book) {
        if (err) {
            console.log(err);
            res.redirect("/books");

        } else {
            Comment.create(req.body.comment, function (err, comment) {
                if (err) {
                    console.log(err);

                } else {
                    book.comments.push(comment);
                    book.save();
                    res.redirect('/books/' + book._id);
                }
            })

        }
    })
});
app.get("/register", function (req, res) {
    res.render("auth/register");
});
app.post("/register", function (req, res) {
    var newUser = new User({ username: req.body.username });
    User.register(newUser, req.body.password, function (err, user) {
        if (err) {
            console.log(err);
            return res.render("auth/register");

        }
        passport.authenticate("local")(req, res, function () {
            res.redirect("/books");
        })
    })
})
app.get("")

app.get("/login", function (req, res) {
    res.render("auth/login")
});
app.post("/login", passport.authenticate("local", {
    successRedirect: "/books",
    failureRedirect: "/login"
}), function (req, res) {


});
app.get("/logout",function(req,res){
    req.logOut();
    res.redirect("/books");
})
function isLoggedIn(req,res,next){
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect("/login");
}

app.listen(port);
