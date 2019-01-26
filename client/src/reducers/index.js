import { combineReducers } from 'redux';
import { reducer as reduxForm } from 'redux-form';
import authReducer from './authReducer';
import groupReducer from './groupReducer';

export default combineReducers({
	auth: authReducer,
	form: reduxForm,
	groups: groupReducer
});

// @TODO import redux-form
