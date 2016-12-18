var express  = require("express"),
	mongoose = require("mongoose"),
	Articles = require("../models/Articles"),
	request  = require("request"),
	Router   = express.Router();

Router.get("/", function (req, res) 
{
	res.render(index.html);
});

Router.get("/api/search/:topic/:bdate/:edate", function (req, res) 
{
	var endpoint = "https://api.nytimes.com/svc/search/v2/articlesearch.json?api-key=55ee7f7c8580429a9667994e2be988ea&",
		q = req.params.topic,
		bdate = req.params.bdate,
		edate = req.params.edate,
		fl = "web_url,headline,publication_date";
	
	var url = endpoint + "q=" + q + "&begin_date=" + bdate + "&end_date=" + edate + "&fl=" + fl;
	  
	request(url, function (err, response, body) 
	{
		if (err) 
		{
			console.log(err);
			res.send(err);
		} else 
		{
			body = JSON.parse(body);
			console.log("parsed body ", body)
			res.json(body);
		}
	})
});

Router.post("/api/saved", function (req, res) 
{
	console.log("req.body: ", req.body)
	var newArticle = new Articles(req.body.article);
    newArticle.save(function (err, doc) 
    {
    	if (err) 
    	{
    		res.send(err);
    	} else {
    		res.send(doc);
    	}
    });
});

Router.get("/api/saved", function (req, res) 
{
	Articles.find({})
	.exec(function (err, docs) 
	{
		if (err) 
		{
			res.send(err);
		} else 
		{
			res.send(docs);
		}
	})
});

Router.delete("/api/delete/:topic", function (req, res) 
{
	Articles.find({"topic":req.params.topic})
	.remove(function (response)
	{
		res.send(response);
	})
});
module.exports = Router;