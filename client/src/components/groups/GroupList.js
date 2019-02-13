import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchSomeGroups } from '../../actions';

export class GroupList extends PureComponent {
	componentDidMount() {
		this.props.fetchSomeGroups();
	}

	renderGroups() {
		return this.props.groups.reverse().map(({ _id, name, description }) => {
			return (
				<div key={_id}>
					<Link to={`/groups/${_id}`}>
						<h1>{name}</h1>
					</Link>
					<p>{description}</p>
				</div>
			);
		});
	}

	render() {
		return <div>{this.renderGroups()}</div>;
	}
}

function mapStateToProps({ groups }) {
	return {
		groups
	};
}

export default connect(mapStateToProps, { fetchSomeGroups })(GroupList);

// fetchGroups in the connect function is the exported function from the action file which was imported at the top of the file

// groups was destructured from the state object in the mapStateToProps argument
