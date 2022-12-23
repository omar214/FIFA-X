import { Button, Form, Container, Row, Col, Alert } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { useEffect, useRef, useState } from 'react';
import API from '../api/api.js';
import { useDispatch, useSelector } from 'react-redux';
import { loginStart, loginSuccess, loginFailure } from '../redux/userSlice.js';

function Login() {
	const formRef = useRef(null);
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const [errorMessage, setErrorMessage] = useState('');
	const { currentUser } = useSelector((state) => state.user);

	useEffect(() => {
		currentUser && navigate('/');
	}, [currentUser, navigate]);

	const handleSubmit = async (e) => {
		e.preventDefault();
		console.log(import.meta.env.REACT_APP_API_URL);

		setErrorMessage('');
		const email = formRef.current.email.value.trim(),
			password = formRef.current.password.value.trim();
		if (!email || !password) {
			setErrorMessage('Please fill all fields');
			return;
		}

		dispatch(loginStart());
		try {
			const { data: res } = await API.post('/auth/login', {
				email,
				password,
			});
			formRef.current.reset();
			localStorage.setItem('access-token', res.token);

			dispatch(loginSuccess(res.user));
			navigate('/');
		} catch (error) {
			dispatch(loginFailure('Invalid email or password'));
			const status = error.response.status;

			if (status === 401) setErrorMessage('Invalid email or password');
			else if (status === 404) setErrorMessage('User not found');
			else setErrorMessage('Something went wrong');
		}
	};

	return (
		<Container>
			<Row className="d-flex justify-content-center">
				<Col sm={6}>
					<h3>Log in</h3>
					<Form onSubmit={handleSubmit} ref={formRef}>
						<Form.Group className="mb-3" controlId="formBasicEmail">
							<Form.Label>Email address</Form.Label>
							<Form.Control
								type="email"
								placeholder="Enter email"
								name="email"
							/>
						</Form.Group>

						<Form.Group className="mb-3" controlId="formBasicPassword">
							<Form.Label>Password</Form.Label>
							<Form.Control
								type="password"
								placeholder="Password"
								name="password"
							/>
						</Form.Group>
						{errorMessage && <Alert variant="danger">{errorMessage}</Alert>}

						<Button variant="primary" type="submit">
							Submit
						</Button>

						<p>
							Don't have Email ?
							<Link to="/signup" variant="info" className="ms-2">
								Create your account
							</Link>
						</p>
					</Form>
				</Col>
			</Row>
		</Container>
	);
}

export default Login;
