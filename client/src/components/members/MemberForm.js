import React, { Component } from 'react';
import _ from 'lodash';
import { reduxForm, Field } from 'redux-form';
import { Link } from 'react-router-dom';
import MemberField from './MemberField';
import validateEmails from '../../utils/validateEmails';
import formFields from './formFields';
import DatePicker, { formatDates, normalizeDates } from './DatePicker';

export class MemberForm extends Component {
	renderFields() {
		return _.map(formFields, ({ label, name }) => {
			return <Field key={name} component={MemberField} type="text" label={label} name={name} />;
		});
	}

	render() {
		return (
			<div>
				<form onSubmit={this.props.handleSubmit(this.props.onMemberSubmit)}>
					{this.renderFields()}
					<Field
						name="birthDate"
						component={DatePicker}
						placeholder="Date of Birth"
						parse={normalizeDates}
						format={formatDates}
						required
					/>
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
