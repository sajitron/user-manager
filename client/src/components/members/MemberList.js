import React, { PureComponent, Fragment } from 'react';
import { connect } from 'react-redux';
import { fetchMembers } from '../../actions';

class MemberList extends PureComponent {
	componentDidMount() {
		this.props.fetchMembers();
	}

	renderMembers() {
		return this.props.members.reverse().map((member) => {
			return (
				<Fragment key="member._id">
					<div>
						<h4>
							{member.firstname} {member.lastName}
						</h4>
						<p>{member.email}</p>
					</div>
				</Fragment>
			);
		});
	}

	render() {
		return <div>{this.renderMembers()}</div>;
	}
}

function mapStateToProps({ members }) {
	return {
		members
	};
}

export default connect(mapStateToProps, { fetchMembers })(MemberList);
