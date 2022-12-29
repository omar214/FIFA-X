/**
 *
 * @returns JSX for multible testmonials stacked vertically
 */
const TestmonialsNotUsed = () => {
	return (
		// {/* Start TestmonialsNotUsed Section */}
		<section className="py-5 border-bottom bg-light">
			<div className="container px-5 my-5 px-5">
				<div className="text-center mb-5">
					<h2 className="fw-bolder">Customer testimonials</h2>
					<p className="lead mb-0">Our customers love working with us</p>
				</div>
				<div className="row gx-5 justify-content-center">
					<div className="col-lg-6">
						{/* <!-- Testimonial 1--> */}
						<div className="card mb-4">
							<div className="card-body p-4">
								<div className="d-flex">
									<div className="flex-shrink-0">
										<i className="bi bi-chat-right-quote-fill text-primary fs-1"></i>
									</div>
									<div className="ms-4">
										<p className="mb-1">
											Thank you for putting together such a great product. We
											loved working with you and the whole team, and we will be
											recommending you to others!
										</p>
										<div className="small text-muted">
											- Client Name, Location
										</div>
									</div>
								</div>
							</div>
						</div>
						{/* <!-- Testimonial 2--> */}
						<div className="card">
							<div className="card-body p-4">
								<div className="d-flex">
									<div className="flex-shrink-0">
										<i className="bi bi-chat-right-quote-fill text-primary fs-1"></i>
									</div>
									<div className="ms-4">
										<p className="mb-1">
											The whole team was a huge help with putting things
											together for our company and brand. We will be hiring them
											again in the near future for additional work!
										</p>
										<div className="small text-muted">
											- Client Name, Location
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</section>
		// {/* End TestmonialsNotUsed Section */}
	);
};

export default TestmonialsNotUsed;
