import { Button, Form, Container, Row, Col, Alert } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { useEffect, useRef, useState } from 'react';
import API from '../api/api.js';
import { useDispatch, useSelector } from 'react-redux';
import { loginStart, loginSuccess, loginFailure } from '../redux/userSlice.js';
import { fetchLogin } from '../api/user.js';

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

		setErrorMessage('');
		const email = formRef.current.email.value.trim(),
			password = formRef.current.password.value;
		if (!email || !password) {
			setErrorMessage('Please fill all fields');
			return;
		}

		dispatch(loginStart());
		try {
			const res = await fetchLogin({ email, password });
			formRef.current.reset();
			localStorage.setItem('access-token', res.data.token);
			delete res.data.token;

			dispatch(loginSuccess(res.data));
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
		<Container className="mt-3">
			<Row className="d-flex justify-content-center">
				<Col xs={12} md={8} lg={6}>
					<h3 className="text-primary">Log in</h3>
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

						<p className="mt-3">
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
