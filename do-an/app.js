const express = require('express')
const app = express()
const port = 3000
var bodyParser = require('body-parser')

app.use(bodyParser.json());
app.use(bodyParser.urlencoded( {extended: true} ));

var route = require(__dirname + "/app/controllers/route.js");
app.use(route);

app.set("views", __dirname + "/app/views");
app.set("view engine", "ejs");

var path = require('path');
app.use('/public', express.static(path.join(__dirname + '/public')));

app.listen(port, () => console.log(`App listening on port ${port}!`))