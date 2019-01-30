import React, { Component } from 'react';
import _ from 'lodash';
import { reduxForm, Field } from 'redux-form';
import { Link } from 'react-router-dom';
import MemberField from './MemberField';
import DatePickerField from './DatePickerField';
import validateEmails from '../../utils/validateEmails';
import formFields from './formFields';

export class MemberForm extends Component {
	renderFields() {
		return _.map(formFields, ({ label, name }) => {
			return <Field key={name} component={MemberField} type="text" label={label} name={name} />;
		});
	}

	renderDatePicker() {
		return <Field component={DatePickerField} label="Date of Birth" name="birthDate" />;
	}

	render() {
		return (
			<div>
				<form onSubmit={this.props.handleSubmit(this.props.onMemberSubmit)}>
					{this.renderFields()}
					{this.renderDatePicker}
					<Link to="/dashboard">Cancel</Link>
					<button type="submit">Next</button>
				</form>
			</div>
		);
	}
}

function validate(values) {
	const errors = {};

	errors.email = validateEmails(values.email || '');

	_.each(formFields, ({ name }) => {
		if (!values[name]) {
			errors[name] = 'You need to provide a value';
		}
	});

	return errors;
}

export default reduxForm({
	validate,
	form: 'memberForm',
	destroyOnUnmount: false
})(MemberForm);
