import React, { PureComponent } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

export class Header extends PureComponent {
	renderContent() {
		switch (this.props.auth) {
			case null:
				return;
			case false:
				return (
					<li className="nav-item px-2">
						<Link to="/auth/google">Sign In With Google</Link>
					</li>
				);
			default:
				return [
					<li className="nav-item px-2">
						<Link to="/dashboard" className="nav-link active">
							Dashboard
						</Link>
					</li>,
					<li className="nav-item px-2">
						<Link to="/group" className="nav-link active">
							Add Group
						</Link>
					</li>,
					<li className="nav-item px-2">
						<Link to="/client" className="nav-link active">
							Add Client
						</Link>
					</li>,
					<li className="nav-item px-2">
						<Link to="/extra" className="nav-link active">
							Extras
						</Link>
					</li>
				];
		}
	}

	render() {
		return (
			<div>
				<nav className="navbar navbar-expand-sm navbar-dark bg-dark p-0">
					<div className="container">
						<Link to={this.props.auth ? '/dashboard' : '/'} className="navbar-brand">
							U-Man
						</Link>
						<button className="navbar-toggler" data-toggle="collapse" data-target="#navbarCollapse">
							<span className="navbar-toggler-icon" />
						</button>
						<div className="collapse navbar-collapse" id="navbarCollapse">
							<ul className="navbar-nav">{this.renderContent()}</ul>
						</div>
					</div>
				</nav>
			</div>
		);
	}
}

function mapStateToProps({ auth }) {
	return { auth };
}

export default connect(mapStateToProps)(Header);
