import { combineReducers } from 'redux';
import { reducer as reduxForm } from 'redux-form';
import authReducer from './authReducer';
import groupReducer from './groupReducer';
import memberReducer from './memberReducer';

export default combineReducers({
	auth: authReducer,
	form: reduxForm,
	groups: groupReducer,
	members: memberReducer
});

// @TODO import redux-form
