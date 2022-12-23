import API from './api.js';

export const fetchUsers = async () => {
	const { data: res } = await API.get('/users');
	return res;
};
export const fetchDeleteUser = async (id) => {
	const { data: res } = await API.delete(`/users/${id}`);
	return res;
};
