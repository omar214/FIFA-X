import { Container, Row, Col, Alert, Button } from 'react-bootstrap';

import { useEffect, useState } from 'react';
import API from '../api/api.js';
import CircularProgress from '@mui/material/CircularProgress';
import { toast } from 'react-toastify';
import { ReservationCard } from '../components';

const UserReservation = () => {
	const [reservations, setReservations] = useState([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(false);

	useEffect(() => {
		const fetchData = async () => {
			setLoading(true);
			try {
				const { data: tempRes } = await API.get('/users/reservations');
				setReservations(tempRes.data);
				setLoading(false);
			} catch (error) {
				setLoading(false);
				setError(true);
				toast.error('Error in fetching Reservations');
			}
		};
		fetchData();
	}, []);

	const onCancel = (id) => {
		setReservations((prev) =>
			prev.filter((reserve) => reserve.orderId !== id),
		);
	};

	return (
		<Container className="mt-3 pb-4">
			<Row className="mb-4 text-left">
				<Col>
					<h2 className="text-primary "> User Reservations </h2>
				</Col>
			</Row>
			<Row className="d-flex justify-content-center">
				<Col xs={12} md={10}>
					{loading ? (
						<CircularProgress />
					) : error ? (
						<Alert variant="danger"> error while fetching Reservations </Alert>
					) : (
						reservations.map((el, idx) => (
							<ReservationCard
								key={idx}
								reservation={el}
								onCancel={(id) => onCancel(id)}
							/>
						))
					)}
				</Col>
			</Row>
		</Container>
	);
};

export default UserReservation;
