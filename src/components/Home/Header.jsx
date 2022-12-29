import { Link } from 'react-router-dom';

const Header = () => {
	return (
		<header className="bg-dark py-5" style={{ minHeight: '75vh' }}>
			<div className="container px-5">
				<div
					className="row gx-5 justify-content-center"
					style={{ textTransform: 'capitalize' }}
				>
					<div className="col-lg-6">
						<div className="text-center my-5">
							<h1 className="display-5 fw-bolder  mb-2 text-primary">
								Qatar World Cup 2022
							</h1>
							<h2 className="text-primary">Where History is made</h2>
							<p className="lead text-white-50 mb-4">
								Live the most interesting moments of the Qatar World Cup 2022,
								with the best teams in the world, in the best stadiums in the
								world, with the best fans in the world.
							</p>
							<div className="d-grid gap-3 d-sm-flex justify-content-sm-center">
								<a
									className="btn btn-primary btn-lg px-4 me-sm-3 "
									href="#about"
								>
									Get Started
								</a>
								<Link
									className="btn btn-outline-light btn-lg px-4"
									to="/matches"
								>
									Watch Matches
								</Link>
							</div>
						</div>
					</div>
				</div>
			</div>
		</header>
	);
};

export default Header;
