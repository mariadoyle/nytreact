var express    = require("express"),
    bodyParser = require("body-parser"),
    mongoose   = require("mongoose"),
    routes     = require("./routes/index.js"),
    Router     = express.Router();

var app  = express();
var PORT = process.env.PORT || 3000;

var db = mongoose.connection;
mongoose.connect('mongodb://heroku_2r6l70kr:wWBG0YnYU_YZ1-6Emtq0My2v2tINdkMW@ds139428.mlab.com:39428/heroku_2r6l70kr');

db.on("error", function(err) {
  console.log("Mongoose Error: ", err);
});

db.once("open", function() {
  console.log("Mongoose connection successful.");
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.text());
app.use(bodyParser.json({ type: "application/vnd.api+json" }));
app.use(express.static("./public"));
app.use(routes);

app.listen(PORT, function () {
	console.log("Listening on port ", PORT);
});