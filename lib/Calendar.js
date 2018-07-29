import './Calendar.scss';
import React from 'react';
import moment from 'moment';
import classnames from 'classnames';
export default class Calendar extends React.Component
{
	static defaultProps = {
		weekdays: [
			'日', '月', '火', '水', '木', '金', '土', 
		], 
		day: null, 
		onChange: day => {}, 
	};
	state = {
		start: moment().startOf('month'), 
	}; 
	static getDerivedStateFromProps(props, state)
	{
		if (props.day && props.day.isSame(state.start, 'month') === false)
		{
			return { start: props.day.clone().startOf('month') };
		}
		return null;
	}
	render()
	{
		const { weekdays, day: selected } = this.props;
		const { start } = this.state;
		const year = start.year();
		const month = start.month() + 1;
		const st = start.clone().day('sunday');
		const ed = start.clone().endOf('month').day('saturday');
		const today = moment();
		const days = Array(ed.diff(st, 'days') + 1).fill(0).map((v, i) =>
		{
			const day = st.clone().add(i, 'days');
			day.today = day.isSame(today, 'days');
			day.selected = day.isSame(selected, 'days');
			day.disabled = day.isSame(start, 'month') === false;
			return day;
		});
		const { active } = this.props;
		return (
			<div className={classnames('calendar', { active })}>
				<div className="calendar-month">
					<div className="prev" onClick={this.prevClick}>
						<span className="icon linked">
							<i className="far fa-arrow-alt-circle-left"></i>
						</span>
					</div>
					<div className="next" onClick={this.nextClick}>
						<span className="icon linked">
							<i className="far fa-arrow-alt-circle-right"></i>
						</span>
					</div>
					<div className="month">
						{year}年{month}月
					</div>
				</div>
				<div className="calendar-weekdays">
				{weekdays.map((w, i) =>
					<div key={i} className={classnames('weekday', `w${i}`)}>
						{w}
					</div>
				)}
				</div>
				<div className="calendar-days">
				{days.map((day, i) =>
					<div key={i} 
						className={classnames('day', [
							`w${day.day()}`, 
							'linked', 
						], {
							today: day.today, 
							selected: day.selected, 
							disabled: day.disabled, 
						})}
						data-day={day}
						onClick={e => this.dayClick(day)}
					>
						{day.date()}
					</div>
				)}
				</div>
			</div>
		);
	}
	prevClick = e =>
	{
		this.addMonth(-1);
	}
	nextClick = e =>
	{
		this.addMonth(1);
	}
	addMonth(add)
	{
		const { start } = this.state;
		this.setState({ start: start.clone().add(add, 'month') });
	}
	dayClick = day =>
	{
		this.props.onChange(day);
	}

};