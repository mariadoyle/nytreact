var axios = require("axios");

var nytAPI = "55ee7f7c8580429a9667994e2be988ea";

var helper = 
{
  runQuery: function (params) 
  {
    var beginYear = params.beginYear.replace(/[-]/g, ""),
        endYear   = params.endYear.replace(/[-]/g, ""),
        q         = params.topic.split(" ").join("+");

    return axios.get("/api/search/" + q + "/" + beginYear + "/" + endYear)
    .then(function (response) {
      return response.data.response.docs;
    });
  },

  saveArticle: function (newArticle) 
  {
    return axios.post("/api/saved", {article: newArticle});
  },

  deleteArticle: function (topic) 
  {
    return axios.delete("/api/delete/" + topic);
  },

  getSaved: function() 
  {
    return axios.get("api/saved")
    .then(function (response) 
    {
      return response;
    });
  }
};
module.exports = helper;