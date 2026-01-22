import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
	faCoffee,
	faLeaf,
	faCakeCandles,
} from "@fortawesome/free-solid-svg-icons";
import { getProductImage } from "../utils/getProductImage";

const Menu = () => {
	const [category, setCategory] = useState("coffee");
	const [products, setProducts] = useState([]);
	useEffect(() => {
		const fetchProducts = async () => {
			try {
				const res = await fetch("/data/products.json");
				const data = await res.json();

				const filtered = data.filter(
					(p) => p.category?.toLowerCase() === category.toLowerCase(),
				);
				setProducts(filtered);
			} catch (err) {
				console.error("Failed to load products", err);
				setProducts([]);
			}
		};
		fetchProducts();
	}, [category]);

	return (
		<div className="menu">
			<h1>
				Behind each of our cups <br />
				hides an <span>amazing surprise</span>
			</h1>

			<div className="buttons">
				<button
					className={`button coffee ${category === "coffee" ? "clicked" : ""}`}
					onClick={() => setCategory("coffee")}
				>
					<FontAwesomeIcon icon={faCoffee} />
					<p>Coffee</p>
				</button>

				<button
					className={`button tea ${category === "tea" ? "clicked" : ""}`}
					onClick={() => setCategory("tea")}
				>
					<FontAwesomeIcon icon={faLeaf} />
					<p>Tea</p>
				</button>

				<button
					className={`button dessert ${category === "dessert" ? "clicked" : ""}`}
					onClick={() => setCategory("dessert")}
				>
					<FontAwesomeIcon icon={faCakeCandles} />
					<p>Dessert</p>
				</button>
			</div>

			<div className="content">
				{products.map((product, index) => (
					<div key={index} className="block">
						<img src={getProductImage(product, index)} alt={product.name} />
						<div className="info_block">
							<h3>{product.name}</h3>
							<p>{product.description}</p>
							<div className="prices_block">
								{product.discountPrice ? (
									<>
										<p className="discount_price">${product.discountPrice}</p>
										<p
											className="price"
											style={{ textDecoration: "line-through", opacity: 0.5 }}
										>
											${product.price}
										</p>
									</>
								) : (
									<p className="price">${product.price}</p>
								)}
							</div>
						</div>
					</div>
				))}
			</div>
		</div>
	);
};

export default Menu;
