const ExtractProductName = require('src/domain/utils/ExtractProductName');

module.exports = ({ productService }) => ({
	execute: async data => {
		const productName = ExtractProductName.fromAMQP(data);
		
		const { product, decrementError } = await productService.decrementProduct(
			productName
		);

		console.info(`[AMQP] Received message: decrement ${productName}`);
		if (decrementError) return console.error(decrementError.message);

		return product;
	}
});
