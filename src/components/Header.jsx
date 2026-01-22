import { useState, useEffect } from "react";
import { useCart } from "../context/CartContext";
import { Link } from "react-router-dom";
import { HashLink } from "react-router-hash-link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMugHot, faBars, faXmark } from "@fortawesome/free-solid-svg-icons";

const Header = () => {
	const [isMenuOpen, setIsMenuOpen] = useState(false);
	const [isMenuActive, setIsMenuActive] = useState(false);
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
		const newOpenState = !isMenuOpen;
		setIsMenuOpen(newOpenState);
		if (newOpenState) {
			document.body.classList.add("no-scroll");
		} else {
			document.body.classList.remove("no-scroll");
		}
	};

	const closeMenu = () => {
		setIsMenuOpen(false);
		document.body.classList.remove("no-scroll");
	};

	const handleLinkClick = (linkType) => {
		if (linkType === "menu") {
			setIsMenuActive(true);
		} else {
			setIsMenuActive(false);
		}
		closeMenu();
	};

	return (
		<>
			<header className={isMenuOpen ? "menu-open" : ""}>
				<Link
					id="logo"
					className="link"
					to="/"
					onClick={() => handleLinkClick("/")}
				>
					<img src="./src/assets/logo.png" alt="logo" className="logo" />
				</Link>
				<nav>
					<ul>
						<li>
							<HashLink
								className="link"
								to="/#fav_coffee"
								onClick={() => handleLinkClick("fav")}
							>
								Favorite coffee
							</HashLink>
						</li>
						<li>
							<HashLink
								className="link"
								to="/#about"
								onClick={() => handleLinkClick("about")}
							>
								About
							</HashLink>
						</li>
						<li>
							<HashLink
								className="link"
								to="/#mob_app"
								onClick={() => handleLinkClick("mob_app")}
							>
								Mobile app
							</HashLink>
						</li>
						<li>
							<HashLink
								className="link"
								to="/#contact"
								onClick={() => handleLinkClick("contact")}
							>
								Contact us
							</HashLink>
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
					<Link
						className={`menu_link ${isMenuActive ? "active-menu" : ""}`}
						to="/menu"
						onClick={() => handleLinkClick("menu")}
					>
						Menu <FontAwesomeIcon icon={faMugHot} />
					</Link>
				</div>
				<div className="burger" id="burger" onClick={toggleMenu}>
					<FontAwesomeIcon icon={faBars} />
					<FontAwesomeIcon icon={faXmark} />
				</div>
			</header>

			<div className={`burger-menu ${isMenuOpen ? "is-open" : ""}`}>
				<nav>
					<ul>
						<li>
							<HashLink
								to="/#fav_coffee"
								className="burger_menu_link"
								onClick={closeMenu}
							>
								Favorite coffee
							</HashLink>
						</li>
						<li>
							<HashLink
								to="/#about"
								className="burger_menu_link"
								onClick={closeMenu}
							>
								About
							</HashLink>
						</li>
						<li>
							<HashLink
								to="/#mob_app"
								className="burger_menu_link"
								onClick={closeMenu}
							>
								Mobile app
							</HashLink>
						</li>
						<li>
							<HashLink
								to="#contact"
								className="burger_menu_link"
								onClick={closeMenu}
							>
								Contact us
							</HashLink>
						</li>
						<li>
							<Link className="burger_menu_link" to="/menu" onClick={closeMenu}>
								Menu <FontAwesomeIcon icon={faMugHot} />
							</Link>
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
