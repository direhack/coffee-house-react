import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark, faCircleInfo } from "@fortawesome/free-solid-svg-icons";
import { useCart } from "../context/CartContext";
import { getProductImage } from "../utils/getProductImage";

const Modal = ({ product, index, onClose }) => {
	const { addToCart } = useCart();

	const [selectedSize, setSelectedSize] = useState("s");
	const [selectedAdditives, setSelectedAdditives] = useState([]);

	// Close on Escape key
	useEffect(() => {
		const handleEsc = (e) => {
			if (e.key === "Escape") onClose();
		};
		window.addEventListener("keydown", handleEsc);
		return () => window.removeEventListener("keydown", handleEsc);
	}, [onClose]);

	if (!product) return null;

	const sizes = product.sizes || {};
	const additives = product.additives || [];

	// Calculate total price
	const basePrice = parseFloat(product.price) || 0;
	const sizeAddPrice = parseFloat(sizes[selectedSize]?.["add-price"]) || 0;

	const additivesPrice = selectedAdditives.reduce((sum, idx) => {
		const add = additives[idx];
		return sum + (parseFloat(add?.["add-price"]) || 0);
	}, 0);

	const totalPrice = basePrice + sizeAddPrice + additivesPrice;

	const toggleAdditive = (index) => {
		setSelectedAdditives((prev) =>
			prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index],
		);
	};

	const handleAddToCart = () => {
		const cartItem = {
			product,
			size: selectedSize,
			sizeName: sizes[selectedSize]?.size || selectedSize,
			additives: selectedAdditives.map((idx) => additives[idx]?.name || ""),
			totalPrice,
		};

		addToCart(cartItem);
		onClose();
	};

	return (
		<>
			<div className="backdrop" onClick={onClose}></div>

			<div className="modal">
				<div className="close" onClick={onClose}>
					<FontAwesomeIcon icon={faXmark} />
				</div>

				<img
					className="modal_photo"
					src={getProductImage(product, index)}
					alt={product.name}
				/>

				<div className="info">
					<h3 className="name">{product.name}</h3>
					<p className="description">{product.description}</p>

					<p className="size">Size</p>
					<div className="sizes_block">
						{Object.entries(sizes).map(([key, size]) => (
							<div
								key={key}
								className={`${
									key === "s"
										? "small"
										: key === "m"
											? "medium"
											: key === "l"
												? "large"
												: ""
								} ${selectedSize === key ? "modal_button_active" : ""}`}
								onClick={() => setSelectedSize(key)}
							>
								<p className={key}>{key.toUpperCase()}</p>
								<p className={`size_${key}`}>{size.size}</p>
							</div>
						))}
					</div>
					<p className="additives">Additives</p>
					<div className="additives_block">
						{additives.map((add, index) => (
							<div
								key={index}
								className={`${
									index === 0 ? "first" : index === 1 ? "second" : "third"
								} ${selectedAdditives.includes(index) ? "modal_button_active" : ""}`}
								onClick={() => toggleAdditive(index)}
							>
								<p
									className={`additive_${index === 0 ? "one" : index === 1 ? "two" : "three"}`}
								>
									{index + 1}
								</p>
								<p
									className={`${index === 0 ? "first" : index === 1 ? "second" : "third"}_additive`}
								>
									{add.name}
								</p>
							</div>
						))}
					</div>

					<div className="total_price_block">
						<p className="total">Total:</p>
						<p className="total_price">${totalPrice.toFixed(2)}</p>
					</div>

					<div className="warning">
						<FontAwesomeIcon icon={faCircleInfo} />
						<p>
							The cost is not final. Download our mobile app to see the final
							price and place your order. Earn loyalty points and enjoy your
							favorite coffee with up to 20% discount.
						</p>
					</div>

					<div className="add_cart" onClick={handleAddToCart}>
						Add to cart
					</div>
				</div>
			</div>
		</>
	);
};

export default Modal;
