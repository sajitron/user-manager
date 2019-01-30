import React, { Component } from 'react';
import { reduxForm } from 'redux-form';
import MemberForm from './MemberForm';
import MemberFormReview from './MemberFormReview';

class MemberNew extends Component {
	state = {
		showFormReview: false
	};

	renderContent() {
		if (this.state.showFormReview) {
			return <MemberFormReview onCancel={() => this.setState({ showFormReview: false })} />;
		}

		return <MemberForm onMemberSubmit={() => this.setState({ showFormReview: true })} />;
	}

	render() {
		return <div>{this.renderContent()}</div>;
	}
}

export default reduxForm({
	form: 'memberForm'
})(MemberNew);
