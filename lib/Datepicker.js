import './Datepicker.scss';
import React from 'react';
import moment from 'moment';
import Dateinput from './Dateinput';
import Calendar from './Calendar';
import classnames from 'classnames';
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
	state = {
		calendarActive: false, 
	}
	render()
	{
		const { className } = this.props;
		const { day } = this.props;
		const { calendarActive } = this.state;
		return (
			<div className={classnames('datepicker', className)}>
				<Dateinput
					ref={ref => this.input = ref}
					day={day}
					onChange={this.inputChange}
				/>

				<div 
					className={classnames('overlay', {
						active: calendarActive, 
					})}
				></div>

				<Calendar
					ref={ref => this.calendar = ref}
					day={day}
					onChange={this.calendarChange}
					active={calendarActive}
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
		this.hideCalendar();
		this.input.input.focus();
	}
	componentDidMount()
	{
		this.dom().on('click', this.overlayClick);
		this.input.calendarIcon.on('click', this.calendarIconClick);
	}
	componentWillUnmount()
	{
		this.dom().off('click', this.overlayClick);
		this.input.calendarIcon.off('click', this.calendarIconClick);
	}
	overlayClick = e =>
	{
		const { clientX: x, clientY: y } = e.touches ? e.touches[0] : e;
		if (this.calendar.dom().hittest(x, y)) return;
		this.hideCalendar();
		this.input.input.focus();
	}
	calendarIconClick = e =>
	{
		this.showCalendar();
	}
	showCalendar()
	{
		this.setState({ calendarActive: true });
	}
	hideCalendar()
	{
		this.setState({ calendarActive: false });
	}

};
