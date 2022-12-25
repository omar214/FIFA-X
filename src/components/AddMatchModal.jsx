import { useEffect, useRef, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Alert from 'react-bootstrap/Alert';
import Modal from 'react-bootstrap/Modal';
import API from '../api/api.js';
import { toast } from 'react-toastify';
import { Col, Row } from 'react-bootstrap';
import {
	fetchAddMatch,
	fetchAddStadium,
	fetchEditMatch,
} from '../api/admin.js';
import { data } from '../data/index.js';
import moment from 'moment';

function addMatchModal({
	handleClose,
	show,
	appendMatch,
	isEdit = false,
	editMatch,
	match,
}) {
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

		const stadiumObj = stadiums.find((s) => s.id === stadium);
		if (isEdit && stadiumObj && !isBiggerStadium(stadiumObj, match.stadium)) {
			return setErrorMessage('Stadium is smaller than the previous one');
		}

		const objToSend = {
			team1,
			team2,
			stadium,
			mainReferee,
			linesMan1,
			linesMan2,
			date,
		};
		try {
			let res, sucessMsg;
			if (isEdit) {
				res = await fetchEditMatch(match.id, objToSend);
				editMatch(res.data);
				sucessMsg = 'Match Edited Successfully';
			} else {
				res = await fetchAddMatch(objToSend);
				appendMatch(res.data);
				sucessMsg = 'Match Added Successfully';
			}
			formRef.current.reset();
			handleClose();
			toast.success(sucessMsg);
		} catch (error) {
			console.log(error);

			let msg = error?.response?.data?.data?.message || '';
			if (msg.includes(' already has a match that day'))
				msg = 'this team already has a match that day';

			msg = msg || `Error in ${isEdit ? 'Editing' : 'Adding'} match`;
			setErrorMessage(msg);
			toast.error(msg);
		}
	};

	return (
		<>
			<Modal show={show} onHide={handleClose}>
				<Modal.Header closeButton>
					<Modal.Title className="text-primary">
						{isEdit ? 'Edit Match' : 'Add New Match'}
					</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<Form onSubmit={handleAddMatch} ref={formRef}>
						{/* team 1 */}
						<Form.Group className="mb-3">
							<Form.Label className="fw-bold "> Team 1</Form.Label>
							<Form.Select name="team1" disabled={isEdit}>
								{teams.map((team) => (
									<option
										key={team.id}
										value={team.id}
										selected={isEdit && match.team1.id === team.id}
									>
										{team.name}
									</option>
								))}
							</Form.Select>
						</Form.Group>

						{/* Team 2 */}
						<Form.Group className="mb-3">
							<Form.Label className="fw-bold "> Team 2</Form.Label>
							<Form.Select name="team2" disabled={isEdit}>
								{teams.map((team) => (
									<option
										key={team.id}
										value={team.id}
										selected={isEdit && match.team2.id === team.id}
									>
										{team.name}
									</option>
								))}
							</Form.Select>
						</Form.Group>

						{/* Stadium */}
						<Form.Group className="mb-3">
							<Form.Label className="fw-bold "> Stadium</Form.Label>
							<Form.Select name="stadium" disabled={isEdit}>
								{stadiums.map((stadium) => (
									<option
										key={stadium.id}
										value={stadium.id}
										selected={isEdit && match.stadium.id === stadium.id}
									>
										{stadium.name} ( {stadium.VIPlounge.width} *{' '}
										{stadium.VIPlounge.height} )
									</option>
								))}
							</Form.Select>
						</Form.Group>

						{/* Main Ref */}
						<Form.Group className="mb-3">
							<Form.Label className="fw-bold "> Main Refree</Form.Label>
							<Form.Select
								name="mainReferee"
								defaultValue={isEdit && match.mainReferee}
								required
							>
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
									<Form.Select
										name="linesMan1"
										defaultValue={isEdit && match.linesMan1}
										required
									>
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
									<Form.Select
										name="linesMan2"
										defaultValue={isEdit && match.linesMan2}
										required
									>
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
								defaultValue={
									isEdit && moment(match.date).format('YYYY-MM-DDTHH:mm')
								}
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
						{isEdit ? 'Edit' : 'Add'} Match
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

function isBiggerStadium(stadium1, stadium2) {
	return (
		stadium1.VIPlounge.width >= stadium2.VIPlounge.width &&
		stadium1.VIPlounge.height >= stadium2.VIPlounge.height
	);
}
