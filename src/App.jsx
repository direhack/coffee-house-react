import { CartProvider } from "./context/CartContext";
import Header from "./components/Header";
import Hero from "./components/Hero";
import FavoriteCoffee from "./components/FavoriteCoffee";
import About from "./components/About";
import MobileApp from "./components/MobileApp";
import Footer from "./components/Footer";

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
					<Footer />
				</main>
			</div>
		</CartProvider>
	);
};

export default App;
