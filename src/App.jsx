import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Alert from 'react-bootstrap/Alert';
import { ToastContainer } from 'react-toastify';
import { Navbar } from './components';
import {
	Home,
	Login,
	Signup,
	UserProfile,
	AdminUsers,
	AdminUserEdit,
	Dashboard,
	AdminStadiums,
	StadiumsScreen,
	MatchesScreen,
} from './pages';

function App() {
	return (
		<>
			<ToastContainer
				position="bottom-center"
				autoClose={5000}
				hideProgressBar={false}
				newestOnTop={false}
				closeOnClick
			/>
			<div className="d-flex flex-column body ">
				<main>
					<BrowserRouter>
						<Navbar />
						<Routes>
							<Route index element={<Home />} />
							<Route path="login" element={<Login />} />
							<Route path="signup" element={<Signup />} />
							<Route path="user" element={<UserProfile />} />
							<Route path="stadiums" element={<StadiumsScreen />} />
							<Route path="matches" element={<MatchesScreen />} />

							{/* Admin Pages */}
							<Route path="admin/dashboard" element={<Dashboard />} />
							<Route path="admin/users" element={<AdminUsers />} />
							<Route path="admin/users/:id" element={<AdminUserEdit />} />
							<Route path="admin/stadiums" element={<AdminStadiums />} />

							<Route
								path="*"
								element={
									<Alert className="container" variant="danger">
										Error 404 Page is not found
									</Alert>
								}
							/>
						</Routes>
					</BrowserRouter>
				</main>
			</div>
		</>
	);
}

export default App;
