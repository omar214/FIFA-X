import React from 'react';
import { Col, Row } from 'react-bootstrap';

const StadiumCard = ({ stadium, idx }) => {
	return (
		<div className="w-md-50 p-3 shadow-lg rounded-4 mb-3">
			<Row className="mb-3">
				<Col className="text-center">
					<h2 className="text-primary"> {stadium.name} </h2>
				</Col>
			</Row>
			<Row className="mb-2 mb-md-3 justify-content-center">
				<Col
					xs={12}
					md={{ span: 4, order: idx % 2 === 0 ? 1 : 2 }}
					className="d-flex justify-content-center align-items-center mb-3"
				>
					<img
						src={stadium.image}
						alt="stadium name"
						className="mw-100 mh-100 rounded-3"
						style={{ height: '200px' }}
					/>
				</Col>
				<Col
					xs={12}
					md={{ span: 8, order: idx % 2 === 0 ? 2 : 1 }}
					className="text-center d-flex flex-column gap-3 justify-content-center"
				>
					{/* <h2 className="text-primary"> {stadium.name} </h2> */}
					<h4> {stadium.description}</h4>
					<h5 className="d-block text-primary">
						Lounge : {stadium.VIPlounge.width} x {stadium.VIPlounge.height}
					</h5>
				</Col>
			</Row>
		</div>
	);
};

export default StadiumCard;
