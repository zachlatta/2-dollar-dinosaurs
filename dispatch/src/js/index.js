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

var DS = {
	_cache: {},
	set: function(url, val) {
		DS._cache[url] = val;
	},
	get: function(url, cb) {
		if(DS._cache[url]) {
			return cb(DS._cache[url]);
		}
		return $.get('/api/' + url, cb);
	}
}

var Dashboard = React.createClass({
	contextTypes: {
    router: React.PropTypes.func.isRequired
  },
  render: function() {
    return (
    	<div className="dashboard">
    		<div className="jumbotron text-center">
    			<h1>Leapmates Order</h1>
    		</div>
   			<div className="container">
   				<RouteHandler/>
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

var LocationPage = React.createClass({
	contextTypes: {
    router: React.PropTypes.func.isRequired
  },
	render: function() {
		return (
			<div>
				<h2 className="text-center">Choose a Location:</h2>
				<LocationList/>
			</div>
		);
	}
});

var LocationList = React.createClass({
	contextTypes: {
    router: React.PropTypes.func.isRequired
  },
	getInitialState: function() {
    return { 
    	loading: true,
    	locations: []
    };
  },
  componentDidMount: function() {
  	var self = this;
    DS.get('locations', function(data) {
      self.setState({
      	loading: false,
      	locations: data
      });
    });
  },
  componentDidUpdate: function() {
  	for(var i=0; i<this.state.locations; i++) {
  		DS.set('locations/' + this.state.locations[i].id, this.state.locations[i]);
  	}
  },
	render: function() {
		var locations = [];
		if(this.state.loading) {
			return <div>Loading...</div>;
		}
		_.each(this.state.locations, function(loc) {
			locations.push(<LocationListItem key={loc.id} initId={loc.id} initName={loc.name} initLocation={loc.location} initImages={loc.images}/>);
		});
		if(locations.length <= 0) {
			return <div>No Locations Found</div>;
		}
		return (
			<div className="location_list">
				<ul>{locations}</ul>
			</div>
		);
	}
});

var LocationListItem = React.createClass({
	contextTypes: {
    router: React.PropTypes.func.isRequired
  },
	getInitialState: function() {
		return {
			id: this.props.initId,
			name: this.props.initName,
			baseImgUrl: "http://leapset-superadmin-s3.leapset.com/",
			location: this.props.initLocation,
			address: null,
			deliveryFee: 0.0,
			minimumOrderValue: 0.0,
			minDeliveryOrderAmount: 0.0,
			queueConsumers: 1,
			images: this.props.initImages,
			openNow: true,
			timeZone: null,
			paypalAvailable: false
		};
	},
	render: function() {
		var itemStyle = {
		  backgroundImage: 'url(' + this.state.images.image[0].resourceUri + ')'
		};
		return (
			<li className="location" style={itemStyle}><a href={'/locations/' + this.state.id}>{this.state.name}</a></li>
		);
	}
});

var MenuPage = React.createClass({
	contextTypes: {
    router: React.PropTypes.func.isRequired
  },
	getInitialState: function() {
		return {
			loading: true,
			location: null,
			menu: null,
			cart: []
		};
	},
	componentDidMount: function() {
		var self = this,
				loc_id = this.context.router.getCurrentParams().location_id;
		DS.get('locations/' + loc_id, function(loc) {
			DS.get('menus/' + loc_id, function(menu) {
				self.setState({
					loading: false,
					location: loc,
					menu: menu
				});
			});
		});
	},
	render: function() {
		if(this.state.loading) {
			return <div>Loading...</div>;
		}
		return (
			<div className="menu">
				<h2>{this.state.location.name}</h2>
				<div className="row">
					<div className="col-md-8">
						<table class="table" width="100%">
							<thead>
								<tr>
									<th>Name</th> <th>Price</th>
								</tr>
							</thead>
							<tbody>
							</tbody>
						</table>
					</div>
				</div>
				<div className="col-md-4">
					<h3>Cart:</h3>
				</div>
			</div>
		);
	}
});

var MenuItem = React.createClass({
	getInitialState: function() {
		return {
			name: "test",
			price: 3.0
		};
	},
	render: function() {
		return <tr><td>{this.state.name}</td><td>{this.state.price - 5}</td></tr>;
	}
});

// Routing

var routes = (
  <Route handler={Dashboard} path="/">
	  <DefaultRoute handler={LocationList}/>
		<Route name="menu" path="locations/:location_id" handler={MenuPage}/>
	  <NotFoundRoute handler={NotFound}/>
  </Route>
);

Router.run(routes, Router.HistoryLocation, function (Handler) {
  React.render(<Handler/>, document.getElementById('root'));
});
