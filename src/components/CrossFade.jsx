import Carousel from 'react-bootstrap/Carousel';
import img1 from '../assets/bg1.jpg';
import img2 from '../assets/bg2.jpg';
import img3 from '../assets/bg.png';

function CrossFade() {
	return (
		<Carousel style={{ maxHeight: '70vh' }}>
			<Carousel.Item className="p-relative">
				<img
					className="d-block w-100 mw-100 mh-100 mx-auto"
					src={img1}
					alt="First slide"
				/>
				<Carousel.Caption className="center box">
					<h3>First slide label</h3>
					<p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
				</Carousel.Caption>
			</Carousel.Item>
			{/* <Carousel.Item>
				<img
					className="d-block w-100 mw-100 mh-100"
					src={img3}
					alt="Second slide"
				/>

				<Carousel.Caption>
					<h3>Second slide label</h3>
					<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
				</Carousel.Caption>
			</Carousel.Item>
			<Carousel.Item>
				<img
					className="d-block w-100 mw-100 mh-100"
					src={img2}
					alt="Third slide"
				/>

				<Carousel.Caption >
					<h3>Third slide label</h3>
					<p>
						Praesent commodo cursus magna, vel scelerisque nisl consectetur.
					</p>
				</Carousel.Caption>
			</Carousel.Item> */}
		</Carousel>
	);
}

export default CrossFade;
