import axios from 'axios';
import { FETCH_USER, FETCH_GROUPS, ADD_USER } from './types';

export const fetchUser = () => async (dispatch) => {
	const res = await axios.get('/api/current_user');

	dispatch({ type: FETCH_USER, payload: res.data });
};

export const submitGroup = (values, history) => async (dispatch) => {
	const res = await axios.post('/api/groups', values);
	history.push('/dashboard');
	dispatch({ type: FETCH_USER, payload: res.data });
};

export const fetchGroups = () => async (dispatch) => {
	const res = await axios.get('/api/groups');

	dispatch({ type: FETCH_GROUPS, payload: res.data });
};

export const addUser = (values, history) => async (dispatch) => {
	const res = await axios.post('/api/members', values);

	history.push('/dashboard');
	dispatch({ type: ADD_USER, payload: res.data });
};
