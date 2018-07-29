import './Datepicker.scss';
import React from 'react';
import moment from 'moment';
import Dateinput from './Dateinput';
import Calendar from './Calendar';
import { findDOMNode } from 'react-dom';
Object.assign(React.Component.prototype, {
	dom()
	{
		return findDOMNode(this);
	}, 
});
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
					ref={ref => this.input = ref}
					day={day}
					onChange={this.inputChange}
				/>

				<div className="overlay"></div>
				
				<Calendar
					ref={ref => this.calendar = ref}
					day={day}
					onChange={this.calendarChange}
				/>


			</div>
		);
	}
	inputChange = day =>
	{
		this.props.onChange(day);
	}
	calendarChange = day =>
	{
		this.props.onChange(day);
	}
	componentDidMount()
	{
		
	}
	componentWillUnmount()
	{
	}
};
