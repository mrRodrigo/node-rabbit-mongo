const NotFoundException = require('src/infra/exceptions/NotFoundException');

module.exports = ({ productRepository }) => ({
	execute: async ({ name }) => {
		const response = await productRepository.getByName(name)
		if(!response) throw new NotFoundException('Product not Found');
		return response;
	}
})
