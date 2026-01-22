import { CartProvider } from "./context/CartContext";
import Header from "./components/Header";
import Hero from "./components/Hero";
import FavoriteCoffee from "./components/FavoriteCoffee";
import About from "./components/About";

const App = () => {
	return (
		<CartProvider>
			<div className="container">
				<Header />
				<main className="home">
					<Hero />
					<FavoriteCoffee />
					<About />
				</main>
			</div>
		</CartProvider>
	);
};

export default App;
