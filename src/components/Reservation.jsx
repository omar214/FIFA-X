import { CircularProgress } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { Alert, Button, Col, Row, Table } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { fetchReservations } from '../api/admin.js';
import PaypalCheckoutButton from './PaypalCheckoutButton.jsx';

const Reservation = ({ match }) => {
	const [width, setWidth] = useState(0);
	const [height, setHeight] = useState(0);

	const [userReservations, setUserReservations] = useState([]);
	const [reservations, setReservations] = useState({});

	const [loading, setLoading] = useState(false);
	const [error, setError] = useState(false);
	const { currentUser } = useSelector((state) => state.user);

	useEffect(() => {
		setLoading(true);
		const fetchData = async () => {
			try {
				const res = await fetchReservations(match.id);
				setReservations(res.data);

				setLoading(false);
				setError(false);

				const tempWidth = match?.stadium?.VIPlounge?.width || 0;
				const tempHeight = match?.stadium?.VIPlounge?.height || 0;
				setWidth(tempWidth);
				setHeight(tempHeight);
			} catch (error) {
				console.log(error);
				setLoading(false);
				setError(true);
			}
		};
		match?.id && fetchData();
	}, [match]);

	const handleReserve = (row, col) => {
		let isFound = isReserved(
			reservations.map((el) => el.seat),
			row,
			col,
		);
		if (isFound) {
			toast.dismiss();
			toast.error('This seat is already reserved');
			return;
		}

		if (!currentUser) {
			toast.dismiss();
			toast.info('Please login to reserve a seat');
			return;
		}

		isFound = isUserReserved(userReservations, row, col);
		let tempUserReservation = deepCopy(userReservations);
		if (isFound) {
			tempUserReservation = tempUserReservation.filter(
				(el) => el.x !== row || el.y !== col,
			);
		} else {
			tempUserReservation.push({ x: row, y: col });
		}

		setUserReservations(tempUserReservation);
	};

	if (loading) {
		return <CircularProgress />;
	}
	if (error) {
		return (
			<Alert variant="danger" className="mt-3">
				Error while fetching Reservations
			</Alert>
		);
	}

	return (
		<>
			<div
				style={{
					maxHeight: '600px',
					overflow: 'auto',
				}}
			>
				<Table hover responsive bordered className="mh-100">
					{/* The head of table */}
					<thead className="border-bottom border-2 border-dark">
						<tr className="text-primary fw-bold text-center">
							<th className="vertical-center">Row\Col</th>
							{[...Array(width)].map((e, idx) => (
								<th key={idx} className="vertical-center">
									C {idx + 1}
								</th>
							))}
						</tr>
					</thead>

					{/* Real Data */}
					<tbody>
						{[...Array(height)].map((e, colNum) => (
							<tr key={colNum} className="my-2">
								<td className="text-primary fw-bold text-center">
									R {colNum + 1}
								</td>

								{[...Array(width)].map((e, rowNum) => (
									<td key={rowNum} className="text-center">
										<span
											className={`reserve-span mx-2 ${handleReservationColor(
												reservations.map((el) => el.seat),
												userReservations,
												rowNum + 1,
												colNum + 1,
											)}`}
											onClick={() => handleReserve(rowNum + 1, colNum + 1)}
										/>
									</td>
								))}
							</tr>
						))}
					</tbody>
				</Table>
			</div>
			{currentUser && (
				<Row className="mt-3">
					<Col>
						<h3 className="text-primary">Confirm Reservation</h3>
						<div className="w-100">
							<PaypalCheckoutButton
								isDisabled={userReservations.length === 0}
								seats={userReservations}
								setReservations={setReservations}
								setUserReservations={setUserReservations}
							/>
						</div>
					</Col>
				</Row>
			)}
		</>
	);
};

export default Reservation;

function isReserved(seats, row, col) {
	return seats.some((seat) => seat.x === row && seat.y === col);
}

function isUserReserved(seats, row, col) {
	return seats.some((seat) => seat.x === row && seat.y === col);
}

function handleReservationColor(seats, userSeats, row, col) {
	if (isReserved(seats, row, col)) {
		return 'bg-danger';
	} else if (isUserReserved(userSeats, row, col)) {
		return 'bg-success';
	} else {
		return 'bg-secondary';
	}
}

function deepCopy(obj) {
	return JSON.parse(JSON.stringify(obj));
}
