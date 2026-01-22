import { useState, useEffect, useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faArrowRight } from "@fortawesome/free-solid-svg-icons";

const mockFavorites = [
	{
		id: 1,
		name: "Espresso",
		description: "Rich and bold single shot",
		price: "4.50",
		image: "../src/assets/coffee-slider-1.png",
	},
	{
		id: 2,
		name: "Cappuccino",
		description: "Velvety milk foam perfection",
		price: "5.20",
		image: "../src/assets/coffee-slider-2.png",
	},
	{
		id: 3,
		name: "Latte",
		description: "Smooth and creamy classic",
		price: "5.00",
		image: "../src/assets/coffee-slider-3.png",
	},
];

const FavoriteCoffee = () => {
	const [favorites, setFavorites] = useState([]);
	const [loading, setLoading] = useState(true);
	const [currentIndex, setCurrentIndex] = useState(0);
	const [isPaused, setIsPaused] = useState(false);
	const timerRef = useRef(null);

	// Fetch real data (uncomment when ready)
	useEffect(() => {
		// async function fetchFavorites() {
		//   try {
		//     const res = await fetch("https://6kt29kkeub.execute-api.eu-central-1.amazonaws.com/products/favorites");
		//     const data = await res.json();
		//     setFavorites(data.data.slice(0, 3)); // limit to 3 like original
		//   } catch (err) {
		//     console.error("Failed to load favorites", err);
		//   } finally {
		//     setLoading(false);
		//   }
		// }
		// fetchFavorites();
		setTimeout(() => {
			setFavorites(mockFavorites);
			setLoading(false);
		}, 800);
	}, []);

	useEffect(() => {
		if (loading || favorites.length === 0 || isPaused) return;

		timerRef.current = setInterval(() => {
			setCurrentIndex((prev) => (prev + 1) % favorites.length);
		}, 3000);

		return () => clearInterval(timerRef.current);
	}, [loading, favorites.length, isPaused]);

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

	if (loading) {
		return <div className="loader">Loading...</div>;
	}

	if (favorites.length === 0) {
		return <div className="loader">No favorites available</div>;
	}

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
							src={currentDrink.image}
							alt={currentDrink.name}
							onContextMenu={(e) => e.preventDefault()}
							draggable={false}
						/>
						<h3 className="drink-name">{currentDrink.name}</h3>
						<p className="drink-info">{currentDrink.description}</p>
						<p className="price">${currentDrink.price}</p>
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
