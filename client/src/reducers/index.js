import { combineReducers } from 'redux';
import { reducer as reduxForm } from 'redux-form';
import authReducer from './authReducer';
import surveysReducer from './surveysReducer';
import setlistReducer from './setlistReducer';

export default combineReducers({
	auth: authReducer,
	surveys: surveysReducer,
	sets: setlistReducer,
	form: reduxForm
});