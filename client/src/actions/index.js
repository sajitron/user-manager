import axios from 'axios';
import { FETCH_USER, FETCH_GROUPS, FETCH_MEMBERS } from './types';

export const fetchUser = () => async (dispatch) => {
	const res = await axios.get('/api/current_user');

	dispatch({ type: FETCH_USER, payload: res.data });
};

export const submitGroup = (values, history) => async (dispatch) => {
	const res = await axios.post('/api/groups', values);
	history.push('/dashboard');
	dispatch({ type: FETCH_USER, payload: res.data });
};

export const fetchSomeGroups = () => async (dispatch) => {
	const res = await axios.get('/api/somegroups');

	dispatch({ type: FETCH_GROUPS, payload: res.data });
};

export const fetchGroups = () => async (dispatch) => {
	const res = await axios.get('/api/groups');

	dispatch({ type: FETCH_GROUPS, payload: res.data });
};

export const addMember = (values, history) => async (dispatch) => {
	const res = await axios.post('/api/members', values);

	history.push('/dashboard');
	dispatch({ type: FETCH_USER, payload: res.data });
};

export const fetchSomeMembers = () => async (dispatch) => {
	const res = await axios.get('/api/somemembers');

	dispatch({ type: FETCH_MEMBERS, payload: res.data });
};

export const fetchMembers = () => async (dispatch) => {
	const res = await axios.get('/api/members');

	dispatch({ type: FETCH_MEMBERS, payload: res.data });
};
