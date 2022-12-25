import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Alert from 'react-bootstrap/Alert';
import { useEffect, useState } from 'react';
import API from '../api/api.js';
import CircularProgress from '@mui/material/CircularProgress';
import { toast } from 'react-toastify';
import StadiumCard from '../components/StadiumCard.jsx';
import { Button } from 'react-bootstrap';
import { AddStadiumModal } from '../components';
import { useSelector } from 'react-redux';
import { isManager } from '../utils';

const StadiumsScreen = () => {
	const [stadiums, setStadiums] = useState([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(false);
	const [show, setShow] = useState(false);
	const { currentUser } = useSelector((state) => state.user);

	useEffect(() => {
		const fetchData = async () => {
			try {
				setLoading(true);
				const { data: res } = await API.get('/stadiums');
				setLoading(false);
				setStadiums(res.data);
			} catch (error) {
				setLoading(false);
				setError(true);
				toast.error('Error in fetching stadiums');
			}
		};
		fetchData();
	}, []);

	const appendStadium = (stadium) => {
		setStadiums((prev) => [stadium, ...prev]);
	};

	return (
		<Container className="mt-3 pb-4">
			{show && isManager(currentUser) && (
				<AddStadiumModal
					show={show}
					handleClose={() => setShow(false)}
					appendStadium={appendStadium}
				/>
			)}
			<div className="d-flex justify-content-between mb-4">
				<h2 className="text-primary "> Stadiums </h2>
				{isManager(currentUser) && (
					<Button
						variant="success"
						className="px-3"
						onClick={() => setShow(true)}
					>
						Add New Stadium
					</Button>
				)}
			</div>
			<Row className="d-flex justify-content-center">
				<Col xs={12} md={10}>
					{loading ? (
						<CircularProgress />
					) : error ? (
						<Alert variant="danger"> erro while fetching stadiums </Alert>
					) : (
						stadiums.map((stadium) => (
							<StadiumCard key={stadium.id} stadium={stadium} />
						))
					)}
				</Col>
			</Row>
		</Container>
	);
};

export default StadiumsScreen;
