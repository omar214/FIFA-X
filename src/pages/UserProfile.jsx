import {
	Container,
	Row,
	Col,
	Alert,
	Button,
	FloatingLabel,
	Form,
} from 'react-bootstrap';
import { useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import API from '../api/api.js';
import { loginSuccess } from '../redux/userSlice.js';
import { toast } from 'react-toastify';
import useProtection from '../hooks/useProtection.jsx';
import { extractValues, validateSignup } from '../utils/validateSignup.js';
import { data } from '../data';
import moment from 'moment';
import { fetchEditProfile } from '../api/user.js';

const handleErrorMessages = (error) => {
	return error && <div className="text-danger mb-2">{error}</div>;
};

const UserProfile = () => {
	const dispatch = useDispatch();
	const [errorMessage, setErrorMessage] = useState([]);
	const [isSuccess, setIsSucess] = useState(false);
	const formRef = useRef(null);
	const { currentUser } = useSelector((state) => state.user);

	const handleSubmit = async (e) => {
		e.preventDefault();
		const formValues = extractValues(formRef.current);
		formValues.userName = currentUser.username;
		formValues.email = currentUser.email;
		const tempErrors = validateSignup(formValues);
		if (tempErrors.nationality) {
			delete formValues.nationality;
			delete tempErrors.nationality;
		}
		if (tempErrors.password) {
			delete tempErrors.password;
		}
		if (tempErrors.confirmPassword) delete tempErrors.confirmPassword;

		setErrorMessage(tempErrors);
		if (Object.keys(tempErrors).length > 0) return;

		setErrorMessage(tempErrors);
		try {
			const res = await fetchEditProfile(formValues);
			formRef.current.reset();
			toast.success('User Edited Successfully');
			dispatch(loginSuccess(res.data));
		} catch (error) {
			toast.dismiss();
			toast.error('Error While editing user');
		}
	};
	return (
		<Container className="pt-4">
			<Row className="d-flex justify-content-center">
				<Col xs={12} md={10} lg={8}>
					<h3 className="pb-3 text-primary">User Profile</h3>
					<Form onSubmit={handleSubmit} ref={formRef}>
						<Row>
							<Col xs={12} sm={6}>
								<FloatingLabel label="User Name" className="mb-3">
									<Form.Control
										placeholder="User Name"
										type="text"
										name="userName"
										defaultValue={currentUser.username}
										required
										disabled
									/>
									{handleErrorMessages(errorMessage.userName)}
								</FloatingLabel>
							</Col>
							<Col xs={12} sm={6}>
								<FloatingLabel label="Email" className="mb-3">
									<Form.Control
										placeholder="Enter Your Email"
										type="email"
										name="email"
										required
										disabled
										defaultValue={currentUser.email}
									/>
									{handleErrorMessages(errorMessage.email)}
								</FloatingLabel>
							</Col>
						</Row>

						<Row>
							<Col xs={12} sm={6}>
								<FloatingLabel label="First Name" className="mb-3">
									<Form.Control
										placeholder="Enter Your First Name"
										type="text"
										name="firstName"
										required
										defaultValue={currentUser.firstName}
									/>
									{handleErrorMessages(errorMessage.firstName)}
								</FloatingLabel>
							</Col>
							<Col xs={12} sm={6}>
								<FloatingLabel label="Last Name" className="mb-3">
									<Form.Control
										placeholder="Enter Your Last Name"
										type="text"
										name="lastName"
										required
										defaultValue={currentUser.lastName}
									/>
									{handleErrorMessages(errorMessage.lastName)}
								</FloatingLabel>
							</Col>
						</Row>

						<Row>
							<Col xs={12} sm={6}>
								<FloatingLabel label="Gender" className="mb-3">
									<Form.Select
										name="gender"
										defaultValue={currentUser.gender}
										required
									>
										<option disabled defaultChecked>
											Choose Your Gender
										</option>
										<option value="male">Male</option>
										<option value="female">Female</option>
									</Form.Select>

									{handleErrorMessages(errorMessage.gender)}
								</FloatingLabel>
							</Col>
							<Col xs={12} sm={6}>
								<FloatingLabel label="Nationality" className="mb-3">
									<Form.Select
										name="nationality"
										defaultValue={
											currentUser?.nationality || 'Select your nationality'
										}
									>
										<option defaultChecked value={null}>
											Select your nationality
										</option>
										{data.nationalities.map((national, idx) => (
											<option key={idx} value={national}>
												{national}
											</option>
										))}
									</Form.Select>

									{handleErrorMessages(errorMessage.gender)}
								</FloatingLabel>
							</Col>
						</Row>

						<Row>
							<Col xs={12} sm={6}>
								<FloatingLabel label="Birth Date" className="mb-3">
									<Form.Control
										placeholder="Enter Yout birth date"
										type="date"
										name="birthDate"
										required
										defaultValue={moment(currentUser.birthDate).format(
											'YYYY-MM-DD',
										)}
										// defaultValue={'2021-01-01'}
									/>
									{handleErrorMessages(errorMessage.birthDate)}
								</FloatingLabel>
							</Col>
						</Row>

						<Button variant="primary" type="submit">
							Submit
						</Button>
					</Form>
				</Col>
			</Row>
		</Container>
	);
};

export default UserProfile;
