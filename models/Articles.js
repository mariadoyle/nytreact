var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var ArticleSchema = new Schema(
{
  topic: 
  {
    type: String
  },
  publication_date: 
  {
    type: Date
  }
});

var Articles = mongoose.model("article", ArticleSchema);

module.exports = Articles;