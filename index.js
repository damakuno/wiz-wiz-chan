const express = require("express");
const bodyParser = require("body-parser");
const model = require("./models/model.js");
const wiz = require("./app/app.js");
const PORT = process.env.PORT || 3000;
const fs = require("fs");
const app = express();

var countries = fs.readFileSync("./public/text/countries.txt", "utf-8");
countries = countries.split("\r\n");

model.init();
// let qq = new wiz.QuizQuestion();
// qq.load(1).then((res) => {
//     console.dir(res);
// }).catch(err => console.log(err));
// let qs = new wiz.QuizSet();
// qs.load(1).then ((res) => {
//     console.dir(qs);
// }).catch(err => console.log(err));

app.set("views", "./views");
app.set("view engine", "pug");

app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

app.use(express.static("public"));
app.use((req, res, next) => {
  console.log(
    "Method: " +
      req.method +
      " -----> " +
      "Path: " +
      req.path +
      " -----> " +
      "Requested IP: " +
      req.ip
  );
  next();
});

app.get("/", function (req, res) {
  res.render("home.pug", {
    title: "Lahoot-Home",
  });
});

app.get("/games", function (req, res) {
  console.log(req.params);
  res.render("games.pug", {
    title: "Lahoot-Games",
  });
});

app.get("/games/:roomId", function (req, res) {
  let game = new wiz.Game();
  game
    .load(req.params.roomId)
    .then((game) => {
      if (req.headers["content-type"]) {
        if (req.headers["content-type"].includes("application/json")) {
          // res.setHeader('Content-Type', 'application/json');
          // res.end(JSON.stringify(game));
          res.type("json").send(game);
        } else {
          res.render("games.pug", {
            title: "Lahoot-Games",
            game: game,
          });
        }
      } else {
        res.render("games.pug", {
          title: "Lahoot-Games",
          game: game,
        });
      }
    })
    .catch((err) => {
      console.log(err);
    });
});

app.get("/register", function (req, res) {
  res.render("register.pug", {
    title: "Lahoot-Register",
    countries: countries,
  });
});

app.get("/login", function (req, res) {
  res.render("login.pug", {
    title: "Lahoot-Login",
  });
});

app.post("/login", function (req, res) {
  res.render("login.pug", {
    title: "Lahoot-Login",
  });
});

app.listen(PORT, function () {
  console.log(`The Server is Started @ ${PORT}`);
});
