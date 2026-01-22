import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
	faTwitter,
	faInstagram,
	faFacebookF,
} from "@fortawesome/free-brands-svg-icons";
import {
	faLocationDot,
	faPhone,
	faClock,
} from "@fortawesome/free-solid-svg-icons";

const Footer = () => {
	return (
		<footer>
			<section id="contact" className="contact">
				<div className="first_block">
					<h2>
						Sip, Savor, Smile. <span>It's coffee time!</span>
					</h2>

					<div className="socials">
						<a
							href="https://twitter.com"
							target="_blank"
							rel="noopener noreferrer"
						>
							<FontAwesomeIcon icon={faTwitter} />
						</a>
						<a
							href="https://instagram.com"
							target="_blank"
							rel="noopener noreferrer"
						>
							<FontAwesomeIcon icon={faInstagram} />
						</a>
						<a
							href="https://facebook.com"
							target="_blank"
							rel="noopener noreferrer"
						>
							<FontAwesomeIcon icon={faFacebookF} />
						</a>
					</div>
				</div>

				<div className="second_block">
					<p className="contact-us">Contact us</p>

					<div className="location">
						<a
							href="https://www.google.com/maps?q=40.748817,-73.985428"
							target="_blank"
							rel="noopener noreferrer"
						>
							<FontAwesomeIcon icon={faLocationDot} />
							<p>8558 Green Rd., LA</p>
						</a>
					</div>

					<div className="phone">
						<a href="tel:+16035550123">
							<FontAwesomeIcon icon={faPhone} />
							<p>+1 (603) 555-0123</p>
						</a>
					</div>

					<div className="schedule">
						<FontAwesomeIcon icon={faClock} />
						<p>Mon-Sat: 9:00 AM - 23:00 PM</p>
					</div>
				</div>
			</section>
		</footer>
	);
};

export default Footer;
