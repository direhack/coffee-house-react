import { CartProvider } from "./context/CartContext";
import Header from "./components/Header";
import Hero from "./components/Hero";
import FavoriteCoffee from "./components/FavoriteCoffee";
import About from "./components/About";
import MobileApp from "./components/MobileApp";

const App = () => {
	return (
		<CartProvider>
			<div className="container">
				<Header />
				<main className="home">
					<Hero />
					<FavoriteCoffee />
					<About />
					<MobileApp />
				</main>
			</div>
		</CartProvider>
	);
};

export default App;
