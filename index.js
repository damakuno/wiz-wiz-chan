const express = require('express');
const bodyParser = require('body-parser');
<<<<<<< HEAD
const db = require("./models/model.js")
const wiz = require('./app/app.js');
=======
const db = require("./models/model")
>>>>>>> 1d1dae235ad876742b02ba648ed0b4594a7107fe
const PORT = process.env.PORT || 3000;
const fs = require("fs")
const app = express();

var countries = fs.readFileSync('./public/text/countries.txt', 'utf-8')
countries = countries.split('\r\n')

app.set('views', './views')
app.set('view engine', 'pug')

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static('public'));
app.use((req, res, next) => {
    console.log("Method: " + req.method + " -----> " + "Path: " + req.path + " -----> " + "Requested IP: " + req.ip);
    next();
});

app.get("/", function (req, res) {
    res.render("home.pug", { "title": "Lahoot-Home" })
})

<<<<<<< HEAD
app.get("/games/:gameId", function (req, res) {
    console.log(req.params);
=======
app.get("/games", function (req, res) {
>>>>>>> 1d1dae235ad876742b02ba648ed0b4594a7107fe
    res.render("games.pug", { "title": "Lahoot-Games" })
})

app.get("/register", function (req, res) {
    res.render("register.pug", { "title": "Lahoot-Register", "countries": countries })
})

app.post("/login", function (req, res) {
    res.render("login.pug", { "title": "Lahoot-Login" })
})

app.listen(PORT, function () {
    console.log(`The Server is Started @ ${PORT}`)
<<<<<<< HEAD

    db.close((err) => {
        if (err)
            console.error(err)
    })
=======
>>>>>>> 1d1dae235ad876742b02ba648ed0b4594a7107fe
});