import React, { PureComponent, Fragment } from 'react';
import moment from 'moment';
import 'react-dates/initialize';
import { SingleDatePicker } from 'react-dates';

class DatePicker extends PureComponent {
	state = {
		focused: false
	};

	onFocusChange = (value) => {
		this.setState({ focused: !this.state.focused });
		const { input } = this.props;
		input.onFocus(value);
	};

	render() {
		const { input, meta: { touched, error }, placeholder, required } = this.props;

		const { focused } = this.state;

		return (
			<Fragment>
				<SingleDatePicker
					showClearDate
					showDefaultInputIcon
					isOutsideRange={() => false}
					displayFormat="YYYY-MM-DD"
					numberOfMonths={1}
					placeholder={placeholder}
					date={input.value}
					onDateChange={input.onChange}
					focused={focused}
					onFocusChange={this.onFocusChange}
					id={input.name}
					required={required}
				/>
				<div>{touched && error}</div>
			</Fragment>
		);
	}
}

export const formatDates = (value) => (value ? moment(value) : null);

export const normalizeDates = (value) => (value ? value.format('YYYY-MM-DD') : null);

export default DatePicker;
