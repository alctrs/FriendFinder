//Dependencies
// packages

var express = require('express');
var bodyParser = require('body-parser');
var path = require ("path");

//EXPRESS CONFIGURATION
// set up express server

var app = express();

var PORT = process.env.PORT ||8080;

//sets ups express  app to handle data parsing

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(bodyParser.text());

//ROUTER
require("./routing/apiRoutes")(app);
require("./routing/htmlRoutes")(app);

//LISTER

app.listen(PORT, function() {
    console.log("App listening on PORT: " + PORT);
  });