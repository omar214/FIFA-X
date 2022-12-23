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

const UserProfile = () => {
	const dispatch = useDispatch();
	const [errorMessage, setErrorMessage] = useState([]);
	const [isSuccess, setIsSucess] = useState(false);
	const formRef = useRef(null);
	const { currentUser } = useSelector((state) => state.user);

	useProtection({ isAdmin: false });

	const handleSubmit = async (e) => {
		e.preventDefault();
		const formValues = extractValues(formRef.current);
		const tempErrors = validateSignup(formValues);

		setErrorMessage(tempErrors);
		// try {
		// 	const { data: res } = await API.put(`/users/${currentUser._id}`, {
		// 		name,
		// 		email,
		// 		password: newPassword,
		// 	});
		// 	formRef.current.reset();
		// 	setIsSucess(true);

		// 	dispatch(loginSuccess(res.user));
		// } catch (error) {
		// 	toast.dismiss();
		// 	toast.error('Error While editing user');
		// }
	};
	return (
		<Container>
			{!currentUser ? (
				<Alert variant="info">
					You Are not logged in <Link to="/login"> Sign In</Link>
				</Alert>
			) : (
				<>
					<Row className="justify-content-center mb-5">
						<Col md={6}>
							<h2 className="mb-3">User Profile</h2>
							<Form onSubmit={handleSubmit} ref={formRef}>
								<FloatingLabel label="User Name" className="mb-3">
									<Form.Control
										placeholder="User Name"
										type="text"
										name="userName"
										required
										defaultValue={currentUser.email}
										disabled
									/>
									{errorMessage.userName && (
										<div className="text-danger mb-1">
											{errorMessage.userName}
										</div>
									)}
								</FloatingLabel>
								<FloatingLabel label="Email" className="mb-3">
									<Form.Control
										placeholder="Enter Your Email"
										type="email"
										name="email"
										required
										defaultValue={currentUser.email}
										disabled
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
										<div className="text-danger mb-1">
											{errorMessage.firstName}
										</div>
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
										<div className="text-danger mb-1">
											{errorMessage.lastName}
										</div>
									)}
								</FloatingLabel>
								<FloatingLabel label="New Password" className="mb-3">
									<Form.Control
										placeholder="Enter Your New Password"
										type="password"
										name="password"
										required
									/>
									{errorMessage.password && (
										<div className="text-danger mb-1">
											{errorMessage.password}
										</div>
									)}
								</FloatingLabel>
								<FloatingLabel label="Confirm New Password" className="mb-3">
									<Form.Control
										placeholder="Confirm New Password"
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
									<div className="text-danger mb-1">
										{errorMessage.birthDate}
									</div>
								)}

								<Button type="submit">Submit</Button>
							</Form>
						</Col>
					</Row>
				</>
			)}
		</Container>
	);
};

export default UserProfile;
