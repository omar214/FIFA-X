import moment from 'moment';
import React from 'react';
import { Col, Row } from 'react-bootstrap';

const MatchCard = ({ match }) => {
	return (
		<div className="w-md-50 p-3 shadow-lg rounded-4 mb-3">
			{/* 2 Teams  */}
			<Row className="justify-content-center">
				<Col className="d-flex flex-column justify-content-center align-items-center sh">
					<img
						src={match.team1.flag}
						alt="Team 1 flag"
						className="mw-100 mh-100 rounded-3 shadow border"
						style={{ width: '100px' }}
					/>
					<p className="mt-3 text-primary fw-bold"> {match.team1.name} </p>
				</Col>
				<Col className="fw-bold text-primary d-flex flex-column justify-content-center align-items-center">
					Vs
				</Col>
				<Col className="d-flex flex-column justify-content-center align-items-center">
					<img
						src={match.team2.flag}
						alt="Team 1 flag"
						className="mw-100 mh-100 rounded-3 shadow border"
						style={{ width: '100px' }}
					/>
					<p className="mt-3 text-primary fw-bold"> {match.team2.name} </p>
				</Col>
			</Row>

			{/* Stadium */}
			<Row className="mb-3">
				<Col className="d-flex  justify-content-center align-items-center text-center">
					<span className="fw-bold"> Stadium : </span>
					<b className="ms-1 text-primary">{match.stadium.name}</b>
				</Col>
			</Row>

			{/* Referees */}
			<Row className="justify-content-center">
				<Col className="d-flex  justify-content-center align-items-center">
					<span className="fw-bold">Referee :</span>
					<b className="ms-1 text-primary">{match.mainReferee}</b>
				</Col>
				<Col className="d-flex  justify-content-center align-items-center">
					<span className="fw-bold">LinesMan 1 :</span>
					<b className="ms-1 text-primary">{match.linesMan1}</b>
				</Col>
				<Col className="d-flex  justify-content-center align-items-center">
					<span className="fw-bold">LinesMan 2 :</span>
					<b className="ms-1 text-primary">{match.linesMan2}</b>
				</Col>
			</Row>

			{/* Date */}
			<Row className="justify-content-center">
				<Col className="d-flex  justify-content-center align-items-center">
					<h5 className="mt-3 ms-1 text-primary">
						{moment(match.date).isBefore(Date.now())
							? `Ended : ${moment(match.date).fromNow()}`
							: `Played in : ${moment(match.date).format('DD/MM/YYYY')}`}
					</h5>
				</Col>
			</Row>
		</div>
	);
};

export default MatchCard;
