const SET_LOGGED = 'SET_LOGGED';
const SET_TOKEN = 'SET_TOKEN';

type SetLogged = { type: typeof SET_LOGGED };
type SetToken = { type: typeof SET_TOKEN };

export const setLogged: SetLogged = {
	type: SET_LOGGED,
};

export const setToken: SetToken = {
	type: SET_TOKEN,
};
