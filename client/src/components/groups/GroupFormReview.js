import React from 'react';
import _ from 'lodash';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import formFields from './formFields';
import * as actions from '../../actions';

const GroupFormReview = ({ onCancel, formValues, submitGroup, history }) => {
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
			<h4>Please Confirm Your Input</h4>
			{reviewFields}
			<button onClick={onCancel}>Back</button>
			<button onClick={() => submitGroup(formValues, history)}>Save Group</button>
		</div>
	);
};

function mapStateToProps(state) {
	return {
		formValues: state.form.groupForm.values
	};
}

export default connect(mapStateToProps, actions)(withRouter(GroupFormReview));
