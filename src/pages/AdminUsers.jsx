import { Container, Table, Button, Alert, Badge, Form } from 'react-bootstrap';
import { useNavigate, Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import API from '../api/api.js';
import { CircularProgress } from '@mui/material';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { fetchDeleteUser, fetchUsers } from '../api/admin.js';
import { isAdmin, isManager, updateToaster } from '../utils/index.js';
import useProtection from '../hooks/useProtection.jsx';

const AdminUsers = () => {
	const { currentUser } = useSelector((state) => state.user);
	const navigate = useNavigate();
	useProtection({ admin: true });

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

		currentUser && isAdmin(currentUser) && fecthData();
	}, [currentUser, navigate]);

	const handleSetManger = async (isManager, id) => {
		const toastId = toast.loading('updating user...');
		try {
			await API.patch(`/users/${id}`, { isFan: true, isManager });

			updateToaster(toastId, 'user updated successfully', toast.TYPE.SUCCESS);
		} catch (error) {
			updateToaster(toastId, 'Error while updating User', toast.TYPE.ERROR);
			console.log(error.message);
		}
	};

	const handleDeletUser = async (id) => {
		const toastId = toast.loading('Deleting user...');
		try {
			await fetchDeleteUser(id);
			const filterd = users.items.filter((e) => e.id !== id);
			setUsers({
				loading: false,
				error: false,
				items: filterd,
			});
			updateToaster(toastId, 'user Deleted successfully', toast.TYPE.SUCCESS);
		} catch (error) {
			updateToaster(toastId, 'Error While deleting user', toast.TYPE.ERROR);
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
				) : users.items.length === 0 ? (
					<Alert variant="info">No Users Found</Alert>
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
