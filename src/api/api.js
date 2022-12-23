import axios from 'axios';
// const baseURL = import.meta.env.REACT_APP_API_URL;
const baseURL = 'http://localhost:8000';

const API = axios.create({
	baseURL,
	headers: {
		// 'Content-Type': 'multipart/form-data',
		'Content-Type': 'application/json',
		Authorization: `Bearer ${localStorage.getItem('access_token')}`,
	},
	transformRequest: [
		function (data, headers) {
			if (data instanceof FormData) {
				headers['Content-Type'] = 'multipart/form-data';
			} else {
				headers['Content-Type'] = 'application/json';
			}
			if (localStorage.getItem('access-token'))
				headers['authorization'] = `Bearer ${localStorage.getItem('access-token')}`;
			// Do not change data
			if (data instanceof FormData) {
				return data;
			}
			return JSON.stringify(data);
		},
	],
});

export default API;
