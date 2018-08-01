import './Dateinput.scss';
import React from 'react';
import moment from 'moment';
import classnames from 'classnames';
export default class Dateinput extends React.Component
{
	static defaultProps = {
		day: null, 
		onChange: value => {}, 
		PARSE_FORMATS: [
			'YMD', 
			'MD', 
			'D', 
			'Y-M-D', 
			'Y/M/D', 
			'Y.M.D', 
			'M-D', 
			'M/D', 
			'M.D', 
		], 
		FORMAT: 'YYYY-MM-DD', 
	};
	state = {
		value: '', 
		day: null, 
	};
	static getDerivedStateFromProps(props, state)
	{
		if (props.day && props.day.isSame(state.day, 'days') === false)
		{
			const { day } = props;
			return {
				day, 
				value: day ? day.format(props.FORMAT): '', 
			};
		}
		return null;
	}
	render()
	{
		const { day, FORMAT, PARSE_FORMATS } = this.props;
		const { value } = this.state;
		const parse = this.parse = moment(value, PARSE_FORMATS, true);
		const valid = this.valid = parse.isValid();

		return (
			<div className="dateinput">
				<p className="control has-icons-left has-icons-right">
					<input type="text" 
						className={classnames('input is-small', {
							valid, 
						})}
						value={value}
						onChange={this.onChange}
						onBlur={this.onBlur}
						ref={ref => this.input = ref}
					/>
					<span 
						className="icon is-left linked calendar-icon"
						ref={ref => this.calendarIcon = ref}
					>
						<i className="fas fa-calendar"></i>
					</span>
					<span 
						className="icon is-right linked bars-icon"
						ref={ref => this.barsIcon = ref}
					>
						<i className="fas fa-bars"></i>
					</span>
				</p>
			</div>
		);
	}
	onChange = e =>
	{
		const value = e.target.value;
		this.setState({ value });
	}
	onBlur = e =>
	{
		const value = e.target.value;
		if (this.valid)
		{
			const { PARSE_FORMATS, FORMAT } = this.props;
			const day = moment(value, PARSE_FORMATS, true);
			this.setState({ value: day.format(FORMAT) });
			if (!day.isSame(this.props.day, 'day'))
			{
				this.props.onChange(day);
			}
		}
	}
	componentDidMount()
	{
		this.input.on('wheel', this.wheel);
	}
	componentWillUnmount()
	{
		this.input.off('wheel', this.wheel);
	}
	wheel = e =>
	{
		e.preventDefault();
		e.stopPropagation();
		const { parse, valid } = this;
		if (!valid) return;
		const add = e.deltaY > 0 ? 1 : -1;
		const value = e.target.value;

		const { selectionStart: a, selectionEnd: b } = e.target;
		let which = 'days';
		if (value.match(/^\d{4}\-\d{2}\-\d{2}$/))
		{
			const range = {
				year : [ 0                 , 'YYYY'.length ], 
				month: [ 'YYYY-'.length    , 'MM'.length ], 
				days : [ 'YYYY-MM-'.length , 'DD'.length ], 
			}
			which = Object.entries(range).reduce((acc, [ name, [ pos, len ] ]) =>
			{
				return (pos <= a && b <= pos + len) ? name : acc;
			}, '');
		}
		const day = parse.clone().add(add, which);
		
		const { FORMAT } = this.props;
		this.setState({ value: day.format(FORMAT) });

		e.target.setSelectionRange(a, b);
	}
};