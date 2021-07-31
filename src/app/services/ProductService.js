module.exports = ({ productRepository }) => ({
	incrementProduct: async productName => {
		let incrementError;

		const product = await productRepository.update(
			{ name: productName },
			{ $inc: { quantity: 1 } }
		);

		if(!product) incrementError = new Error('It\'s not possible increment product');

		return {
			product,
			incrementError
		}
	},
	decrementProduct: async productName => {
		let decrementError;

		const product = await productRepository.update(
			{ name: productName, quantity: { $gte: 0 } },
			{ $inc: { quantity: -1 } }
		);

		if(!product) decrementError = new Error('It\'s not possible decrement product');

		return {
			product,
			decrementError
		}
	}
})
