var express = require("express");
var bodyParser = require("body-parser");
var logger = require("morgan");
var mongoose = require("mongoose");

var PORT = process.env.PORT || 8080;

var app = express();

// Serve static content for the app from the "public" directory in the application directory.
app.use(express.static("public"));

// // Use morgan logger for logging requests
app.use(logger("dev"));

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

// parse application/json
app.use(bodyParser.json());

// Set Handlebars.
var hbs = require("express-handlebars");

app.engine("hbs", hbs({extname: "hbs" ,  defaultLayout: "main" , layoutsDir: __dirname + '/views/layouts/'}));
//app.set('views', path.join(__dirname, 'views'));
app.set("view engine", "hbs");

// Import routes and give the server access to them.
var routes = require("./controllers/controller");

app.use(routes);

mongoose.connect("mongodb://localhost/myMongooseApp").then(function() {
// Start our server so that it can begin listening to client requests.
app.listen(PORT, function() {
  // Log (server-side) when our server has started
  console.log("Server listening on: http://localhost:" + PORT);
});
});
