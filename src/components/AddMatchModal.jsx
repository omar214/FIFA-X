import { useEffect, useRef, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Alert from 'react-bootstrap/Alert';
import Modal from 'react-bootstrap/Modal';
import API from '../api/api.js';
import { toast } from 'react-toastify';
import { Col, Row } from 'react-bootstrap';
import { fetchAddMatch, fetchAddStadium } from '../api/admin.js';

function addMatchModal({ handleClose, show, appendMatch }) {
	const formRef = useRef(null);
	const [errorMessage, setErrorMessage] = useState('');
	const [teams, setTeams] = useState([]);
	const [stadiums, setStadiums] = useState([]);

	useEffect(() => {
		const fetchData = async () => {
			try {
				const { data: res } = await API.get('/teams');
				setTeams(res.data);

				const { data: res2 } = await API.get('/stadiums');
				setStadiums(res2.data);
			} catch (error) {
				toast.error('Error in fetching teams or stadiums');
			}
		};
		fetchData();
	}, []);

	const handleAddMatch = async (e) => {
		e.preventDefault();
		setErrorMessage('');

		let team1 = formRef.current.team1.value,
			team2 = formRef.current.team2.value,
			stadium = formRef.current.stadium.value,
			mainReferee = formRef.current.mainReferee.value.trim(),
			linesMan1 = formRef.current.linesMan1.value.trim(),
			linesMan2 = formRef.current.linesMan2.value.trim(),
			date = formRef.current.date.value;

		const temp = validateForm({
			team1,
			team2,
			stadium,
			mainReferee,
			linesMan1,
			linesMan2,
			date,
		});

		if (temp) return setErrorMessage(temp);

		try {
			const res = await fetchAddMatch({
				team1,
				team2,
				stadium,
				mainReferee,
				linesMan1,
				linesMan2,
				date,
			});
			appendMatch(res.data);
			formRef.current.reset();
			handleClose();
		} catch (error) {
			setErrorMessage('Error while Adding Stadium');
			console.log(error);
		}
	};

	return (
		<>
			<Modal show={show} onHide={handleClose}>
				<Modal.Header closeButton>
					<Modal.Title className="text-primary">Add New Match</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<Form onSubmit={handleAddMatch} ref={formRef}>
						{/* team 1 */}
						<Form.Group className="mb-3">
							<Form.Label className="fw-bold "> Team 1</Form.Label>
							<Form.Select name="team1">
								{teams.map((team) => (
									<option key={team.id} value={team.id}>
										{team.name}
									</option>
								))}
							</Form.Select>
						</Form.Group>

						{/* Team 2 */}
						<Form.Group className="mb-3">
							<Form.Label className="fw-bold "> Team 2</Form.Label>
							<Form.Select name="team2">
								{teams.map((team) => (
									<option key={team.id} value={team.id}>
										{team.name}
									</option>
								))}
							</Form.Select>
						</Form.Group>

						{/* Stadium */}
						<Form.Group className="mb-3">
							<Form.Label className="fw-bold "> Stadium</Form.Label>
							<Form.Select name="stadium" defaultValue="Team 2">
								{stadiums.map((stadium) => (
									<option key={stadium.id} value={stadium.id}>
										{stadium.name}
									</option>
								))}
							</Form.Select>
						</Form.Group>

						{/* Main Reg */}
						<Form.Group className="mb-3">
							<Form.Label className="fw-bold "> Main Refree</Form.Label>
							<Form.Control
								required
								placeholder="Main Refree"
								type="text"
								name="mainReferee"
							/>
						</Form.Group>

						{/* Lines Men */}
						<Row>
							<Col xs={12} md={6}>
								<Form.Group className="mb-3">
									<Form.Label className="fw-bold "> LinesMan 1</Form.Label>
									<Form.Control
										required
										placeholder="first LinesMan"
										type="text"
										name="linesMan1"
									/>
								</Form.Group>
							</Col>
							<Col xs={12} md={6}>
								<Form.Group className="mb-3">
									<Form.Label className="fw-bold "> LinesMan 2</Form.Label>
									<Form.Control
										required
										placeholder="second LinesMan"
										type="text"
										name="linesMan2"
									/>
								</Form.Group>
							</Col>
						</Row>

						{/* Date */}
						<Form.Group className="mb-3">
							<Form.Label className="fw-bold "> Date</Form.Label>
							<Form.Control
								required
								placeholder="Date of Match"
								type="date"
								name="date"
							/>
						</Form.Group>
						{errorMessage && <Alert variant="danger">{errorMessage}</Alert>}
					</Form>
				</Modal.Body>
				<Modal.Footer>
					<Button variant="danger" onClick={handleClose}>
						Close
					</Button>
					<Button variant="success" onClick={handleAddMatch}>
						Add Stadium
					</Button>
				</Modal.Footer>
			</Modal>
		</>
	);
}

export default addMatchModal;

function validateForm(data) {
	const { team1, team2, stadium, mainReferee, linesMan1, linesMan2, date } =
		data;

	console.log(data);
	if (
		!team1 ||
		!team2 ||
		!stadium ||
		!mainReferee ||
		!linesMan1 ||
		!linesMan2 ||
		!date
	) {
		return 'All fields are required';
	}

	if (team1 === 'team1' || team2 === 'team2' || stadium === 'stadium') {
		return 'All fields are required';
	}

	if (team1 === team2) {
		return 'Team 1 and Team 2 must be different';
	}

	if (new Date(date) < new Date()) {
		return 'Date must be greater than today';
	}

	return null;
}
