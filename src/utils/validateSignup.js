export const extractValues = (form) => {
	let formData = new FormData(form);
	const {
		userName,
		email,
		firstName,
		lastName,
		password,
		confirmPassword,
		birthDate,
		gender,
		nationality,
	} = Object.fromEntries(formData);

	return {
		userName: userName.trim(),
		email: email.trim(),
		firstName: firstName.trim(),
		lastName: lastName.trim(),
		password,
		confirmPassword,
		birthDate,
		gender,
		nationality,
	};
};

export const validateSignup = (values) => {
	const errors = {};

	if (!values.userName) {
		errors.userName = 'Username is required';
	}

	if (values.userName && values.userName.length < 3) {
		errors.userName = 'Username needs to be 3 characters or more';
	}

	if (!values.email) {
		errors.email = 'Email is required';
	} else if (!/\S+@\S+\.\S+/.test(values.email)) {
		errors.email = 'Email address is invalid';
	}

	if (!values.firstName) {
		errors.firstName = 'First name is required';
	}

	if (values.firstName && values.firstName.length < 3) {
		errors.firstName = 'First name needs to be 3 characters or more';
	}

	if (!values.lastName) {
		errors.lastName = 'Last name is required';
	}

	if (values.lastName && values.lastName.length < 3) {
		errors.lastName = 'Last name needs to be 3 characters or more';
	}

	if (!values.password) {
		errors.password = 'Password is required';
	} else if (values.password.length < 8) {
		errors.password = 'Password needs to be 8 characters or more';
	}

	if (!values.confirmPassword) {
		errors.confirmPassword = 'Confirm password is required';
	} else if (values.confirmPassword !== values.password) {
		errors.confirmPassword = 'Passwords do not match';
	}

	if (!values.gender) {
		errors.gender = 'Gender is requiered';
	} else if (values.gender !== 'male' && values.gender !== 'female') {
		errors.gender = 'invalide gender value';
	}

	values.birthDate = new Date(values.birthDate);
	if (!values.birthDate) {
		errors.birthDate = 'Birth date is required';
	}

	if (values.birthDate && values.birthDate > new Date()) {
		errors.birthDate = 'Birth date is invalid';
	}

	if (values.birthDate && values.birthDate < new Date('1900-01-01')) {
		errors.birthDate = 'Birth date is invalid';
	}

	if (
		values.birthDate &&
		values.birthDate > new Date('1900-01-01') &&
		values.birthDate < new Date()
	) {
		const age =
			new Date().getFullYear() - new Date(values.birthDate).getFullYear();
		if (age < 18) {
			errors.birthDate = 'You must be 18 years old or older';
		}
	}

	if (values.nationality && values.nationality === 'Select your nationality') {
		errors.nationality = true;
	}
	return errors;
};
