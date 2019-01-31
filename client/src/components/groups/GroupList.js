import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { fetchGroups } from '../../actions';

export class GroupList extends PureComponent {
	componentDidMount() {
		this.props.fetchGroups();
	}

	renderGroups() {
		return this.props.groups.reverse().map((group) => {
			return (
				<div key={group._id}>
					<h1>{group.name}</h1>
					<p>{group.description}</p>
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

export default connect(mapStateToProps, { fetchGroups })(GroupList);

// fetchGroups in the connect function is the exported function from the action file which was imported at the top of the file

// groups was destructured from the state object in the mapStateToProps argument
