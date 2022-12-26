import React, { useRef, useState } from 'react';
import { Button, Col, FloatingLabel, Form, Row } from 'react-bootstrap';
import { toast } from 'react-toastify';
import API from '../api/api.js';
import { updateToaster } from '../utils/index.js';

const handleErrorMessages = (error) => {
	return error && <div className="text-danger mb-2">{error}</div>;
};

const ChangePasswordForm = () => {
	const formRef = useRef(null);
	const [errorMessage, setErrorMessage] = useState({});

	const handleSubmit = async (e) => {
		e.preventDefault();
		setErrorMessage({});

		let formData = new FormData(formRef.current);
		const { oldPassword, newPassword, confirmNewPassword } =
			Object.fromEntries(formData);

		const tempErrors = validateForm({
			oldPassword,
			newPassword,
			confirmNewPassword,
		});

		if (Object.keys(tempErrors).length > 0) {
			setErrorMessage(tempErrors);
			return;
		}

		const toastId = toast.loading('Updating Password...');
		try {
			// const res = await API.patch('/users/password', {
			// 	oldPassword,
			// 	newPassword,
			// });

			formRef.current.reset();
			updateToaster(
				toastId,
				'Password updates Successfully',
				toast.TYPE.SUCCESS,
			);
		} catch (error) {
			console.log(error);
			updateToaster(toastId, 'Error While updating password', toast.TYPE.ERROR);
		}
	};

	return (
		<Form onSubmit={handleSubmit} ref={formRef}>
			<Row>
				<Col xs={12} sm={6}>
					<FloatingLabel label="Old Password" className="mb-3">
						<Form.Control
							placeholder="User Name"
							type="password"
							name="oldPassword"
							required
						/>
						{handleErrorMessages(errorMessage.oldPassword4)}
					</FloatingLabel>
				</Col>
			</Row>
			<Row>
				<Col xs={12} sm={6}>
					<FloatingLabel label="new Password" className="mb-3">
						<Form.Control
							type="password"
							name="newPassword"
							required
							placeholder="new password"
						/>
						{handleErrorMessages(errorMessage.newPassword)}
					</FloatingLabel>
				</Col>
				<Col xs={12} sm={6}>
					<FloatingLabel label="Confirm New Password" className="mb-3">
						<Form.Control
							type="password"
							name="confirmNewPassword"
							placeholder="Confirm New Password"
							required
						/>
						{handleErrorMessages(errorMessage.confirmNewPassword)}
					</FloatingLabel>
				</Col>
			</Row>

			<Button variant="primary" type="submit">
				Submit
			</Button>
		</Form>
	);
};

export default ChangePasswordForm;

function validateForm(formValues) {
	const { oldPassword, newPassword, confirmNewPassword } = formValues;

	console.log(formValues);

	const errors = {};

	if (!oldPassword) {
		errors.oldPassword = 'Old Password is required';
	}

	if (!newPassword) {
		errors.newPassword = 'New Password is required';
	}

	if (!confirmNewPassword) {
		errors.confirmNewPassword = 'Confirm New Password is required';
	}

	if (oldPassword === newPassword) {
		errors.newPassword = 'New Password must be different from Old Password';
	}

	if (newPassword.length < 8) {
		errors.newPassword = 'New Password must be at least 8 characters';
	}

	if (newPassword !== confirmNewPassword) {
		errors.confirmNewPassword =
			'New Password and Confirm New Password must be the same';
	}

	return errors;
}
