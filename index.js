const express = require('express');
const bodyParser = require('body-parser');
const app = express();

app.set('views', './views')
app.set('view engine', 'pug')

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static('public'));
app.use((req, res, next) => {
   console.log(req.method + " " + req.path +" " + req.ip);
   next();  
});

app.get('/', (req, res) => {
	res.send(`<a href="/pug">hello pug</a><br />
  <a href="/test">hello test</a>`);
});

app.listen(3000, () => console.log('server started'));

app.get('/pug', function (req, res) {
  res.render('index', { title: 'Hey', message: 'Hi there!' })
})

app.get('/test', function (req, res, next) {
  console.log('hello test')
  next()
  res.send( 'Hello test' )
});