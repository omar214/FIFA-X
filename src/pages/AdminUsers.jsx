import { Container, Table, Button, Alert, Badge, Form } from 'react-bootstrap';

import { useNavigate, Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import API from '../api/api.js';
import { CircularProgress } from '@mui/material';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import useProtection from '../hooks/useProtection.jsx';
import { fetchDeleteUser, fetchUsers } from '../api/admin.js';
import { isAdmin, isManager } from '../utils/index.js';

const AdminUsers = () => {
	const { currentUser } = useSelector((state) => state.user);
	const navigate = useNavigate();

	const [users, setUsers] = useState({
		items: [],
		loading: false,
		error: false,
	});

	useEffect(() => {
		const fecthData = async () => {
			setUsers((prev) => ({ ...prev, loading: true }));
			try {
				const res = await fetchUsers();
				setUsers({ loading: false, error: false, items: res.data });
			} catch (error) {
				setUsers((prev) => ({ ...prev, loading: false, error: true }));
				console.log(error.message);
				toast.dismiss();
				toast.error('Error While Fetchig users');
			}
		};

		currentUser && fecthData();
	}, [currentUser, navigate]);

	const handleSetManger = async (isManager, id) => {
		try {
			await API.patch(`/users/${id}`, { isFan: true, isManager });
			toast.dismiss();
			toast.success('user updated Successfully');
		} catch (error) {
			toast.dismiss();
			toast.error('Error While setting user as manager');
			console.log(error.message);
		}
	};

	const handleDeletUser = async (id) => {
		try {
			await fetchDeleteUser(id);
			const filterd = users.items.filter((e) => e.id !== id);
			setUsers({
				loading: false,
				error: false,
				items: filterd,
			});
			toast.dismiss();
			toast.success('user deleted Successfully');
		} catch (error) {
			toast.dismiss();
			toast.error('Error While deleting user');
			console.log(error.message);
		}
	};
	return (
		<Container>
			<>
				<h4>Users </h4>

				{users.loading ? (
					<CircularProgress />
				) : users.error ? (
					<Alert variant="danger">Error While fetching users</Alert>
				) : (
					<Table hover responsive>
						<thead className="border-bottom border-2 border-dark">
							<tr>
								<th>ID</th>
								<th>userName</th>
								<th>Full Name</th>
								<th>Email</th>
								<th>nationality</th>
								<th>IS MANAGER</th>
								<th>ACTIONS</th>
							</tr>
						</thead>
						<tbody>
							{users.items.map((u, idx) => (
								<tr className="mb-3 " key={idx} varient={'danger'}>
									<td>{u.id}</td>
									<td>{u.username}</td>
									<td>{`${u.firstName}  ${u.lastName}`}</td>
									<td>{u.email}</td>
									<td> {u.nationality ? u.nationality : ''}</td>
									<td>
										<Form.Check
											type="switch"
											id="custom-switch"
											defaultChecked={isManager(u)}
											onChange={(e) => handleSetManger(e.target.checked, u.id)}
										/>
									</td>
									<td>
										<Button
											variant="outline-danger"
											size="sm"
											onClick={() => handleDeletUser(u.id)}
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

export default AdminUsers;
