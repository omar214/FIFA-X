import API from './api.js';

export const fetchUsers = async () => {
	const { data: res } = await API.get('/users');
	return res;
};
export const fetchDeleteUser = async (id) => {
	const { data: res } = await API.delete(`/users/${id}`);
	return res;
};

export const fetchAddStadium = async (stadium) => {
	let data = new FormData();
	data.append('name', stadium.name);
	data.append('description', stadium.description);
	data.append('VIPlounge[width]', stadium.width);
	data.append('VIPlounge[height]', stadium.height);
	data.append('image', stadium.image); //<-- CHANGED .value to .files[0]

	const { data: res } = await API.post('/stadiums', data, {
		'Content-Type': 'multipart/form-data',
	});
	return res;
};
