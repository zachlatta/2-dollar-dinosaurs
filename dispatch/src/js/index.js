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
  	var logo_art = <a href="/" dangerouslySetInnerHTML={{__html: '<svg version="1.1" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 204 163" enable-background="new 15.2 400.1 203.8 146.4" xml:space="preserve"><path d="M171.415474,65.0342758 C167.728575,65.7151476 164.141322,67.1741588 160.952652,69.605844 C159.457963,70.5785181 158.262212,71.745727 157.066461,72.9129359 L149.294079,66.9796239 C151.486289,66.0069499 158.760442,63.3807298 155.87071,61.7271839 C155.173188,61.2408468 153.479208,61.046312 151.486289,60.7545098 L157.066461,55.9884067 L158.262212,55.0157327 L168.725034,46.1643985 L163.842384,36.9239946 L147.699744,50.9305015 C147.699744,50.9305015 147.699744,50.9305015 146.205055,52.3895126 C142.817094,52.1949778 127.371974,58.1282914 125.179763,55.0157343 C124.897032,54.6477578 118.101427,49.7749374 119.869255,46.1643969 C121.066178,43.719849 133.584215,41.4649798 139.346582,41.4649798 C145.10895,41.4649798 145.180404,31.3822422 145.10895,30.9050661 C144.792172,28.7896159 128.766936,31.3253751 121.168512,32.3506037 C118.336796,32.7326772 114.65055,33.6500794 114.716944,33.603787 C114.716944,26.9197584 126.355064,18.4764243 127.152231,16.8228784 C148.804674,21.4831548 150.788766,8.3269719 149.294077,5.50621704 C144.909655,2.7728221 129.863124,-1.24517391 125.179766,0.602906857 C120.552308,2.45603585 93.4923611,25.0802979 93.4923611,32.3506055 C92.9459717,34.8395604 91.41365,34.3444946 87.4139595,38.1753718 C85.1445404,40.3490064 82.4867672,40.929117 78.1974524,44.1026522 C69.366507,50.6364035 60.314249,57.3987948 60.314249,60.7545115 C60.314249,64.1102282 62.8590576,71.8409865 67.0236181,70.0921808 C71.6477855,68.1503745 75.8805184,65.5246047 80.5897893,60.7545115 C81.0835923,60.2543307 84.5008417,57.7876763 87.4139594,58.0189768 C93.7702782,58.5236661 91.6199446,63.5752672 89.3072318,72.9129358 C87.1150214,81.277933 92.4959018,84.0014205 96.1828011,88.0866517 C93.4923611,90.0319998 90.6026293,92.1718828 89.1079404,93.5336266 C88.1114812,94.5063007 88.4104189,95.1871725 89.3072323,96.1598466 C89.3072323,96.1598466 96.5813848,96.3543814 98.5743032,94.2144984 C99.0725329,93.7281614 99.5707625,93.2418243 100.068992,92.7554873 L110.033585,99.6614733 L109.037125,109.388214 C107.343145,109.388214 105.649164,109.582749 103.955183,109.874551 C100.268284,110.555423 96.6810307,112.014434 93.4923611,114.446119 C81.3355583,123.005651 78.6451183,139.443844 87.4139597,151.310467 C93.4923611,159.675465 104.254121,163.955231 114.716943,161.815348 C118.403842,161.134476 121.991096,159.675465 125.179765,157.243779 C136.439755,149.365119 139.528778,134.580473 132.952147,123.200186 L134.945066,122.032977 C136.937984,123.005651 139.329486,123.005651 141.521697,121.54664 C143.514615,120.087629 144.411429,117.753211 143.913199,115.613328 C146.603639,114.932457 149.493371,113.959782 152.68204,112.987108 C155.87071,112.014434 156.36894,111.04176 155.571772,109.388214 C154.376021,107.248331 146.105409,109.193679 145.10895,107.929203 L142.91674,102.676763 L147.600098,70.092181 L155.37248,75.5391559 C148.995141,84.3904901 148.795849,96.7434511 155.571772,105.983855 C161.650174,114.348852 172.411933,118.628618 182.874755,116.488735 C186.561655,115.807863 190.148908,114.348852 193.337578,111.917167 C204.796859,103.843972 207.487299,87.4057798 198.718458,75.5391559 C192.640056,67.1741588 181.878296,62.8943928 171.415474,65.0342758 Z M111.8,113.7 C117.2,114.4 122.3,117.4 125.8,121.8 L110.1,131.8 L111.8,113.7 L111.8,113.7 Z M121.4,152.6 C119,154.3 116,155.5 113.1,156.3 C104.8,158 96.2,154.6 91.3,147.7 C84.4,137.9 86.6,124.4 96.2,117.6 C98.6,115.9 101.6,114.7 104.5,113.9 C105.7,113.7 106.9,113.7 107.9,113.4 L105.9,135.4 C105.9,136.1 106.1,136.9 106.9,137.1 C107.4,137.3 107.9,137.3 108.4,137.3 C108.6,137.3 108.9,137.1 109.1,137.1 L128.2,124.9 C132.6,134.3 130.2,146.3 121.4,152.6 L121.4,152.6 Z M130.4,118.8 C126,112.9 119.4,109.3 112.3,108.3 L113,100.5 L119.1,104.9 C118.4,107.3 118.6,108.6 120.8,109.6 L131.6,113.8 C131.1,115.3 131.1,116.7 131.8,118.2 L130.4,118.8 L130.4,118.8 Z M138.324672,17.1332555 C137.926524,16.8254803 135.208777,15.1634945 134.253222,14.5479441 C133.456925,14.1170588 130.520969,11.3327586 132.113561,8.74744704 C136.413561,14.5479441 138.96171,11.9626324 140.713561,14.5479439 L140.474672,16.7023702 C139.678376,16.7023702 139.120969,16.8254803 138.324672,17.1332555 Z M128.491803,5.55454266 C128.095363,5.1236574 126.304369,4.9242332 127.097249,2.33892166 C130.157819,2.33892166 132.80399,2.96923107 133.676158,5.5545426 L128.491803,5.55454266 Z M139.2,94.4 L134.3,83.1 C134.5,81.4 134.3,79.7 134.1,78.4 L142.7,70.3 L139.2,94.4 L139.2,94.4 Z M189.4,106.4 C187,108.1 184,109.3 181.1,110.1 C172.8,111.8 164.2,108.4 159.3,101.5 C153.9,93.9 154.2,84.1 159.1,76.8 L176.5,89.8 C176.7,90 177.2,90 177.7,90 C178.2,90 178.4,89.8 178.9,89.3 C179.4,88.6 179.4,87.6 178.7,87.1 L161.8,73.6 C162.5,72.6 163.5,71.9 164.5,71.2 C166.9,69.5 169.9,68.3 172.8,67.5 C181.1,65.8 189.7,69.2 194.6,76.1 C201.4,86 199.2,99.5 189.4,106.4 L189.4,106.4 Z M57.7,92.9 L52.3,83.4 L51.1,94.2 L40.6,96.4 L50.4,100.8 L49.2,111.6 L56.5,103.5 L66.3,108.2 L60.9,98.7 L68.2,90.6 L57.7,92.9 L57.7,92.9 Z M52.8,138.4 L47.4,128.9 L46.2,139.7 L35.7,141.9 L45.5,146.3 L44.2,157 L51.5,148.9 L61.3,153.6 L55.9,144.1 L63.2,136 L52.8,138.4 L52.8,138.4 Z M17.3,122 L11.9,112.5 L10.7,123.3 L0.2,125.5 L10,129.9 L8.8,140.7 L16.1,132.6 L25.9,137 L20.5,127.5 L27.8,119.4 L17.3,122 L17.3,122 Z M145.1,46.9 L161.5,32.2 L154.4,31.5 L136.3,46.9 C137.8,46.9 141.2,46.7 145.1,46.9 Z" fill="#FFF" sketch:type="MSShapeGroup"></path></svg>'}}></a>;
    return (
    	<div className="dashboard">
    		<header>
    			<nav id="navbar">
    				<div className="container">
	    				<div className="logo">
				        {logo_art}
				      </div>
			      </div>
    			</nav>
    		</header>
  			<RouteHandler/>
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
			<div className="content">
				<section className="hero">
  				<div className="container">
		    		<h1>Leapmates Order</h1>
		    		<p className="lead">Powering HackEDU since basically forever.</p>
	    		</div>
   			</section>
   			<section className="site">
	   			<div className="container">
						<LocationList/>
   				</div>
   			</section>
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
			return <h2>Loading Locations...</h2>;
		}
		_.each(this.state.locations, function(loc) {
			if(!loc) return;
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
		var itemStyle = {};
		console.log(this.state);
		if(this.state.images)
			itemStyle.backgroundImage = 'url(' + this.state.images.image[0].resourceUri + ')';
		return (
			<li className="location" style={itemStyle}><a href={'/locations/' + this.state.id}>
				<span>{this.state.name}</span>
			</a></li>
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
		$.get('/api/locations/' + loc_id, function(loc) {
			DS.get('menus/' + loc_id, function(menu) {
				self.setState({
					loading: false,
					location: loc,
					menu: menu
				});
			});
		});
	},
	getBundlerItem: function() {
		var bundler_product;
		_.each(this.state.menu, function(category) {
			function test_bundler_product(product) {
				if(product.price - 5 > 0 && (!bundler_product || product.price - 5 < bundler_product.price - 5)) {
					bundler_product = product;
				}
			}
			if(category.products)
				_.each(category.products.product || [], test_bundler_product);
			if(category.subCategories) {
				_.each(category.subCategories.category || [], function(subcategory) {
					_.each(subcategory.products.product || [], test_bundler_product);
				});
			}
		});
		return bundler_product;
	},
	handleClick: function() {
		alert('a');
		this.setState({
			cart: this.state.list.concat([{
				newitem: 'somefield'
			}])
		})
	},
	render: function() {
		if(this.state.loading) {
			return <div className="content">Loading...</div>;
		}
		var menuitems = [],
				self = this;
		_.each(this.state.menu, function(category) {
			function makeCategory(category) {
				var products = [];
				var sub_cats = [];
				if(category.products) {
					_.each(category.products.product, function(product) {
						products.push(<li><a><div><div className="price">${product.price - 5}</div><div className="name">{product.name}</div></div></a></li>);
					});
				}
				if(category.subCategories)
					sub_cats.push(makeCategory(category.subCategories.category));
				return (
	        <li>
	          <h3>
	            <a>{category.name}</a>
	          </h3>
	          <ul className="products">
	          	{products}
	          </ul>
	          <ul className="categories">
	          	{sub_cats}
	          </ul>
	        </li>
				);
			}
			menuitems.push(makeCategory(category));
		});
		var cartitems = [];
		for(var z=0; z<this.state.cart; z++) {
			cartitems.push(<li>asdad</li>);
		}

		var bundler_item = this.getBundlerItem();
		return (
			<div id="place-catalog" className="content">
   			<div className="container">
					<div className="menu">
						<div className="row">
							<div className="col-md-7">
								<section className="catalog">
					        <ul className="categories">
					        	{menuitems}
					        </ul>
					      </section>
							</div>
							<div className="col-md-5">
								<img className="img-thumbnail" src={this.state.location.images.image[0].resourceUri}/> 
								<h2>{this.state.location.name}</h2>
								<p>
									{this.state.location.address.address1}<br/>
									{this.state.location.address.city}, {this.state.location.address.state}<br/>
									{this.state.location.address.zipCode}, {this.state.location.address.country}
								</p>
								<h3>Cart:</h3>
								<div className="alert alert-info"><b>Default Bundler:</b> {bundler_item ? bundler_item.name : "N/A"} for ${bundler_item ? bundler_item.price - 5 : 0}</div>
								{cartitems}
							</div>
						</div>
					</div>
				</div>
			</div>
		);
	}
});

// Routing

var routes = (
  <Route handler={Dashboard} path="/">
	  <DefaultRoute handler={LocationPage}/>
		<Route name="menu" path="locations/:location_id" handler={MenuPage}/>
	  <NotFoundRoute handler={NotFound}/>
  </Route>
);

Router.run(routes, Router.HistoryLocation, function (Handler) {
  React.render(<Handler/>, document.getElementById('root'));
});
