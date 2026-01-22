import { Routes, Route, useLocation } from "react-router-dom";
import { CartProvider } from "./context/CartContext";
import Header from "./components/Header";
import Hero from "./components/Hero";
import FavoriteCoffee from "./components/FavoriteCoffee";
import About from "./components/About";
import MobileApp from "./components/MobileApp";
import Footer from "./components/Footer";
import Menu from "./components/Menu";

const App = () => {
	const location = useLocation();

	return (
		<CartProvider>
			<div className="container">
				<Header />
				<Routes>
					<Route
						path="/"
						element={
							<main className="home">
								<Hero />
								<FavoriteCoffee />
								<About />
								<MobileApp />
							</main>
						}
					/>
					<Route path="/menu" element={<Menu />} />
				</Routes>
				<Footer />
			</div>
		</CartProvider>
	);
};

export default App;
