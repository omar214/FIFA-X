import moment from 'moment';
import React from 'react';
import { Button, Col, Row } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import API from '../api/api.js';
import { updateToaster } from '../utils/index.js';
import TicketsTable from './TicketsTable.jsx';

const ReservationCard = ({ reservation, onCancel }) => {
	const handleCancel = async () => {
		const toastId = toast.loading('Cancelling  Reservation ...');
		try {
			const url = `matches/${reservation.match.id}/reservations/${reservation.orderId}`;
			const { data: res } = await API.delete(url);
			onCancel(reservation.orderId);
			updateToaster(
				toastId,
				'Reservation cancelled successfully',
				toast.TYPE.SUCCESS,
			);
		} catch (error) {
			console.log(error);
			updateToaster(
				toastId,
				'Error while Cancelling Reservation',
				toast.TYPE.ERROR,
			);
		}
	};
	return (
		<div className="w-md-50 p-3 shadow-lg rounded-4 mb-3">
			<Row>
				<Col className="text-center ">
					<LinkContainer to={`/matches/${reservation.match.id}`}>
						<h2 className="text-primary border-bottom d-inline-block pb-3 cursor-pointer">
							{reservation.match.name}
						</h2>
					</LinkContainer>
				</Col>
			</Row>
			<Row className="mb-2 mb-md-3 justify-content-center">
				<Col className="d-flex flex-column justify-content-center align-items-center text-center">
					<h5 className="fw-bold mt-2">
						Date :
						<span className="text-primary ms-2">
							{hasPassed(reservation.match.date)
								? `Ended : ${moment(reservation.match.date).fromNow()}`
								: moment(reservation.match.date).format('DD/MM/YYYY -  h:mm a')}
						</span>
					</h5>
					<h5 className="fw-bold mt-2">
						OrderId :
						<span className="text-primary ms-2">{reservation.orderId}</span>
					</h5>
					<h5 className="fw-bold mt-2">
						Seat Price :
						<span className="text-primary ms-2">
							{reservation.match.seatPrice} $
						</span>
					</h5>
					<h5 className="fw-bold mt-2">
						Stadium :
						<span className="text-primary ms-2">
							{reservation.match.stadium.name}
						</span>
					</h5>
				</Col>

				<Col className="d-flex flex-column justify-content-center align-items-center">
					<TicketsTable tickets={reservation.reservations} />
				</Col>
			</Row>
			{canCancel(reservation.match.date) && (
				<Row>
					<Col className="d-flex  justify-content-end align-items-center">
						<Button
							variant="secondary"
							className="px-3 rounded-3"
							onClick={handleCancel}
						>
							Cancel Reservations
						</Button>
					</Col>
				</Row>
			)}
		</div>
	);
};

export default ReservationCard;

function hasPassed(date) {
	const today = new Date();
	const matchDate = new Date(date);
	return matchDate < today;
}

function canCancel(date) {
	const today = new Date();
	const matchDate = new Date(date);
	const threeDays = 3 * 24 * 60 * 60 * 1000;

	if (typeof date !== 'string') return false;
	if (typeof matchDate !== 'object') return false;

	const diff = matchDate - today;

	// if passed or less than 3 days
	return diff > threeDays;
}
