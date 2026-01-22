export const getProductImage = (product, index) => {
	const category = product.category?.toLowerCase() || "coffee";
	const number = index + 1;
	const ext = category === "coffee" ? "jpg" : "png";

	return `/src/assets/${category}-${number}.${ext}`;
};
