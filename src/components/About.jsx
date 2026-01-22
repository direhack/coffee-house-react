const About = () => {
	return (
		<section id="about" className="about">
			<h2>
				Resource is the
				<span className="perfect"> perfect and cozy place</span> where you can
				enjoy a variety of hot beverages, relax, catch up with friends, or get
				some work done.
			</h2>

			<div className="images">
				<img
					className="image a"
					src="../src/assets/about-1.jpg"
					alt="Cozy cafe interior"
				/>
				<img
					className="image b"
					src="../src/assets/about-3.jpg"
					alt="Coffee being poured"
				/>
				<img
					className="image c"
					src="../src/assets/about-2.jpg"
					alt="People enjoying coffee"
				/>
				<img
					className="image d"
					src="../src/assets/about-4.jpg"
					alt="Cafe atmosphere"
				/>
			</div>
		</section>
	);
};

export default About;
