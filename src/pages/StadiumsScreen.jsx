import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Alert from 'react-bootstrap/Alert';
import data from '../data/data.js';
import { useEffect, useState } from 'react';
import API from '../api/api.js';
import CircularProgress from '@mui/material/CircularProgress';
import { toast } from 'react-toastify';

const StadiumsScreen = () => {
	return (
		<Container>
			<h2 className="text-primary"> Stadiums </h2>
		</Container>
	);
};

export default StadiumsScreen;
