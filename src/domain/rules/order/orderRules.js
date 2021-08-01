const BusinessException = require('src/infra/exceptions/BusinessException');

module.exports = () => ({
	validateFoundProducts: ({ requestOrder, databaseProducts }) => {
		const { products } = requestOrder;
		let error;

		const isValid = products.every((reqProduct) =>
			databaseProducts.some((dbProduct) => reqProduct.name === dbProduct.name)
		);

		if(!isValid) error = new BusinessException('A certain product was not found.');
		
		return {
			isValid,
			error,
			hasNextValidation: isValid
		}
	},

	validateQuantity: ({ requestOrder, databaseProducts }) => {
		const { products } = requestOrder;
		let error;

		const isValid = products.every((reqProduct) =>
			databaseProducts.some((dbProduct) => reqProduct.quantity <= dbProduct.quantity)
		);

		if(!isValid) error = new BusinessException('A certain product does not have the requested quantity.');
		
		return {
			isValid,
			error,
			hasNextValidation: isValid
		}
	}
});
