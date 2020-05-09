const express = require('express');
const bodyParser = require('body-parser');
const app = express();

app.set('views', './views')
app.set('view engine', 'pug')

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static('public'));
app.use((req, res, next) => {
   console.log(req.method + "----->" + req.path +"----->" + req.ip);
   next();  
});

app.get("/", function(req,res){
    res.render("index.pug",{"title":"Lahoot-Home"})
})

app.get("/games", function(req,res){
    res.render("index.pug",{"title":"Lahoot-Games"})
})

app.get("/register", function(req,res){
    res.render("index.pug",{"title":"Lahoot-Register"})
})

app.post("/login", function(req,res){
    res.render("index.pug",{"title":"Lahoot-Login"})
})

app.listen(3000 , function(){
    console.log("The Server is Started")
});