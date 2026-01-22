import { CartProvider } from "./context/CartContext";
import Header from "./components/Header";
import Hero from "./components/Hero";
import FavoriteCoffee from "./components/FavoriteCoffee";

const App = () => {
	return (
		<CartProvider>
			<div className="container">
				<Header />
				<main className="home">
					<Hero />
					<FavoriteCoffee />
				</main>
			</div>
		</CartProvider>
	);
};

export default App;
