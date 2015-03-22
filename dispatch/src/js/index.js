/** @jsx React.DOM */
var React = require('react'),
		Router = require('react-router'),
		_ = require('underscore'),
		$ = require('jquery');

// Route defs
var Route = Router.Route;
var NotFoundRoute = Router.NotFoundRoute;
var DefaultRoute = Router.DefaultRoute;
var Link = Router.Link;
var RouteHandler = Router.RouteHandler;

var Dashboard = React.createClass({
  render: function() {
    return (
    	<div className="dashboard">
    		<div className="jumbotron text-center">
    			<h1>Leapmates Order</h1>
    		</div>
   			<div className="container">
   				<LocationList/>
   			</div>
  		</div>
  	);
  }
});

var NotFound = React.createClass({
	render: function() {
		return (
			<div><h1>404 Not Found</h1></div>
		);
	}
});

var LocationList = React.createClass({
	getInitialState: function() {
    return { 
    	loading: true,
    	locations: []
    };
  },
  componentDidMount: function() {
  	var self = this;
    $.get('/api/locations', function(data) {
      self.setState({
      	loading: false,
      	locations: data
      });
    });
  },
	render: function() {
		var locations = [];
		if(this.state.loading) {
			return <div>Loading...</div>;
		}
		_.each(this.state.locations, function(loc) {
			locations.push(<Location/>);
		});
		if(locations.length <= 0) {
			return <div>No Locations Found</div>;
		}
		return (
			<ul className="location_list">{locations}</ul>
		);
	}
});

var Location = React.createClass({
	render: function() {
		return (
			<li className="location"></li>
		);
	}
});

React.render(<Dashboard/>, document.getElementById('root'));

// Routing

var routes = (
  <Route>
  	<Route name="home" path="/" handler={Dashboard}>

  	</Route>
	  <NotFoundRoute handler={NotFound}/>
  </Route>
);

Router.run(routes, Router.HistoryLocation, function (Handler) {
  React.render(<Handler/>, document.body);
});
