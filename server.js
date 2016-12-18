var express    = require("express"),
    bodyParser = require("body-parser"),
    mongoose   = require("mongoose"),
    routes     = require("./routes/index.js"),
    Router     = express.Router();

var app  = express();
var PORT = process.env.PORT || 3000;

//mongoose.connect("mongodb://heroku_35704kmg:6upv7u5k9f8k7b86ra6va0larl@ds139278.mlab.com:39278/heroku_35704kmg");
//var db = mongoose.connection;

//var databaseUri = 'mongodb://localhost/nytreact';
var db = mongoose.connection;
//mongoose.connect('mongodb://heroku_ztgbnsrf:IIymBs8MX0zviriQSo_uiknMmmtZgIGI@ds139288.mlab.com:39288/heroku_ztgbnsrf');


//if (process.env.MONGODB_URI)
//{
//  mongoose.connect(process.env.MONGODB_URI);
//}
//else
//{
//  mongoose.connect(databaseUri);
//}
//
//var db = mongoose.connection;


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