import './Datepicker.scss';
import React from 'react';
import moment from 'moment';
import Dateinput from './Dateinput';
import Calendar from './Calendar';
export default class Datepicker extends React.Component
{
	static defaultProps = {
		day: null, 
		onChange: day => {}, 
	};
	render()
	{
		const { day } = this.props;
		return (
			<div className="datepicker">
				<Dateinput
					ref={ref => this.input}
					day={day}
					onChange={this.inputChange}
				/>

				<Calendar
					day={day}
				/>
			</div>
		);
	}
	inputChange = day =>
	{
		this.props.onChange(day);
	}
};
