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

const MatchesScreen = () => {
	const [matches, setMatches] = useState([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(false);
	const [show, setShow] = useState(false);
	const { currentUser } = useSelector((state) => state.user);

	useEffect(() => {
		const fetchData = async () => {
			try {
				setLoading(true);
				const { data: res } = await API.get('/matches');
				setLoading(false);
				setMatches(res.data);
			} catch (error) {
				setLoading(false);
				setError(true);
				toast.error('Error in fetching matches');
			}
		};
		fetchData();
	}, []);

	const appendMatch = (match) => {
		setMatches((prev) => [match, ...prev]);
	};

	return (
		<Container className="mt-3 pb-4">
			{show && isManager(currentUser) && (
				<AddMatchModal
					show={show}
					handleClose={() => setShow(false)}
					appendMatch={appendMatch}
				/>
			)}
			<div className="d-flex justify-content-between mb-4">
				<h2 className="text-primary "> Matches </h2>
				{isManager(currentUser) && (
					<Button
						variant="success"
						className="px-3"
						onClick={() => setShow(true)}
					>
						Add New Match
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
						matches.map((match) => <MatchCard key={match.id} match={match} />)
					)}
				</Col>
			</Row>
		</Container>
	);
};

export default MatchesScreen;
