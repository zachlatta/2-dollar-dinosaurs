/** @jsx React.DOM */
var React = require('react');

var TestApp = React.createClass({
  render: function() {
    return <h1>Testing</h1>;
  }
});


console.log('asda'); 

React.render(<TestApp/>, document.getElementById('root'));
