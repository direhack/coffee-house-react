import { useState, useEffect, useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faArrowRight } from "@fortawesome/free-solid-svg-icons";

const FavoriteCoffee = () => {
	const [favorites, setFavorites] = useState([]);
	const [currentIndex, setCurrentIndex] = useState(0);
	const [isPaused, setIsPaused] = useState(false);
	const timerRef = useRef(null);

	useEffect(() => {
		const fetchFavorites = async () => {
			try {
				const res = await fetch("/data/favorites.json");
				const data = await res.json();
				setFavorites(data);
			} catch (err) {
				console.error("Failed to load favorites", err);
			}
		};
		fetchFavorites();
	}, []);

	useEffect(() => {
		if (favorites.length === 0 || isPaused) return;

		timerRef.current = setInterval(() => {
			setCurrentIndex((prev) => (prev + 1) % favorites.length);
		}, 3000);

		return () => clearInterval(timerRef.current);
	}, [favorites.length, isPaused]);

	const goToSlide = (index) => {
		setCurrentIndex(index);
		// Reset timer
		clearInterval(timerRef.current);
		timerRef.current = setInterval(() => {
			setCurrentIndex((prev) => (prev + 1) % favorites.length);
		}, 3000);
	};

	const prevSlide = () =>
		goToSlide((currentIndex - 1 + favorites.length) % favorites.length);
	const nextSlide = () => goToSlide((currentIndex + 1) % favorites.length);

	const handleMouseEnter = () => setIsPaused(true);
	const handleMouseLeave = () => setIsPaused(false);

	const currentDrink = favorites[currentIndex];

	return (
		<section id="fav_coffee" className="fav_coffee">
			<h2>
				Choose your <span className="fav">favorite</span> coffee
			</h2>

			<div className="slider">
				<div className="arrow-left" onClick={prevSlide}>
					<FontAwesomeIcon icon={faArrowLeft} />
				</div>

				<div
					className="slider-viewport"
					onMouseEnter={handleMouseEnter}
					onMouseLeave={handleMouseLeave}
				>
					<div
						key={currentIndex}
						className={`drink animate ${isPaused ? "paused" : ""}`}
					>
						<img
							src={currentDrink?.image}
							alt={currentDrink?.name}
							onContextMenu={(e) => e.preventDefault()}
							draggable={false}
						/>
						<h3 className="drink-name">{currentDrink?.name}</h3>
						<p className="drink-info">{currentDrink?.description}</p>
						<p className="price">${currentDrink?.price}</p>
					</div>
				</div>

				<div className="arrow-right" onClick={nextSlide}>
					<FontAwesomeIcon icon={faArrowRight} />
				</div>
			</div>

			<div className="three-lines">
				{favorites.map((_, index) => (
					<div
						key={index}
						className={`progress-bar ${index === currentIndex ? "active" : ""} ${isPaused ? "paused" : ""}`}
						onClick={() => goToSlide(index)}
					/>
				))}
			</div>
		</section>
	);
};

export default FavoriteCoffee;
