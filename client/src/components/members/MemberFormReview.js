import React, { PureComponent } from 'react';
import _ from 'lodash';
import { connect } from 'react-redux';
// @TODO import withRouter
import formFields from './formFields';
import * as actions from '../../actions';

class MemberFormReview extends PureComponent {
	constructor(props) {
		super(props);
	}

	reviewFields() {
		console.log(this.props.formValues);
		console.log(this.props);
		const reviewFields = _.map(formFields, ({ name, label }) => {
			return (
				<div key={name}>
					<label>{label}</label>
					<div>{this.props.formValues[name]}</div>
				</div>
			);
		});
		return reviewFields;
	}

	render() {
		return (
			<div>
				{this.reviewFields()}
				<div>
					<label>Date of Birth</label>
					{this.props.formValues['birthDate']}
					<button onClick={this.props.onCancel}>Back</button>
					<button onClick={() => this.props.submitMember(this.props.formValues, this.props.history)}>
						Next
					</button>
				</div>
			</div>
		);
	}
}

function mapStateToProps(state) {
	return {
		formValues: state.form.memberForm.values
	};
}

export default connect(mapStateToProps, actions)(MemberFormReview);
