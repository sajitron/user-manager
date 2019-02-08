import React, { PureComponent, Fragment } from 'react';
import { connect } from 'react-redux';
import { fetchMembers } from '../../actions';
import moment from 'moment';

class MemberList extends PureComponent {
	componentDidMount() {
		this.props.fetchMembers();
	}

	renderMembers() {
		return this.props.members.reverse().map(({ _id, firstName, lastName, email, birthDate }) => {
			return (
				<Fragment key={_id}>
					<div>
						<h4>
							{firstName} {lastName}
						</h4>
						<p>{email}</p>
						<p>Born: {moment(birthDate).format('MMMM Do, YYYY')}</p>
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
