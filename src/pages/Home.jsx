import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Alert from 'react-bootstrap/Alert';
import data from '../data/data.js';
import { useEffect, useState } from 'react';
import API from '../api/api.js';
import CircularProgress from '@mui/material/CircularProgress';
import { toast } from 'react-toastify';
import Carousel from 'react-bootstrap/Carousel';
import CrossFade from '../components/CrossFade.jsx';

const Home = () => {
	return (
		<Container>
			<h2 className="text-primary"> Our Landing Page </h2>
		</Container>
	);
};

export default Home;

// <Col className="h-100">asd</Col>
// <Col>
// 	<h4 className="text-primary">Biggest Event on Earth</h4>
// 	<h1> Fifa World Cup Qatar 2022</h1>
// 	<p>
// 		The 2022 Fifa Cup is inetrnational assocaiation football tournament
// 		contested by the men's national teams of the FIFA's member
// 		associations. it is taking place in Qatar from 21 November to 18
// 		December 2022.
// 	</p>
// </Col>;
