import peleImage from '../../assets/Pele.png';

const Opinion = () => {
	return (
		<div className="py-5 bg-light">
			<div className="container px-5 my-5">
				<div className="row gx-5 justify-content-center">
					<div className="col-lg-10 col-xl-7">
						<div className="text-center">
							{/* <div className="fs-4 mb-4 fst-italic">
								"Working with Start Bootstrap templates has saved me tons of
								development time when building new projects! Starting with a
								Bootstrap template just makes things easier!"
							</div> */}
							<div className="fs-4 mb-4 fst-italic">
								"The World Cup is a very important way to measure the good
								players, and the great ones . it is a test of a great player "
							</div>
							<div className="d-flex align-items-center justify-content-center">
								<img
									className="rounded-circle me-3"
									// src="https://dummyimage.com/40x40/ced4da/6c757d"
									src={peleImage}
									alt="..."
									style={{ width: '40px', height: '40px' }}
								/>
								<div className="fw-bold">
									Pele
									<span className="fw-bold text-primary mx-1">/</span>
									Football Legend
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Opinion;
