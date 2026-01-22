import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faApple, faGooglePlay } from "@fortawesome/free-brands-svg-icons";

const MobileApp = () => {
	return (
		<section id="mob_app" className="mob_app">
			<div className="first_block">
				<h2>
					<span className="download">Download</span> our apps to start ordering
				</h2>
				<p>
					Download the Resource app today and experience the comfort of ordering
					your favorite coffee from wherever you are
				</p>

				<div className="buttons">
					<div className="app_store">
						<FontAwesomeIcon icon={faApple} />
						<div className="small-block">
							<p>Available on the</p>
							<p>App Store</p>
						</div>
					</div>

					<div className="google_play">
						<FontAwesomeIcon icon={faGooglePlay} />
						<div className="small-block">
							<p>Available on</p>
							<p>Google Play</p>
						</div>
					</div>
				</div>
			</div>

			<div className="second_block">
				<img
					src="../src/assets/mobile-screens.png"
					alt="Mobile app screens preview"
				/>
			</div>
		</section>
	);
};

export default MobileApp;
