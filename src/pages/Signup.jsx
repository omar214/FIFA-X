import { Col, Row, Alert, Container, Form, Button } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loginStart, loginSuccess, loginFailure } from '../redux/userSlice.js';
import { FloatingLabel } from 'react-bootstrap';
import { extractValues, validateSignup } from '../utils/validateSignup.js';
import { fetchNationalities, fetchSignup } from '../api/user.js';
import { toast } from 'react-toastify';
import { data } from '../data';

const handleErrorMessages = (error) => {
	return error && <div className="text-danger mb-2">{error}</div>;
};

function Signup() {
	const formRef = useRef(null);
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const [errorMessage, setErrorMessage] = useState({});
	const { currentUser } = useSelector((state) => state.user);

	useEffect(() => {
		currentUser && navigate('/');
	}, [currentUser, navigate]);

	const handleSubmit = async (e) => {
		e.preventDefault();
		const formValues = extractValues(formRef.current);
		const tempErrors = validateSignup(formValues);
		console.log('formValues \t', formValues);
		if (tempErrors.nationality) {
			delete formValues.nationality;
			delete tempErrors.nationality;
		}
		console.log('erros \t', tempErrors);
		console.log('formValues \t', formValues);
		setErrorMessage(tempErrors);
		if (Object.keys(tempErrors).length > 0) return;

		dispatch(loginStart());
		try {
			const res = await fetchSignup(formValues);

			formRef.current.reset();
			localStorage.setItem('access-token', res.data.token);
			delete res.data.token;
			dispatch(loginSuccess(res.data));
			navigate('/');
		} catch (error) {
			dispatch(loginFailure('Invalid email or password'));
			toast.dismiss();
			toast.error(error.response.data.data.message);
			if (error.response.status === 409) {
				setErrorMessage(['Email already exists']);
			}
		}
	};
	return (
		<Container className="pt-4">
			<Row className="d-flex justify-content-center">
				<Col xs={12} md={8}>
					<h3 className="pb-3">Sign up</h3>
					<Form onSubmit={handleSubmit} ref={formRef}>
						<Row>
							<Col>
								<FloatingLabel label="User Name" className="mb-3">
									<Form.Control
										placeholder="User Name"
										type="text"
										name="userName"
										required
									/>
									{handleErrorMessages(errorMessage.userName)}
								</FloatingLabel>
							</Col>
							<Col>
								<FloatingLabel label="Email" className="mb-3">
									<Form.Control
										placeholder="Enter Your Email"
										type="email"
										name="email"
										required
									/>
									{handleErrorMessages(errorMessage.email)}
								</FloatingLabel>
							</Col>
						</Row>

						<Row>
							<Col>
								<FloatingLabel label="First Name" className="mb-3">
									<Form.Control
										placeholder="Enter Your First Name"
										type="text"
										name="firstName"
										required
									/>
									{handleErrorMessages(errorMessage.firstName)}
								</FloatingLabel>
							</Col>
							<Col>
								<FloatingLabel label="Last Name" className="mb-3">
									<Form.Control
										placeholder="Enter Your Last Name"
										type="text"
										name="lastName"
										required
									/>
									{handleErrorMessages(errorMessage.lastName)}
								</FloatingLabel>
							</Col>
						</Row>

						<Row>
							<Col>
								<FloatingLabel label="Password" className="mb-3">
									<Form.Control
										placeholder="Enter Your Last Password"
										type="password"
										name="password"
										required
									/>
									{handleErrorMessages(errorMessage.password)}
								</FloatingLabel>
							</Col>
							<Col>
								<FloatingLabel label="Confirm Password" className="mb-3">
									<Form.Control
										placeholder="Enter Your Confirm Password"
										type="password"
										name="confirmPassword"
										required
									/>
									{handleErrorMessages(errorMessage.confirmPassword)}
								</FloatingLabel>
							</Col>
						</Row>

						<FloatingLabel label="Gender" className="mb-3">
							<Form.Select
								name="gender"
								defaultValue={'choose your value'}
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

						<FloatingLabel label="Birth Date" className="mb-3">
							<Form.Control
								placeholder="Enter Yout birth date"
								type="date"
								name="birthDate"
								required
							/>
							{handleErrorMessages(errorMessage.birthDate)}
						</FloatingLabel>
						<FloatingLabel label="Nationality" className="mb-3">
							<Form.Select
								name="nationality"
								defaultValue={'Select your nationality'}
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

						<Button variant="primary" type="submit">
							Submit
						</Button>

						<p className="mt-3">
							Already have an account?
							<Link to="/login" variant="info" className="ms-2">
								Log-In{' '}
							</Link>
						</p>
					</Form>
				</Col>
			</Row>
		</Container>
	);
}

export default Signup;
