import React from 'react';
import _ from 'lodash';
import { connect } from 'react-redux';
// @TODO import withRouter
import formFields from './formFields';
import * as actions from '../../actions';

const MemberFormReview = ({ onCancel, formValues, submitMember, history }) => {
	console.log(formValues);
	const reviewFields = _.map(formFields, ({ name, label }) => {
		return (
			<div key={name}>
				<label>{label}</label>
				<div>{formValues[name]}</div>
			</div>
		);
	});

	return (
		<div>
			<h4>Please Confirm Your Entries</h4>
			{reviewFields}
			<button onClick={onCancel}>Back</button>
			<button onClick={() => submitMember(formValues, history)}>Next</button>
		</div>
	);
};

function mapStateToProps(state) {
	return {
		formValues: state.form.memberForm.values
	};
}

export default connect(mapStateToProps, actions)(MemberFormReview);
