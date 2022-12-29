import openingCeremonyImage from '../../assets/opening-ceremony.jpg';
import emplem from '../../assets/emplem.png';
import cupImage from '../../assets/bg2.jpg';
import test from '../../assets/1.png';
import test2 from '../../assets/2.webp';

const headers = [
	'Opening Ceremony',
	'Watch the best countries Teams...',
	'Watch the best players in the world...',
];

const paragraphs = [
	'Live the best moments from the FIFA World Cup Qatar 2022™ Opening Ceremony!',
	'Get your hands with awosome Teams and Matches in FIFA World Cup Qatar 2022™!',
	'Get ready for the FIFA World Cup Qatar 2022™ with this exclusive AC/DC track!',
];

const images = [openingCeremonyImage, test2, test];

const Testmonials = () => {
	return (
		<section id="about">
			{headers.map((_, i) => (
				<section>
					<div className="container p-5">
						<div className="row gx-5 align-items-center">
							<div className={`col-lg-6  ${i % 2 !== 0 && 'order-lg-2'}`}>
								<div className="px-5 py-3">
									<h2 className="display-6 fw-bold text-primary">
										{headers[i]}
									</h2>
									<p className="fw-bold">{paragraphs[i]}</p>
								</div>
							</div>
							<div className={`col-lg-6  ${i % 2 !== 0 && 'order-lg-1'}`}>
								<div className="px-5 py-3">
									<img
										className="img-fluid rounded-5"
										src={images[i]}
										alt="..."
									/>
								</div>
							</div>
						</div>
					</div>
				</section>
			))}
		</section>
	);
};

export default Testmonials;
