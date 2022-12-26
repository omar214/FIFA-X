import moment from 'moment';
import React from 'react';
import { Col, Row } from 'react-bootstrap';
import TicketsTable from './TicketsTable.jsx';

const ReservationCard = ({ reservation }) => {
	return (
		<div className="w-md-50 p-3 shadow-lg rounded-4 mb-3">
			<Row>
				<Col className="text-center ">
					<h2 className="text-primary border-bottom d-inline-block pb-3">
						{reservation.match.name}
					</h2>
				</Col>
			</Row>
			<Row className="mb-2 mb-md-3 justify-content-center">
				<Col className="d-flex flex-column justify-content-center align-items-center text-center">
					<h5 className="fw-bold mt-2">
						Date :
						<span className="text-primary ms-2">
							{hasPassed(reservation.match.date)
								? `Ended : ${moment(reservation.match.date).fromNow()}`
								: moment(reservation.match.date).format('DD/MM/YYYY')}
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
		</div>
	);
};

export default ReservationCard;

function hasPassed(date) {
	const today = new Date();
	const matchDate = new Date(date);
	return matchDate < today;
}
