import API from './api.js';

export const fetchSignup = async (user) => {
	const { data: res } = await API.post('/auth/signup', {
		firstName: user.firstName,
		lastName: user.lastName,
		password: user.password,
		username: user.userName,
		email: user.email,
		gender: user.gender,
		birthDate: user.birthDate,
		nationality: user?.nationality,
	});
	return res;
};

export const fetchLogin = async ({ email, password }) => {
	const { data: res } = await API.post('/auth/login', {
		email,
		password,
	});
	return res;
};

export const fetchNationalities = async () => {
	const { data: res } = await API.get('/data/nationalities');
	return res;
};
export const fetchEditProfile = async (user) => {
	console.log(localStorage.getItem('access-token'));
	const { data: res } = await API.patch('/users', user);
	return res;
};
