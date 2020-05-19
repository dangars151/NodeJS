const express = require('express');
// var socketio = require('socket.io')
const app = express();
const port = 3000;
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser')
var session = require('express-session');
var path = require('path');
var https = require('https');
var fs = require('fs');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded( {extended: true} ));
app.use(cookieParser())

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

var options = {
    key: fs.readFileSync(path.join(__dirname, '/keys/key.pem')),
    cert: fs.readFileSync(path.join(__dirname, '/keys/cert.pem'))
};
https.createServer(options, app).listen(443);
// var io = socketio(server);