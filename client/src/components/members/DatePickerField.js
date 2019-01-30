import React from 'react';
import DatePicker from 'react-datepicker';
import moment from 'moment';

const DatePickerField = ({ input, label, meta: { error, touched } }) => {
	return (
		<div>
			<label>{label}</label>
			<DatePicker {...input} dateForm="DD/MM/YYYY" selected={input.value ? moment(input.value) : null} />
			<div>{touched && error}</div>
		</div>
	);
};

export default DatePickerField;
