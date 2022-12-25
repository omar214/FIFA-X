import { useRef, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Alert from 'react-bootstrap/Alert';
import Modal from 'react-bootstrap/Modal';
import API from '../api/api.js';
import { toast } from 'react-toastify';
import { Col, Row } from 'react-bootstrap';
import { fetchAddStadium } from '../api/admin.js';

function AddStadiumModal({ handleClose, show, appendStadium }) {
	const formRef = useRef(null);
	const [errorMessage, setErrorMessage] = useState('');

	const handleAddStadium = async (e) => {
		e.preventDefault();

		let name = formRef.current.name.value.trim(),
			description = formRef.current.description.value.trim(),
			width = formRef.current.width.value.trim(),
			height = formRef.current.height.value.trim(),
			image = formRef.current.image.files[0];

		setErrorMessage('');
		console.log(image);
		if (!name || !description || !width || !height || !image)
			return setErrorMessage('Please Enter All Fields');

		if (width < 10 || height < 10) {
			return setErrorMessage('Width and Height must be greater than 10');
		}

		if (width > 50 || height > 50) {
			return setErrorMessage('Width and Height must be less than 50');
		}

		try {
			const res = await fetchAddStadium({
				name,
				description,
				width,
				height,
				image,
			});

			appendStadium(res.data);

			formRef.current.reset();
			toast.success('Stadium Added Successfully');
			handleClose();
		} catch (error) {
			setErrorMessage('Error while Adding Stadium');
			toast.error('Error while Adding Stadium');
			console.log(error);
		}
	};

	return (
		<>
			<Modal show={show} onHide={handleClose}>
				<Modal.Header closeButton>
					<Modal.Title className="text-primary">Add New Stadium</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<Form onSubmit={handleAddStadium} ref={formRef}>
						<Form.Group className="mb-3">
							<Form.Label className="fw-bold "> Name</Form.Label>
							<Form.Control
								required
								placeholder="enter Stadium name"
								type="text"
								name="name"
							/>
						</Form.Group>

						<Form.Group className="mb-3">
							<Form.Label className="fw-bold "> Description</Form.Label>
							<Form.Control
								required
								placeholder="enter Description"
								type="text"
								name="description"
							/>
						</Form.Group>

						<Row>
							<Col>
								<Form.Group className="mb-3">
									<Form.Label className="fw-bold "> width</Form.Label>
									<Form.Control
										required
										placeholder="Vip lounge width"
										type="number"
										name="width"
									/>
								</Form.Group>
							</Col>
							<Col>
								<Form.Group className="mb-3">
									<Form.Label className="fw-bold "> height</Form.Label>
									<Form.Control
										required
										placeholder="Vip lounge height"
										type="number"
										name="height"
									/>
								</Form.Group>
							</Col>
						</Row>

						<Form.Group className="mb-3">
							<Form.Label className="fw-bold "> Image</Form.Label>
							<Form.Control
								required
								placeholder="enter Image"
								type="file"
								accept="image/*"
								name="image"
							/>
						</Form.Group>

						{errorMessage && <Alert variant="danger">{errorMessage}</Alert>}
					</Form>
				</Modal.Body>
				<Modal.Footer>
					<Button variant="danger" onClick={handleClose}>
						Close
					</Button>
					<Button variant="success" onClick={handleAddStadium}>
						Add Stadium
					</Button>
				</Modal.Footer>
			</Modal>
		</>
	);
}

export default AddStadiumModal;
