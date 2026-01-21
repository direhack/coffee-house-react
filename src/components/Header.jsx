import { useState, useEffect } from "react";
import { useCart } from "../context/CartContext";

const Header = () => {
	const [isMenuOpen, setIsMenuOpen] = useState(false);
	const { cartCount = 0, totalDiscount = 0 } = useCart() || {};

	useEffect(() => {
		const mediaQuery = window.matchMedia("(min-width: 769px");

		const handleMediaChange = (e) => {
			if (e.matches && isMenuOpen) {
				setIsMenuOpen(false);
			}
		};

		mediaQuery.addEventListener("change", handleMediaChange);
		return () => mediaQuery.removeEventListener("change", handleMediaChange);
	}, [isMenuOpen]);

	const toggleMenu = () => {
		setIsMenuOpen((prev) => !prev);
	};

	const closeMenu = () => {
		setIsMenuOpen(false);
	};

	return (
		<>
			<header className={isMenuOpen ? "menu-open" : ""}>
				<a id="logo" className="link" href="#">
					<img src="./src/assets/logo.png" alt="logo" className="logo" />
				</a>
				<nav>
					<ul>
						<li>
							<a href="#fav_coffee" className="link" onClick={closeMenu}>
								Favorite coffee
							</a>
						</li>
						<li>
							<a href="#about" className="link" onClick={closeMenu}>
								About
							</a>
						</li>
						<li>
							<a href="#mob_app" className="link" onClick={closeMenu}>
								Mobile app
							</a>
						</li>
						<li>
							<a href="#contact" className="link" onClick={closeMenu}>
								Contact us
							</a>
						</li>
					</ul>
				</nav>
				<div className="menu_cart">
					<a className="cart_button">
						{totalDiscount > 0 && (
							<span className="total_discount">-{totalDiscount}%</span>
						)}
						<i className="fa-solid fa-cart-shopping"></i>
						{cartCount > 0 && <span className="cart_number">{cartCount}</span>}
					</a>
					<a className="menu_link">
						Menu <i className="fa-solid fa-mug-hot"></i>
					</a>
				</div>
				<div className="burger" id="burger" onClick={toggleMenu}>
					<i className="fa-solid fa-bars"></i>
					<i className="fa-solid fa-xmark"></i>
				</div>
			</header>

			<div className={`burger-menu ${isMenuOpen ? "is-open" : ""}`}>
				<nav>
					<ul>
						<li>
							<a
								href="#fav_coffee"
								className="burger_menu_link"
								onClick={closeMenu}
							>
								Favorite coffee
							</a>
						</li>
						<li>
							<a href="#about" className="burger_menu_link" onClick={closeMenu}>
								About
							</a>
						</li>
						<li>
							<a
								href="#mob_app"
								className="burger_menu_link"
								onClick={closeMenu}
							>
								Mobile app
							</a>
						</li>
						<li>
							<a
								href="#contact"
								className="burger_menu_link"
								onClick={closeMenu}
							>
								Contact us
							</a>
						</li>
						<li>
							<a className="burger_menu_link" href="#" onClick={closeMenu}>
								Menu <i className="fa-solid fa-mug-hot"></i>
							</a>
						</li>
						<li className="burger_menu_cart_button">
							<a
								className="cart_button burger_menu_link"
								href="#"
								onClick={closeMenu}
							>
								{totalDiscount > 0 && (
									<span className="total_discount">-{totalDiscount}%</span>
								)}
								Cart
								<i className="fa-solid fa-cart-shopping"></i>
								{cartCount > 0 && (
									<span className="cart_number">{cartCount}</span>
								)}
							</a>
						</li>
					</ul>
				</nav>
			</div>
		</>
	);
};

export default Header;
