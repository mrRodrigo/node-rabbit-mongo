const ExtractProductName = require('src/domain/utils/ExtractProductName');

module.exports = ({ productService }) => ({
	execute: async data => {
		const productName = ExtractProductName.fromAMQP(data);
		
		const { product, incrementError } = await productService.incrementProduct(
			productName
		);

		console.info(`[AMQP] Received message: increment ${productName}`);
		if (incrementError) return console.error(incrementError.message);

		return product;
	}
});
