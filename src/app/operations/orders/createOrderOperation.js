const { validate } = require('src/domain/rules/validator');

module.exports = ({ productRepository, orderRepository, orderRules, orderFactory }) => ({
	execute: async (requestOrder) => {
		const { products } = requestOrder;

		const databaseProducts = await productRepository.getListByName(products);

		const { isValid, error } = validate(
			{ requestOrder, databaseProducts },
			orderRules.validateFoundProducts,
			orderRules.validateQuantity
		);


		if(!isValid) throw error;
		
		await productRepository.updateProductsQuantity(products);

		const orderToDatabase = orderFactory.toDatabase(requestOrder, databaseProducts);

		return orderRepository.create(orderToDatabase);
	}
})
