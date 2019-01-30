import React, { PureComponent } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from '../actions';

import Header from './Header';
import Landing from './Landing';
import Dashboard from './Dashboard';
import GroupNew from './groups/GroupNew';
import MemberNew from './members/MemberNew';
import PageNotFound from './PageNotFound';

class App extends PureComponent {
	componentDidMount() {
		this.props.fetchUser();
	}

	render() {
		return (
			<div className="container">
				<BrowserRouter>
					<div>
						<Header />
						<Switch>
							<Route exact path="/" component={Landing} />
							<Route path="/dashboard" component={Dashboard} />
							<Route path="/groups/new" component={GroupNew} />
							<Route path="/members/new" component={MemberNew} />
							<Route component={PageNotFound} />
						</Switch>
					</div>
				</BrowserRouter>
			</div>
		);
	}
}

export default connect(null, actions)(App);

// set each individual action on props
