var express = require('express');
var app = express();



const path = require('path');
var dotenv = require('dotenv');
dotenv.config({path : './config.env'});
var db = require('./config/databases');

db.sync();



// Auth and routes


const bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({ extended: true }));

require('./routes/routes')(express,app);


app.listen(process.env.NODE_PORT, () => {
    console.log('Starting server Node.js on port:' + process.env.NODE_PORT)
})