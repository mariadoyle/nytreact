var React  = require("react"),
	  helper = require("./utils/helper.js"),
	  Search = React.createClass(
    {

  getInitialState: function() 
  {
    return { 
      topic: "",
      beginYear: "",
      endYear: "",
      saved: []
    };
  },    

  handleChange: function(name, e) 
  {
  	var change = {};
    
    change[name] = e.target.value;
    
    this.setState(change);
  },

  handleSearch: function(e) 
  {
  	e.preventDefault();
  	this.props.setParams(this.state);
  },

  handleSave: function (e) 
  {
    var selectedParent = e.target.parentNode,
        topic = selectedParent.firstChild.innerHTML,
        publication_date = selectedParent.childNodes[1].innerHTML,
        button = selectedParent.childNodes[2];
        
    var saveObject = 
    {
      topic: topic,
      publication_date: publication_date
    }
    this.state.saved.push(saveObject);
    this.props.saveItem(saveObject);
    this.props.setSaved(this.state.saved);
    button.setAttribute("disabled", "true");

  },

  render: function() 
  {
    return (
     <section>	
      <section className="row">
        <section className="col-md-12">
          <section className="panel panel-default text-center">
            <section className="panel-heading">
            	<h3>Search</h3>
            </section>
            <section className="panel-body">
            <form>
              <div className="form-group">
                <label className="text-center" htmlFor="topic">Topic</label>
                <input type="text" value={this.state.topic} onChange={this.handleChange.bind(this, "topic")} className="form-control" id="topic" />
              </div>
              <div className="form-group">
                <label className="text-center" htmlFor="start-yr">Start Year</label>
                <input type="date" value={this.state.beginYear} onChange={this.handleChange.bind(this, "beginYear")} className="form-control" id="start-yr" />
              </div>
              <div className="form-group">
                <label className="text-center" htmlFor="end-yr">End Year</label>
                <input type="date" value={this.state.endYear} onChange={this.handleChange.bind(this, "endYear")} className="form-control" id="end-yr" />
              </div>
              <button onClick={this.handleSearch} type="submit" className="btn btn-primary btn-lg">Search</button>
            </form> 
            </section>
          </section> 
        </section>   
      </section> 
      <section className="row">
        <section className="col-md-12">
          <section className="panel panel-default text-center">
            <section className="panel-heading">
            	<h3>Results</h3>
            </section>
            <section className="panel-body">
            {this.props.results.map(function(result, i) 
              {
              return (
                <section id={i} key={i} className="text-left well">
                  <h3>{result.headline.main}</h3>
                  <h5>{result.publication_date}</h5>
                  <button onClick={this.handleSave} className="btn btn-primary btn-sm">Save</button>
                </section>
              );
            }, this)}
              
            </section>
          </section> 
        </section>   
      </section> 
     </section> 
    );
  }
});
module.exports = Search;