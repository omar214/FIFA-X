import { useEffect, useRef, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Alert from 'react-bootstrap/Alert';
import Modal from 'react-bootstrap/Modal';
import API from '../api/api.js';
import { toast } from 'react-toastify';
import { Col, Row } from 'react-bootstrap';
import { fetchAddMatch, fetchAddStadium } from '../api/admin.js';
import { data } from '../data/index.js';

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
			mainReferee = formRef.current.mainReferee.value,
			linesMan1 = formRef.current.linesMan1.value,
			linesMan2 = formRef.current.linesMan2.value,
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
			toast.success('Match Added Successfully');
		} catch (error) {
			let msg = error.response.data.data.message;
			if (msg.includes(' already has a match that day'))
				msg = 'this team already has a match that day';

			msg = msg || 'Error in adding match';
			setErrorMessage(msg);
			console.log(msg);
			toast.error(msg);
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

						{/* Main Ref */}
						<Form.Group className="mb-3">
							<Form.Label className="fw-bold "> Main Refree</Form.Label>
							<Form.Select name="mainReferee" required>
								{data.refrees.map((referee, idx) => (
									<option key={idx} value={referee}>
										{referee}
									</option>
								))}
							</Form.Select>
						</Form.Group>

						{/* Lines Men */}
						<Row>
							<Col xs={12} md={6}>
								<Form.Group className="mb-3">
									<Form.Label className="fw-bold "> LinesMan 1</Form.Label>
									<Form.Select name="linesMan1" required>
										{data.linesMen.map((referee, idx) => (
											<option key={idx} value={referee}>
												{referee}
											</option>
										))}
									</Form.Select>
								</Form.Group>
							</Col>
							<Col xs={12} md={6}>
								<Form.Group className="mb-3">
									<Form.Label className="fw-bold "> LinesMan 2</Form.Label>
									<Form.Select name="linesMan2" required>
										{data.linesMen.map((referee, idx) => (
											<option key={idx} value={referee}>
												{referee}
											</option>
										))}
									</Form.Select>
								</Form.Group>
							</Col>
						</Row>

						{/* Date */}
						<Form.Group className="mb-3">
							<Form.Label className="fw-bold "> Date</Form.Label>
							<Form.Control
								required
								aria-label="Date of Match"
								placeholder="Date of Match"
								type="datetime-local"
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
						Add Match
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

	if (linesMan1 === linesMan2) {
		return 'LinesMan 1 and LinesMan 2 must be different';
	}

	if (new Date(date) < new Date()) {
		return 'Date must be greater than today';
	}

	return null;
}
