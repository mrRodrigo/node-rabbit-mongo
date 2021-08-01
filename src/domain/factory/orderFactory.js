module.exports = () => ({
	toDatabase: (requestOrder, databaseProducts) => {
		const { products: requestProducts } = requestOrder;

		const products = databaseProducts.map(({ name, price }) => ({
			name,
			quantity: Number(requestProducts.find((p) => p.name === name).quantity),
			price: Number(price)
		}));

		const total = products.reduce(
			(total, { price, quantity }) => price * quantity + total,
			0
		);
		return {
			products,
			total
		};
	}
});
