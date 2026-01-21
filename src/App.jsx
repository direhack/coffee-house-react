import { CartProvider } from "./context/CartContext";
import Header from "./components/Header";

const App = () => {
	return (
		<CartProvider>
			<div className="container">
				<Header />
			</div>
		</CartProvider>
	);
};

export default App;
