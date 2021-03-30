const isToken = (state = null, action) => {
	switch (action.type) {
		case 'SET_TOKEN':
			return {
				...state,
				token: action.access_token,
			};
		default:
			return state;
	}
};

export default isToken;
