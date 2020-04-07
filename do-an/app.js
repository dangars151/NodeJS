const express = require('express');
// var socketio = require('socket.io')
const app = express();
const port = 3000;
var bodyParser = require('body-parser');
var session = require('express-session');
var path = require('path');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded( {extended: true} ));

app.set('trust proxy', 1);
app.use(session({
    secret: '123456',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }
}))

var route = require(__dirname + "/app/controllers/route.js");
app.use(route);

app.set("views", __dirname + "/app/views");
//app.set('views', path.join(__dirname, 'app/views'));
app.set("view engine", "ejs");

//var path = require('path');
app.use('/public', express.static(path.join(__dirname + '/public')));

app.listen(port, () => console.log(`App listening on port ${port}!`));

// var io = socketio(server);