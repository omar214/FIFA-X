import { useRef } from 'react';
import { toast } from 'react-toastify';

const Contact = () => {
	const formRef = useRef(null);

	const handleSubmit = (e) => {
		e.preventDefault();
		formRef.current.reset();
		toast.success('email was Sent Successfully');
	};
	return (
		<section className="py-2">
			<div className="container px-5 my-3 px-5">
				<div className="text-center mb-5">
					<div className="feature bg-primary bg-gradient text-white rounded-3 mb-3">
						<i className="bi bi-envelope"></i>
					</div>
					<h2 className="fw-bolder">Get in touch</h2>
					<p className="lead mb-0">We'd love to hear from you</p>
				</div>
				<div className="row gx-5 justify-content-center">
					<div className="col-lg-6">
						<form ref={formRef} onSubmit={handleSubmit}>
							{/* <!-- Name input--> */}
							<div className="form-floating mb-3">
								<input
									className="form-control"
									id="name"
									type="text"
									placeholder="Enter your name..."
									data-sb-validations="required"
									data-sb-can-submit="no"
								/>
								<label htmlFor="name">Full name</label>
								<div
									className="invalid-feedback"
									data-sb-feedback="name:required"
								>
									A name is required.
								</div>
							</div>
							{/* <!-- Email address input--> */}
							<div className="form-floating mb-3">
								<input
									className="form-control"
									id="email"
									type="email"
									placeholder="name@example.com"
									data-sb-validations="required,email"
									data-sb-can-submit="no"
								/>
								<label htmlFor="email">Email address</label>
								<div
									className="invalid-feedback"
									data-sb-feedback="email:required"
								>
									An email is required.
								</div>
								<div
									className="invalid-feedback"
									data-sb-feedback="email:email"
								>
									Email is not valid.
								</div>
							</div>
							{/* <!-- Phone number input--> */}
							<div className="form-floating mb-3">
								<input
									className="form-control"
									id="phone"
									type="number"
									minLength={11}
									maxLength={11}
									placeholder="(123) 456-7890"
									data-sb-validations="required"
									data-sb-can-submit="no"
								/>
								<label htmlFor="phone">Phone number</label>
								<div
									className="invalid-feedback"
									data-sb-feedback="phone:required"
								>
									A phone number is required.
								</div>
							</div>
							{/* <!-- Message input--> */}
							<div className="form-floating mb-3">
								<textarea
									className="form-control"
									id="message"
									type="text"
									placeholder="Enter your message here..."
									style={{ height: '10rem' }}
									data-sb-validations="required"
									data-sb-can-submit="no"
								/>
								<label htmlFor="message">Message</label>
								<div
									className="invalid-feedback"
									data-sb-feedback="message:required"
								>
									A message is required.
								</div>
							</div>
							{/* <!-- Submit Button--> */}
							<div className="d-grid">
								<button
									className="btn btn-primary btn-lg "
									id="submitButton"
									type="submit"
								>
									Submit
								</button>
							</div>
						</form>
					</div>
				</div>
			</div>
		</section>
	);
};

export default Contact;
