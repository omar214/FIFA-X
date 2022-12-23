import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Alert from 'react-bootstrap/Alert';
import Col from 'react-bootstrap/Col';
import { Link, useNavigate } from 'react-router-dom';
import { useEffect, useRef, useState } from 'react';
import API from '../api/api.js';
import { useDispatch, useSelector } from 'react-redux';
import { loginStart, loginSuccess, loginFailure } from '../redux/userSlice.js';
import { FloatingLabel } from 'react-bootstrap';
import { extractValues, validateSignup } from '../utils/validateSignup.js';

function Signup() {
	const formRef = useRef(null);
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const [errorMessage, setErrorMessage] = useState({});
	const { currentUser } = useSelector((state) => state.user);

	useEffect(() => {
		currentUser && navigate('/');
	}, [currentUser, navigate]);

	const handleErrorMessages = (error) => {
		return error && <div className="text-danger mb-2">asdas</div>;
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		const formValues = extractValues(formRef.current);
		const tempErrors = validateSignup(formValues);
		console.log('erros \t', tempErrors);
		setErrorMessage(tempErrors);

		// dispatch(loginStart());
		// try {
		// 	const { data: res } = await API.post('/auth/signup', {
		// 		userName: formValues.userName,
		// 		email: formValues.email,
		// 		firstName: formValues.firstName,
		// 		lastName: formValues.lastName,
		// 		password: formValues.password,
		// 		gender: formValues.gender,
		// 		birthDate: formValues.birthDate,
		// 	});
		// 	formRef.current.reset();
		// 	localStorage.setItem('access-token', res.token);

		// 	dispatch(loginSuccess(res.user));
		// 	navigate('/');
		// } catch (error) {
		// 	dispatch(loginFailure('Invalid email or password'));
		// 	if (error.response.status === 409) {
		// 		setErrorMessage(['Email already exists']);
		// 	}
		// }
	};
	return (
		<Container>
			<Row className="d-flex justify-content-center">
				<Col sm={6}>
					<h3>Sign up</h3>
					<Form onSubmit={handleSubmit} ref={formRef}>
						<FloatingLabel label="User Name" className="mb-3">
							<Form.Control
								placeholder="User Name"
								type="text"
								name="userName"
								required
							/>
							{errorMessage.userName && (
								<div className="text-danger mb-1">{errorMessage.userName}</div>
							)}
						</FloatingLabel>
						<FloatingLabel label="Email" className="mb-3">
							<Form.Control
								placeholder="Enter Your Email"
								type="email"
								name="email"
								required
							/>
							{errorMessage.email && (
								<div className="text-danger mb-1">{errorMessage.email}</div>
							)}
						</FloatingLabel>
						<FloatingLabel label="First Name" className="mb-3">
							<Form.Control
								placeholder="Enter Your First Name"
								type="text"
								name="firstName"
								required
							/>
							{errorMessage.firstName && (
								<div className="text-danger mb-1">{errorMessage.firstName}</div>
							)}
						</FloatingLabel>
						<FloatingLabel label="Last Name" className="mb-3">
							<Form.Control
								placeholder="Enter Your Last Name"
								type="text"
								name="lastName"
								required
							/>
							{errorMessage.lastName && (
								<div className="text-danger mb-1">{errorMessage.lastName}</div>
							)}
						</FloatingLabel>
						<FloatingLabel label="Password" className="mb-3">
							<Form.Control
								placeholder="Enter Your Last Password"
								type="password"
								name="password"
								required
							/>
							{errorMessage.password && (
								<div className="text-danger mb-1">{errorMessage.password}</div>
							)}
						</FloatingLabel>
						<FloatingLabel label="Confirm Password" className="mb-3">
							<Form.Control
								placeholder="Enter Your Confirm Password"
								type="password"
								name="confirmPassword"
								required
							/>
							{errorMessage.confirmPassword && (
								<div className="text-danger mb-1">
									{errorMessage.confirmPassword}
								</div>
							)}
						</FloatingLabel>
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
						</FloatingLabel>
						{errorMessage.gender && (
							<div className="text-danger mb-1">{errorMessage.gender}</div>
						)}
						<FloatingLabel label="Birth Date" className="mb-3">
							<Form.Control
								placeholder="Enter Yout birth date"
								type="date"
								name="birthDate"
								required
							/>
						</FloatingLabel>
						{errorMessage.birthDate && (
							<div className="text-danger mb-1">{errorMessage.birthDate}</div>
						)}

						<Button variant="primary" type="submit">
							Submit
						</Button>

						<p>
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
