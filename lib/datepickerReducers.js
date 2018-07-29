export const datepickerReducers = {
	day: (state = null, action) =>
	{
		if (action.type === 'DAY') return action.payload;
		return state;
	}, 
};
export default datepickerReducers;