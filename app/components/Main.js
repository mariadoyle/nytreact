var React  = require("react"),
    Saved  = require("./Saved"),
    Search = require("./Search"),
    isEqual = require("lodash.isequal"),
    helper = require("./utils/helper.js");

var Main = React.createClass({

  getInitialState: function() 
  {
    return 
    {
      topic: "",
      beginYear: "",
      endYear: "",
      results: [],
      saved: []
    };
  },

  componentDidMount: function() 
  {
    helper.getSaved().then(function (saved) 
    {
      if (!isEqual(saved, this.state.saved)) 
      {
        this.setState({saved: saved.data});
      }
    }.bind(this));
  },

  componentDidUpdate: function() 
  {
    helper.runQuery(this.state).then(function (results) 
    {
      if (!isEqual(results, this.state.results)) 
      {
        this.setState({results: results});
        return;
      }
    }.bind(this));
  },

  setParams: function(params) 
  {
    this.setState(
    { 
      topic: params.topic,
      beginYear: params.beginYear,
      endYear: params.endYear
    });
  },

  setSaved: function(saved) 
  {
    this.state.saved.push(saved);
  },

  saveItem: function(newArticle) 
  {
    helper.saveArticle(newArticle).then(function (response) {
      console.log("Article successfully saved: ", response);
    });
  },

  deleteItem: function(topic) 
  {
    helper.deleteArticle(topic).then(function (response) 
    {
      console.log("Article successfully deleted: ", response);
    });
  },

  render: function() 
  {
    return (
      <section className="container">
        <section className="jumbotron text-center">
          <h1>New York Times Article Scrubber</h1>
          <h2>Search for and annotate articles of interest!</h2>
        </section>
        <Search 
          setSaved={this.setSaved}
          saveItem={this.saveItem} 
          results={this.state.results} 
          setParams={this.setParams} 
        />
        <Saved deleteItem={this.deleteItem} saved={this.state.saved} />
      </section>
    );
  }
});
module.exports = Main;