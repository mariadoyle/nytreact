var React = require("react");

var Saved = React.createClass(
{

  handleDelete: function (e) {
    var selectedParent = e.target.parentNode,
        topic = selectedParent.firstChild.innerHTML;
    this.props.deleteItem(topic);  

    selectedParent.parentNode.removeChild(selectedParent);  
  },

  render: function() 
  {
    return (
      <section className="row">
        <section className="col-md-12">
          <section className="panel panel-default text-center">
            <section className="panel-heading">
            	<h3>Saved</h3>
            </section>
             <section className="panel-body">
             {this.props.saved.map(function (article, i) 
              {
                return (
                  <section id={i} key={i} className="text-left well">
                    <h3>{article.topic}</h3>
                    <h5>{article.publication_date}</h5>
                    <button onClick={this.handleDelete} className="btn btn-danger btn-sm">Delete</button>
                  </section>
                );
             }, this)}
             </section> 
          </section> 
        </section>   
      </section> 
    );
  }
});
module.exports = Saved;