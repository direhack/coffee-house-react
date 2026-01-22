import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMugHot } from "@fortawesome/free-solid-svg-icons";

const Hero = () => {
	return (
		<section className="hero">
			<video autoPlay muted loop playsInline className="bg-video">
				<source
					src="https://www.pexels.com/ru-ru/download/video/2909914/"
					type="video/mp4"
				/>
				Your browser does not support the video tag.
			</video>

			<div className="behind">
				<h1>
					<span className="enjoy">Enjoy</span> premium coffee at our charming
					cafe
				</h1>
				<p>
					With its inviting atmosphere and delicious coffee options, the Coffee
					House Resource is a popular destination for coffee lovers and those
					seeking a warm and inviting space to enjoy their favorite beverage.
				</p>
				<button>
					Menu
					<FontAwesomeIcon icon={faMugHot} />
				</button>
			</div>
		</section>
	);
};

export default Hero;
