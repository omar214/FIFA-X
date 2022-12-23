import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Badge from 'react-bootstrap/Badge';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import InputGroup from 'react-bootstrap/InputGroup';
import SearchIcon from '@mui/icons-material/Search';
import { useNavigate, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../redux/userSlice.js';
import { useEffect } from 'react';
import API from '../api/api.js';
import { toast } from 'react-toastify';

function MyNavbar() {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const { currentUser } = useSelector((state) => state.user);

	const handleLogOut = (e) => {
		dispatch(logout());
		navigate('/login');
	};
	return (
		<Navbar collapseOnSelect expand="md" bg="dark" variant="dark" sticky="top">
			<Container>
				<Navbar.Brand as={Link} to="/" className="text-primary">
					FIFA X
				</Navbar.Brand>

				<Navbar.Toggle aria-controls="responsive-navbar-nav" />

				<Navbar.Collapse id="responsive-navbar-nav">
					<Nav className="ms-auto">
						{currentUser ? (
							<NavDropdown
								title={currentUser.name}
								id="collasible-nav-dropdown"
							>
								<NavDropdown.Item as={Link} to="user">
									User Profile
								</NavDropdown.Item>
								<NavDropdown.Item as={Link} to="orders">
									Reservation History
								</NavDropdown.Item>
								<NavDropdown.Divider />
								<NavDropdown.Item onClick={handleLogOut}>
									Log out
								</NavDropdown.Item>
							</NavDropdown>
						) : (
							<Nav.Link as={Link} to="login">
								Log in
							</Nav.Link>
						)}
						{currentUser && currentUser.isAdmin && (
							<NavDropdown title={'Admin'} id="Admin-nav-dropdown">
								<NavDropdown.Item as={Link} to="admin/dashboard">
									DASHBOARD
								</NavDropdown.Item>
								<NavDropdown.Divider />
								<NavDropdown.Item as={Link} to="admin/stadiums">
									Stadiums
								</NavDropdown.Item>
								<NavDropdown.Item as={Link} to="admin/users">
									USERS
								</NavDropdown.Item>
							</NavDropdown>
						)}
					</Nav>
				</Navbar.Collapse>
			</Container>
		</Navbar>
	);
}

export default MyNavbar;
