import _ from 'lodash';
import React, { PureComponent } from 'react';
import { reduxForm, Field } from 'redux-form';
import { Link } from 'react-router-dom';
import GroupField from './GroupField';
import formFields from './formFields';

class GroupForm extends PureComponent {
	renderFields() {
		return _.map(formFields, ({ label, name }) => {
			return <Field key={name} component={GroupField} type="text" label={label} name={name} />;
		});
	}

	render() {
		return (
			<div>
				<form onSubmit={this.props.handleSubmit(this.props.onGroupSubmit)}>
					{this.renderFields()}
					<Link to="/dashboard">Cancel</Link>
					<button type="submit">Next</button>
				</form>
			</div>
		);
	}
}

function validate(values) {
	const errors = {};

	_.each(formFields, ({ name }) => {
		if (!values[name]) {
			errors[name] = 'You need to provide a value';
		}
	});

	return errors;
}

export default reduxForm({
	validate,
	form: 'groupForm',
	destroyOnUnmount: false
})(GroupForm);
