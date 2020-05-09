const express = require('express');
const bodyParser = require('body-parser');
const db = require("./models/model")
const PORT = process.env.PORT || 3000;
const app = express();

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

app.get("/games", function (req, res) {
    res.render("games.pug", { "title": "Lahoot-Games" })
})

app.get("/register", function (req, res) {
    res.render("register.pug", { "title": "Lahoot-Register" })
})

app.post("/login", function (req, res) {
    res.render("login.pug", { "title": "Lahoot-Login" })
})

app.listen(PORT, function () {
    console.log(`The Server is Started @ ${PORT}`)
});