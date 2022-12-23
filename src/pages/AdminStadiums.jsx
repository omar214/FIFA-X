import { Container, Table, Button, Stack, Alert } from 'react-bootstrap';

import { useNavigate, Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import API from '../api/api.js';
import { CircularProgress } from '@mui/material';
import { useSelector } from 'react-redux';
import AddProductModal from '../components/AddStadiumModal.jsx';
import useProtection from '../hooks/useProtection.jsx';

const AdminStadiums = () => {
	const { currentUser } = useSelector((state) => state.user);
	const [show, setShow] = useState(false);
	const navigate = useNavigate();
	useProtection({ isAdmin: true });

	const [stadiums, setStadiums] = useState({
		items: [],
		loading: false,
		error: false,
	});

	useEffect(() => {
		const fecthData = async () => {
			setStadiums((prev) => ({ ...prev, loading: true }));
			try {
				const { data: res } = await API.get('/products');
				setStadiums({ loading: false, error: false, items: res.products });
			} catch (error) {
				setStadiums((prev) => ({ ...prev, loading: false, error: true }));

				console.log(error.message);
			}
		};
		fecthData();
	}, []);

	const addProduct = (product) => {
		let temp = stadiums.items;
		temp.push(product);
		setStadiums({
			loading: false,
			error: false,
			items: temp,
		});
	};

	const handleDeletStadium = async (id) => {
		try {
			await API.delete(`/products/${id}`);
			const filterd = stadiums.items.filter((e) => e._id !== id);
			setStadiums({
				loading: false,
				error: false,
				items: filterd,
			});
		} catch (error) {
			console.log(error.message);
		}
	};

	return (
		<Container>
			<>
				{show && (
					<AddProductModal
						show={show}
						handleClose={() => setShow(false)}
						addProduct={addProduct}
					/>
				)}
				<Stack direction="horizontal" className="mb-3">
					<h4 className="me-auto">Stadiums </h4>
					<Button variant="success" onClick={() => setShow(true)}>
						Add Stadium
					</Button>
				</Stack>
				{stadiums.loading ? (
					<CircularProgress />
				) : stadiums.error ? (
					<Alert variant="danger">Error While fetching stadiums</Alert>
				) : (
					<Table hover responsive>
						<thead className="border-bottom border-2 border-dark">
							<tr>
								<th>ID</th>
								<th>Name </th>
								<th>PRICE</th>
								<th>CATEGORY</th>
								<th>BRAND</th>
								<th>ACTIONS</th>
							</tr>
						</thead>
						<tbody>
							{stadiums.items.map((p, idx) => (
								<tr className="mb-3" key={idx} varient={'danger'}>
									<td>{p._id}</td>
									<td>{p.name}</td>
									<td>
										<strong>${p.price}</strong>
									</td>
									<td>{p.category[0]}</td>
									<td>{p.brand}</td>
									<td>
										<Button
											as={Link}
											to={`/admin/products/${p._id}`}
											variant="light"
											size="sm"
											className="me-2 mb-sm-2 mb-lg-0"
										>
											Edit
										</Button>
										<Button
											variant="outline-danger"
											size="sm"
											onClick={() => handleDeletStadium(p._id)}
										>
											Delete
										</Button>
									</td>
								</tr>
							))}
						</tbody>
					</Table>
				)}
			</>
		</Container>
	);
};

export default AdminStadiums;
