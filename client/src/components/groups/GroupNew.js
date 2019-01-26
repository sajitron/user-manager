import React, { PureComponent } from 'react';
import { reduxForm } from 'redux-form';
import GroupForm from './GroupForm';
import GroupFormReview from './GroupFormReview';

class GroupNew extends PureComponent {
	state = {
		showFormReview: false
	};

	renderContent() {
		if (this.state.showFormReview) {
			return <GroupFormReview onCancel={() => this.setState({ showFormReview: false })} />;
		}

		return <GroupForm onGroupSubmit={() => this.setState({ showFormReview: true })} />;
	}

	render() {
		return <div>{this.renderContent()}</div>;
	}
}

export default reduxForm({
	form: 'groupForm'
})(GroupNew);
