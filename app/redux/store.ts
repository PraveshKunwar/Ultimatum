import {
	combineReducers,
	createStore,
	Reducer,
	CombinedState,
	AnyAction,
} from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import isToken from './reducers/isToken';
import isLogged from './reducers/isLogged';

const CombReducers: Reducer<
	CombinedState<{
		isToken: any;
		isLogged: any;
	}>,
	AnyAction
> = combineReducers({
	isToken,
	isLogged,
});

const store = createStore(CombReducers, composeWithDevTools());

export default store;
