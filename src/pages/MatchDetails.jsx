import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Alert from 'react-bootstrap/Alert';
import { useEffect, useState } from 'react';
import API from '../api/api.js';
import CircularProgress from '@mui/material/CircularProgress';
import { toast } from 'react-toastify';
import { MatchCard, StadiumCard } from '../components';
import { Button } from 'react-bootstrap';
import { AddMatchModal } from '../components';
import { useSelector } from 'react-redux';
import { isManager } from '../utils';
import { useParams } from 'react-router-dom';

const MatchesDetails = () => {
	const [match, setMatch] = useState([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(false);
	const [show, setShow] = useState(false);
	const { currentUser } = useSelector((state) => state.user);
	const params = useParams();
	const { id } = params;

	useEffect(() => {
		const fetchData = async () => {
			try {
				setLoading(true);
				const { data: res } = await API.get(`/matches/${id}`);
				setLoading(false);
				setMatch(res.data);
			} catch (error) {
				setLoading(false);
				setError(true);
				toast.error('Error in fetching Match Details');
			}
		};
		fetchData();
	}, []);

	const editMatch = (editedMatch) => {
		setMatch(editedMatch);
	};

	return (
		<Container className="mt-3 pb-4">
			{!isPassed(match) && isManager(currentUser) && show && (
				<AddMatchModal
					show={show}
					handleClose={() => setShow(false)}
					editMatch={editMatch}
					match={match}
					isEdit={true}
				/>
			)}
			<div className="d-flex justify-content-between mb-4">
				<h2 className="text-primary "> Match Details </h2>
				{isManager(currentUser) && !isPassed(match) && (
					<Button
						variant="success"
						className="px-3"
						onClick={() => setShow(true)}
					>
						Edit Match
					</Button>
				)}
			</div>
			<Row className="d-flex justify-content-center">
				<Col xs={12} md={10}>
					{loading ? (
						<h4>Loading .... </h4>
					) : error ? (
						<Alert variant="danger"> erro while fetching stadiums </Alert>
					) : (
						<MatchCard match={match} showDetails={false} />
					)}
				</Col>
			</Row>
		</Container>
	);
};

export default MatchesDetails;

function isPassed(match) {
	const date = new Date(match.date);
	const now = new Date();
	return date < now;
}
