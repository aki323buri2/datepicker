import './App.scss';
import React from 'react';
import { connect } from 'react-redux';
import Datepicker from '../lib/Datepicker';
@connect(state => state)
export default class App extends React.Component
{
	action(type, payload) 
	{
		return this.props.dispatch({ type, payload });
	}
	render()
	{
		const { day } = this.props;
		return (
			<div className="app content is-small">
				
				<div className="field">
					<div className="field-title">日付 : </div>
					<div className="field-body">
						<Datepicker
							day={day}
							onChange={day => this.action('DAY', day)}
						/>
					</div>
				</div>
			</div>
		);
	}
};